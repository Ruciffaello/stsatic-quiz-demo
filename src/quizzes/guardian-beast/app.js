// Interactive Quiz Engine for Demo 2 - Guardian Beast Diagnosis

const questions = [
  {
    id: 1,
    tag: "星際地圖 ‧ 第 1 站",
    title: "當你獨自一人走進星光斑駁的古老神殿，中央懸浮著四件神器，你第一個想伸手觸碰的是？",
    options: [
      { text: "A. 刻滿神秘符文的星辰羅盤", beast: "fox" },
      { text: "B. 燃燒著金藍色不滅之火的法杖", beast: "dragon" },
      { text: "C. 散發溫柔微光的月光水晶石", beast: "dolphin" },
      { text: "D. 記載著宇宙奧秘的古老羊皮卷", beast: "owl" }
    ]
  },
  {
    id: 2,
    tag: "星際地圖 ‧ 第 2 站",
    title: "在職場或日常團隊合作中，當面對突發緊急狀況時，你習慣扮演的角色是？",
    options: [
      { text: "A. 迅速找出盲點並定出精密解法的策略大腦", beast: "fox" },
      { text: "B. 挺身而出、帶領大家突破重圍的衝鋒領袖", beast: "dragon" },
      { text: "C. 撫平大家焦慮情緒、維持隊伍和諧的暖心基石", beast: "dolphin" },
      { text: "D. 冷靜默默觀察，提供極具前瞻性見解的隱世智者", beast: "owl" }
    ]
  },
  {
    id: 3,
    tag: "星際地圖 ‧ 第 3 站",
    title: "當你獲得一天完全屬於自己的自由時光，你最渴望的充能情境是？",
    options: [
      { text: "A. 尋找有質感的特色咖啡廳，專注享受美感與靈感流動", beast: "fox" },
      { text: "B. 挑戰戶外運動或新鮮事物，讓全身熱血沸騰", beast: "dragon" },
      { text: "C. 陪伴家人或寵物，感受溫馨輕鬆的歲月靜好", beast: "dolphin" },
      { text: "D. 宅在家中深度看書、研究有興趣的領域知識", beast: "owl" }
    ]
  },
  {
    id: 4,
    tag: "星際地圖 ‧ 第 4 站",
    title: "你認為自己靈魂中最不可被替代的魅力亮點是？",
    options: [
      { text: "A. 獨特的審美品味與超凡的直覺洞察", beast: "fox" },
      { text: "B. 無所畏懼的勇氣與一往無前的執行力", beast: "dragon" },
      { text: "C. 極致的溫柔包容力與令人放鬆的共情天賦", beast: "dolphin" },
      { text: "D. 通透理智的清醒頭腦與深刻的思想底蘊", beast: "owl" }
    ]
  }
];

const beastsData = {
  fox: {
    name: "觀星九尾狐",
    icon: "🦊",
    aura: "【 氣場類型：神秘星辰 ‧ 高階洞察者 】",
    glow: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    tags: ["#獨特審美", "#高維洞察", "#品味非凡"],
    desc: "你的靈魂深處住著一隻優雅的觀星靈狐。你擁有超凡的直覺與美感品味，不喜隨波逐流。在複雜的人事物中，你總能一眼看透問題本質，保持清醒與獨特魅力。",
    s1: 96, s2: 92, s3: 88,
    color: "暗夜紫羅蘭 / 玫瑰星雲粉",
    quote: "「信任你的第一直覺，答案早已在你的心靈深處。」"
  },
  dragon: {
    name: "雲霄極光龍",
    icon: "🐉",
    aura: "【 氣場類型：熾熱陽光 ‧ 無畏領航者 】",
    glow: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    tags: ["#霸氣氣場", "#極致執行", "#王者風範"],
    desc: "你的守護靈獸是翱翔於雲霄的極光神龍！你身上散發著強大的氣場與自信光芒，面對挑戰從不退縮。你的勇氣與魄力常常能感染周遭的人，成為隊伍的核心精神支柱。",
    s1: 85, s2: 95, s3: 98,
    color: "帝王烈焰金 / 極光藍",
    quote: "「勇者無畏，你所渴望的未來正被你的果斷所創造。」"
  },
  dolphin: {
    name: "深海療癒海豚",
    icon: "🐬",
    aura: "【 氣場類型：溫柔海洋 ‧ 靈魂撫慰者 】",
    glow: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    tags: ["#共情力MAX", "#療癒能量", "#溫柔堅韌"],
    desc: "你的靈魂呈現深海海豚般的溫柔與自由。你擁有極強的同理心與療癒能量，身邊的人跟你相處時總能感到放鬆與安心。你用溫柔包容世界，世界也終將溫柔回饋於你。",
    s1: 90, s2: 86, s3: 92,
    color: "薄荷冰川藍 / 珍珠白",
    quote: "「溫柔是你最強大的武器，請繼續勇敢地去愛與被愛。」"
  },
  owl: {
    name: "智慧深空貓頭鷹",
    icon: "🦉",
    aura: "【 氣場類型：理智星空 ‧ 隱世思想家 】",
    glow: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    tags: ["#邏輯嚴密", "#冷靜自律", "#博學深邃"],
    desc: "你的守護靈獸是棲息於智慧樹頂的貓頭鷹。你擁有極強的邏輯思考與學習能力，不輕易被情緒左右。你習慣用廣闊的視角俯瞰世界，是你圈子裡最權威的理智智囊。",
    s1: 98, s2: 88, s3: 90,
    color: "深空翡翠綠 / 智慧墨藍",
    quote: "「靜水流深，你的沉穩與積澱將帶你抵達星辰大海。」"
  }
};

