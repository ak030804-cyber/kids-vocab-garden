import { DECKS, DECK_MAP, wordKey } from "./data.js";
import * as store from "./store.js";

/* ================= 小工具 ================= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (arr, n, exclude) => shuffle(arr.filter((x) => !exclude.includes(x))).slice(0, n);

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

let toastTimer = null;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

/* ================= 發音 ================= */
let enVoice = null;
function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  const vs = speechSynthesis.getVoices();
  enVoice = vs.find((v) => /en(-|_)(US|GB)/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang)) || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}
function speak(text, rate = 0.82) {
  if (!("speechSynthesis" in window)) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    u.pitch = 1.05;
    if (enVoice) u.voice = enVoice;
    speechSynthesis.speak(u);
    return true;
  } catch (e) {
    return false;
  }
}

/* ================= 花園 SVG ================= */
function gardenSVG(stage) {
  const cl = "tree-sway";
  const base = `
    <ellipse cx="60" cy="112" rx="34" ry="7" fill="#cfe3bf" opacity=".8"/>
    <path d="M40 110q20 -12 40 0z" fill="#b98d5a"/>`;
  const stages = {
    0: `<circle cx="60" cy="104" r="5" fill="#8a6a3f"/>`,
    1: `<path d="M60 104V92" stroke="#6ea15c" stroke-width="4" stroke-linecap="round"/>
        <path d="M60 92c-7 0-11-5-11-9 6-1 11 2 11 9z" fill="#74b578"/>
        <path d="M60 92c7 0 11-5 11-9-6-1-11 2-11 9z" fill="#5f9e63"/>`,
    2: `<path d="M60 104V78" stroke="#7a5a36" stroke-width="5" stroke-linecap="round"/>
        <circle cx="60" cy="74" r="15" fill="#5f9e63"/>
        <circle cx="50" cy="78" r="10" fill="#74b578"/>`,
    3: `<path d="M60 104V64" stroke="#7a5a36" stroke-width="6" stroke-linecap="round"/>
        <circle cx="60" cy="54" r="22" fill="#5f9e63"/>
        <circle cx="46" cy="60" r="14" fill="#74b578"/>
        <circle cx="74" cy="60" r="14" fill="#4c8a52"/>`,
    4: `<path d="M60 104V56M60 78 44 66M60 82 76 70" stroke="#7a5a36" stroke-width="6" stroke-linecap="round"/>
        <circle cx="60" cy="44" r="24" fill="#5f9e63"/>
        <circle cx="43" cy="52" r="16" fill="#74b578"/>
        <circle cx="77" cy="52" r="16" fill="#4c8a52"/>
        <circle cx="60" cy="30" r="15" fill="#6aae6f"/>`,
    5: `<path d="M60 104V50M60 76 42 62M60 80 78 66" stroke="#7a5a36" stroke-width="6" stroke-linecap="round"/>
        <circle cx="60" cy="40" r="26" fill="#5f9e63"/>
        <circle cx="41" cy="48" r="17" fill="#74b578"/>
        <circle cx="79" cy="48" r="17" fill="#4c8a52"/>
        <circle cx="60" cy="25" r="16" fill="#6aae6f"/>
        <circle cx="45" cy="34" r="5" fill="#e56a6a"/>
        <circle cx="75" cy="36" r="5" fill="#e56a6a"/>
        <circle cx="60" cy="18" r="5" fill="#ef8f3f"/>`
  };
  return `<svg viewBox="0 0 120 120" aria-hidden="true">${base}<g class="${cl}">${stages[Math.min(5, Math.max(0, stage))]}</g></svg>`;
}

const STAGE_NAMES = ["一粒種子", "萌芽", "小樹苗", "小樹", "大樹", "開花結果"];
const STAGE_CAPS = [
  "開始學習，種子就會發芽",
  "恭喜！你嘅種子發芽啦",
  "小樹苗慢慢長高",
  "努力灌溉，變成小樹",
  "大樹啦！繼續保持",
  "開花結果，勁！"
];

