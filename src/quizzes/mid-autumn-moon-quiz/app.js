(() => {
  'use strict';

  const INGREDIENTS = [
    { id: 'redbean', name: '紅豆', icon: '🫘', color: '#a8443d', meaning: '心意有回音', result: 'redbean' },
    { id: 'peanut', name: '花生', icon: '🥜', color: '#d2a64b', meaning: '好事會發生', result: 'peanut' },
    { id: 'osmanthus', name: '桂花', icon: '🌼', color: '#f4ac2d', meaning: '折桂被看見', result: 'osmanthus' },
    { id: 'sesame', name: '芝麻', icon: '⚫', color: '#352e31', meaning: '步步往上走', result: 'sesame' },
    { id: 'chestnut', name: '栗子', icon: '🌰', color: '#935634', meaning: '豐收落袋中', result: 'chestnut' },
    { id: 'taro', name: '芋頭', icon: '🟣', color: '#a483b2', meaning: '遇見新轉機', result: 'taro' },
    { id: 'jujube', name: '棗泥', icon: '🟤', color: '#813c32', meaning: '願望早實現', result: 'jujube' },
    { id: 'pomelo', name: '柚子', icon: '🍊', color: '#d6d96b', meaning: '團圓被守護', result: 'pomelo' },
    { id: 'mugwort', name: '艾草', icon: '🌿', color: '#6d9a70', meaning: '安心慢慢來', result: 'mugwort' },
    { id: 'yolk', name: '鹹蛋黃', icon: '🌕', color: '#f6bd31', meaning: '圓滿剛剛好', result: 'yolk' }
  ];

  const RESULTS = {
    redbean: { name: '紅豆心事糬', blessing: '心意有回音 · 勇敢靠近', meaning: '紅豆象徵相思與真誠靠近。願你收穫心動、人緣，與勇敢表達喜歡的祝福。' },
    peanut: { name: '花生幸運糬', blessing: '好事發生 · 機會靠近', meaning: '花生象徵好事發生。願你接住眼前的小機會，讓它慢慢長成踏實的幸運。' },
    osmanthus: { name: '桂花折桂糬', blessing: '折桂被看見 · 貴人相逢', meaning: '桂花象徵折桂與富貴。願你的努力被看見，在重要時刻遇見願意賞識你的人。' },
    sesame: { name: '芝麻登高糬', blessing: '步步登高 · 穩定精進', meaning: '芝麻象徵節節高升。願你把每天的小小累積，慢慢堆成屬於自己的高度。' },
    chestnut: { name: '栗子豐收糬', blessing: '豐收落袋 · 踏實富足', meaning: '栗子象徵豐收與成果。願你投入的心力在適當時候開花，收進安心的收穫。' },
    taro: { name: '芋見轉運糬', blessing: '遇見轉機 · 開啟新篇', meaning: '芋頭帶來「遇頭」的好兆頭。願每一次變動都替你打開新方向，遇見更好的開始。' },
    jujube: { name: '棗泥早成糬', blessing: '心願早成 · 立即行動', meaning: '棗泥象徵早日實現。願你把藏在心裡的願望，化成今天就能開始的第一步。' },
    pomelo: { name: '柚香團圓糬', blessing: '團圓守護 · 平安相伴', meaning: '柚子寓意保佑與團圓。願你重視的人都平安相伴，也願你被溫柔地守護。' },
    mugwort: { name: '艾草安心糬', blessing: '靜心療癒 · 慢慢變好', meaning: '艾草帶來安定與清醒。願你放下不必要的焦慮，在自己的步調裡慢慢變好。' },
    yolk: { name: '蛋黃滿月糬', blessing: '圓滿知足 · 幸福剛好', meaning: '鹹蛋黃象徵如滿月般的圓滿。願你在關係與生活裡，感受到剛剛好的幸福。' }
  };

  const PURE_RESULTS = {
    redbean: { name: '一心紅豆糬', blessing: '心意有回音 · 專屬心動', meaning: '四杵皆是紅豆，代表你對在意的人與事格外真誠。願你的心意被好好接住。' },
    peanut: { name: '好事花生糬', blessing: '好事發生 · 幸運集結', meaning: '你相信幸運會落在願意準備的人身上。願每份小小的好事都來得恰到好處。' },
    osmanthus: { name: '蟾宮桂花糬', blessing: '折桂高光 · 被好好看見', meaning: '今夜的桂花香特別濃。願你在重要舞台散發自己的光，收穫珍貴的肯定。' },
    sesame: { name: '步步芝麻糬', blessing: '穩穩向上 · 節節高升', meaning: '你相信慢慢走也能走得很遠。願每一點努力都成為日後回望時的底氣。' },
    chestnut: { name: '滿倉栗子糬', blessing: '豐收滿倉 · 成果落袋', meaning: '你正走在收成的路上。願過去的付出都有回音，讓生活更踏實富足。' },
    taro: { name: '遇見芋頭糬', blessing: '好兆頭 · 轉機將至', meaning: '所有的芋頭都在說：好事值得再等一下。願你在轉彎處遇見意想不到的新方向。' },
    jujube: { name: '早成棗泥糬', blessing: '願望早成 · 行動有果', meaning: '你的心願很清晰，也正等著第一步。願你一動身，就離想去的地方更近一些。' },
    pomelo: { name: '守月柚香糬', blessing: '平安團圓 · 溫柔守護', meaning: '你把陪伴放在心上。願你與重要的人共享月色，也共享平安與安心。' },
    mugwort: { name: '靜心艾草糬', blessing: '留白安定 · 自在如常', meaning: '有時候，慢下來就是最好的前進。願你保留一點留白，讓心重新回到安穩。' },
    yolk: { name: '月圓蛋黃糬', blessing: '圓滿相伴 · 幸福綿長', meaning: '你珍惜的，是剛剛好的陪伴。願團圓與溫暖，在這個中秋停留得久一點。' }
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
    name: '月兔天選・萬福十全糬',
    blessing: '萬福集結 · 十全中秋',
    meaning: '月兔灑下萬福金粉，十種月宮好運同時落進你的石臼。願財運、心動、貴人、團圓與心安，全都在這個中秋向你靠近。',
    ingredients: ['✦ 月華金粉', '🌕 玉兔仙露', '☁️ 桂影靈光'],
    effects: [
      ['天選加護', '接下來的日子，願好事比預期更早抵達。'],
      ['團圓月光', '想念的人與在意的心願，都被溫柔照亮。']
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
      ['請挑選主食材', '它會決定這顆月餅的核心祝福'],
      ['請挑選第一味副食材', '它會成為主祝福後方的補充語'],
      ['請挑選第二味副食材', '可重複選擇，讓祝福更加強烈']
    ];
    return prompts[state.picks.length] || prompts[2];
  }
  function updateSelectionUI() {
    const step = state.picks.length + 1;
    $('#round-current').textContent = step;
    $('#ingredient-heading').textContent = step === 1 ? '第一味 · 選主食材' : `第${step}味 · 選副食材`;
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
    document.querySelector('.result-limited').textContent = isLegendary ? '1% 月兔天選' : '中秋限定';
    $('#result-name').textContent = result.name; $('#result-blessing').textContent = blessingWithSupports(result);
    $('#result-ingredients').innerHTML = isLegendary
      ? result.ingredients.map((ingredient) => `<span>${ingredient}</span>`).join('')
      : state.picks.map((pick, index) => `<span>${index === 0 ? '主' : '副'}·${pick.icon} ${pick.name}</span>`).join('');
    $('#result-supports').innerHTML = isLegendary
      ? `<span class="support-label">天選效果</span>${result.effects.map(([title, detail]) => `<p class="result-support"><b>${title}：</b>${detail}</p>`).join('')}`
      : `<span class="support-label">副效果</span>${state.picks.slice(1).map((pick) => `<p class="result-support"><b>${pick.name}：</b>${SUPPORT_BLESSINGS[pick.result].suffix}</p>`).join('')}`;
    drawResultPastry(result);
    showScreen('result');
  }
  function downloadResultCard() {
    const resultName = $('#result-name').textContent.trim();
    const ingredients = [...document.querySelectorAll('#result-ingredients span')].map((item) => item.textContent.trim()).join('　');
    const effectLabel = $('#result-supports .support-label').textContent.trim();
    const effects = [...document.querySelectorAll('#result-supports .result-support')].map((item) => item.textContent.trim());
    const blessing = $('#result-blessing').textContent.trim();
    const greeting = '又到中秋佳節，祝大家花好月圓、人團圓，佳節愉快！也別忘了和朋友分享這份中秋麻糬，把祝福一起送出去～';
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    const drawWrapped = (text, x, y, width, lineHeight, font, color) => {
      ctx.font = font;
      ctx.fillStyle = color;
      const lines = [];
      let line = '';
      for (const char of text) {
        if (ctx.measureText(line + char).width > width && line) { lines.push(line); line = char; }
        else line += char;
      }
      if (line) lines.push(line);
      lines.forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight));
      return y + lines.length * lineHeight;
    };

    const background = ctx.createLinearGradient(0, 0, 1080, 1350);
    background.addColorStop(0, '#351720');
    background.addColorStop(.55, '#1f1120');
    background.addColorStop(1, '#0d0a14');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 210, 125, .58)';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, 984, 1254);
    ctx.fillStyle = '#f4c970';
    ctx.font = '800 34px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('月兔搗麻糬', 540, 136);
    ctx.fillStyle = '#fff0c8';
    ctx.font = '900 58px "Noto Serif TC", serif';
    ctx.fillText(resultName, 540, 220);
    ctx.textAlign = 'left';

    let y = 312;
    const section = (label, text, color = '#efe2ce') => {
      ctx.fillStyle = '#f4c970';
      ctx.font = '800 30px "Noto Sans TC", sans-serif';
      ctx.fillText(label, 108, y);
      y += 54;
      y = drawWrapped(text, 108, y, 864, 48, '400 31px "Noto Sans TC", sans-serif', color) + 42;
      ctx.strokeStyle = 'rgba(255, 210, 125, .22)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(108, y); ctx.lineTo(972, y); ctx.stroke();
      y += 52;
    };
    section('核心配方', ingredients, '#fff3d9');
    section('麻糬寓意', blessing, '#ffe3a3');
    section(effectLabel, effects.join('　'), '#e8dac4');
    section('中秋祝福', greeting, '#cdbba5');

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `月兔搗麻糬-${resultName || '我的結果'}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    flash('結果卡已下載');
  }
  function restart() { state.picks = []; state.selected = null; updateMix('#fffdf5'); updateSelectionUI(); renderIngredients(); selectedInfo.classList.add('is-empty'); selectedInfo.innerHTML = '<span class="selected-icon">✦</span><div><strong>請挑選主食材</strong><span>它會決定這顆月餅的核心祝福</span></div>'; addButton.disabled = true; showScreen('start'); }
  function flash(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2600); }

  $('#start-btn').addEventListener('click', () => { updateSelectionUI(); renderIngredients(); showScreen('select'); });
  addButton.addEventListener('click', addIngredient);
  $('#restart-btn').addEventListener('click', restart);
  $('#share-btn').addEventListener('click', downloadResultCard);
})();