let currentQIdx = 0;
let scores = { fox: 0, dragon: 0, dolphin: 0, owl: 0 };

// DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const passcodeInput = document.getElementById('passcode');
const passError = document.getElementById('pass-error');

const progressFill = document.getElementById('progress-fill');
const currQSpan = document.getElementById('curr-q');
const qTag = document.getElementById('q-tag');
const qTitle = document.getElementById('q-title');
const optionsGrid = document.getElementById('options-grid');

const retestBtn = document.getElementById('retest-btn');
const saveBtn = document.getElementById('save-btn');

document.addEventListener('DOMContentLoaded', () => {
  startBtn.addEventListener('click', handleStart);
  retestBtn.addEventListener('click', handleRetest);
  saveBtn.addEventListener('click', handleSave);
});

function handleStart() {
  const code = passcodeInput.value.trim();
  if (!code) {
    passError.textContent = "請輸入卡密解鎖！";
    return;
  }
  
  passError.textContent = "";
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  
  currentQIdx = 0;
  scores = { fox: 0, dragon: 0, dolphin: 0, owl: 0 };
  renderQ();
}

function renderQ() {
  const q = questions[currentQIdx];
  const pct = ((currentQIdx + 1) / questions.length) * 100;
  progressFill.style.width = `${pct}%`;
  currQSpan.textContent = currentQIdx + 1;
  
  qTag.textContent = q.tag;
  qTitle.textContent = q.title;
  optionsGrid.innerHTML = '';
  
  q.options.forEach(opt => {
    const btn = document.createElement('div');
    btn.className = 'opt-card';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => chooseOption(opt.beast));
    optionsGrid.appendChild(btn);
  });
}

function chooseOption(beast) {
  scores[beast] = (scores[beast] || 0) + 1;
  
  if (currentQIdx < questions.length - 1) {
    currentQIdx++;
    renderQ();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  
  let winner = 'fox';
  let max = -1;
  for (const key in scores) {
    if (scores[key] > max) {
      max = scores[key];
      winner = key;
    }
  }
  
  const b = beastsData[winner];
  
  // Serial ID randomizer
  const randomSerial = `NO.2026-${Math.floor(1000 + Math.random() * 9000)}`;
  document.getElementById('serial-id').textContent = randomSerial;
  
  document.getElementById('beast-icon').textContent = b.icon;
  document.getElementById('beast-name').textContent = b.name;
  document.getElementById('aura-type').textContent = b.aura;
  document.getElementById('aura-glow').style.background = b.glow;
  
  // Tags
  const tagsRow = document.getElementById('tags-row');
  tagsRow.innerHTML = b.tags.map(t => `<span class="tag">${t}</span>`).join('');
  
  document.getElementById('analysis-text').textContent = b.desc;
  
  document.getElementById('stat-1').style.width = `${b.s1}%`;
  document.getElementById('stat-num-1').textContent = b.s1;
  
  document.getElementById('stat-2').style.width = `${b.s2}%`;
  document.getElementById('stat-num-2').textContent = b.s2;
  
  document.getElementById('stat-3').style.width = `${b.s3}%`;
  document.getElementById('stat-num-3').textContent = b.s3;
  
  document.getElementById('lucky-color').textContent = b.color;
  document.getElementById('lucky-quote').textContent = b.quote;
}

function handleRetest() {
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
}

function handleSave() {
  alert('✨ 神獸報告卡生成成功！請長按螢幕截圖保存，分享至小紅書解鎖今日幸運氣場！');
}
