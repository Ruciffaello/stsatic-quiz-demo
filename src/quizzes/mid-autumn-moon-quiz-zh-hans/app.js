(() => {
  'use strict';

  const INGREDIENTS = [
    { id: 'redbean', name: '红豆', icon: '🫘', color: '#a8443d', meaning: '心意有回音', result: 'redbean' },
    { id: 'peanut', name: '花生', icon: '🥜', color: '#d2a64b', meaning: '好事会发生', result: 'peanut' },
    { id: 'osmanthus', name: '桂花', icon: '🌼', color: '#f4ac2d', meaning: '折桂被看见', result: 'osmanthus' },
    { id: 'sesame', name: '芝麻', icon: '⚫', color: '#352e31', meaning: '步步往上走', result: 'sesame' },
    { id: 'chestnut', name: '栗子', icon: '🌰', color: '#935634', meaning: '丰收落袋中', result: 'chestnut' },
    { id: 'taro', name: '芋头', icon: '🟣', color: '#a483b2', meaning: '遇见新转机', result: 'taro' },
    { id: 'jujube', name: '枣泥', icon: '🟤', color: '#813c32', meaning: '愿望早实现', result: 'jujube' },
    { id: 'pomelo', name: '柚子', icon: '🍊', color: '#d6d96b', meaning: '团圆被守护', result: 'pomelo' },
    { id: 'mugwort', name: '艾草', icon: '🌿', color: '#6d9a70', meaning: '安心慢慢来', result: 'mugwort' },
    { id: 'yolk', name: '咸蛋黄', icon: '🌕', color: '#f6bd31', meaning: '圆满刚刚好', result: 'yolk' }
  ];

  const RESULTS = {
    redbean: { name: '红豆心事糬', blessing: '心意有回音 · 勇敢靠近', meaning: '红豆象征相思与真诚靠近。愿你收获心动、人缘，与勇敢表达喜欢的祝福。' },
    peanut: { name: '花生幸运糬', blessing: '好事发生 · 机会靠近', meaning: '花生象征好事发生。愿你接住眼前的小机会，让它慢慢长成踏实的幸运。' },
    osmanthus: { name: '桂花折桂糬', blessing: '折桂被看见 · 贵人相逢', meaning: '桂花象征折桂与富贵。愿你的努力被看见，在重要时刻遇见愿意赏识你的人。' },
    sesame: { name: '芝麻登高糬', blessing: '步步登高 · 稳定精进', meaning: '芝麻象征节节高升。愿你把每天的小小累积，慢慢堆成属于自己的高度。' },
    chestnut: { name: '栗子丰收糬', blessing: '丰收落袋 · 踏实富足', meaning: '栗子象征丰收与成果。愿你投入的心力在适当时候开花，收进安心的收获。' },
    taro: { name: '芋见转运糬', blessing: '遇见转机 · 开启新篇', meaning: '芋头带来「遇头」的好兆头。愿每一次变动都替你打开新方向，遇见更好的开始。' },
    jujube: { name: '枣泥早成糬', blessing: '心愿早成 · 立即行动', meaning: '枣泥象征早日实现。愿你把藏在心里的愿望，化成今天就能开始的第一步。' },
    pomelo: { name: '柚香团圆糬', blessing: '团圆守护 · 平安相伴', meaning: '柚子寓意保佑与团圆。愿你重视的人都平安相伴，也愿你被温柔地守护。' },
    mugwort: { name: '艾草安心糬', blessing: '静心疗愈 · 慢慢变好', meaning: '艾草带来安定与清醒。愿你放下不必要的焦虑，在自己的步调里慢慢变好。' },
    yolk: { name: '蛋黄满月糬', blessing: '圆满知足 · 幸福刚好', meaning: '咸蛋黄象征如满月般的圆满。愿你在关系与生活里，感受到刚刚好的幸福。' }
  };

  const PURE_RESULTS = {
    redbean: { name: '一心红豆糬', blessing: '心意有回音 · 专属心动', meaning: '四杵皆是红豆，代表你对在意的人与事格外真诚。愿你的心意被好好接住。' },
    peanut: { name: '好事花生糬', blessing: '好事发生 · 幸运集结', meaning: '你相信幸运会落在愿意准备的人身上。愿每份小小的好事都来得恰到好处。' },
    osmanthus: { name: '蟾宫桂花糬', blessing: '折桂高光 · 被好好看见', meaning: '今夜的桂花香特别浓。愿你在重要舞台散发自己的光，收获珍贵的肯定。' },
    sesame: { name: '步步芝麻糬', blessing: '稳稳向上 · 节节高升', meaning: '你相信慢慢走也能走得很远。愿每一点努力都成为日后回望时的底气。' },
    chestnut: { name: '满仓栗子糬', blessing: '丰收满仓 · 成果落袋', meaning: '你正走在收成的路上。愿过去的付出都有回音，让生活更踏实富足。' },
    taro: { name: '遇见芋头糬', blessing: '好兆头 · 转机将至', meaning: '所有的芋头都在说：好事值得再等一下。愿你在转弯处遇见意想不到的新方向。' },
    jujube: { name: '早成枣泥糬', blessing: '愿望早成 · 行动有果', meaning: '你的心愿很清晰，也正等着第一步。愿你一动身，就离想去的地方更近一些。' },
    pomelo: { name: '守月柚香糬', blessing: '平安团圆 · 温柔守护', meaning: '你把陪伴放在心上。愿你与重要的人共享月色，也共享平安与安心。' },
    mugwort: { name: '静心艾草糬', blessing: '留白安定 · 自在如常', meaning: '有时候，慢下来就是最好的前进。愿你保留一点留白，让心重新回到安稳。' },
    yolk: { name: '月圆蛋黄糬', blessing: '圆满相伴 · 幸福绵长', meaning: '你珍惜的，是刚刚好的陪伴。愿团圆与温暖，在这个中秋停留得久一点。' }
  };

  const SUPPORT_BLESSINGS = {
    redbean: { suffix: '心意被好好接住', boost: '心意被加倍珍惜' },
    peanut: { suffix: '好运恰到好处', boost: '好运加倍靠近' },
    osmanthus: { suffix: '努力被好好看见', boost: '光芒更被看见' },
    sesame: { suffix: '稳稳向上', boost: '前进的步伐更加稳定' },
    chestnut: { suffix: '收进踏实的收获', boost: '收获加倍落袋' },
    taro: { suffix: '在转弯处遇见新方向', boost: '转机加倍靠近' },
    jujube: { suffix: '心愿早日落实', boost: '心愿更快开花结果' },
    pomelo: { suffix: '有团圆平安相伴', boost: '团圆守护加倍相伴' },
    mugwort: { suffix: '在自己的步调里安心前行', boost: '安心与疗愈加倍停留' },
    yolk: { suffix: '感受刚刚好的圆满', boost: '圆满幸福加倍停留' }
  };

  const LEGENDARY = {
    name: '月兔天选・万福十全糬',
    blessing: '万福集结 · 十全中秋',
    meaning: '月兔洒下万福金粉，十种月宫好运同时落进你的石臼。愿财运、心动、贵人、团圆与心安，全都在这个中秋向你靠近。',
    ingredients: ['✦ 月华金粉', '🌕 玉兔仙露', '☁️ 桂影灵光'],
    effects: [
      ['天选加护', '接下来的日子，愿好事比预期更早抵达。'],
      ['团圆月光', '想念的人与在意的心愿，都被温柔照亮。']
    ]
  };
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
  function recipeText() { return state.picks.length ? state.picks.map((pick, index) => `${index === 0 ? '主' : '副'}·${pick.name}`).join('　') : '尚未投入食材'; }
  function selectionPrompt() {
    const prompts = [
      ['请挑选主食材', '它会决定这颗月饼的核心祝福'],
      ['请挑选第一味副食材', '它会成为主祝福后方的补充语'],
      ['请挑选第二味副食材', '可重复选择，让祝福更加强烈']
    ];
    return prompts[state.picks.length] || prompts[2];
  }
  function updateSelectionUI() {
    const step = state.picks.length + 1;
    $('#round-current').textContent = step;
    $('#ingredient-heading').textContent = step === 1 ? '第一味 · 选主食材' : `第${step}味 · 选副食材`;
    $('#recipe-line').textContent = `目前配方：${recipeText()}`;
    updateMix();
  }
  function addIngredient() {
    if (!state.selected) return;
    const picked = state.selected;
    state.picks.push(picked); state.selected = null;
    $('#pound-current').textContent = state.picks.length;
    $('#pound-selected').textContent = `${picked.icon} ${picked.name} 已投入石臼 · ${picked.meaning}`;
    $('#pound-title').textContent = `糬糬正在染上${picked.name}月色`;
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
    if (supports.length === 2 && supports[0].id === supports[1].id) return `${result.blessing}；${SUPPORT_BLESSINGS[supports[0].result].boost}。`;
    return `${result.blessing}；${supports.map((pick) => SUPPORT_BLESSINGS[pick.result].suffix).join('，也')}。`;
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
    document.querySelector('.result-limited').textContent = isLegendary ? '1% 月兔天选' : '中秋限定';
    $('#result-name').textContent = result.name; $('#result-blessing').textContent = blessingWithSupports(result);
    $('#result-ingredients').innerHTML = isLegendary
      ? result.ingredients.map((ingredient) => `<span>${ingredient}</span>`).join('')
      : state.picks.map((pick, index) => `<span>${index === 0 ? '主' : '副'}·${pick.icon} ${pick.name}</span>`).join('');
    $('#result-supports').innerHTML = isLegendary
      ? `<span class="support-label">天选效果</span>${result.effects.map(([title, detail]) => `<p class="result-support"><b>${title}：</b>${detail}</p>`).join('')}`
      : `<span class="support-label">副效果</span>${state.picks.slice(1).map((pick) => `<p class="result-support"><b>${pick.name}：</b>${SUPPORT_BLESSINGS[pick.result].suffix}</p>`).join('')}`;
    drawResultPastry(result);
    showScreen('result');
  }
  function restart() { state.picks = []; state.selected = null; updateMix('#fffdf5'); updateSelectionUI(); renderIngredients(); selectedInfo.classList.add('is-empty'); selectedInfo.innerHTML = '<span class="selected-icon">✦</span><div><strong>请挑选主食材</strong><span>它会决定这颗月饼的核心祝福</span></div>'; addButton.disabled = true; showScreen('start'); }
  function flash(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2600); }

  $('#start-btn').addEventListener('click', () => { updateSelectionUI(); renderIngredients(); showScreen('select'); });
  addButton.addEventListener('click', addIngredient);
  $('#restart-btn').addEventListener('click', restart);
  $('#share-btn').addEventListener('click', () => flash('因为开发者技术有限，这次请用截图的方式保存结果～'));
})();
