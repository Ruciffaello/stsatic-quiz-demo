// Interactive Quiz Engine for Love Attachment Style Diagnosis

const questions = [
  {
    id: 1,
    tag: "戀愛情境 ‧ 第 1 站",
    title: "當你的伴侶因為加班或忙碌而連續數小時沒有回覆你的訊息時，你內心的第一反應通常是？",
    options: [
      { text: "A. 理解對方在忙，安心做自己的事，等他空閒時自然會回", type: "secure" },
      { text: "B. 開始感到焦慮不安，頻繁查看手機，擔心是不是自己做錯了什麼", type: "anxious" },
      { text: "C. 覺得有點煩，自動切換至冷漠模式，暗示自己「一個人也很好」", type: "avoidant" },
      { text: "D. 既渴望對方的關心，又害怕給對方壓力，在糾結與矛盾中備受煎熬", type: "fearful" }
    ]
  },
  {
    id: 2,
    tag: "戀愛情境 ‧ 第 2 站",
    title: "當兩人在感情中發生誤會或爭執時，你傾向採取的應對方式是？",
    options: [
      { text: "A. 保持冷靜，開誠布公地表達感受，主動溝通尋求雙贏解法", type: "secure" },
      { text: "B. 迫切想要立刻講清楚，非常害怕關係因此破裂或被拋棄", type: "anxious" },
      { text: "C. 選擇退縮或拉開距離，避免正面衝突，需要獨自空間消化", type: "avoidant" },
      { text: "D. 情緒波動劇烈，一會兒想靠近求安慰，一會兒又生氣想推開對方", type: "fearful" }
    ]
  },
  {
    id: 3,
    tag: "戀愛情境 ‧ 第 3 站",
    title: "對於在伴侶面前展現自己最真實、甚至脆弱的一面，你的感受是？",
    options: [
      { text: "A. 很坦然，相信真正愛我的人會包容與珍惜我的全貌", type: "secure" },
      { text: "B. 非常渴望完全的親密，希望能與伴侶毫無保留地融合", type: "anxious" },
      { text: "C. 習慣保持安全距離，過度暴露脆弱會讓我感到失控與不安全", type: "avoidant" },
      { text: "D. 非常渴望被深度理解，但同時又極度害怕受傷與失望", type: "fearful" }
    ]
  },
  {
    id: 4,
    tag: "戀愛情境 ‧ 第 4 站",
    title: "你認為一段理想且長久的戀愛關係，最核心的要素應該是？",
    options: [
      { text: "A. 互相尊重獨立個體，同時具備雙向奔赴的信任與安全感", type: "secure" },
      { text: "B. 無時無刻的陪伴與偏愛，能隨時被需要與重視", type: "anxious" },
      { text: "C. 彼此給予足夠的個人空間，不過度依賴也不綁架對方", type: "avoidant" },
      { text: "D. 能給予極致安全感、永遠不會離開我的無條件包容", type: "fearful" }
    ]
  }
];

