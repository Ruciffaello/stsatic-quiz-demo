// Interactive Quiz Engine for Xiaohongshu PoC Demo

const questions = [
  {
    id: 1,
    question: "在寂靜的夜晚，你走進一座神祕的花園，最吸引你注意的景緻是？",
    options: [
      { text: "A. 散發微光的月光湖泊", trait: "mint" },
      { text: "B. 盛開著金金色微光的花叢", trait: "gold" },
      { text: "C. 懸浮在半空中的古老時鐘", trait: "violet" },
      { text: "D. 靜謐悠揚的露天鋼琴", trait: "rose" }
    ]
  },
  {
    id: 2,
    question: "當你需要沉澱情緒、重新充電時，你通常偏好哪種方式？",
    options: [
      { text: "A. 獨自一人聽音樂、讀書或思考", trait: "mint" },
      { text: "B. 約三五好友聚會聊天分享歡笑", trait: "gold" },
      { text: "C. 嘗試全新的興趣或創作點子", trait: "violet" },
      { text: "D. 在溫馨的空間享受美食與追劇", trait: "rose" }
    ]
  },
  {
    id: 3,
    question: "朋友通常如何形容你的性格特色？",
    options: [
      { text: "A. 冷靜理智，總是能給出溫和又中肯的建議", trait: "mint" },
      { text: "B. 熱情真誠，像陽光般感染身邊所有人", trait: "gold" },
      { text: "C. 直覺敏銳，充滿神祕感與獨特審美", trait: "violet" },
      { text: "D. 細心體貼，溫柔包容大家的喜怒哀樂", trait: "rose" }
    ]
  },
  {
    id: 4,
    question: "面對生活中的未知挑戰時，你的第一反應是？",
    options: [
      { text: "A. 迅速條理分明地分析情勢與應對方案", trait: "mint" },
      { text: "B. 抱持樂觀自信，相信船到橋頭自然直", trait: "gold" },
      { text: "C. 順從直覺，尋求突破常規的新解法", trait: "violet" },
      { text: "D. 尋求信任夥伴的支持，共同穩步推進", trait: "rose" }
    ]
  }
];

const resultsData = {
  mint: {
    title: "淡雅薄荷綠",
    emoji: "🌿",
    bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    keywords: "#冷靜清澈 #洞察力強 #靈魂療癒者",
    desc: "你的靈魂呈現清澈的薄荷綠色。你擁有極佳的內省能力與冷靜的思維，不論外界如何喧囂，你總是能在心中保持一片寧靜的森林。你是朋友身邊最值得信賴的傾聽者與智囊。",
    t1: 90, t2: 95, t3: 82
  },
  gold: {
    title: "耀眼香檳金",
    emoji: "✨",
    bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    keywords: "#陽光自信 #感染力十足 #正能量源泉",
    desc: "你的靈魂散發著溫暖燦爛的香檳金光芒。你天生具備吸引人的魅力與正能量，總是能為周遭帶來歡笑與希望。你的存在就像是一道明亮的陽光，溫暖著每個遇到你的人。",
    t1: 75, t2: 88, t3: 95
  },
  violet: {
    title: "神祕夢幻紫",
    emoji: "🔮",
    bg: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    keywords: "#獨特審美 #直覺敏銳 #靈感充沛",
    desc: "你的靈魂包裹著深邃神祕的夢幻紫。你擁有極高的品味與非凡的直覺，常常能察覺他人忽略的細節與美感。你的世界豐富多彩，充滿無限的想像力與藝術靈感。",
    t1: 95, t2: 80, t3: 98
  },
  rose: {
    title: "溫柔玫瑰粉",
    emoji: "🌸",
    bg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    keywords: "#細膩共情 #溫柔包容 #情感豐富",
    desc: "你的靈魂帶有柔軟美好的玫瑰粉色。你擁有極強的同理心與共情能力，總是能感知他人的情感並給予無微不至的關懷。你帶給這個世界無限的柔情與溫暖。",
    t1: 82, t2: 98, t3: 85
  }
};

let currentQuestionIndex = 0;
let userScores = { mint: 0, gold: 0, violet: 0, rose: 0 };

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const unlockCodeInput = document.getElementById('unlock-code');
const codeError = document.getElementById('code-error');

const progressFill = document.getElementById('progress-fill');
const currentStepSpan = document.getElementById('current-step');
const totalStepsSpan = document.getElementById('total-steps');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  totalStepsSpan.textContent = questions.length;
  
  startBtn.addEventListener('click', handleStart);
  restartBtn.addEventListener('click', handleRestart);
  shareBtn.addEventListener('click', handleSaveResult);
});

function handleStart() {
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  
  currentQuestionIndex = 0;
  userScores = { mint: 0, gold: 0, violet: 0, rose: 0 };
  renderQuestion();
}

function renderQuestion() {
  const currentQ = questions[currentQuestionIndex];
  
  // Progress
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progressPercent}%`;
  currentStepSpan.textContent = currentQuestionIndex + 1;
  
  // Text
  questionText.textContent = currentQ.question;
  optionsContainer.innerHTML = '';
  
  currentQ.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => selectOption(opt.trait));
    optionsContainer.appendChild(btn);
  });
}

function selectOption(trait) {
  userScores[trait] = (userScores[trait] || 0) + 1;
  
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  
  // Determine top trait
  let topTrait = 'mint';
  let maxScore = -1;
  for (const trait in userScores) {
    if (userScores[trait] > maxScore) {
      maxScore = userScores[trait];
      topTrait = trait;
    }
  }
  
  const result = resultsData[topTrait];
  
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-emoji').textContent = result.emoji;
  document.getElementById('result-color-bg').style.background = result.bg;
  document.getElementById('result-keywords').textContent = result.keywords;
  document.getElementById('result-desc').textContent = result.desc;
  
  document.getElementById('trait-1').style.width = `${result.t1}%`;
  document.getElementById('trait-2').style.width = `${result.t2}%`;
  document.getElementById('trait-3').style.width = `${result.t3}%`;
}

function handleRestart() {
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
}

function handleSaveResult() {
  alert('✨ 測驗結果卡片已準備完畢！在手機瀏覽器中可長按畫面或截圖保存分享至小紅書！');
}
