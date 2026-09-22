(() => {
  'use strict';

  const INGREDIENTS = [
    { id: 'redbean', name: 'Red Bean', icon: '🫘', color: '#a8443d', meaning: 'Heartfelt intentions resonate', result: 'redbean' },
    { id: 'peanut', name: 'Peanut', icon: '🥜', color: '#d2a64b', meaning: 'Fortunate things will unfold', result: 'peanut' },
    { id: 'taro', name: 'Taro', icon: '🟣', color: '#a483b2', meaning: 'New turning points await', result: 'taro' },
    { id: 'sesame', name: 'Sesame', icon: '⚫', color: '#352e31', meaning: 'Steadily advancing upward', result: 'sesame' },
    { id: 'chestnut', name: 'Chestnut', icon: '🌰', color: '#935634', meaning: 'A rich harvest gathered', result: 'chestnut' },
    { id: 'osmanthus', name: 'Osmanthus', icon: '🌼', color: '#f4ac2d', meaning: 'Laurels and recognition await', result: 'osmanthus' },
    { id: 'jujube', name: 'Jujube Paste', icon: '🟤', color: '#813c32', meaning: 'Aspirations fulfilled early', result: 'jujube' },
    { id: 'pomelo', name: 'Pomelo', icon: '🍊', color: '#d6d96b', meaning: 'Reunions safeguarded', result: 'pomelo' },
    { id: 'mugwort', name: 'Mugwort', icon: '🌿', color: '#6d9a70', meaning: 'Finding peace and taking it slow', result: 'mugwort' },
    { id: 'yolk', name: 'Salted Egg Yolk', icon: '🌕', color: '#f6bd31', meaning: 'Perfect wholeness and contentment', result: 'yolk' }
  ];

  const RESULTS = {
    redbean: { name: 'Red Bean心事糬', blessing: 'Heartfelt intentions resonate · 勇敢靠近', meaning: 'Red Bean象徵相思與真誠靠近。願你收穫心動、人緣，與勇敢表達喜歡的祝福。' },
    peanut: { name: 'Peanut幸運糬', blessing: '好事發生 · 機會靠近', meaning: 'Peanut象徵好事發生。願你接住眼前的小機會，讓它慢慢長成踏實的幸運。' },
    osmanthus: { name: 'Osmanthus折桂糬', blessing: 'Laurels and recognition await · 貴人相逢', meaning: 'Osmanthus象徵折桂與富貴。願你的努力被看見，在重要時刻遇見願意賞識你的人。' },
    sesame: { name: 'Sesame登高糬', blessing: '步步登高 · 穩定精進', meaning: 'Sesame象徵節節高升。願你把每天的小小累積，慢慢堆成屬於自己的高度。' },
    chestnut: { name: 'Chestnut豐收糬', blessing: '豐收落袋 · 踏實富足', meaning: 'Chestnut象徵豐收與成果。願你投入的心力在適當時候開花，收進安心的收穫。' },
    taro: { name: 'Destined Taro Mochi', blessing: '遇見轉機 · 開啟新篇', meaning: 'Taro帶來「遇頭」的好兆頭。願每一次變動都替你打開新方向，遇見更好的開始。' },
    jujube: { name: 'Jujube Paste早成糬', blessing: '心願早成 · 立即行動', meaning: 'Jujube Paste象徵早日實現。願你把藏在心裡的願望，化成今天就能開始的第一步。' },
    pomelo: { name: 'Reunion Pomelo Mochi', blessing: '團圓守護 · 平安相伴', meaning: 'Pomelo寓意保佑與團圓。願你重視的人都平安相伴，也願你被溫柔地守護。' },
    mugwort: { name: 'Mugwort安心糬', blessing: '靜心療癒 · 慢慢變好', meaning: 'Mugwort帶來安定與清醒。願你放下不必要的焦慮，在自己的步調裡慢慢變好。' },
    yolk: { name: 'Full Moon Yolk Mochi', blessing: '圓滿知足 · 幸福剛好', meaning: 'Salted Egg Yolk象徵如滿月般的圓滿。願你在關係與生活裡，感受到剛剛好的幸福。' }
  };

  const PURE_RESULTS = {
    redbean: { name: '一心Red Bean糬', blessing: 'Heartfelt intentions resonate · 專屬心動', meaning: 'When all strikes are red bean, your devotion runs true. May your sincerity be received with open arms and cherished deeply.' },
    peanut: { name: '好事Peanut糬', blessing: '好事發生 · 幸運集結', meaning: 'Good things find those ready to welcome them. May every bit of gentle fortune arrive at the perfect moment.' },
    osmanthus: { name: '蟾宮Osmanthus糬', blessing: '折桂高光 · 被好好看見', meaning: 'Tonight, the osmanthus fragrance is at its peak. May you shine on your greatest stage and earn the honor you deserve.' },
    sesame: { name: '步步Sesame糬', blessing: '穩穩向上 · 節節高升', meaning: 'A gentle pace still carries you far. May every quiet effort become the quiet strength you look back on with pride.' },
    chestnut: { name: '滿倉Chestnut糬', blessing: '豐收滿倉 · 成果落袋', meaning: 'You are walking along the harvest path. May every drop of effort echo back with rewarding abundance.' },
    taro: { name: '遇見Taro糬', blessing: '好兆頭 · 轉機將至', meaning: 'Every taro whisper reminds us: good things are worth the wait. May unexpected paths appear around every corner.' },
    jujube: { name: '早成Jujube Paste糬', blessing: '願望早成 · 行動有果', meaning: 'Your dream is clear, waiting only for that first leap. May moving forward bring you closer to where you long to be.' },
    pomelo: { name: 'Moonlit Companion Pomelo Mochi', blessing: '平安團圓 · 溫柔守護', meaning: '你把陪伴放在心上。願你與重要的人共享moonlight，也共享平安與安心。' },
    mugwort: { name: '靜心Mugwort糬', blessing: '留白安定 · 自在如常', meaning: 'Sometimes, slowing down is the best way forward. Leave space for stillness, and let your heart find calm once more.' },
    yolk: { name: 'Golden Reunion Yolk Mochi', blessing: '圓滿相伴 · 幸福綿長', meaning: 'What you treasure is presence that feels just right. May warmth and reunion linger softly this Mid-Autumn.' }
  };

  const SUPPORT_BLESSINGS = {
    redbean: { suffix: '心意被好好接住', boost: '心意被加倍珍惜' },
    peanut: { suffix: '好運恰到好處', boost: '好運加倍靠近' },
    osmanthus: { suffix: '努力被好好看見', boost: '光芒更被看見' },
    sesame: { suffix: '穩穩向上', boost: '前進的步伐更加穩定' },
    chestnut: { suffix: '收進踏實的收穫', boost: '收穫加倍落袋' },
    taro: { suffix: '在轉彎處遇見新方向', boost: '轉機加倍靠近' },
    jujube: { suffix: '心願早日落實', boost: '心願更快開花結果' },
    pomelo: { suffix: '有團圓平安相伴', boost: '團圓守護加倍相伴' },
    mugwort: { suffix: '在自己的步調裡安心前行', boost: '安心與療癒加倍停留' },
    yolk: { suffix: '感受剛剛好的圓滿', boost: '圓滿幸福加倍停留' }
  };

  const LEGENDARY = {
    name: 'Chosen by the Moon Rabbit · Flawless Tenfold Blessings Mochi',
    blessing: 'Myriad blessings unite · A flawless Mid-Autumn',
    meaning: 'As the Moon Rabbit showers golden dust of infinite blessings, ten kinds of lunar fortune fall into your mortar. May wealth, love, mentors, reunion, and peace all gather around you this Mid-Autumn.',
    ingredients: ['✦ 月華金粉', '🌕 玉兔仙露', '☁️ 桂影靈光'],
    effects: [
      ['天選加護', '接下來的日子，願好事比預期更早抵達。'],
      ['團圓月光', '想念的人與在意的心願，都被溫柔照亮。']
    ]
  };
  Object.assign(RESULTS, {
    redbean:{name:"Red Bean Heartfelt Mochi",blessing:"Heartfelt intentions resonate · Draw near with courage",meaning:"Red beans symbolize longing and sincere bonds. May you find fluttered hearts, warmth in connection, and the courage to voice your feelings."},
    peanut:{name:"Good Fortune Peanut Mochi",blessing:"Good things unfold · Opportunities arrive",meaning:"Peanuts bring the blessing of good things unfolding. May you catch every small chance today and watch it grow into lasting fortune."},
    osmanthus:{name:"Sweet Osmanthus Laurel Mochi",blessing:"Laurels and recognition · A shining moment",meaning:"Osmanthus blossoms symbolize triumphs and grace. May your hard work shine through and be truly recognized when it matters most."},
    sesame:{name:"Rising Sesame Mochi",blessing:"Rising step by step · Steady progress",meaning:"Sesame stands for rising step by step. May every small daily effort stack into your own steady climb to success."},
    chestnut:{name:"Abundant Chestnut Mochi",blessing:"A harvest gathered · Grounded abundance",meaning:"Chestnuts herald a bountiful harvest. May your dedication bloom at the right moment, bringing fruitful peace of mind."},
    taro:{name:"Destined Taro Mochi",blessing:"A lucky turn · Fresh beginnings",meaning:"Taro brings the good omen of a lucky turn. May every change open a fresh path and lead you to brighter beginnings."},
    jujube:{name:"Early Bloom Jujube Mochi",blessing:"Wishes realized · A brave first step",meaning:"Jujube dates promise sweet wishes realized soon. May the dreams in your heart turn into the first brave step you take today."},
    pomelo:{name:"Reunion Pomelo Mochi",blessing:"Reunion safeguarded · Gentle protection",meaning:"Pomelo holds the wish for safety, blessing, and reunion. May those you cherish stay safe by your side, always wrapped in gentle protection."},
    mugwort:{name:"Serene Mugwort Mochi",blessing:"Calm and clarity · Healing at your pace",meaning:"Mugwort brings calm, clarity, and peace. May you let go of all worry and flourish gently at your very own pace."},
    yolk:{name:"Full Moon Yolk Mochi",blessing:"Wholeness and contentment · Just-right bliss",meaning:"Salted egg yolk shines like the round full moon. May you feel effortless, just-right bliss in every bond and every day."}
  });
  Object.assign(PURE_RESULTS, {
    redbean:{name:"Pure Devotion Red Bean Mochi",blessing:"Sincere devotion · Cherished deeply",meaning:"When all strikes are red bean, your devotion runs true. May your sincerity be received with open arms and cherished deeply."},
    peanut:{name:"Serendipity Peanut Mochi",blessing:"Gentle fortune · Perfect timing",meaning:"Good things find those ready to welcome them. May every bit of gentle fortune arrive at the perfect moment."},
    osmanthus:{name:"Celestial Osmanthus Mochi",blessing:"Celestial brilliance · Earned honor",meaning:"Tonight, the osmanthus fragrance is at its peak. May you shine on your greatest stage and earn the honor you deserve."},
    sesame:{name:"Stride by Stride Sesame Mochi",blessing:"A gentle pace · Quiet strength",meaning:"A gentle pace still carries you far. May every quiet effort become the quiet strength you look back on with pride."},
    chestnut:{name:"Golden Harvest Chestnut Mochi",blessing:"Harvest path · Rewarding abundance",meaning:"You are walking along the harvest path. May every drop of effort echo back with rewarding abundance."},
    taro:{name:"Serendipitous Taro Mochi",blessing:"Good things are worth the wait",meaning:"Every taro whisper reminds us: good things are worth the wait. May unexpected paths appear around every corner."},
    jujube:{name:"Swift Success Jujube Mochi",blessing:"A clear dream · A first leap",meaning:"Your dream is clear, waiting only for that first leap. May moving forward bring you closer to where you long to be."},
    pomelo:{name:"Moonlit Companion Pomelo Mochi",blessing:"Companionship · Peaceful warmth",meaning:"Companionship is your dearest wish. May you share the moonlight and peaceful warmth with those you love."},
    mugwort:{name:"Mindful Mugwort Mochi",blessing:"Stillness · A calm heart",meaning:"Sometimes, slowing down is the best way forward. Leave space for stillness, and let your heart find calm once more."},
    yolk:{name:"Golden Reunion Yolk Mochi",blessing:"Just-right presence · Lingering warmth",meaning:"What you treasure is presence that feels just right. May warmth and reunion linger softly this Mid-Autumn."}
  });
  Object.assign(SUPPORT_BLESSINGS, {
    redbean:{suffix:"Your sincerity is warmly received",boost:"Your sincerity is twice as cherished"}, peanut:{suffix:"Good fortune right on time",boost:"Good fortune draws twice as close"}, osmanthus:{suffix:"Efforts clearly recognized",boost:"Your brilliance shines twice as bright"}, sesame:{suffix:"Steady upward progress",boost:"Every step forward becomes even steadier"}, chestnut:{suffix:"A grounded, fruitful yield",boost:"Rewarding harvest doubled in hand"}, taro:{suffix:"Fresh paths around the corner",boost:"Fortunate turns draw twice as close"}, jujube:{suffix:"Wishes blooming soon",boost:"Wishes blossom into reality even faster"}, pomelo:{suffix:"Protected with peace and reunion",boost:"Peace and protection double their embrace"}, mugwort:{suffix:"Move ahead at your own calm pace",boost:"Serenity and healing linger twice as long"}, yolk:{suffix:"Perfect harmony just right",boost:"Pure fulfillment lingers twice as long"}
  });
  Object.assign(LEGENDARY, {
    name:"Chosen by the Moon Rabbit · Flawless Tenfold Blessings Mochi",
    blessing:"Myriad blessings unite · A flawless Mid-Autumn",
    meaning:"As the Moon Rabbit showers golden dust of infinite blessings, ten kinds of lunar fortune fall into your mortar. May wealth, love, mentors, reunion, and peace all gather around you this Mid-Autumn.",
    ingredients:["✦ Moonlit Golden Dust","🌕 Moon Rabbit Dew","☁️ Osmanthus Glow"],
    effects:[["Chosen Blessing","May good fortune arrive sooner than you expect."],["Moonlit Reunion","May those you miss and the wishes you hold be gently illuminated."]]
  });
  const state = { picks: [], selected: null };
  const $ = (selector) => document.querySelector(selector);
  const screens = { start: $('#start-screen'), select: $('#select-screen'), pounding: $('#pounding-screen'), result: $('#result-screen') };
  const grid = $('#ingredients-grid');
  const selectedInfo = $('#selected-info');
  const addButton = $('#add-btn');
  const toast = $('#toast');

  function showScreen(name) { Object.values(screens).forEach((el) => el.classList.remove('active')); screens[name].classList.add('active'); window.scrollTo(0, 0); }
  function rgb(hex) { const value = hex.replace('#', ''); return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16)); }
  function mixedColor(picks = state.picks) {
    if (!picks.length) return '#fffdf5';
    const totals = picks.map((pick) => rgb(pick.color)).reduce((sum, value) => sum.map((part, index) => part + value[index]), [0, 0, 0]);
    return `rgb(${totals.map((value) => Math.round(value / picks.length)).join(',')})`;
  }
  function updateMix(color = mixedColor()) { document.documentElement.style.setProperty('--mix', color); document.documentElement.style.setProperty('--mix-glow', `${color}70`); }
  function renderIngredients() {
    grid.innerHTML = INGREDIENTS.map((ingredient) => `<button class="food-btn${state.selected?.id === ingredient.id ? ' selected' : ''}" type="button" data-id="${ingredient.id}" role="listitem"><span class="food-icon">${ingredient.icon}</span><span class="food-name"><i class="flavor-dot" style="background:${ingredient.color}"></i>${ingredient.name}</span></button>`).join('');
    grid.querySelectorAll('.food-btn').forEach((button) => button.addEventListener('click', () => selectIngredient(button.dataset.id)));
  }
  function selectIngredient(id) {
    state.selected = INGREDIENTS.find((ingredient) => ingredient.id === id);
    updateMix(mixedColor([...state.picks, state.selected]));
    selectedInfo.classList.remove('is-empty');
    selectedInfo.innerHTML = `<span class="selected-icon">${state.selected.icon}</span><div><strong>${state.selected.name}</strong><span>${state.selected.meaning}</span></div>`;
    addButton.disabled = false;
    renderIngredients();
  }
  function recipeText() { return state.picks.length ? state.picks.map((pick, index) => `${index === 0 ? 'Core' : 'Accent'}·${pick.name}`).join('　') : 'No ingredients added yet'; }
  function selectionPrompt() {
    const prompts = [
      ['Choose your primary ingredient.', 'It will define the core blessing of this mooncake.'],
      ['Choose your first accent ingredient', 'It adds a supporting note to your main blessing'],
      ['Choose your second accent ingredient', 'Repeat an ingredient to strengthen its blessing']
    ];
    return prompts[state.picks.length] || prompts[2];
  }
  function updateSelectionUI() {
    const step = state.picks.length + 1;
    $('#round-current').textContent = step;
    $('#ingredient-heading').textContent = step === 1 ? 'Choose Your Primary Ingredient' : `${step === 2 ? '2nd' : '3rd'} Flavor · Choose an accent`;
    $('#recipe-line').textContent = `Current formula: ${recipeText()}`;
    updateMix();
  }
  function addIngredient() {
    if (!state.selected) return;
    const picked = state.selected;
    state.picks.push(picked); state.selected = null;
    $('#pound-current').textContent = state.picks.length;
    $('#pound-selected').textContent = `${picked.icon} ${picked.name} has entered the mortar · ${picked.meaning}`;
    $('#pound-title').textContent = `Moonlight is infusing the mochi with ${picked.name}`;
    updateMix(); showScreen('pounding');
    window.setTimeout(() => {
      if (state.picks.length < 3) { const [title, detail] = selectionPrompt(); updateSelectionUI(); renderIngredients(); selectedInfo.classList.add('is-empty'); selectedInfo.innerHTML = `<span class="selected-icon">✦</span><div><strong>${title}</strong><span>${detail}</span></div>`; addButton.disabled = true; showScreen('select'); }
      else showResult();
    }, 1450);
  }
  function resultForPicks() {
    if (Math.random() < 0.01) return LEGENDARY;
    const main = state.picks[0];
    return state.picks.slice(1).some((pick) => pick.id === main.id) ? PURE_RESULTS[main.result] : RESULTS[main.result];
  }
  function blessingWithSupports(result) {
    if (result === LEGENDARY) return result.blessing;
    const main = state.picks[0];
    const supports = state.picks.slice(1).filter((pick) => pick.id !== main.id);
    if (!supports.length) return result.blessing;
    if (supports.length === 2 && supports[0].id === supports[1].id) return `${result.blessing}<br><span class="blessing-accents">Also: ${SUPPORT_BLESSINGS[supports[0].result].boost}</span>`;
    return `${result.blessing}<br><span class="blessing-accents">Also: ${supports.map((pick) => SUPPORT_BLESSINGS[pick.result].suffix).join(', and also ')}</span>`;
  }
  function drawResultPastry(result) {
    const canvas = $('#result-pastry');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pastryImage = new Image();
    pastryImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Keep the supplied hand-drawn mooncake intact, then recolor only its cut filling.
      ctx.drawImage(pastryImage, 15, -105, 570, 570);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(104, 312); ctx.bezierCurveTo(76, 260, 102, 185, 189, 162);
      ctx.bezierCurveTo(280, 144, 356, 190, 352, 279); ctx.bezierCurveTo(348, 316, 298, 336, 205, 334);
      ctx.bezierCurveTo(154, 334, 117, 327, 104, 312); ctx.closePath(); ctx.clip();
      ctx.globalCompositeOperation = 'color'; ctx.fillStyle = result === LEGENDARY ? '#f5c85b' : mixedColor(); ctx.fillRect(70, 145, 295, 195);
      ctx.restore();
      // Restore the egg-yolk centre after tinting the filling.
      ctx.save(); ctx.beginPath(); ctx.ellipse(235, 252, 50, 35, .04, 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(pastryImage, 15, -105, 570, 570); ctx.restore();
    };
    pastryImage.src = 'assets/gg yolk pastry dessert illustration_7125802.png';
    return;
    const colors = picks.map((pick) => rgb(pick.color));
    const average = colors.reduce((sum, color) => sum.map((value, index) => value + color[index]), [0, 0, 0]).map((value) => Math.round(value / colors.length));
    const tone = (amount, alpha = 1) => `rgba(${average.map((value) => Math.max(0, Math.min(255, value + amount))).join(',')},${alpha})`;
    const color = (index, alpha = 1) => `rgba(${colors[index % colors.length].join(',')},${alpha})`;
    const drawTopping = (x, y, radius, fill, angle) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
      ctx.beginPath(); ctx.ellipse(0, 0, radius, radius * .57, 0, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
      ctx.beginPath(); ctx.ellipse(-radius * .22, -radius * .18, radius * .32, radius * .16, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.36)'; ctx.fill(); ctx.restore();
    };
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rear whole mochi: a soft watercolor-style silhouette.
    ctx.save();
    ctx.beginPath(); ctx.ellipse(405, 171, 143, 102, -.12, 0, Math.PI * 2);
    const rear = ctx.createRadialGradient(366, 128, 20, 414, 184, 158);
    rear.addColorStop(0, tone(70)); rear.addColorStop(.58, tone(20)); rear.addColorStop(1, tone(-42)); ctx.fillStyle = rear; ctx.fill();
    ctx.beginPath(); ctx.ellipse(421, 146, 104, 42, -.12, 0, Math.PI * 2); ctx.fillStyle = tone(-22, .35); ctx.fill();
    ctx.beginPath(); ctx.ellipse(474, 199, 61, 83, .26, 0, Math.PI * 2); ctx.fillStyle = tone(-52, .18); ctx.fill();
    for (let i = 0; i < 12; i += 1) drawTopping(315 + (i % 6) * 34, 128 + Math.floor(i / 6) * 26 + (i % 2) * 4, 7, color(i), (i - 4) * .26);
    ctx.restore();

    // Foreground cut mochi: warm outer skin, mixed-color filling and a hand-drawn rim.
    ctx.save();
    ctx.beginPath(); ctx.moveTo(88, 276); ctx.bezierCurveTo(56, 228, 71, 111, 154, 77); ctx.bezierCurveTo(249, 38, 431, 64, 480, 137); ctx.bezierCurveTo(529, 212, 488, 297, 414, 306); ctx.bezierCurveTo(268, 323, 140, 306, 88, 276); ctx.closePath();
    const crust = ctx.createRadialGradient(274, 151, 32, 281, 188, 226);
    crust.addColorStop(0, '#ffe49a'); crust.addColorStop(.62, '#efad42'); crust.addColorStop(.88, '#c46a1d'); crust.addColorStop(1, '#883418'); ctx.fillStyle = crust; ctx.fill();
    ctx.beginPath(); ctx.ellipse(276, 108, 150, 42, -.04, 0, Math.PI * 2); ctx.fillStyle = 'rgba(168,76,21,.37)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,220,130,.48)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(279, 197, 163, Math.PI * 1.08, Math.PI * 1.9); ctx.stroke();

    ctx.beginPath(); ctx.moveTo(126, 258); ctx.bezierCurveTo(117, 183, 168, 127, 280, 124); ctx.bezierCurveTo(401, 121, 454, 186, 423, 259); ctx.bezierCurveTo(338, 286, 204, 285, 126, 258); ctx.closePath();
    const filling = ctx.createRadialGradient(258, 166, 17, 281, 202, 145);
    filling.addColorStop(0, tone(38)); filling.addColorStop(.7, tone(-9)); filling.addColorStop(1, tone(-52)); ctx.fillStyle = filling; ctx.fill();
    ctx.beginPath(); ctx.ellipse(264, 157, 82, 17, -.05, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fill();
    for (let i = 0; i < 16; i += 1) drawTopping(164 + (i % 8) * 31, 111 + Math.floor(i / 8) * 28 + (i % 3) * 3, 7.5, color(i), (i - 5) * .23);
    ctx.restore();
  }
  function showResult() {
    const result = resultForPicks();
    const isLegendary = result === LEGENDARY;
    $('#result-capture').classList.toggle('is-legendary', isLegendary);
    $('#result-screen').classList.toggle('is-legendary', isLegendary);
    document.querySelector('.result-limited').textContent = isLegendary ? '1% Chosen by the Moon Rabbit' : 'Mid-Autumn Exclusive';
    $('#result-name').textContent = result.name; $('#result-blessing').innerHTML = blessingWithSupports(result);
    $('#result-ingredients').innerHTML = isLegendary
      ? result.ingredients.map((ingredient) => `<span>${ingredient}</span>`).join('')
      : `<span class="recipe-main">Core · ${state.picks[0].icon} ${state.picks[0].name}</span><span class="recipe-accents">Accent · ${state.picks[1].icon} ${state.picks[1].name} &nbsp; Accent · ${state.picks[2].icon} ${state.picks[2].name}</span>`;
    $('#result-supports').innerHTML = isLegendary
      ? `<span class="support-label">Chosen Effects</span>${result.effects.map(([title, detail]) => `<p class="result-support"><b>${title}:</b> ${detail}</p>`).join('')}`
      : `<span class="support-label">Accent Effects</span>${state.picks.slice(1).map((pick) => `<p class="result-support"><b>${pick.name}:</b> ${SUPPORT_BLESSINGS[pick.result].suffix}</p>`).join('')}`;
    drawResultPastry(result);
    showScreen('result');
  }
  function restart() { state.picks = []; state.selected = null; updateMix('#fffdf5'); updateSelectionUI(); renderIngredients(); selectedInfo.classList.add('is-empty'); selectedInfo.innerHTML = '<span class="selected-icon">✦</span><div><strong>Choose your primary ingredient.</strong><span>It will define the core blessing of this mooncake.</span></div>'; addButton.disabled = true; showScreen('start'); }
  function flash(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2600); }

  $('#start-btn').addEventListener('click', () => { updateSelectionUI(); renderIngredients(); showScreen('select'); });
  addButton.addEventListener('click', addIngredient);
  $('#restart-btn').addEventListener('click', restart);
  $('#share-btn').addEventListener('click', () => flash('Please use your device screenshot feature to save your result.'));
})();
