// 單字庫 — 學習路線 (decks)，按 group 分類
// 每個 word: { en: 英文, zh: 中文, pic: 插圖(emoji), ipa: 音標 }

export const GROUPS = [
  "B5 課本 · 單元",
  "B5 課本 · 主題",
  "Phonics 字母",
  "生活字庫"
];

export const DECKS = [
  /* ===== B5 課本 · 單元 ===== */
  {
    id: "school-b5",
    group: "B5 課本 · 單元",
    name: "默書清單",
    desc: "Spelling Check List · Unit 1–5",
    color: "#3f8f7a",
    words: [
      { en: "fireman", zh: "消防員", pic: "🧑‍🚒", ipa: "/ˈfaɪr.mən/" },
      { en: "doctor", zh: "醫生", pic: "🧑‍⚕️", ipa: "/ˈdɑːk.tɚ/" },
      { en: "nurse", zh: "護士", pic: "👩‍⚕️", ipa: "/nɝːs/" },
      { en: "bowl", zh: "碗", pic: "🥣", ipa: "/boʊl/" },
      { en: "spoon", zh: "匙羹", pic: "🥄", ipa: "/spuːn/" },
      { en: "noodles", zh: "麵條", pic: "🍜", ipa: "/ˈnuː.dəlz/" },
      { en: "dance", zh: "跳舞", pic: "💃", ipa: "/dæns/" },
      { en: "jump", zh: "跳", pic: "🤸", ipa: "/dʒʌmp/" },
      { en: "run", zh: "跑", pic: "🏃", ipa: "/rʌn/" },
      { en: "swim", zh: "游泳", pic: "🏊", ipa: "/swɪm/" },
      { en: "monkey", zh: "猴子", pic: "🐒", ipa: "/ˈmʌŋ.ki/" },
      { en: "zebra", zh: "斑馬", pic: "🦓", ipa: "/ˈziː.brə/" },
      { en: "lion", zh: "獅子", pic: "🦁", ipa: "/ˈlaɪ.ən/" },
      { en: "library", zh: "圖書館", pic: "📚", ipa: "/ˈlaɪ.brer.i/" },
      { en: "park", zh: "公園", pic: "🏞️", ipa: "/pɑːrk/" },
      { en: "school", zh: "學校", pic: "🏫", ipa: "/skuːl/" },
      { en: "sushi", zh: "壽司", pic: "🍣", ipa: "/ˈsuː.ʃi/" },
      { en: "pizza", zh: "薄餅", pic: "🍕", ipa: "/ˈpiːt.sə/" },
      { en: "fork", zh: "叉", pic: "🍴", ipa: "/fɔːrk/" },
      { en: "knife", zh: "刀", pic: "🔪", ipa: "/naɪf/" }
    ]
  },
  {
    id: "b5-u1",
    group: "B5 課本 · 單元",
    name: "Unit 1 · 文具",
    desc: "School Stationery",
    color: "#c98a3f",
    words: [
      { en: "eraser", zh: "擦膠", pic: "🧽", ipa: "/ɪˈreɪ.sɚ/" },
      { en: "pencil", zh: "鉛筆", pic: "✏️", ipa: "/ˈpen.səl/" },
      { en: "crayons", zh: "蠟筆", pic: "🖍️", ipa: "/ˈkreɪ.ɑːnz/" },
      { en: "ruler", zh: "尺子", pic: "📏", ipa: "/ˈruː.lɚ/" }
    ]
  },
  {
    id: "b5-u2",
    group: "B5 課本 · 單元",
    name: "Unit 2 · 天氣",
    desc: "Weather",
    color: "#c98a3f",
    words: [
      { en: "dry", zh: "乾的", pic: "🏜️", ipa: "/draɪ/" },
      { en: "wet", zh: "濕的", pic: "💦", ipa: "/wet/" },
      { en: "sky", zh: "天空", pic: "🌤️", ipa: "/skaɪ/" }
    ]
  },
  {
    id: "b5-u3",
    group: "B5 課本 · 單元",
    name: "Unit 3 · 電子用品",
    desc: "Electronics",
    color: "#c98a3f",
    words: [
      { en: "computer", zh: "電腦", pic: "💻", ipa: "/kəmˈpjuː.t̬ɚ/" },
      { en: "mobile", zh: "手提電話", pic: "📱", ipa: "/ˈmoʊ.bəl/" },
      { en: "clock", zh: "時鐘", pic: "🕐", ipa: "/klɑːk/" }
    ]
  },
  {
    id: "b5-u4",
    group: "B5 課本 · 單元",
    name: "Unit 4 · 天氣",
    desc: "Weather",
    color: "#c98a3f",
    words: [
      { en: "cloudy", zh: "多雲", pic: "☁️", ipa: "/ˈklaʊ.di/" },
      { en: "windy", zh: "大風", pic: "🌬️", ipa: "/ˈwɪn.di/" },
      { en: "rainy", zh: "下雨", pic: "🌧️", ipa: "/ˈreɪ.ni/" },
      { en: "sunny", zh: "晴天", pic: "🌞", ipa: "/ˈsʌn.i/" }
    ]
  },
  {
    id: "b5-u5",
    group: "B5 課本 · 單元",
    name: "Unit 5 · 地方與學校",
    desc: "Places & School",
    color: "#c98a3f",
    words: [
      { en: "toilet", zh: "洗手間", pic: "🚻", ipa: "/ˈtɔɪ.lɪt/" },
      { en: "shop", zh: "商店", pic: "🏪", ipa: "/ʃɑːp/" },
      { en: "uniform", zh: "校服", pic: "👔", ipa: "/ˈjuː.nə.fɔːrm/" },
      { en: "class", zh: "班房", pic: "🧑‍🎓", ipa: "/klæs/" }
    ]
  },

  /* ===== B5 課本 · 主題 ===== */
  {
    id: "b5-animals",
    group: "B5 課本 · 主題",
    name: "動物 Amazing Animals",
    desc: "Unit 4 Amazing Animals",
    color: "#3f8f7a",
    words: [
      { en: "crocodile", zh: "鱷魚", pic: "🐊", ipa: "/ˈkrɑː.kə.daɪl/" },
      { en: "giraffe", zh: "長頸鹿", pic: "🦒", ipa: "/dʒəˈræf/" },
      { en: "monkey", zh: "猴子", pic: "🐒", ipa: "/ˈmʌŋ.ki/" },
      { en: "zebra", zh: "斑馬", pic: "🦓", ipa: "/ˈziː.brə/" },
      { en: "elephant", zh: "大象", pic: "🐘", ipa: "/ˈel.ə.fənt/" },
      { en: "lion", zh: "獅子", pic: "🦁", ipa: "/ˈlaɪ.ən/" }
    ]
  },
  {
    id: "b5-town",
    group: "B5 課本 · 主題",
    name: "城鎮 Going into Town",
    desc: "Unit 5 Going into Town",
    color: "#6a9bcc",
    words: [
      { en: "hospital", zh: "醫院", pic: "🏥", ipa: "/ˈhɑː.spɪ.t̬əl/" },
      { en: "library", zh: "圖書館", pic: "📚", ipa: "/ˈlaɪ.brer.i/" },
      { en: "park", zh: "公園", pic: "🏞️", ipa: "/pɑːrk/" },
      { en: "restaurant", zh: "餐廳", pic: "🍽️", ipa: "/ˈres.tə.rɑːnt/" },
      { en: "school", zh: "學校", pic: "🏫", ipa: "/skuːl/" },
      { en: "supermarket", zh: "超級市場", pic: "🛒", ipa: "/ˈsuː.pɚ.mɑːr.kɪt/" }
    ]
  },
  {
    id: "b5-food",
    group: "B5 課本 · 主題",
    name: "美食 Food around the World",
    desc: "It's a Fun World",
    color: "#d9663f",
    words: [
      { en: "curry", zh: "咖喱", pic: "🍛", ipa: "/ˈkɝː.i/" },
      { en: "sushi", zh: "壽司", pic: "🍣", ipa: "/ˈsuː.ʃi/" },
      { en: "hamburger", zh: "漢堡", pic: "🍔", ipa: "/ˈhæm.bɝː.ɡɚ/" },
      { en: "pizza", zh: "薄餅", pic: "🍕", ipa: "/ˈpiːt.sə/" },
      { en: "taco", zh: "墨西哥卷", pic: "🌮", ipa: "/ˈtɑː.koʊ/" },
      { en: "fish and chips", zh: "炸魚薯條", pic: "🐟🍟", ipa: "/ˌfɪʃ ən ˈtʃɪps/" },
      { en: "fork", zh: "叉", pic: "🍴", ipa: "/fɔːrk/" },
      { en: "knife", zh: "刀", pic: "🔪", ipa: "/naɪf/" },
      { en: "spoon", zh: "匙羹", pic: "🥄", ipa: "/spuːn/" },
      { en: "chopsticks", zh: "筷子", pic: "🥢", ipa: "/ˈtʃɑːp.stɪks/" }
    ]
  },
  {
    id: "b5-places",
    group: "B5 課本 · 主題",
    name: "地方 Macao & China",
    desc: "It's a Fun World",
    color: "#6a9bcc",
    words: [
      { en: "Macao", zh: "澳門", pic: "🇲🇴", ipa: "/məˈkaʊ/" },
      { en: "China", zh: "中國", pic: "🇨🇳", ipa: "/ˈtʃaɪ.nə/" },
      { en: "flag", zh: "旗", pic: "🚩", ipa: "/flæɡ/" },
      { en: "map", zh: "地圖", pic: "🗺️", ipa: "/mæp/" }
    ]
  },

  /* ===== Phonics 字母 ===== */
  {
    id: "phonics",
    group: "Phonics 字母",
    name: "字母 D / J / Z / L",
    desc: "Phonics — D d · J j · Z z · L l",
    color: "#5b7fc7",
    words: [
      { en: "doctor", zh: "醫生", pic: "🧑‍⚕️", ipa: "/ˈdɑːk.tɚ/" },
      { en: "duck", zh: "鴨", pic: "🦆", ipa: "/dʌk/" },
      { en: "doll", zh: "公仔", pic: "🪆", ipa: "/dɑːl/" },
      { en: "door", zh: "門", pic: "🚪", ipa: "/dɔːr/" },
      { en: "jellyfish", zh: "水母", pic: "🪼", ipa: "/ˈdʒel.i.fɪʃ/" },
      { en: "jacket", zh: "外套", pic: "🧥", ipa: "/ˈdʒæk.ɪt/" },
      { en: "joker", zh: "小丑", pic: "🃏", ipa: "/ˈdʒoʊ.kɚ/" },
      { en: "jelly", zh: "啫喱", pic: "🍮", ipa: "/ˈdʒel.i/" },
      { en: "zero", zh: "零", pic: "0️⃣", ipa: "/ˈzɪr.oʊ/" },
      { en: "zip", zh: "拉鏈", pic: "🤐", ipa: "/zɪp/" },
      { en: "zigzag", zh: "之字形", pic: "〰️", ipa: "/ˈzɪɡ.zæɡ/" },
      { en: "zebra", zh: "斑馬", pic: "🦓", ipa: "/ˈziː.brə/" },
      { en: "lemon", zh: "檸檬", pic: "🍋", ipa: "/ˈlem.ən/" },
      { en: "leaf", zh: "葉", pic: "🍃", ipa: "/liːf/" },
      { en: "lamp", zh: "燈", pic: "💡", ipa: "/læmp/" },
      { en: "lip", zh: "嘴唇", pic: "👄", ipa: "/lɪp/" }
    ]
  },

  /* ===== 生活字庫 ===== */
  {
    id: "starter",
    group: "生活字庫",
    name: "基礎入門",
    desc: "最常用的第一批單字",
    color: "#5f9e63",
    words: [
      { en: "apple", zh: "蘋果", pic: "🍎", ipa: "/ˈæp.əl/" },
      { en: "book", zh: "書", pic: "📖", ipa: "/bʊk/" },
      { en: "cat", zh: "貓", pic: "🐱", ipa: "/kæt/" },
      { en: "dog", zh: "狗", pic: "🐶", ipa: "/dɔːɡ/" },
      { en: "egg", zh: "蛋", pic: "🥚", ipa: "/eɡ/" },
      { en: "fish", zh: "魚", pic: "🐟", ipa: "/fɪʃ/" },
      { en: "girl", zh: "女孩", pic: "👧", ipa: "/ɡɝːl/" },
      { en: "hand", zh: "手", pic: "✋", ipa: "/hænd/" },
      { en: "ice", zh: "冰", pic: "🧊", ipa: "/aɪs/" },
      { en: "kite", zh: "風箏", pic: "🪁", ipa: "/kaɪt/" },
      { en: "milk", zh: "牛奶", pic: "🥛", ipa: "/mɪlk/" },
      { en: "nose", zh: "鼻子", pic: "👃", ipa: "/noʊz/" },
      { en: "orange", zh: "橙", pic: "🍊", ipa: "/ˈɔːr.ɪndʒ/" },
      { en: "pen", zh: "筆", pic: "🖊️", ipa: "/pen/" },
      { en: "rain", zh: "雨", pic: "🌧️", ipa: "/reɪn/" },
      { en: "sun", zh: "太陽", pic: "☀️", ipa: "/sʌn/" },
      { en: "tree", zh: "樹", pic: "🌳", ipa: "/triː/" },
      { en: "water", zh: "水", pic: "💧", ipa: "/ˈwɔː.tɚ/" },
      { en: "star", zh: "星星", pic: "⭐", ipa: "/stɑːr/" }
    ]
  },
  {
    id: "animals",
    group: "生活字庫",
    name: "動物樂園",
    desc: "天上飛、水裡游、地上走",
    color: "#e08a4e",
    words: [
      { en: "bear", zh: "熊", pic: "🐻", ipa: "/ber/" },
      { en: "bird", zh: "鳥", pic: "🐦", ipa: "/bɝːd/" },
      { en: "frog", zh: "青蛙", pic: "🐸", ipa: "/frɔːɡ/" },
      { en: "horse", zh: "馬", pic: "🐴", ipa: "/hɔːrs/" },
      { en: "panda", zh: "熊貓", pic: "🐼", ipa: "/ˈpæn.də/" },
      { en: "pig", zh: "豬", pic: "🐷", ipa: "/pɪɡ/" },
      { en: "rabbit", zh: "兔子", pic: "🐰", ipa: "/ˈræb.ɪt/" },
      { en: "sheep", zh: "綿羊", pic: "🐑", ipa: "/ʃiːp/" },
      { en: "snake", zh: "蛇", pic: "🐍", ipa: "/sneɪk/" },
      { en: "tiger", zh: "老虎", pic: "🐯", ipa: "/ˈtaɪ.ɡɚ/" },
      { en: "turtle", zh: "烏龜", pic: "🐢", ipa: "/ˈtɝː.t̬əl/" },
      { en: "whale", zh: "鯨魚", pic: "🐳", ipa: "/weɪl/" },
      { en: "bee", zh: "蜜蜂", pic: "🐝", ipa: "/biː/" }
    ]
  },
  {
    id: "colors",
    group: "生活字庫",
    name: "顏色與形狀",
    desc: "繽紛嘅世界",
    color: "#6a9bcc",
    words: [
      { en: "red", zh: "紅色", pic: "🟥", ipa: "/red/" },
      { en: "blue", zh: "藍色", pic: "🟦", ipa: "/bluː/" },
      { en: "yellow", zh: "黃色", pic: "🟨", ipa: "/ˈjel.oʊ/" },
      { en: "green", zh: "綠色", pic: "🟩", ipa: "/ɡriːn/" },
      { en: "black", zh: "黑色", pic: "⬛", ipa: "/blæk/" },
      { en: "white", zh: "白色", pic: "⬜", ipa: "/waɪt/" },
      { en: "pink", zh: "粉紅色", pic: "🩷", ipa: "/pɪŋk/" },
      { en: "purple", zh: "紫色", pic: "🟪", ipa: "/ˈpɝː.pəl/" },
      { en: "circle", zh: "圓形", pic: "⭕", ipa: "/ˈsɝː.kəl/" },
      { en: "square", zh: "正方形", pic: "🔲", ipa: "/skwer/" },
      { en: "heart", zh: "心形", pic: "❤️", ipa: "/hɑːrt/" },
      { en: "line", zh: "線", pic: "➖", ipa: "/laɪn/" }
    ]
  },
  {
    id: "food",
    group: "生活字庫",
    name: "食物王國",
    desc: "好味嘅嘢食",
    color: "#d9663f",
    words: [
      { en: "bread", zh: "麵包", pic: "🍞", ipa: "/bred/" },
      { en: "cake", zh: "蛋糕", pic: "🍰", ipa: "/keɪk/" },
      { en: "candy", zh: "糖果", pic: "🍭", ipa: "/ˈkæn.di/" },
      { en: "cheese", zh: "芝士", pic: "🧀", ipa: "/tʃiːz/" },
      { en: "chicken", zh: "雞肉", pic: "🍗", ipa: "/ˈtʃɪk.ɪn/" },
      { en: "grape", zh: "葡萄", pic: "🍇", ipa: "/ɡreɪp/" },
      { en: "juice", zh: "果汁", pic: "🧃", ipa: "/dʒuːs/" },
      { en: "peach", zh: "桃", pic: "🍑", ipa: "/piːtʃ/" },
      { en: "rice", zh: "飯", pic: "🍚", ipa: "/raɪs/" },
      { en: "soup", zh: "湯", pic: "🍲", ipa: "/suːp/" },
      { en: "strawberry", zh: "士多啤梨", pic: "🍓", ipa: "/ˈstrɔː.ber.i/" },
      { en: "tomato", zh: "番茄", pic: "🍅", ipa: "/təˈmeɪ.toʊ/" },
      { en: "watermelon", zh: "西瓜", pic: "🍉", ipa: "/ˈwɔː.tɚ.mel.ən/" }
    ]
  },
  {
    id: "school",
    group: "生活字庫",
    name: "校園日常",
    desc: "返學用到嘅字",
    color: "#8a76c4",
    words: [
      { en: "bag", zh: "袋 / 書包", pic: "🎒", ipa: "/bæɡ/" },
      { en: "bell", zh: "鐘聲", pic: "🔔", ipa: "/bel/" },
      { en: "chair", zh: "椅子", pic: "🪑", ipa: "/tʃer/" },
      { en: "desk", zh: "書桌", pic: "🗒️", ipa: "/desk/" },
      { en: "friend", zh: "朋友", pic: "🧑‍🤝‍🧑", ipa: "/frend/" },
      { en: "happy", zh: "開心", pic: "😄", ipa: "/ˈhæp.i/" },
      { en: "letter", zh: "字母 / 信", pic: "✉️", ipa: "/ˈlet̬.ɚ/" },
      { en: "music", zh: "音樂", pic: "🎵", ipa: "/ˈmjuː.zɪk/" },
      { en: "picture", zh: "圖畫", pic: "🖼️", ipa: "/ˈpɪk.tʃɚ/" },
      { en: "read", zh: "閱讀", pic: "📖", ipa: "/riːd/" },
      { en: "teacher", zh: "老師", pic: "👩‍🏫", ipa: "/ˈtiː.tʃɚ/" },
      { en: "write", zh: "寫", pic: "✍️", ipa: "/raɪt/" },
      { en: "number", zh: "數字", pic: "🔢", ipa: "/ˈnʌm.bɚ/" }
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
