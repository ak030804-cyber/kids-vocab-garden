// 間隔複習引擎 (SM-2 簡化版)
// 每個字嘅狀態:
// { ease, intervalDays, reps, lapses, due, lastReviewed, seen, correct, wrong }

export const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_MS = 60 * 1000;

export function newCard() {
  return {
    ease: 2.5,
    intervalDays: 0,
    reps: 0,
    lapses: 0,
    due: 0,          // 0 = 未學過 / 立即到期
    lastReviewed: 0,
    seen: 0,         // 出現次數
    correct: 0,      // 答對次數
    wrong: 0,        // 答錯次數
    firstTryRight: 0 // 首次就答對
  };
}

// grace: 1 = 即刻要學, 3 = 答得好, 5 = 太易
export function schedule(card, grade, now = Date.now()) {
  const s = { ...card };
  s.lastReviewed = now;

  if (grade < 3) {
    // 答錯 → 重新學
    s.lapses += 1;
    s.reps = 0;
    s.ease = Math.max(1.3, s.ease - 0.2);
    s.intervalDays = 0;
    s.due = now + 10 * MIN_MS; // 10 分鐘後再見
    return s;
  }

  s.reps += 1;
  if (s.reps === 1) s.intervalDays = 1;
  else if (s.reps === 2) s.intervalDays = 3;
  else s.intervalDays = Math.max(1, Math.round(s.intervalDays * s.ease));

  if (grade >= 5) s.ease += 0.1;
  else if (grade < 4) s.ease = Math.max(1.3, s.ease - 0.15);

  s.due = now + s.intervalDays * DAY_MS;
  return s;
}

// 由一次作答換算 grade
export function gradeFromAnswer({ correct, firstTry, ms }) {
  if (!correct) return firstTry ? 2 : 1; // 錯
  // 答對
  if (firstTry && ms < 4000) return 5;
  if (firstTry) return 4;
  return 3;
}

export function isDue(card, now = Date.now()) {
  return !card || card.due <= now;
}

export function addDays(ts, n) {
  return ts + n * DAY_MS;
}