/* ================= Router ================= */
let activeTab = "home";
function show(screen) {
  ["welcome", "home", "learn", "garden", "report"].forEach((s) => {
    $("#screen-" + s).classList.toggle("hidden", s !== screen);
  });
  const showTabs = ["home", "garden", "report"].includes(screen);
  $("#tabbar").classList.toggle("hidden", !showTabs);
  window.scrollTo({ top: 0 });
}
function goTab(tab) {
  activeTab = tab;
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  if (tab === "home") renderHome();
  if (tab === "garden") renderGarden();
  if (tab === "report") renderReport();
  show(tab);
}

/* ================= Welcome / Profiles ================= */
function renderWelcome() {
  const list = $("#profile-list");
  const profiles = store.listProfiles();
  list.innerHTML = profiles
    .map((p) => {
      const g = store.garden(p);
      return `<button class="profile-item" data-id="${p.id}">
        <div class="avatar" style="background:${p.color}">${p.name.slice(0, 1)}</div>
        <div class="meta">
          <div class="pn">${escapeHtml(p.name)}</div>
          <div class="ps">學習 ${g.totalDone} 天 · 連續 ${g.streak} 天</div>
        </div>
        <svg class="icon" style="color:var(--muted)"><use href="#i-chev"/></svg>
      </button>`;
    })
    .join("");
  list.querySelectorAll(".profile-item").forEach((el) => {
    el.addEventListener("click", () => {
      store.setActiveProfile(el.dataset.id);
      goTab("home");
    });
  });
  $("#new-profile-form").classList.add("hidden");
  $("#show-new-profile").classList.toggle("hidden", false);
  show("welcome");
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ================= Home ================= */
function renderHome() {
  const p = store.activeProfile();
  if (!p) return renderWelcome();
  $("#home-avatar").textContent = p.name.slice(0, 1);
  $("#home-avatar").style.background = p.color;
  $("#home-name").textContent = p.name;
  const h = new Date().getHours();
  $("#home-greet").textContent = h < 12 ? "早安" : h < 18 ? "午安" : "晚安";

  const today = store.ensureDay(p, store.dateKey());
  const target = p.targetDaily || 10;
  const done = Math.min(today.answered, target);
  const pct = Math.min(100, Math.round((done / target) * 100));
  const C = 263.9;
  $("#ring-arc").style.strokeDashoffset = String(C * (1 - pct / 100));
  $("#ring-pct").textContent = pct + "%";
  $("#ring-arc").setAttribute("stroke", pct >= 100 ? "#e08a4e" : "#5f9e63");
  $("#plan-count").textContent = `${done} / ${target} 個任務`;
  $("#plan-sub").textContent = pct >= 100 ? "今日任務完成，花園已澆水" : "完成今天的練習，幫花園澆水";
  $("#btn-start").innerHTML =
    pct >= 100
      ? `<svg class="icon"><use href="#i-leaf"/></svg> 再練習多一轉`
      : `<svg class="icon"><use href="#i-leaf"/></svg> 開始今天的學習`;

  // 本週
  const week = store.weekFootprint(p);
  $("#week-row").innerHTML = week
    .map((d) => {
      const num = Number(d.key.slice(-2));
      return `<div class="day ${d.done ? "done" : ""} ${d.isToday ? "today" : ""}">
        <div class="num">${num}</div>
        <svg class="sun"><use href="#i-sun"/></svg>
      </div>`;
    })
    .join("");

  // 學習路線
  const sel = p.selectedDeck || DECKS[0].id;
  $("#deck-list").innerHTML = DECKS.map((d) => {
    const due = store.dueCount(p, d.id);
    const nw = store.newCount(p, d.id);
    const total = d.words.length;
    const learned = total - nw;
    return `<div class="deck ${d.id === sel ? "selected" : ""}" data-id="${d.id}">
      <div class="badge" style="background:${d.color}">
        <svg class="icon"><use href="#i-leaf"/></svg>
      </div>
      <div>
        <div class="dname">${escapeHtml(d.name)}</div>
        <div class="dmeta">已學 ${learned}/${total} · 待複習 ${due}</div>
      </div>
      <svg class="icon go"><use href="#i-chev"/></svg>
    </div>`;
  }).join("");
  $$("#deck-list .deck").forEach((el) => {
    el.addEventListener("click", () => {
      if (p.selectedDeck === el.dataset.id) {
        startSession();
      } else {
        store.setProfileField(p, "selectedDeck", el.dataset.id);
        renderHome();
        toast("已選擇：" + DECK_MAP[el.dataset.id].name);
      }
    });
  });

  // 花園預覽
  renderGardenCard($("#home-garden"), p);
  show("home");
}

function renderGardenCard(el, p) {
  const g = store.garden(p);
  el.innerHTML = `
    <svg class="garden-sky icon-lg"><use href="#i-sun"/></svg>
    <div class="garden-stage">${gardenSVG(g.stage)}</div>
    <div class="garden-cap">
      <div class="sname">${STAGE_NAMES[g.stage]}</div>
      <div class="scap">${STAGE_CAPS[g.stage]}</div>
    </div>
    <div class="garden-stats">
      <div class="gstat"><div class="v">${g.totalDone}</div><div class="l">學習天數</div></div>
      <div class="gstat"><div class="v">${g.streak}</div><div class="l">連續天數</div></div>
      <div class="gstat"><div class="v">${g.stage}/${g.maxStage}</div><div class="l">成長階段</div></div>
    </div>`;
}

/* ================= 學習 Session ================= */
let session = null;

function startSession() {
  const p = store.activeProfile();
  const deckId = p.selectedDeck || DECKS[0].id;
  const items = store.buildSession(p, deckId, p.targetDaily || 10);
  if (!items.length) {
    toast("此路線暫時冇嘢學，試下其他路線");
    return;
  }
  session = { deckId, items, idx: 0, results: [], qStart: Date.now(), triesThisQ: 0 };
  show("learn");
  renderQuestion();
}

function currentItem() {
  return session.items[session.idx];
}

function renderQuestion() {
  const it = currentItem();
  const item = it.w || it;
  const qType = it.qType;
  session.qStart = Date.now();
  session.triesThisQ = 0;

  $("#learn-count").textContent = `${session.idx + 1}/${session.items.length}`;
  $("#learn-bar").style.width = `${(session.idx / session.items.length) * 100}%`;
  $("#q-feedback").innerHTML = "";
  $("#btn-next").style.visibility = "hidden";

  const tag = { listen: "聽聲音，選出單字", recognize: "認字，選出正確意思", spell: "用字母積木拼出單字" }[qType];
  const tagIcon = qType === "spell" ? "#i-leaf" : qType === "recognize" ? "#i-chart" : "#i-volume";
  $("#qtype-tag").innerHTML = `<svg class="icon" style="width:16px;height:16px"><use href="${tagIcon}"/></svg><span>${tag}</span>`;

  if (qType === "listen") renderListen(item);
  else if (qType === "recognize") renderRecognize(item);
  else renderSpell(item);
}

function renderListen(item) {
  $("#q-stage").innerHTML = `
    <div class="q-prompt">點一下就發音</div>
    <button class="speaker" id="speaker" aria-label="播放發音">
      <svg class="icon icon-xl"><use href="#i-volume"/></svg>
    </button>
    <div class="q-prompt" style="margin-top:6px">聽聲音，選出正確嘅單字</div>`;

  const others = pick(DECK_MAP[item.deckId].words.map((w) => w.en), 3, [item.en]);
  const opts = shuffle([item.en, ...others]);
  $("#q-answer-area").innerHTML = `<div class="options">${opts
    .map((o) => `<button class="option" data-val="${escapeHtml(o)}">${escapeHtml(o)}</button>`)
    .join("")}</div>`;

  const sp = $("#speaker");
  sp.addEventListener("click", () => {
    sp.classList.add("playing");
    speak(item.en);
    setTimeout(() => sp.classList.remove("playing"), 900);
  });
  speak(item.en);

  $$("#q-answer-area .option").forEach((b) => {
    b.addEventListener("click", () => answerChoice(b, b.dataset.val === item.en, item, `正確答案係 ${item.en}（${item.zh}）`));
  });
}

function renderRecognize(item) {
  $("#q-stage").innerHTML = `
    <div class="q-prompt">呢個英文字係咩意思？</div>
    <button class="q-word" id="q-speak" style="background:none;border:none;cursor:pointer;color:inherit;font-family:inherit">${escapeHtml(item.en)}</button>
    <div class="q-prompt" style="margin-top:8px">（點字可聽發音）</div>`;
  $("#q-speak").addEventListener("click", () => speak(item.en));

  const others = pick(DECK_MAP[item.deckId].words.map((w) => w.zh), 3, [item.zh]);
  const opts = shuffle([item.zh, ...others]);
  $("#q-answer-area").innerHTML = `<div class="options">${opts
    .map((o) => `<button class="option" data-val="${escapeHtml(o)}">${escapeHtml(o)}</button>`)
    .join("")}</div>`;
  $$("#q-answer-area .option").forEach((b) => {
    b.addEventListener("click", () => answerChoice(b, b.dataset.val === item.zh, item, `正確答案：${item.en} = ${item.zh}`));
  });
}

function renderSpell(item) {
  const letters = item.en.split("");
  // 加上 1-2 個干擾字母（若短字）
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const extra = letters.length <= 4 ? pick(alphabet, 2, letters) : [];
  const pool = shuffle([...letters.map((l, i) => ({ l, id: "x" + i })), ...extra.map((l, i) => ({ l, id: "e" + i }))]);

  $("#q-stage").innerHTML = `
    <div class="q-prompt">呢個中文嘅英文點串？</div>
    <div class="q-zh">${escapeHtml(item.zh)}</div>
    <button class="btn ghost small" id="q-speak" style="margin-top:12px;width:auto;padding:10px 16px">
      <svg class="icon" style="width:18px;height:18px"><use href="#i-volume"/></svg> 聽發音
    </button>`;
  $("#q-speak").addEventListener("click", () => speak(item.en));

  const slots = letters.map((_, i) => `<div class="slot" data-i="${i}"></div>`).join("");
  const blocks = pool.map((b) => `<button class="block" data-id="${b.id}" data-l="${b.l}">${b.l}</button>`).join("");
  $("#q-answer-area").innerHTML = `
    <div class="answer-slots" id="slots">${slots}</div>
    <div class="q-prompt" style="margin-top:16px">點字母，排出正確順序</div>
    <div class="blocks" id="blocks">${blocks}</div>
    <div class="row" style="margin-top:14px;justify-content:center">
      <button class="btn small ghost" id="spell-back" style="width:auto">退格</button>
      <button class="btn small" id="spell-check" style="width:auto">確認拼字</button>
    </div>`;

  const chosen = [];
  const slotEls = $$("#slots .slot");
  function paint() {
    slotEls.forEach((s, i) => {
      s.textContent = chosen[i] ? chosen[i].l : "";
      s.classList.toggle("filled", !!chosen[i]);
    });
  }
  $$("#blocks .block").forEach((b) => {
    b.addEventListener("click", () => {
      if (chosen.length >= letters.length) return;
      chosen.push({ l: b.dataset.l, id: b.dataset.id });
      b.classList.add("used");
      paint();
    });
  });
  $("#spell-back").addEventListener("click", () => {
    const last = chosen.pop();
    if (last) {
      const el = $(`#blocks .block[data-id="${last.id}"]`);
      if (el) el.classList.remove("used");
    }
    paint();
  });
  $("#spell-check").addEventListener("click", () => {
    const typed = chosen.map((c) => c.l).join("");
    const correct = typed === item.en;
    if (!correct) {
      $$("#slots .slot").forEach((s) => s.classList.add("shake"));
      setTimeout(() => $$("#slots .slot").forEach((s) => s.classList.remove("shake")), 400);
      speak(item.en);
      session.triesThisQ += 1;
      const fb = $("#q-feedback");
      fb.innerHTML = `<div class="feedback bad"><svg class="icon"><use href="#i-x"/></svg><div>再試一次，聽清楚發音</div></div>`;
      return;
    }
    answerChoice(null, true, item, `正確！${item.en} = ${item.zh}`, typed);
  });
}

function answerChoice(btn, correct, item, explain, typed) {
  const firstTry = session.triesThisQ === 0;
  const ms = Date.now() - session.qStart;
  const p = store.activeProfile();

  if (!correct && !firstTry) {
    // 已經試過一次
  }
  if (!correct) session.triesThisQ += 1;

  // 標示按鈕
  if (btn) {
    $$("#q-answer-area .option").forEach((b) => {
      const isAnswer = b.dataset.val === item.en || b.dataset.val === item.zh;
      if (isAnswer) b.classList.add("right");
      else if (b === btn) b.classList.add("wrong");
      else b.classList.add("dim");
      b.disabled = true;
    });
  }

  const fb = $("#q-feedback");
  if (correct) {
    fb.innerHTML = `<div class="feedback good pop"><svg class="icon"><use href="#i-check"/></svg><div>${escapeHtml(explain)}</div></div>`;
  } else {
    fb.innerHTML = `<div class="feedback bad"><svg class="icon"><use href="#i-x"/></svg><div>${escapeHtml(explain)}</div></div>`;
  }
  speak(item.en);

  // 記錄（以首次作答為準判斷「首次正確」）
  const wasNew = !store.activeProfile().cards[wordKey(item)] || store.activeProfile().cards[wordKey(item)].seen === 0;
  store.recordAnswer(p, {
    deckId: item.deckId,
    en: item.en,
    qType: currentItem().qType,
    correct,
    firstTry,
    ms,
    isNewWord: wasNew
  });
  session.results.push({ correct, firstTry });

  const next = $("#btn-next");
  next.textContent = session.idx + 1 >= session.items.length ? "完成今日學習" : "繼續";
  next.style.visibility = "visible";
  next.onclick = () => {
    session.idx += 1;
    if (session.idx >= session.items.length) finishSession();
    else renderQuestion();
  };
}

function finishSession() {
  const p = store.activeProfile();
  const today = store.ensureDay(p, store.dateKey());
  const g = store.garden(p);
  store.save();

  $("#learn-bar").style.width = "100%";
  $("#learn-count").textContent = "完成";
  $("#q-stage").innerHTML = `
    <div class="garden-stage" style="padding-top:6px">${gardenSVG(g.stage)}</div>
    <div class="title-lg" style="text-align:center">今日任務完成！</div>
    <div class="sub" style="text-align:center">你幫花園澆咗水，今日學咗 ${today.answered} 題</div>
    <div class="garden-stats" style="margin-top:16px">
      <div class="gstat"><div class="v">${g.streak}</div><div class="l">連續天數</div></div>
      <div class="gstat"><div class="v">${g.totalDone}</div><div class="l">學習天數</div></div>
      <div class="gstat"><div class="v">${STAGE_NAMES[g.stage]}</div><div class="l">花園狀態</div></div>
    </div>`;
  $("#q-answer-area").innerHTML = "";
  $("#q-feedback").innerHTML = "";
  const next = $("#btn-next");
  next.textContent = "返去花園";
  next.style.visibility = "visible";
  next.onclick = () => {
    speak("Great job!");
    goTab("garden");
  };
}

/* ================= 花園 ================= */
function renderGarden() {
  const p = store.activeProfile();
  if (!p) return renderWelcome();
  $("#garden-avatar").textContent = p.name.slice(0, 1);
  $("#garden-avatar").style.background = p.color;
  $("#garden-name").textContent = p.name;
  renderGardenCard($("#garden-big"), p);

  const g = store.garden(p);
  const rows = [
    `學習天數：${g.totalDone} 天`,
    `連續天數：${g.streak} 天`,
    `成長階段：${STAGE_NAMES[g.stage]}（${g.stage}/${g.maxStage}）`,
    g.stage >= 5 ? "花園已開花結果，勁！" : `再努力 ${Math.max(1, [1, 3, 7, 14, 30][g.stage] - g.totalDone)} 日就可以升級`
  ];
  $("#garden-milestones").innerHTML = rows
    .map((r) => `<div style="padding:8px 0;border-bottom:1px solid var(--line)">${escapeHtml(r)}</div>`)
    .join("");
  show("garden");
}

/* ================= 報告 ================= */
let reportDays = 7;
function renderReport() {
  const p = store.activeProfile();
  if (!p) return renderWelcome();
  $("#report-avatar").textContent = p.name.slice(0, 1);
  $("#report-avatar").style.background = p.color;
  $("#report-name").textContent = p.name;
  $$("[data-days]").forEach((b) => b.classList.toggle("selected", Number(b.dataset.days) === reportDays));

  const r = store.report(p, reportDays);
  $("#report-stats").innerHTML = `
    <div class="stat"><div class="v">${r.activeDays}<span class="u">/${reportDays}</span></div><div class="l">學習天數</div></div>
    <div class="stat"><div class="v">${r.answered}</div><div class="l">完成題數</div></div>
    <div class="stat"><div class="v">${r.minutes}<span class="u">分鐘</span></div><div class="l">有效學習時間</div></div>
    <div class="stat"><div class="v">${r.firstTryAccuracy}<span class="u">%</span></div><div class="l">首次正確率</div></div>`;

  // 7 天趨勢
  const r7 = store.report(p, 7);
  const max = Math.max(1, ...r7.perDay.map((d) => d.answered));
  $("#report-trend").innerHTML = r7.perDay
    .map((d, i) => {
      const h = Math.round((d.answered / max) * 82) + (d.answered ? 6 : 2);
      return `<div class="col">
        <div class="bar" style="height:${h}px" title="${d.answered} 題"></div>
        <div class="dl">${WEEKDAYS[i]}</div>
      </div>`;
    })
    .join("");

  const totalType = r.byType.listen + r.byType.spell + r.byType.recognize || 1;
  const typeRows = [
    { n: "聽音選字", v: r.byType.listen, c: "#5f9e63" },
    { n: "字母拼字", v: r.byType.spell, c: "#e08a4e" },
    { n: "認字", v: r.byType.recognize, c: "#6a9bcc" }
  ];
  $("#report-types").innerHTML = typeRows
    .map((t) => `<div class="bar-row">
      <div>${t.n}</div>
      <div class="bar-track"><i style="width:${Math.round((t.v / totalType) * 100)}%;background:${t.c}"></i></div>
      <div class="bar-val">${t.v}題</div>
    </div>`)
    .join("");

  const mix = [
    { n: "新詞學習", v: r.newWords, c: "#8a76c4" },
    { n: "間隔複習", v: r.reviewWords, c: "#5f9e63" }
  ];
  const mixTotal = r.newWords + r.reviewWords || 1;
  $("#report-mix").innerHTML = mix
    .map((t) => `<div class="bar-row">
      <div>${t.n}</div>
      <div class="bar-track"><i style="width:${Math.round((t.v / mixTotal) * 100)}%;background:${t.c}"></i></div>
      <div class="bar-val">${t.v}題</div>
    </div>`)
    .join("");

  show("report");
}

/* ================= 事件綁定 ================= */
function bind() {
  $("#show-new-profile").addEventListener("click", () => {
    $("#new-profile-form").classList.remove("hidden");
    $("#show-new-profile").classList.add("hidden");
    $("#new-profile-name").focus();
  });
  $("#cancel-profile").addEventListener("click", () => {
    $("#new-profile-form").classList.add("hidden");
    $("#show-new-profile").classList.remove("hidden");
  });
  const doCreate = () => {
    const name = $("#new-profile-name").value.trim();
    if (!name) return toast("請輸入名");
    store.createProfile(name);
    $("#new-profile-name").value = "";
    goTab("home");
  };
  $("#confirm-profile").addEventListener("click", doCreate);
  $("#new-profile-name").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doCreate();
  });

  $("#btn-start").addEventListener("click", startSession);
  $("#btn-switch").addEventListener("click", renderWelcome);
  $("#btn-switch-2").addEventListener("click", renderWelcome);
  $("#btn-leave-learn").addEventListener("click", () => {
    if (session && session.idx > 0) renderHome();
    goTab("home");
  });
  $("#btn-reset").addEventListener("click", () => {
    const p = store.activeProfile();
    if (!p) return;
    if (confirm(`確定重設「${p.name}」嘅所有學習進度？`)) {
      p.cards = {};
      p.events = [];
      p.days = {};
      store.save();
      toast("已重設");
      renderReport();
    }
  });

  $$("[data-days]").forEach((b) => {
    b.addEventListener("click", () => {
      reportDays = Number(b.dataset.days);
      renderReport();
    });
  });

  $$(".tab").forEach((t) => t.addEventListener("click", () => goTab(t.dataset.tab)));
}

/* ================= 啟動 ================= */
function boot() {
  store.load();
  bind();
  if (store.activeProfile()) goTab("home");
  else renderWelcome();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

boot();