const attachmentData = {
  secure: {
    name: "安全溫柔型依戀",
    icon: "🌸",
    subtitle: "【 戀愛氣場：信任感MAX ‧ 溫柔陪伴者 】",
    glow: "linear-gradient(135deg, #ec4899 0%, #c084fc 100%)",
    tags: ["#情緒極度穩定", "#雙向奔赴", "#健康邊界感"],
    desc: "你在感情中擁有極佳的自我肯定與心理安全感。你既能坦然表達愛意與依賴，也能給予伴侶充分的信任與個人空間。你懂得愛人也懂得自愛，是讓人感到極度安心與療癒的理想伴侶。",
    s1: 88, s2: 92, s3: 95,
    match: "安全型 / 溫柔傾聽者",
    quote: "「好的愛情，是讓彼此都在愛裡成為更好、更自在的人。」"
  },
  anxious: {
    name: "深情焦慮型依戀",
    icon: "🔮",
    subtitle: "【 戀愛氣場：全心投入 ‧ 渴望偏愛者 】",
    glow: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    tags: ["#愛得熱烈細膩", "#極度共情", "#細節控"],
    desc: "你在愛情中投入度極高，心思細膩且充滿同理心。你總是能敏銳感知伴侶的微小變化，並願意為愛付出一字一句。學會相信自己值得被愛，給予關係更多信任，感情會更加甜蜜順遂。",
    s1: 96, s2: 75, s3: 78,
    match: "安全穩定型 / 堅定給予安全感者",
    quote: "「你熱烈而細膩的真心，值得被溫柔而堅定地偏愛。」"
  },
  avoidant: {
    name: "理性獨立型依戀",
    icon: "🌿",
    subtitle: "【 戀愛氣場：冷靜自主 ‧ 獨立靈魂者 】",
    glow: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    tags: ["#獨立自律", "#邊界感強", "#理性思考"],
    desc: "你在感情中重視個人空間與獨立性，習慣獨立消化情緒而不輕易依賴他人。你有著清醒的頭腦與強大的自我保護機制。當你遇見真正懂你防線的人，內心的溫柔將為他綻放。",
    s1: 65, s2: 98, s3: 88,
    match: "耐心成熟型 / 不強迫不綁架者",
    quote: "「適度卸下防備，允許溫柔的光照進你獨立的世界。」"
  },
  fearful: {
    name: "敏感矛盾型依戀",
    icon: "✨",
    subtitle: "【 戀愛氣場：深情謹慎 ‧ 靈魂探索者 】",
    glow: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
    tags: ["#渴望又害怕受傷", "#極致深情", "#直覺敏銳"],
    desc: "你的內心深處渴望極致的親密與陪伴，但同時又害怕被傷害或失望，因此常常在靠近與推開之間猶豫糾結。你的深情極其寶貴，只要給予時間與安全感，你將綻放最耀眼的光芒。",
    s1: 90, s2: 82, s3: 72,
    match: "包容治癒型 / 永遠堅定守候者",
    quote: "「請相信勇敢跨出那一步，你值得擁有一段安全幸福的愛。」"
  }
};

let currentQIdx = 0;
let scores = { secure: 0, anxious: 0, avoidant: 0, fearful: 0 };

// DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');

const progressFill = document.getElementById('progress-fill');
const currQSpan = document.getElementById('curr-q');
const qTag = document.getElementById('q-tag');
const qTitle = document.getElementById('q-title');
const optionsGrid = document.getElementById('options-grid');

const retestBtn = document.getElementById('retest-btn');
const saveBtn = document.getElementById('save-btn');

function initApp() {
  if (startBtn) startBtn.addEventListener('click', handleStart);
  if (retestBtn) retestBtn.addEventListener('click', handleRetest);
  if (saveBtn) saveBtn.addEventListener('click', handleSave);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function handleStart() {
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  
  currentQIdx = 0;
  scores = { secure: 0, anxious: 0, avoidant: 0, fearful: 0 };
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
    btn.addEventListener('click', () => chooseOption(opt.type));
    optionsGrid.appendChild(btn);
  });
}

function chooseOption(type) {
  scores[type] = (scores[type] || 0) + 1;
  
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
  
  let winner = 'secure';
  let max = -1;
  for (const key in scores) {
    if (scores[key] > max) {
      max = scores[key];
      winner = key;
    }
  }
  
  const b = attachmentData[winner];
  
  // Serial ID randomizer
  const randomSerial = `NO.LOVE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  document.getElementById('serial-id').textContent = randomSerial;
  
  document.getElementById('type-icon').textContent = b.icon;
  document.getElementById('type-name').textContent = b.name;
  document.getElementById('type-subtitle').textContent = b.subtitle;
  document.getElementById('type-avatar-glow').style.background = b.glow;
  
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
  
  document.getElementById('match-type').textContent = b.match;
  document.getElementById('match-quote').textContent = b.quote;
}

function handleRetest() {
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
}

function handleSave() {
  const cardBox = document.getElementById('result-card-box');
  if (window.html2canvas) {
    html2canvas(cardBox, { backgroundColor: '#180926', scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = `戀愛依戀報告卡-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  } else {
    alert('💖 戀愛依戀報告卡生成成功！請長按螢幕截圖保存，分享至小紅書解鎖今日幸運戀愛氣場！');
  }
}
