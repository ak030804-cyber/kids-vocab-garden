// 本機資料層 (localStorage) — 多小朋友 profile + 進度 + 事件紀錄
import { DECKS, DECK_MAP, allWords, wordKey } from "./data.js";
import { newCard, schedule, isDue, DAY_MS } from "./srs.js";

const STORE_KEY = "kvapp.v1";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function dateKey(ts = Date.now()) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function startOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const AVATAR_COLORS = ["#5f9e63", "#e08a4e", "#6a9bcc", "#d9663f", "#8a76c4", "#c98a3f"];

function blankProfile(name) {
  return {
    id: uid(),
    name: name || "小朋友",
    color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    createdAt: Date.now(),
    targetDaily: 10,
    selectedDeck: DECKS[0].id,
    cards: {},
    events: [],
    days: {}
  };
}

let state = null;

export function load() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    state = raw ? JSON.parse(raw) : null;
  } catch (e) {
    state = null;
  }
  if (!state || !state.profiles) {
    state = { activeProfileId: null, profiles: {} };
  }
  return state;
}

export function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    /* 忽略 quota 錯誤 */
  }
}

export function listProfiles() {
  const s = load();
  return Object.values(s.profiles).sort((a, b) => a.createdAt - b.createdAt);
}

export function createProfile(name) {
  const s = load();
  const p = blankProfile(name);
  s.profiles[p.id] = p;
  s.activeProfileId = p.id;
  save();
  return p;
}

export function removeProfile(id) {
  const s = load();
  delete s.profiles[id];
  if (s.activeProfileId === id) {
    const rest = listProfiles();
    s.activeProfileId = rest.length ? rest[0].id : null;
  }
  save();
}

export function activeProfile() {
  const s = load();
  if (!s.activeProfileId) return null;
  return s.profiles[s.activeProfileId] || null;
}

export function setActiveProfile(id) {
  const s = load();
  s.activeProfileId = id;
  save();
}

export function ensureDay(profile, key, ts = Date.now()) {
  if (!profile.days[key]) {
    profile.days[key] = { answered: 0, correct: 0, firstTryRight: 0, ms: 0, newWords: 0, reviewWords: 0 };
  }
  return profile.days[key];
}

export function setProfileField(profile, key, value) {
  profile[key] = value;
  save();
}

// ---------- 學習 Session ----------

export function deckWords(deckId) {
  const deck = DECK_MAP[deckId];
  return (deck ? deck.words : []).map((w) => ({ ...w, deckId }));
}

// 今日要學：先到期複習，再補新字
export function buildSession(profile, deckId, limit, mode) {
  const words = deckWords(deckId);
  const now = Date.now();
  const goal = limit || profile.targetDaily || 10;
  const m = mode || profile.mode || "mix";

  const seen = [];
  const fresh = [];
  for (const w of words) {
    const key = wordKey(w);
    const card = profile.cards[key];
    if (card && card.seen > 0) {
      if (isDue(card, now)) seen.push({ w, card, key, isReview: true });
    } else {
      fresh.push({ w, card: null, key, isReview: false });
    }
  }
  // 到期複習優先，再補新字
  let picked = [...seen, ...fresh];
  // 拼字模式唔可以有空格詞
  if (m === "spell") {
    const noSpace = picked.filter((it) => !/\s/.test(it.w.en));
    if (noSpace.length) picked = noSpace;
  }
  picked = picked.slice(0, goal);

  return picked.map((item, i) => {
    // 題型輪換：新字用「聽音」，複習用「拼字」，間中「認字」
    let qType;
    if (m !== "mix") qType = m;
    else if (!item.isReview) qType = i % 3 === 0 ? "recognize" : "listen";
    else qType = i % 2 === 0 ? "spell" : "listen";
    // 多字詞（例如 fish and chips）唔可以拼字題
    if (qType === "spell" && /\s/.test(item.w.en)) qType = "listen";
    return { ...item, qType };
  });
}

export function dueCount(profile, deckId) {
  const now = Date.now();
  let n = 0;
  for (const w of deckWords(deckId)) {
    const card = profile.cards[wordKey(w)];
    if (card && card.seen > 0 && isDue(card, now)) n += 1;
  }
  return n;
}

export function newCount(profile, deckId) {
  let n = 0;
  for (const w of deckWords(deckId)) {
    const card = profile.cards[wordKey(w)];
    if (!card || card.seen === 0) n += 1;
  }
  return n;
}

