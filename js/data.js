// 單字庫 — 學習路線 (decks)
// 每個 word: { en: 英文, zh: 中文 }

export const DECKS = [
  {
    id: "starter",
    name: "基礎入門",
    desc: "最常用的第一批單字",
    color: "#5f9e63",
    words: [
      { en: "apple", zh: "蘋果" },
      { en: "book", zh: "書" },
      { en: "cat", zh: "貓" },
      { en: "dog", zh: "狗" },
      { en: "egg", zh: "蛋" },
      { en: "fish", zh: "魚" },
      { en: "girl", zh: "女孩" },
      { en: "hand", zh: "手" },
      { en: "ice", zh: "冰" },
      { en: "jump", zh: "跳" },
      { en: "kite", zh: "風箏" },
      { en: "lion", zh: "獅子" },
      { en: "milk", zh: "牛奶" },
      { en: "nose", zh: "鼻子" },
      { en: "orange", zh: "橙" },
      { en: "pen", zh: "筆" },
      { en: "rain", zh: "雨" },
      { en: "sun", zh: "太陽" },
      { en: "tree", zh: "樹" },
      { en: "water", zh: "水" }
    ]
  },
  {
    id: "animals",
    name: "動物樂園",
    desc: "天上飛、水裡游、地上走",
    color: "#e08a4e",
    words: [
      { en: "bear", zh: "熊" },
      { en: "bird", zh: "鳥" },
      { en: "duck", zh: "鴨" },
      { en: "frog", zh: "青蛙" },
      { en: "horse", zh: "馬" },
      { en: "monkey", zh: "猴子" },
      { en: "panda", zh: "熊貓" },
      { en: "pig", zh: "豬" },
      { en: "rabbit", zh: "兔子" },
      { en: "sheep", zh: "綿羊" },
      { en: "snake", zh: "蛇" },
      { en: "tiger", zh: "老虎" },
      { en: "turtle", zh: "烏龜" },
      { en: "whale", zh: "鯨魚" },
      { en: "zebra", zh: "斑馬" },
      { en: "bee", zh: "蜜蜂" }
    ]
  },
  {
    id: "colors",
    name: "顏色與形狀",
    desc: "繽紛嘅世界",
    color: "#6a9bcc",
    words: [
      { en: "red", zh: "紅色" },
      { en: "blue", zh: "藍色" },
      { en: "yellow", zh: "黃色" },
      { en: "green", zh: "綠色" },
      { en: "black", zh: "黑色" },
      { en: "white", zh: "白色" },
      { en: "pink", zh: "粉紅色" },
      { en: "purple", zh: "紫色" },
      { en: "circle", zh: "圓形" },
      { en: "square", zh: "正方形" },
      { en: "star", zh: "星星" },
      { en: "heart", zh: "心形" },
      { en: "line", zh: "線" },
      { en: "round", zh: "圓的" }
    ]
  },
  {
    id: "food",
    name: "食物王國",
    desc: "好味嘅嘢食",
    color: "#d9663f",
    words: [
      { en: "bread", zh: "麵包" },
      { en: "cake", zh: "蛋糕" },
      { en: "candy", zh: "糖果" },
      { en: "cheese", zh: "芝士" },
      { en: "chicken", zh: "雞肉" },
      { en: "grape", zh: "葡萄" },
      { en: "juice", zh: "果汁" },
      { en: "lemon", zh: "檸檬" },
      { en: "noodle", zh: "麵" },
      { en: "peach", zh: "桃" },
      { en: "rice", zh: "飯" },
      { en: "soup", zh: "湯" },
      { en: "strawberry", zh: "士多啤梨" },
      { en: "sugar", zh: "糖" },
      { en: "tomato", zh: "番茄" },
      { en: "watermelon", zh: "西瓜" }
    ]
  },
  {
    id: "school",
    name: "校園日常",
    desc: "返學用到嘅字",
    color: "#8a76c4",
    words: [
      { en: "bag", zh: "袋 / 書包" },
      { en: "bell", zh: "鐘聲" },
      { en: "chair", zh: "椅子" },
      { en: "class", zh: "班級" },
      { en: "desk", zh: "書桌" },
      { en: "friend", zh: "朋友" },
      { en: "happy", zh: "開心" },
      { en: "letter", zh: "字母 / 信" },
      { en: "music", zh: "音樂" },
      { en: "pencil", zh: "鉛筆" },
      { en: "picture", zh: "圖畫" },
      { en: "read", zh: "閱讀" },
      { en: "ruler", zh: "尺子" },
      { en: "teacher", zh: "老師" },
      { en: "write", zh: "寫" },
      { en: "number", zh: "數字" }
    ]
  }
];

export const DECK_MAP = Object.fromEntries(DECKS.map((d) => [d.id, d]));

export function allWords() {
  const list = [];
  for (const deck of DECKS) {
    for (const w of deck.words) list.push({ ...w, deckId: deck.id });
  }
  return list;
}

export function wordKey(w) {
  return w.en.toLowerCase() + "|" + w.deckId;
}
