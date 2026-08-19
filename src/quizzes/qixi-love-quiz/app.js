/**
 * 💘 七夕親密關係實證診斷：你是哪一種戀愛依附型？ (ECR-S 12題專業版)
 * 
 * 基於 ECR-S (Experiences in Close Relationships - Short Form) 雙維度模型：
 * - 依附焦慮 (Attachment Anxiety): 6 題 (Q1, Q3, Q5, Q7, Q9, Q11)
 * - 依附逃避 (Attachment Avoidance): 6 題 (Q2, Q4, Q6, Q8, Q10, Q12)
 * - 映射輸出：8 大深度戀愛人格亞型 + 連續座標百分比 + 5 維親密雷達
 */

(function () {
  'use strict';

  // ==========================================
  // 1. 12 題 ECR-S 題庫資料 (選項已隨機化打亂，避免順序效應)
  // ==========================================
  const QUESTIONS = [
    // --- 焦慮題項 1 (Q1) ---
    {
      id: 1,
      facet: 'anxiety',
      facetName: '面向：依附焦慮檢測',
      category: 'Q1. 節日期待與情感投入',
      title: '七夕這類浪漫節日來臨時，你是否常常在心底擔心「自己對這段感情的在乎與投入，遠遠多於對方」？',
      options: [
        { text: '經常會閃過這個念頭，特別是看到對方反應不如預期熱烈時，心裡會有些失落。', score: 3 },
        { text: '完全不會，我相信彼此的情感交流是自然且平衡的。', score: 1 },
        { text: '總是如此，這種「我不被同樣在乎」的隱憂常讓我陷入不安與猜測。', score: 4 },
        { text: '偶爾會冒出這個想法，但通常很快能自我梳理並回歸平靜。', score: 2 }
      ]
    },

    // --- 逃避題項 1 (Q2) ---
    {
      id: 2,
      facet: 'avoidance',
      facetName: '面向：依附逃避檢測',
      category: 'Q2. 低潮時的求助傾向',
      title: '當你遭遇低潮、挫折或情緒脆弱時，你的第一反應是主動向伴侶傾訴求助，還是自己默默消化？',
      options: [
        { text: '先給自己一點時間整理思緒，之後願意和伴侶分享並尋求安慰。', score: 2 },
        { text: '習慣自己全盤扛下，向他人袒露脆弱常讓我感到失控與不自在。', score: 4 },
        { text: '第一時間向伴侶傾訴，對方的陪伴與傾聽能給我莫大的力量。', score: 1 },
        { text: '傾向先躲進自己的世界消化，不太習慣讓伴侶看見自己疲憊狼狽的樣子。', score: 3 }
      ]
    },

    // --- 焦慮題項 2 (Q3) ---
    {
      id: 3,
      facet: 'anxiety',
      facetName: '面向：依附焦慮檢測',
      category: 'Q3. 過度親密的恐慌',
      title: '當你全心全意投入愛一個人、渴望隨時分享生活時，是否會害怕「自己太熱情反而會把對方嚇跑」？',
      options: [
        { text: '非常強烈，我常覺得自己對愛的渴望太過熾熱，擔心會給對方造成沉重負擔。', score: 4 },
        { text: '偶爾會提醒自己稍微調節一下相處節奏。', score: 2 },
        { text: '從不擔心，我能自在流暢地表達熱情，並享受舒服的相處留白。', score: 1 },
        { text: '滿常有這種顧慮，常常打好一長串心裡話又猶豫著刪掉。', score: 3 }
      ]
    },

    // --- 逃避題項 2 (Q4) ---
    {
      id: 4,
      facet: 'avoidance',
      facetName: '面向：依附逃避檢測',
      category: 'Q4. 避免過度親密的本能',
      title: '當兩人的關係進展得極快、對方開始把生活重心都放在你身上時，你是否會本能地想後退或拉開距離？',
      options: [
        { text: '不會，我很享受水到渠成的深度親近與彼此融入。', score: 1 },
        { text: '會感到明顯的壓迫感，會下意識找各種理由保留更多個人空間。', score: 3 },
        { text: '本能地想後退，一旦有人靠得太近，我的心理防衛機制就會立刻啟動。', score: 4 },
        { text: '若節奏太快會希望稍微放慢步調，但不會刻意排斥親近。', score: 2 }
      ]
    },

    // --- 焦慮題項 3 (Q5) ---
    {
      id: 5,
      facet: 'anxiety',
      facetName: '面向：依附焦慮檢測',
      category: 'Q5. 對確認與保證的渴望',
      title: '在親密相處中，你是否極度需要對方反覆透過言語、舉動或儀式感來向你保證「他依然深愛著你」？',
      options: [
        { text: '滿需要的，若對方有一陣子沒有明確表達愛意，我內心容易開始發慌。', score: 3 },
        { text: '不需要，平時相處的踏實與默契就足以讓我感到安定。', score: 1 },
        { text: '適時的甜言蜜語會讓感情更加溫，但就算沒有也不會懷疑彼此。', score: 2 },
        { text: '極度渴望，我需要持續不斷的「定心丸」才能確信自己在對方心中無可取代。', score: 4 }
      ]
    },

    // --- 逃避題項 3 (Q6) ---
    {
      id: 6,
      facet: 'avoidance',
      facetName: '面向：依附逃避檢測',
      category: 'Q6. 內心煩惱的坦誠討論',
      title: '在面對人生重大決定或內心糾結的煩惱時，你是否能毫無保留地與伴侶深入探討？',
      options: [
        { text: '只會分享一部分，不太習慣把所有猶豫和底牌毫無保留地攤開。', score: 3 },
        { text: '完全可以，伴侶是我最信任的靈魂夥伴與深度商量對象。', score: 1 },
        { text: '極少討論，我深信重大問題終究要靠自己面對，過多討論容易帶來負擔。', score: 4 },
        { text: '大多數事情都會聊，但少數極個人的隱私還是習慣由自己做決定。', score: 2 }
      ]
    },

    // --- 焦慮題項 4 (Q7) ---
    {
      id: 7,
      facet: 'anxiety',
      facetName: '面向：依附焦慮檢測',
      category: 'Q7. 被拋棄與忽視的恐懼',
      title: '當伴侶因為工作忙碌或需要獨處而暫時減少互動時，你能否保持平靜而不胡思亂想「他是不是變心了」？',
      options: [
        { text: '大多數時候可以，只要彼此有基本的默契或簡單知會就好。', score: 2 },
        { text: '極難平靜，即使理智知道對方在忙，情感上依然會湧上強烈的被拋棄感。', score: 4 },
        { text: '完全可以，每個人都需要自己的專注節奏，這與感情好壞無關。', score: 1 },
        { text: '容易感到焦慮，腦海會忍不住反覆猜想是不是自己哪裡做錯了。', score: 3 }
      ]
    },

    // --- 逃避題項 4 (Q8) ---
    {
      id: 8,
      facet: 'avoidance',
      facetName: '面向：依附逃避檢測',
      category: 'Q8. 對依賴伴侶的信念',
      title: '你如何看待「在生活或情感上高度依賴另一半」這件事？',
      options: [
        { text: '極度排斥依賴，對我而言，依賴他人是一件冒險且隨時可能受傷的事。', score: 4 },
        { text: '相互依賴是親密的自然體現，健康的互賴讓彼此都更有力量。', score: 1 },
        { text: '盡量減少依賴，因為「依賴他人往往意味著失去個人的自主掌控」。', score: 3 },
        { text: '可以適度依賴，但彼此依然需要保持獨立生活與思考的能力。', score: 2 }
      ]
    },

    // --- 焦慮題項 5 (Q9) ---
    {
      id: 9,
      facet: 'anxiety',
      facetName: '面向：依附焦慮檢測',
      category: 'Q9. 親密期待的落差感',
      title: '在戀愛中，你是否常覺得「對方總是無法達到你心中所期待的親密深度與黏稠度」？',
      options: [
        { text: '不會，我們彼此的親密感與互動距離非常舒服自在。', score: 1 },
        { text: '總覺得彼此隔了一層膜，我渴望完全融入對方生命，但他總是留有距離。', score: 4 },
        { text: '偶爾會有小落差，但坦誠溝通後都能找到彼此舒服的平衡點。', score: 2 },
        { text: '經常覺得對方稍微偏冷淡，希望他能再更主動、更靠近我一些。', score: 3 }
      ]
    },

    // --- 逃避題項 5 (Q10) ---
    {
      id: 10,
      facet: 'avoidance',
      facetName: '面向：依附逃避檢測',
      category: 'Q10. 私密情感的分享自在度',
      title: '在夜深人靜或七夕浪漫時刻，向伴侶坦誠講述自己童年陰影、恐懼或過往傷痛時，你的感受是？',
      options: [
        { text: '覺得尷尬且不自在，會下意識想用幽默或轉移話題輕輕帶過。', score: 3 },
        { text: '需要一點氣氛與時間鋪墊，只要信任夠深，願意慢慢敞開心扉。', score: 2 },
        { text: '感到極度抗拒與危險，我絕不會輕易把內心最脆弱的角落展示給任何人。', score: 4 },
        { text: '感到被接納與深度療癒，這種靈魂交融的時刻非常珍貴難得。', score: 1 }
      ]
    },

    // --- 焦慮題項 6 (Q11) ---
    {
      id: 11,
      facet: 'anxiety',
      facetName: '面向：依附焦慮檢測',
      category: 'Q11. 表達心意時的脆弱恐懼',
      title: '當你主動向伴侶表達深層愛意、或準備了七夕驚喜時，內心是否常伴隨「害怕對方反應平淡」的焦慮？',
      options: [
        { text: '極度恐懼，這種預期中的落差感常讓我感到不安與受傷，甚至不敢輕易表達。', score: 4 },
        { text: '稍微會在意對方的反饋，但就算反應平淡也不會太受打擊。', score: 2 },
        { text: '滿在意的，如果對方沒有表現出同等感動，我會瞬間後悔自己的主動。', score: 3 },
        { text: '完全坦然，我表達心意是因為我想分享愛，不預設對方的特定回應。', score: 1 }
      ]
    },

    // --- 逃避題項 6 (Q12) ---
    {
      id: 12,
      facet: 'avoidance',
      facetName: '面向：依附逃避檢測',
      category: 'Q12. 過近時的窒息與緊張感',
      title: '當伴侶對你有高度的情感期待（例如希望每晚講電話、掌握彼此所有行程）時，你內心的感受是？',
      options: [
        { text: '稍微有點緊密，但能理解對方的在乎並溫和溝通彼此的步調。', score: 2 },
        { text: '感到嚴重的侵入感與煩躁，強烈渴望關閉所有聯繫管道徹底靜一靜。', score: 4 },
        { text: '覺得這是甜蜜的在乎與重視，彼此協調好生活作息即可。', score: 1 },
        { text: '感到隱隱的束縛與窒息感，會想要找藉口透透氣、拉開距離。', score: 3 }
      ]
    }
  ];

  // ==========================================
  // 2. 8 大深度戀愛人格亞型定義
  // ==========================================
  const PERSONA_TYPES = {
    // 1. 純粹恆星型 (Secure Anchor)
    pure_anchor: {
      id: 'pure_anchor',
      icon: '🛡️',
      name: '純粹恆星型',
      quadrant: '【 安全型象限 ‧ 深度平衡者 】',
      tags: ['#情緒基石', '#親密自如', '#成熟溫暖', '#安全感提供者'],
      desc: '在親密關係中，你猶如夜空中恆久發光的恆星。你既享受兩人依偎的極致親密，也珍視彼此獨立的個人空間。你不把七夕當成考驗感情的審判日，而是當作表達感謝與愛意的溫暖契機。',
      radar: { stability: 96, openness: 92, sensitivity: 82, boundary: 90, repairability: 95 },
      matchPartner: '所有依附類型（尤其是焦慮型的定海神針、逃避型的避風港）',
      matchAdvice: '你的安全感是關係中最寶貴的財富。面對偏焦慮或偏逃避的伴侶時，保持溫和且堅定的步調即可帶領彼此走向治癒。',
      quote: '「好的愛情，是兩個獨立靈魂在星河下的自在相遇，不束縛亦不孤單。」'
    },

    // 2. 溫暖守護型 (Warm Guardian - Secure Lean Anxious)
    warm_guardian: {
      id: 'warm_guardian',
      icon: '🌸',
      name: '溫暖守護型',
      quadrant: '【 安全偏焦慮 ‧ 熾熱共情者 】',
      tags: ['#主動熱情', '#共情力MAX', '#儀式感拉滿', '#溫柔小作'],
      desc: '你擁有強大的愛人能力與細膩的感受力。七夕對你而言是充滿期待的浪漫慶典。你渴望給予伴侶極致的溫柔，偶爾會有些小撒嬌或期待被偏愛，但你具備良好的自我覺察，能及時自我安撫。',
      radar: { stability: 82, openness: 94, sensitivity: 90, boundary: 78, repairability: 92 },
      matchPartner: '純粹恆星型 / 沉穩松樹型',
      matchAdvice: '當伴侶未能第一時間感知你的浪漫心意時，試著直接說出你的渴望，而不是默默等待對方猜中。',
      quote: '「浪漫不是刻意營造的奇蹟，而是被你放在心上的每一個瞬間。」'
    },

    // 3. 沉穩松樹型 (Steady Pine - Secure Lean Avoidant)
    steady_pine: {
      id: 'steady_pine',
      icon: '🌲',
      name: '沉穩松樹型',
      quadrant: '【 安全偏逃避 ‧ 理性守護者 】',
      tags: ['#靠譜沉穩', '#邊界清晰', '#行動派愛意', '#低調陪伴'],
      desc: '你像一棵靜默挺拔的松樹，不擅長將甜言蜜語掛在嘴邊，但總在關鍵時刻給予最實際的支援。你重視彼此的邊界與平靜，七夕時更偏好低調自在的兩人時光，而非鋪張刻意的社交儀式。',
      radar: { stability: 90, openness: 72, sensitivity: 75, boundary: 94, repairability: 86 },
      matchPartner: '純粹恆星型 / 溫暖守護型',
      matchAdvice: '適度向伴侶表達你深藏的情感，哪怕只是一句「有你在身邊真好」，都能讓對方感受到踏實的溫暖。',
      quote: '「深沉的愛不需喧囂，它藏在日常每一次堅定的守候裡。」'
    },

    // 4. 熾熱潮汐型 (Blazing Tide - Pure Anxious)
    blazing_tide: {
      id: 'blazing_tide',
      icon: '🌊',
      name: '熾熱潮汐型',
      quadrant: '【 焦慮型象限 ‧ 深情沉浸者 】',
      tags: ['#渴望偏愛', '#細膩敏銳', '#全心投入', '#秒回安全感'],
      desc: '在愛裡你如潮汐般熾熱洶湧。七夕對你來說是關係的重要晴雨表，你將全部心神傾注於伴侶，微小的延遲回覆或平淡語氣都容易激起你內心的不安。你並非無理取鬧，只是太害怕失去這份愛。',
      radar: { stability: 52, openness: 88, sensitivity: 96, boundary: 48, repairability: 76 },
      matchPartner: '純粹恆星型（提供源源不絕的安全感與耐心）',
      matchAdvice: '練習把一部分注意力放回自己身上。你的價值不需要靠對方的隨時回應來證明，你本身就充滿光芒。',
      quote: '「學會在潮起潮落中安放自己，你值得一份不需要猜測的安定之愛。」'
    },

    // 5. 委屈奉獻型 (Devoted Dove - Anxious Suppressive)
    devoted_dove: {
      id: 'devoted_dove',
      icon: '🕊️',
      name: '委屈奉獻型',
      quadrant: '【 焦慮型象限 ‧ 隱忍付出者 】',
      tags: ['#討好防禦', '#害怕衝突', '#過度懂事', '#渴望被看見'],
      desc: '在感情裡你常常「太懂事了」。七夕時就算心裡有無數期待，也常常因為害怕給對方添麻煩而選擇隱忍。你習慣用不斷的付出來換取關係的穩定，內心深處卻渴望有一個人能主動看透你的委屈。',
      radar: { stability: 60, openness: 65, sensitivity: 92, boundary: 42, repairability: 82 },
      matchPartner: '溫暖守護型 / 純粹恆星型',
      matchAdvice: '敢於表達真正的需求不是任性，而是給予對方愛你的正確方式。請停止在愛裡委屈自己。',
      quote: '「真正的愛不需要你削足適履，愛你的人會擁抱你所有的真實與渴望。」'
    },

    // 6. 孤島冰川型 (Island Glacier - Pure Avoidant)
    island_glacier: {
      id: 'island_glacier',
      icon: '🧊',
      name: '孤島冰川型',
      quadrant: '【 疏離逃避型 ‧ 自主防衛者 】',
      tags: ['#絕對獨立', '#情感冷卻', '#防禦屏障', '#自我滿足'],
      desc: '你習慣將情感深埋於冰山之下。對七夕的過度熱情與親密期待常讓你感到窒息與不適。你深信「唯有靠自己才絕對安全」，因此當別人試圖走入你的靈魂深處時，你的防護罩會下意識升起。',
      radar: { stability: 78, openness: 32, sensitivity: 60, boundary: 98, repairability: 50 },
      matchPartner: '純粹恆星型 / 沉穩松樹型（不步步緊逼，給予充分空間）',
      matchAdvice: '向信任的人袒露一絲脆弱並不會讓你失去控制權，那是讓陽光照進孤島的唯一途徑。',
      quote: '「獨立是保護你的盔甲，但也別讓它成為封鎖溫暖的冰冷圍牆。」'
    },

    // 7. 獨行獵鷹型 (Solo Falcon - Avoidant Independent)
    solo_falcon: {
      id: 'solo_falcon',
      icon: '🦅',
      name: '獨行獵鷹型',
      quadrant: '【 疏離逃避型 ‧ 理性遨遊者 】',
      tags: ['#追求平靜', '#邊界清晰', '#拒絕束縛', '#自得其樂'],
      desc: '你擁有極高的人生自主力，對親密關係追求「舒服合拍、互不打擾」。七夕時你反感任何形式的情緒勒索與刻意表演。如果兩個人在一起不能比一個人更自在，你寧可選擇獨行翱翔。',
      radar: { stability: 85, openness: 45, sensitivity: 68, boundary: 92, repairability: 62 },
      matchPartner: '純粹恆星型 / 沉穩松樹型',
      matchAdvice: '在守護自己天空的同時，試著在特定時刻為另一半降落。適度的依賴能讓關係更加醇厚。',
      quote: '「最好的同行，是各自振翅高飛，又在同一片星空下默契相望。」'
    },

    // 8. 帶刺極光型 (Thorny Aurora - Fearful Avoidant)
    thorny_aurora: {
      id: 'thorny_aurora',
      icon: '✨',
      name: '帶刺極光型',
      quadrant: '【 恐懼逃避型 ‧ 矛盾拉扯者 】',
      tags: ['#極致深情', '#刺蝟防禦', '#試探又逃跑', '#靈魂渴望被懂'],
      desc: '你如同夜空中絢爛卻捉摸不定的極光。你的內心無比渴望一份純粹深刻的愛，但當對方真正靠近時，受傷的恐懼又會促使你本能地後退或豎起尖刺。你在「靠近與推開」的拉扯中常常自我內耗。',
      radar: { stability: 48, openness: 58, sensitivity: 98, boundary: 62, repairability: 60 },
      matchPartner: '純粹恆星型（擁有極致的包容力與堅定不移的愛）',
      matchAdvice: '承認自己的恐懼與渴望，不必逼自己立刻完美。建立小步慢跑的信任階梯，給愛一點時間。',
      quote: '「刺蝟的擁抱需要莫大的勇氣，願有一份溫柔能撫平你所有的防備與傷痛。」'
    }
  };

  // ==========================================
  // 3. 狀態變數
  // ==========================================
  let currentQuestionIndex = 0;
  let userAnswers = []; // 存儲每題分數

  // ==========================================
  // 2.5 進度條下方浪漫大師語錄 (三行結構：倒數提示 ➔ 中文名言與原文 ➔ 作者出處)
  // ==========================================
  const PROGRESS_QUOTES = [
    // 一、 破冰與探索自我 (Q1~Q3)
    {
      countdown: '',
      cn: '「在愛的觸碰下，每個人都會成為詩人。」',
      original: 'At the touch of love everyone becomes a poet.',
      author: '—— 柏拉圖（Plato）'
    },
    {
      countdown: '',
      cn: '「墜入愛河這件事，可不能怪萬有引力。」',
      original: 'Gravitation is not responsible for people falling in love.',
      author: '—— 阿爾伯特·愛因斯坦（Albert Einstein）'
    },
    {
      countdown: '',
      cn: '「我所理解的一切，都是因為我愛，我才得以理解。」',
      original: 'All that I understand, I understand only because I love.',
      author: '—— 列夫·托爾斯泰（Leo Tolstoy）'
    },

    // 二、 心動瞬間與相遇美學 (Q4~Q7)
    {
      countdown: '',
      cn: '「今晚月色真美。」',
      original: '月が綺麗ですね。',
      author: '—— 夏目漱石'
    },
    {
      countdown: '',
      cn: '「醒來覺得甚是愛你。」',
      original: '',
      author: '—— 朱生豪'
    },
    {
      countdown: '',
      cn: '「一想到你，我這張臉就泛起微笑。」',
      original: '',
      author: '—— 王小波'
    },
    {
      countdown: '',
      cn: '「最是那一低頭的溫柔，像一朵水蓮花不勝涼風的嬌羞。」',
      original: '',
      author: '—— 徐志摩'
    },

    // 三、 浪漫節奏與情感深度 (Q8~Q9)
    {
      countdown: '',
      cn: '「從前的日色變得慢，車，馬，郵件都慢，一生只夠愛一個人。」',
      original: '',
      author: '—— 木心'
    },
    {
      countdown: '',
      cn: '「無論靈魂由什麼組成，他與我的，都是同一種。」',
      original: 'Whatever our souls are made of, his and mine are the same.',
      author: '—— 愛蜜莉·勃朗特（Emily Brontë）'
    },

    // 四、 現代視角與愛的本質 (Q10~Q12: 倒數提醒 + 大師金句)
    {
      countdown: '✨ 加油！剩下 3 題，星軌座標即將解鎖 ✨',
      cn: '「我的心一直屬於你，而且永遠如此。」',
      original: 'My heart is, and always will be, yours.',
      author: '—— 珍·奧斯汀（Jane Austen）'
    },
    {
      countdown: '💖 快做完了！倒數最後 2 題',
      cn: '「愛不是相互凝視，而是一起朝同一個方向眺望。」',
      original: 'Love does not consist in gazing at each other, but in looking outward together in the same direction.',
      author: '—— 聖修伯里（Antoine de Saint-Exupéry）'
    },
    {
      countdown: '🚀 最後 1 題！填完立即生成專屬 5 維親密雷達報告',
      cn: '「成熟的愛是：『我需要你，因為我愛你。』」',
      original: 'Mature love says: "I need you because I love you."',
      author: '—— 艾瑞克·佛洛姆（Erich Fromm）'
    }
  ];

  // DOM 元素快取
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const loadingScreen = document.getElementById('loading-screen');
  const resultScreen = document.getElementById('result-screen');

  const startBtn = document.getElementById('start-btn');
  const retestBtn = document.getElementById('retest-btn');
  const saveBtn = document.getElementById('save-btn');
  const prevBtn = document.getElementById('prev-btn');

  const currQEl = document.getElementById('curr-q');
  const progressFill = document.getElementById('progress-fill');
  
  const quoteCard = document.getElementById('quote-card');
  const quoteCountdown = document.getElementById('quote-countdown');
  const quoteCn = document.getElementById('quote-cn');
  const quoteOriginal = document.getElementById('quote-original');
  const quoteAuthor = document.getElementById('quote-author');

  const qCategory = document.getElementById('q-category');
  const qTitle = document.getElementById('q-title');
  const optionsGrid = document.getElementById('options-grid');

  const imageModal = document.getElementById('image-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const generatedImg = document.getElementById('generated-img');
  const downloadLink = document.getElementById('download-link');

  // ==========================================
  // 4. 事件監聽
  // ==========================================
  startBtn.addEventListener('click', startQuiz);
  retestBtn.addEventListener('click', restartQuiz);
  saveBtn.addEventListener('click', generateScreenshot);
  if (prevBtn) {
    prevBtn.addEventListener('click', handlePrevQuestion);
  }
  closeModalBtn.addEventListener('click', () => imageModal.classList.remove('active'));

  // ==========================================
  // 5. 流程控制函式
  // ==========================================
  function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showScreen(quizScreen);
    renderQuestion();
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showScreen(startScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePrevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion();
    }
  }

  function showScreen(targetScreen) {
    [startScreen, quizScreen, loadingScreen, resultScreen].forEach(screen => {
      screen.classList.remove('active');
    });
    targetScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderQuestion() {
    const q = QUESTIONS[currentQuestionIndex];
    
    // 更新頂部資訊
    currQEl.textContent = currentQuestionIndex + 1;
    progressFill.style.width = `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%`;
    
    // 控制「返回上一題」按鈕顯示（第 1 題隱藏，第 2 題起顯示）
    if (prevBtn) {
      prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';
    }

    // 更新進度條大師名言 (三行結構)
    const quoteData = PROGRESS_QUOTES[currentQuestionIndex] || PROGRESS_QUOTES[0];
    if (quoteCard && quoteCn && quoteAuthor) {
      quoteCn.textContent = quoteData.cn;
      quoteAuthor.textContent = quoteData.author;
      
      // 第二行原文 (若有原文則顯示，無則隱藏)
      if (quoteData.original) {
        quoteOriginal.textContent = quoteData.original;
        quoteOriginal.style.display = 'block';
      } else {
        quoteOriginal.textContent = '';
        quoteOriginal.style.display = 'none';
      }

      // 第一行倒數提示 (Q10~Q12 顯示，Q1~Q9 空白隱藏)
      if (quoteData.countdown) {
        quoteCountdown.textContent = quoteData.countdown;
        quoteCountdown.style.display = 'flex';
        quoteCard.classList.add('encourage');
      } else {
        quoteCountdown.textContent = '';
        quoteCountdown.style.display = 'none';
        quoteCard.classList.remove('encourage');
      }
    }

    qCategory.textContent = q.category;
    qTitle.textContent = q.title;

    // 清空並渲染選項
    optionsGrid.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];
    const prevSelectedScore = userAnswers[currentQuestionIndex];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      if (prevSelectedScore !== undefined && prevSelectedScore === opt.score) {
        btn.classList.add('selected');
      }
      btn.innerHTML = `
        <span class="opt-prefix">${prefixes[idx]}</span>
        <span class="opt-text">${opt.text}</span>
      `;

      btn.addEventListener('click', () => handleSelectOption(btn, opt.score));
      optionsGrid.appendChild(btn);
    });
  }

  function handleSelectOption(selectedBtn, score) {
    // 視覺選中反饋
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.classList.remove('selected'));
    selectedBtn.classList.add('selected');

    // 儲存答案（若重選則自動覆蓋）
    userAnswers[currentQuestionIndex] = score;

    // 延遲切換下一題 (260ms 平滑體驗)
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < QUESTIONS.length) {
        renderQuestion();
      } else {
        finishQuiz();
      }
    }, 260);
  }

  // ==========================================
  // 6. 計算與結果判定
  // ==========================================
  function finishQuiz() {
    showScreen(loadingScreen);

    // 模擬運算星軌動畫 (1.3 秒)
    const stepText = document.getElementById('loading-step-text');
    setTimeout(() => {
      stepText.textContent = '正在定位 8 大親密依附人格座標...';
    }, 600);

    setTimeout(() => {
      calculateAndShowResult();
    }, 1300);
  }

  function calculateAndShowResult() {
    // 1. 計算焦慮總分與逃避總分
    let anxietySum = 0;
    let avoidanceSum = 0;

    QUESTIONS.forEach((q, idx) => {
      const score = userAnswers[idx] || 2;
      if (q.facet === 'anxiety') {
        anxietySum += score;
      } else {
        avoidanceSum += score;
      }
    });

    // 2. 轉換為 0% ~ 100% 連續百分比 (6題各 1~4分，總分範圍 6~24)
    const anxietyPct = Math.min(100, Math.max(0, Math.round(((anxietySum - 6) / 18) * 100)));
    const avoidancePct = Math.min(100, Math.max(0, Math.round(((avoidanceSum - 6) / 18) * 100)));

    // 3. 判定 8 大細分人格
    const persona = mapToPersona(anxietyPct, avoidancePct);

    // 4. 渲染結果頁
    renderResult(persona, anxietyPct, avoidancePct);
    showScreen(resultScreen);
  }

  function mapToPersona(anxiety, avoidance) {
    const isHighAnxiety = anxiety >= 50;
    const isHighAvoidance = avoidance >= 50;

    // 象限 1: 安全型象限 (低焦慮 & 低逃避)
    if (!isHighAnxiety && !isHighAvoidance) {
      if (anxiety < 35 && avoidance < 35) {
        return PERSONA_TYPES.pure_anchor; // 純粹恆星型
      } else if (anxiety >= 35) {
        return PERSONA_TYPES.warm_guardian; // 溫暖守護型 (偏焦)
      } else {
        return PERSONA_TYPES.steady_pine; // 沉穩松樹型 (偏逃)
      }
    }

    // 象限 2: 焦慮型象限 (高焦慮 & 低逃避)
    if (isHighAnxiety && !isHighAvoidance) {
      if (avoidance < 30) {
        return PERSONA_TYPES.blazing_tide; // 熾熱潮汐型
      } else {
        return PERSONA_TYPES.devoted_dove; // 委屈奉獻型
      }
    }

    // 象限 3: 疏離逃避型象限 (低焦慮 & 高逃避)
    if (!isHighAnxiety && isHighAvoidance) {
      if (avoidance >= 70) {
        return PERSONA_TYPES.island_glacier; // 孤島冰川型
      } else {
        return PERSONA_TYPES.solo_falcon; // 獨行獵鷹型
      }
    }

    // 象限 4: 恐懼逃避型象限 (高焦慮 & 高逃避)
    return PERSONA_TYPES.thorny_aurora; // 帶刺極光型
  }

  function renderResult(persona, anxietyPct, avoidancePct) {
    // 序號
    const serialEl = document.getElementById('serial-id');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    serialEl.textContent = `NO.2026-QIXI-${randomCode}`;

    // 人格基本資訊
    document.getElementById('persona-icon').textContent = persona.icon;
    document.getElementById('persona-quadrant').textContent = persona.quadrant;
    document.getElementById('persona-name').textContent = persona.name;
    document.getElementById('persona-desc').textContent = persona.desc;
    document.getElementById('persona-quote').textContent = persona.quote;

    // 標籤
    const tagsRow = document.getElementById('persona-tags');
    tagsRow.innerHTML = persona.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('');

    // ECR 雙維度數據
    document.getElementById('anxiety-val').textContent = `${anxietyPct}%`;
    document.getElementById('anxiety-fill').style.width = `${anxietyPct}%`;

    document.getElementById('avoidance-val').textContent = `${avoidancePct}%`;
    document.getElementById('avoidance-fill').style.width = `${avoidancePct}%`;

    // 5 維親密雷達條形圖
    const radarContainer = document.getElementById('radar-bars-container');
    const radarConfig = [
      { key: 'stability', label: '🛡️ 情緒穩定度' },
      { key: 'openness', label: '💬 脆弱敞開度' },
      { key: 'sensitivity', label: '🚨 關係敏銳度' },
      { key: 'boundary', label: '🏰 獨立邊界感' },
      { key: 'repairability', label: '🩹 修復共情力' }
    ];

    radarContainer.innerHTML = radarConfig.map(cfg => {
      const val = persona.radar[cfg.key] || 80;
      return `
        <div class="radar-bar-item">
          <span class="radar-label">${cfg.label}</span>
          <div class="radar-track">
            <div class="radar-fill" style="width: ${val}%;"></div>
          </div>
          <span class="radar-val">${val}%</span>
        </div>
      `;
    }).join('');

    // 伴侶匹配與破局建議
    document.getElementById('match-partner').textContent = persona.matchPartner;
    document.getElementById('match-advice').textContent = persona.matchAdvice;
  }

  // ==========================================
  // 7. html2canvas 高清截圖生成
  // ==========================================
  function generateScreenshot() {
    const cardElement = document.getElementById('result-card-box');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span>📸 正在生成高清圖...</span>';

    // 呼叫 html2canvas 截圖
    if (typeof html2canvas === 'function') {
      html2canvas(cardElement, {
        scale: 2, // 2x 高清
        useCORS: true,
        backgroundColor: '#0f1123',
        logging: false
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        generatedImg.src = imgData;
        downloadLink.href = imgData;
        downloadLink.download = `七夕戀愛依附報告_${Date.now()}.png`;

        imageModal.classList.add('active');
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>保存高清報告卡</span>
        `;
      }).catch(err => {
        console.error('截圖生成失敗：', err);
        alert('截圖生成時發生錯誤，請直接手動截圖保存！');
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>保存高清報告卡</span>';
      });
    } else {
      alert('請直接使用手機截圖功能保存本報告！');
      saveBtn.disabled = false;
    }
  }

})();