export function recordAnswer(profile, { deckId, en, qType, correct, firstTry, ms, isNewWord }) {
  const key = wordKey({ en, deckId });
  const prev = profile.cards[key] || newCard();
  const grade = !correct ? 1 : firstTry && ms < 4000 ? 5 : firstTry ? 4 : 3;
  const next = schedule(prev, grade);
  next.seen = prev.seen + 1;
  next.correct = prev.correct + (correct ? 1 : 0);
  next.wrong = prev.wrong + (correct ? 0 : 1);
  next.firstTryRight = prev.firstTryRight + (correct && firstTry ? 1 : 0);
  profile.cards[key] = next;

  const dk = dateKey();
  const day = ensureDay(profile, dk);
  day.answered += 1;
  if (correct) day.correct += 1;
  if (correct && firstTry) day.firstTryRight += 1;
  day.ms += ms || 0;
  if (isNewWord) day.newWords += 1;
  else day.reviewWords += 1;

  profile.events.push({ ts: Date.now(), deckId, en, qType, correct: !!correct, firstTry: !!firstTry, ms: ms || 0 });
  if (profile.events.length > 2000) profile.events = profile.events.slice(-2000);
  save();
  return profile.cards[key];
}

// ---------- 統計 ----------

export function dayDone(profile, key) {
  const d = profile.days[key];
  if (!d) return false;
  return d.answered > 0;
}

export function streak(profile, now = Date.now()) {
  let count = 0;
  let t = startOfDay(now);
  // 若今日未做，由尋日開始數
  if (!dayDone(profile, dateKey(t))) t -= DAY_MS;
  while (dayDone(profile, dateKey(t))) {
    count += 1;
    t -= DAY_MS;
  }
  return count;
}

export function weekFootprint(profile, now = Date.now()) {
  const out = [];
  const today = startOfDay(now);
  const weekday = new Date(today).getDay(); // 0=日
  const mondayOffset = (weekday + 6) % 7;   // 由星期一開始
  const monday = today - mondayOffset * DAY_MS;
  for (let i = 0; i < 7; i += 1) {
    const ts = monday + i * DAY_MS;
    const key = dateKey(ts);
    out.push({ key, ts, done: dayDone(profile, key), isToday: key === dateKey(now) });
  }
  return out;
}

export function report(profile, days = 7, now = Date.now()) {
  const cutoff = startOfDay(now) - (days - 1) * DAY_MS;
  const perDay = [];
  let answered = 0;
  let correct = 0;
  let firstTryRight = 0;
  let ms = 0;
  let activeDays = 0;
  let newWords = 0;
  let reviewWords = 0;
  for (let i = 0; i < days; i += 1) {
    const ts = cutoff + i * DAY_MS;
    const key = dateKey(ts);
    const d = profile.days[key];
    if (d && d.answered > 0) {
      activeDays += 1;
      answered += d.answered;
      correct += d.correct;
      firstTryRight += d.firstTryRight;
      ms += d.ms;
      newWords += d.newWords;
      reviewWords += d.reviewWords;
    }
    perDay.push({ key, answered: d ? d.answered : 0 });
  }
  // 題型分佈（由 events 統計）
  const since = cutoff;
  const byType = { listen: 0, spell: 0, recognize: 0 };
  for (const e of profile.events) {
    if (e.ts >= since && byType[e.qType] != null) byType[e.qType] += 1;
  }
  return {
    activeDays,
    answered,
    correct,
    firstTryRight,
    firstTryAccuracy: answered ? Math.round((firstTryRight / answered) * 100) : 0,
    accuracy: answered ? Math.round((correct / answered) * 100) : 0,
    minutes: Math.round(ms / 60000),
    newWords,
    reviewWords,
    perDay,
    byType
  };
}

export function garden(profile, now = Date.now()) {
  const totalDone = Object.keys(profile.days).filter((k) => dayDone(profile, k)).length;
  const s = streak(profile, now);
  // 成長階段 0-5
  let stage = 0;
  if (totalDone >= 1) stage = 1;
  if (totalDone >= 3 || s >= 3) stage = 2;
  if (totalDone >= 7 || s >= 7) stage = 3;
  if (totalDone >= 14 || s >= 14) stage = 4;
  if (totalDone >= 30 || s >= 30) stage = 5;
  return { totalDone, streak: s, stage, maxStage: 5 };
}
