(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  const screens = {
    start: $('#start-screen'),
    game: $('#game-screen'),
    result: $('#result-screen')
  };

  // ============================================================================
  // 1. 純 Web Audio API 合成音效引擎 (免外部音檔、零延遲)
  // ============================================================================
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }

    // 手電筒開關咔嗒聲
    playSwitch() {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    }

    // 擊中幽靈/南瓜魔力雷射音效
    playZap(combo = 1) {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = Math.min(900, 440 + combo * 35);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + 0.14);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }

    // 拾取糖果清脆叮咚聲
    playCandy() {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    }

    // 超能電池充能音效
    playPowerup() {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      [440, 554, 659, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.045);
        gain.gain.setValueAtTime(0.2, now + idx * 0.045);
        gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.045 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.12);
      });
    }

    // 結算勝利音效
    playVictory() {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.22, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.008, now + idx * 0.09 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.28);
      });
    }
  }

  const sfx = new SoundFX();

  // ============================================================================
  // 2. 萬聖節目標類型與結算稱號資料庫
  // ============================================================================
  const ENTITY_TYPES = {
    ghost: {
      id: 'ghost',
      name: '調皮幽靈',
      icon: '👻',
      score: 100,
      speed: 1.35,
      lockNeed: 0.22,
      glow: '#34d399',
      particles: ['#34d399', '#a7f3d0', '#ffffff']
    },
    pumpkin: {
      id: 'pumpkin',
      name: '搗蛋南瓜',
      icon: '🎃',
      score: 150,
      speed: 1.65,
      lockNeed: 0.25,
      glow: '#fb923c',
      particles: ['#fb923c', '#fde047', '#f97316']
    },
    candy: {
      id: 'candy',
      name: '萬聖糖果',
      icon: '🍬',
      altIcon: '🍭',
      score: 120,
      speed: 0.85,
      lockNeed: 0.1,
      glow: '#c084fc',
      particles: ['#c084fc', '#38bdf8', '#34d399']
    },
    bat: {
      id: 'bat',
      name: '暗夜小蝙蝠',
      icon: '🦇',
      score: 240,
      speed: 2.5,
      lockNeed: 0.18,
      glow: '#22d3ee',
      particles: ['#22d3ee', '#818cf8', '#f472b6']
    },
    battery: {
      id: 'battery',
      name: '超能手電筒電池',
      icon: '🔋',
      score: 80,
      speed: 0.7,
      lockNeed: 0.08,
      glow: '#38bdf8',
      particles: ['#7dd3fc', '#38bdf8', '#a7f3d0']
    },
    cursedSkull: {
      id: 'cursedSkull',
      name: '詛咒骷髏',
      icon: '☠️',
      score: -220,
      speed: 1.15,
      lockNeed: 0.2,
      glow: '#fb7185',
      particles: ['#fb7185', '#f43f5e', '#fda4af']
    }
  };

  const BONUS_TARGETS = [
    { name: '木乃伊', src: 'assets/mummy.png' },
    { name: '南瓜燈', src: 'assets/pumpkin.png' }
  ].map((target) => {
    const image = new Image();
    image.src = target.src;
    return { ...target, image };
  });
  // 以開局後經過的秒數計算；每種圖片每局只登場一次。
  const BONUS_WINDOWS = [
    { start: 10, end: 15, typeIndex: 1 }, // 南瓜燈
    { start: 20, end: 25, typeIndex: 0 }  // 木乃伊
  ];
  function bonusTypeAt(elapsed) {
    const window = BONUS_WINDOWS.find(({ start, end }) => elapsed >= start && elapsed < end);
    return window ? window.typeIndex : null;
  }
  const BONUS_SCORE = 5;
  const BONUS_HIT_COOLDOWN = 0.5;

  const ARCHETYPES = {
    cursedBerserker: {
      badge: 'CURSED BERSERKER',
      name: '狂亂降臨・詛咒吞噬者',
      revelation: '你從不畏懼深淵，甚至敢於直面混亂與反噬。常人避之不及的陷阱，對你而言不過是這場午夜狂歡的興奮劑。願這股狂放的生命力，成為你突破一切常規與束縛的破壞力。',
      inscription: '擁抱陰影的人，終將學會在黑夜中狂舞。'
    },
    tempestStriker: {
      badge: 'TEMPEST STRIKER',
      name: '瞬影無雙・破夜疾風',
      revelation: '極致的專注與節奏感！你的出手沒有猶豫，黑夜在你的連鎖疾風中顫抖。這份沉著敏捷的反射神經，讓你在任何突如其來的風暴裡，都能掌控全場節奏、一擊制勝。',
      inscription: '疾風不需要提燈，速度本身就是撕裂黑暗的芒刺。'
    },
    legendary: {
      badge: 'PHANTOM LEGEND',
      name: '萬聖天選・死神守夜人',
      revelation: '無可挑剔的完美掌控！在光影錯落的幻象中，你的判斷精準無誤，未讓任何一道破綻趁虛而入。願這份強大且沉穩的意志，成為你最堅固的護盾，讓榮光與幸運一路伴隨。',
      inscription: '致敬那位在群魔亂舞之夜，依然守住清醒與秩序的守夜人。'
    },
    candyTycoon: {
      badge: 'CANDY TYCOON',
      name: '甜度爆表・萬聖糖果大亨',
      revelation: '天生自帶療癒魔法的你，比起爭鬥，更懂得在險境中萃取甜蜜與樂趣。願生活裡那些不期而遇的小驚喜，像今晚落入懷中的糖果一樣接連不斷，溫柔治癒你所有的奔波。',
      inscription: '敬生活裡微小但確切的甜意，那是對抗苦澀的終極魔法。'
    },
    pumpkinKing: {
      badge: 'JACK-O-LANTERN KING',
      name: '南瓜王國・狂歡派對王',
      revelation: '熱情而溫暖，你就像南瓜燈裡燃燒的火苗，點亮了整座寂靜的荒城。願你這份無所保留的生命力能感染身邊每場相遇，在未來的每一場冒險裡收穫滿溢的歡笑與同行者。',
      inscription: '只要點燃一盞南瓜燈，整片荒野都是我們的狂歡殿堂。'
    },
    ghostHunter: {
      badge: 'GHOST SHADOW HUNTER',
      name: '萬聖主宰・幽靈獵手',
      revelation: '你眼底容不下迷霧，夜幕中的躁動與虛張聲勢，在你眼裡皆無所遁形。願你的直覺始終銳利如初，無論前路藏著多少未知的阻礙，都能被你一一淨化瓦解。',
      inscription: '黑夜藏得住恐懼，卻藏不住獵手的眼睛。'
    },
    sharpshooter: {
      badge: 'GHOSTBUSTER ACE',
      name: '午夜傳奇・幽靈神射手',
      revelation: '敏銳如果斷，你在最深沉的混亂中總能精準捕捉關鍵目標。願你的勇氣化作不滅的光焰，勇敢擊退生活裡的所有難題，所有的猶豫都將在你的果決前退散。',
      inscription: '驅散暗夜者，終會看清黎明綻放的方向。'
    },
    nightWatcher: {
      badge: 'MIDNIGHT EXPLORER',
      name: '提燈漫步・星夜守望者',
      revelation: '不疾不徐，你按照自己的步調悠遊在長夜裡，這份自若是一股堅韌的力量。願你握緊手中的提燈，從容穿過每一段黑夜，並在驀然回首時，看見滿天星河早已為你亮起。',
      inscription: '不必跑得比影子快，只要步伐未曾停歇。'
    },
    sleepwalkingGuest: {
      badge: 'SLEEPWALKING GUEST',
      name: '夢遊仙境・迷途冒險家',
      revelation: '你只是在萬聖夜稍微打了個盹，或者正陶醉在夜風的奇幻氛圍裡。比起計較分數，享受過程本身就是一種稀缺的浪漫。今晚的月光只負責陪伴你，剩下的故事留給下次冒險。',
      inscription: '迷路也是旅程的一部分，祝你夢裡也有南瓜香氣。'
    }
  };

  // ============================================================================
  // 3. 封面手電筒預覽小動畫 (Hero Preview Canvas)
  // ============================================================================
  function initHeroPreview() {
    const canvas = $('#hero-preview-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const previewItems = [
      { icon: '👻', x: 82, y: 80, phase: 0 },
      { icon: '🎃', x: 185, y: 115, phase: 1.5 },
      { icon: '🍬', x: 278, y: 74, phase: 3.1 },
      { icon: '🍭', x: 132, y: 155, phase: 4.2 },
      { icon: '🦇', x: 245, y: 150, phase: 2.4 }
    ];

    function renderPreview(now) {
      if (screens.start.classList.contains('active')) {
        ctx.clearRect(0, 0, w, h);

        // 手電筒自動8字形巡邏座標
        const t = now * 0.0018;
        const bx = w * 0.5 + Math.sin(t) * 95;
        const by = h * 0.48 + Math.cos(t * 1.7) * 42;
        const radius = 72;

        // 底層暗夜洋館地磚格紋
        ctx.fillStyle = '#090d18';
        ctx.fillRect(0, 0, w, h);

        // 手電筒打光地板區 (讓照射處明顯變亮)
        const floorLight = ctx.createRadialGradient(bx, by, 4, bx, by, radius);
        floorLight.addColorStop(0, 'rgba(255, 244, 200, 0.38)');
        floorLight.addColorStop(0.65, 'rgba(139, 92, 246, 0.22)');
        floorLight.addColorStop(1, 'rgba(9, 13, 24, 0)');
        ctx.fillStyle = floorLight;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(196, 181, 253, 0.22)';
        ctx.lineWidth = 1;
        for (let gx = 0; gx < w; gx += 36) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
          ctx.stroke();
        }
        for (let gy = 0; gy < h; gy += 36) {
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
          ctx.stroke();
        }

        // 繪製隱藏角色
        ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        previewItems.forEach((item) => {
          const iy = item.y + Math.sin(t * 2 + item.phase) * 6;
          ctx.fillText(item.icon, item.x, iy);
          const dist = Math.hypot(item.x - bx, iy - by);
          if (dist < radius * 0.85) {
            ctx.save();
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(item.x, iy, 22, 0, Math.PI * 2);
            ctx.stroke();
            ctx.font = 'bold 11px sans-serif';
            ctx.fillStyle = '#34d399';
            ctx.fillText('👆TAP!', item.x, iy - 27);
            ctx.restore();
          }
        });

        // 黑暗迷霧遮罩 (中間完全透明不遮擋，外圍全黑，不擦除底圖)
        ctx.save();
        const fogGrad = ctx.createRadialGradient(bx, by, radius * 0.35, bx, by, radius);
        fogGrad.addColorStop(0, 'rgba(4, 5, 9, 0)');
        fogGrad.addColorStop(0.7, 'rgba(4, 5, 9, 0.12)');
        fogGrad.addColorStop(0.9, 'rgba(4, 5, 9, 0.78)');
        fogGrad.addColorStop(1, 'rgba(4, 5, 9, 0.96)');
        ctx.fillStyle = fogGrad;
        ctx.fillRect(0, 0, w, h);

        // 手電筒雷達準星外框
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.arc(bx, by, radius * 0.88, t, t + Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      requestAnimationFrame(renderPreview);
    }

    requestAnimationFrame(renderPreview);
  }

  // ============================================================================
  // 4. 手電筒射擊主遊戲引擎 (FlashlightGame)
  // ============================================================================
  class FlashlightGame {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.touch = {
        x: this.width / 2,
        y: this.height / 2,
        rawX: this.width / 2,
        rawY: this.height / 2 + 55,
        targetX: this.width / 2,
        targetY: this.height / 2,
        baseRadius: 102,
        offsetY: -55, // 遵循 web.md 手指遮擋偏移 55px
        isActive: false
      };

      this.entities = [];
      this.bonusTarget = null;
      this.bonusHitCooldown = 0;
      this.particles = [];
      this.floatingTexts = [];
      this.lasers = [];

      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.comboTimer = 0;
      this.superBeamTimer = 0;
      this.screenShake = 0;

      this.counts = { ghost: 0, pumpkin: 0, candy: 0, bat: 0, battery: 0, cursedSkull: 0 };
      this.duration = 30;
      this.timeLeft = this.duration;
      this.state = 'IDLE';

      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.bindEvents();
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (this.bonusTarget) {
        this.placeBonusTarget(this.bonusTarget.typeIndex, this.bonusTarget.side);
      }
    }

    bindEvents() {
      let tapStartTime = 0;
      let tapStartX = 0;
      let tapStartY = 0;
      let shotOnTouchStart = false;

      const setTarget = (clientX, clientY, isTouch) => {
        const offset = isTouch ? this.touch.offsetY : 0;
        this.touch.rawX = clientX;
        this.touch.rawY = clientY;
        this.touch.targetX = Math.max(40, Math.min(this.width - 40, clientX));
        this.touch.targetY = Math.max(75, Math.min(this.height - 65, clientY + offset));
        this.touch.isActive = true;
      };

      // 手機觸控：滑動移動手電筒，點擊觸發消滅怪物
      this.canvas.addEventListener('touchstart', (e) => {
        if (this.state !== 'PLAYING') return;
        e.preventDefault();
        const t = e.changedTouches[0];
        tapStartTime = performance.now();
        tapStartX = t.clientX;
        tapStartY = t.clientY;
        shotOnTouchStart = false;

        // 若點擊處已有被照亮的怪物（直接點怪物圖示或點光圈範圍），立即擊破！
        if (this.tryShootAt(t.clientX, t.clientY, true)) {
          shotOnTouchStart = true;
          return;
        }

        setTarget(t.clientX, t.clientY, true);
      }, { passive: false });

      this.canvas.addEventListener('touchmove', (e) => {
        if (this.state !== 'PLAYING') return;
        e.preventDefault();
        const t = e.touches[0];
        setTarget(t.clientX, t.clientY, true);
      }, { passive: false });

      this.canvas.addEventListener('touchend', (e) => {
        if (this.state !== 'PLAYING') return;
        e.preventDefault();
        if (shotOnTouchStart) return;
        const t = e.changedTouches[0];
        const elapsed = performance.now() - tapStartTime;
        const moveDist = Math.hypot(t.clientX - tapStartX, t.clientY - tapStartY);
        // 輕點一下 (Tap) 觸發射擊
        if (elapsed < 280 && moveDist < 24) {
          this.touch.x = this.touch.targetX;
          this.touch.y = this.touch.targetY;
          this.tryShootAt(t.clientX, t.clientY, true, true);
        }
      }, { passive: false });

      // 電腦滑鼠：移動手電筒，左鍵點擊消滅怪物
      this.canvas.addEventListener('mousemove', (e) => {
        if (this.state !== 'PLAYING') return;
        setTarget(e.clientX, e.clientY, false);
      });

      this.canvas.addEventListener('mousedown', (e) => {
        if (this.state !== 'PLAYING') return;
        setTarget(e.clientX, e.clientY, false);
        this.touch.x = this.touch.targetX;
        this.touch.y = this.touch.targetY;
        this.tryShootAt(e.clientX, e.clientY, false, true);
      });
    }

    startRound() {
      this.resize();
      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.comboTimer = 0;
      this.superBeamTimer = 0;
      this.screenShake = 0;
      this.timeLeft = this.duration;
      this.counts = { ghost: 0, pumpkin: 0, candy: 0, bat: 0, battery: 0, cursedSkull: 0 };

      this.entities = [];
      this.bonusTarget = null;
      this.bonusHitCooldown = 0;
      this.particles = [];
      this.floatingTexts = [];
      this.lasers = [];

      this.touch.x = this.width / 2;
      this.touch.y = this.height / 2;
      this.touch.targetX = this.width / 2;
      this.touch.targetY = this.height / 2;

      for (let i = 0; i < 2; i++) this.spawnEntity('ghost');
      this.spawnEntity('pumpkin');
      this.spawnEntity('candy');
      this.spawnEntity('bat');
      this.spawnEntity('cursedSkull');

      this.state = 'PLAYING';
      this.updateHUD();
    }

    spawnEntity(forcedType = null) {
      const pool = ['ghost', 'ghost', 'pumpkin', 'candy', 'candy', 'bat'];
      if (!this.entities.some((ent) => ent.type === 'cursedSkull')) {
        pool.push('cursedSkull');
      }
      if (this.superBeamTimer <= 0 && Math.random() < 0.14) {
        pool.push('battery');
      }
      const typeKey = forcedType || pool[Math.floor(Math.random() * pool.length)];
      const spec = ENTITY_TYPES[typeKey];

      const marginX = 48;
      const topMargin = 95;
      const bottomMargin = 85;
      let x;
      let y;
      for (let attempt = 0; attempt < 12; attempt++) {
        x = marginX + Math.random() * Math.max(80, this.width - marginX * 2);
        y = topMargin + Math.random() * Math.max(120, this.height - topMargin - bottomMargin);
        if (this.entities.every((ent) => Math.hypot(ent.x - x, ent.y - y) >= 64)) break;
      }
      const angle = Math.random() * Math.PI * 2;

      this.entities.push({
        type: typeKey,
        spec,
        icon: typeKey === 'candy' && Math.random() < 0.45 ? spec.altIcon : spec.icon,
        x,
        y,
        vx: Math.cos(angle) * spec.speed,
        vy: Math.sin(angle) * spec.speed,
        radius: 26,
        lockProgress: 0,
        illuminated: false,
        bobPhase: Math.random() * Math.PI * 2,
        scale: 0.2
      });
    }

    bonusTargetSize() {
      return Math.min(304, Math.max(232, this.width * 0.72), this.height * 0.5);
    }

    placeBonusTarget(typeIndex, preferredSide = null) {
      const size = this.bonusTargetSize();
      const side = typeIndex === 0 ? (preferredSide || (Math.random() < 0.5 ? 'left' : 'right')) : null;
      const x = typeIndex === 0
        ? (side === 'left' ? size * 0.32 : this.width - size * 0.32)
        : this.width / 2;
      const bottomY = this.height - 76 - size / 2;
      const topY = Math.min(bottomY, 105 + size / 2);
      const y = typeIndex === 0
        ? topY + Math.random() * Math.max(0, bottomY - topY)
        : bottomY;
      this.bonusTarget = { typeIndex, side, x, y, phase: Math.random() * Math.PI * 2 };
      this.bonusHitCooldown = 0;
    }

    currentBeamRadius() {
      const base = this.superBeamTimer > 0 ? this.touch.baseRadius * 1.48 : this.touch.baseRadius;
      const flicker = Math.sin(performance.now() * 0.012) * 2.5 + (Math.random() - 0.5) * 1.8;
      return Math.max(75, base + flicker);
    }

    tryShootAt(clientX, clientY, isTouch = false, showEmptyLaser = false) {
      const beamR = this.currentBeamRadius();
      const bonus = this.bonusTarget;
      const bonusSize = this.bonusTargetSize();
      const bonusHalfWidth = bonus && bonus.typeIndex === 0 ? bonusSize * 0.25 : bonusSize * 0.42;
      if (bonus && Math.abs(bonus.x - clientX) <= bonusHalfWidth &&
          Math.abs(bonus.y - clientY) <= bonusSize * 0.43 &&
          Math.hypot(clientX - this.touch.x, clientY - this.touch.y) <= beamR * 0.92) {
        if (this.bonusHitCooldown <= 0) this.hitBonusTarget();
        return true;
      }
      let targetIndex = -1;
      let nearest = Infinity;

      for (let i = 0; i < this.entities.length; i++) {
        const ent = this.entities[i];
        const distToBeam = Math.hypot(ent.x - this.touch.x, ent.y - this.touch.y);
        const distToTap = Math.hypot(ent.x - clientX, ent.y - clientY);

        // 一次只命中一個目標；直接點中的目標優先，避免一發清空整個光圈。
        if (distToBeam <= beamR * 0.92 || (ent.illuminated && distToTap <= 64)) {
          const priority = distToTap <= 54 ? distToTap : 1000 + distToBeam;
          if (priority < nearest) {
            nearest = priority;
            targetIndex = i;
          }
        }
      }

      if (targetIndex >= 0) {
        const ent = this.entities[targetIndex];
        if (isTouch && Math.hypot(ent.x - clientX, ent.y - clientY) <= 64) {
          this.touch.targetX = ent.x;
          this.touch.targetY = ent.y;
          this.touch.x = ent.x;
          this.touch.y = ent.y;
        }
        this.captureEntity(targetIndex);
      }

      if (targetIndex < 0 && showEmptyLaser) {
        this.lasers.push({
          x1: this.width / 2,
          y1: this.height,
          x2: this.touch.x,
          y2: this.touch.y,
          color: '#22d3ee',
          life: 0.14,
          maxLife: 0.14
        });
      }

      return targetIndex >= 0;
    }

    hitBonusTarget() {
      const bonus = this.bonusTarget;
      if (!bonus) return;
      this.score += BONUS_SCORE;
      this.bonusHitCooldown = BONUS_HIT_COOLDOWN;
      this.floatingTexts.push({
        text: `+${BONUS_SCORE} 彩蛋！`,
        x: bonus.x,
        y: bonus.y - 42,
        color: '#fbbf24',
        life: 0.7
      });
      this.lasers.push({
        x1: this.touch.x,
        y1: Math.min(this.height - 20, this.touch.y + 110),
        x2: bonus.x,
        y2: bonus.y,
        color: '#fbbf24',
        life: 0.15,
        maxLife: 0.15
      });
      sfx.playCandy();
      this.updateHUD();
    }

    captureEntity(index) {
      const ent = this.entities[index];
      if (!ent) return;
      this.entities.splice(index, 1);

      this.counts[ent.type] = (this.counts[ent.type] || 0) + 1;
      const isPenalty = ent.type === 'cursedSkull';
      if (isPenalty) {
        this.combo = 0;
        this.comboTimer = 0;
        this.score = Math.max(0, this.score + ent.spec.score);
      } else {
        this.combo += 1;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        this.comboTimer = 2.6;
      }

      const comboBonus = isPenalty ? 0 : Math.min(100, (this.combo - 1) * 15);
      const earned = ent.spec.score + comboBonus;
      if (!isPenalty) this.score += earned;

      if (ent.type === 'candy') {
        sfx.playCandy();
      } else if (ent.type === 'battery') {
        this.superBeamTimer = 5.0;
        sfx.playPowerup();
        this.floatingTexts.push({
          text: '⚡ 超廣角強光 5秒！',
          x: ent.x,
          y: ent.y - 26,
          color: '#22d3ee',
          life: 1.1
        });
      } else {
        sfx.playZap(this.combo);
      }

      if (navigator.vibrate) {
        navigator.vibrate(ent.type === 'candy' ? 20 : 40);
      }

      this.lasers.push({
        x1: this.touch.x,
        y1: Math.min(this.height - 20, this.touch.y + 110),
        x2: ent.x,
        y2: ent.y,
        color: ent.spec.glow,
        life: 0.2,
        maxLife: 0.2
      });

      for (let p = 0; p < 14; p++) {
        const angle = (Math.PI * 2 * p) / 14 + (Math.random() - 0.5) * 0.3;
        const speed = 1.8 + Math.random() * 4.2;
        const palette = ent.spec.particles;
        this.particles.push({
          x: ent.x,
          y: ent.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          size: 3 + Math.random() * 4,
          color: palette[p % palette.length],
          life: 0.55 + Math.random() * 0.25
        });
      }

      const label = isPenalty ? `${earned} 詛咒！連擊歸零` :
        this.combo >= 3 ? `+${earned} 🔥x${this.combo}` : `+${earned}`;
      this.floatingTexts.push({
        text: label,
        x: ent.x,
        y: ent.y - 10,
        color: ent.spec.glow,
        life: 0.85
      });

      this.screenShake = isPenalty ? 6 : ent.type === 'pumpkin' || ent.type === 'bat' ? 4 : 2;

      if (this.entities.length < 6) this.spawnEntity();

      this.updateHUD();
    }

    update(dt) {
      if (this.state !== 'PLAYING') return;

      this.timeLeft = Math.max(0, this.timeLeft - dt);
      if (this.timeLeft <= 0) {
        this.finishRound();
        return;
      }

      const scheduledBonus = bonusTypeAt(this.duration - this.timeLeft);
      const currentBonus = this.bonusTarget ? this.bonusTarget.typeIndex : null;
      if (scheduledBonus !== currentBonus) {
        if (scheduledBonus === null) {
          this.bonusTarget = null;
        } else {
          this.placeBonusTarget(scheduledBonus);
        }
      }
      this.bonusHitCooldown = Math.max(0, this.bonusHitCooldown - dt);

      if (this.superBeamTimer > 0) {
        this.superBeamTimer = Math.max(0, this.superBeamTimer - dt);
      }
      if (this.comboTimer > 0) {
        this.comboTimer -= dt;
        if (this.comboTimer <= 0) {
          this.combo = 0;
        }
      }
      if (this.screenShake > 0) {
        this.screenShake = Math.max(0, this.screenShake - dt * 18);
      }

      this.touch.x += (this.touch.targetX - this.touch.x) * 0.24;
      this.touch.y += (this.touch.targetY - this.touch.y) * 0.24;

      const beamR = this.currentBeamRadius();

      for (let i = this.entities.length - 1; i >= 0; i--) {
        const ent = this.entities[i];
        ent.bobPhase += dt * 4.5;
        if (ent.scale < 1) ent.scale = Math.min(1, ent.scale + dt * 4);

        const dist = Math.hypot(ent.x - this.touch.x, ent.y - this.touch.y);
        ent.illuminated = dist < beamR * 0.86;

        if (ent.illuminated) {
          // 被手電筒照亮時受驚減速，等待玩家點擊擊破（不自動消滅）
          ent.x += ent.vx * 0.35;
          ent.y += ent.vy * 0.35;
          ent.lockProgress = Math.min(1, ent.lockProgress + dt * 3);
        } else {
          ent.x += ent.vx;
          ent.y += ent.vy;
          ent.lockProgress = 0;
        }

        const padX = 36;
        const topPad = 88;
        const botPad = 76;
        if (ent.x < padX) { ent.x = padX; ent.vx *= -1; }
        if (ent.x > this.width - padX) { ent.x = this.width - padX; ent.vx *= -1; }
        if (ent.y < topPad) { ent.y = topPad; ent.vy *= -1; }
        if (ent.y > this.height - botPad) { ent.y = this.height - botPad; ent.vy *= -1; }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.life -= dt;
        if (p.life <= 0) this.particles.splice(i, 1);
      }

      for (let i = this.lasers.length - 1; i >= 0; i--) {
        this.lasers[i].life -= dt;
        if (this.lasers[i].life <= 0) this.lasers.splice(i, 1);
      }

      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const ft = this.floatingTexts[i];
        ft.y -= 36 * dt;
        ft.life -= dt;
        if (ft.life <= 0) this.floatingTexts.splice(i, 1);
      }

      this.updateHUD();
    }

    updateHUD() {
      $('#hud-score').textContent = this.score;
      $('#hud-time').textContent = Math.ceil(this.timeLeft);
      const pct = Math.max(0, (this.timeLeft / this.duration) * 100);
      $('#hud-timer-fill').style.width = `${pct}%`;

      const comboEl = $('#hud-combo');
      if (this.superBeamTimer > 0) {
        comboEl.textContent = `⚡ 超廣角強光中 (${this.superBeamTimer.toFixed(1)}s)`;
      } else if (this.combo >= 2) {
        comboEl.textContent = `🔥 連擊 COMBO x${this.combo}！`;
      } else {
        comboEl.textContent = '🔦 移動手電筒照亮目標';
      }
    }

    render() {
      if (this.state !== 'PLAYING') return;
      const ctx = this.ctx;
      ctx.save();

      if (this.screenShake > 0) {
        const sx = (Math.random() - 0.5) * this.screenShake;
        const sy = (Math.random() - 0.5) * this.screenShake;
        ctx.translate(sx, sy);
      }

      ctx.clearRect(0, 0, this.width, this.height);

      // 1. 底層：暗夜洋館地板格紋
      this.renderCastleFloor(ctx);

      // 2. 底層實體
      this.renderEntities(ctx);

      // 3. 全域黑霧遮罩
      this.renderFlashlightFog(ctx);

      // 4. 限時大型圖片彩蛋保留暗處輪廓，靠近手電筒時完整亮起
      this.renderBonusTarget(ctx);

      // 5. 頂層光束、粒子與得分飄字
      this.renderEffects(ctx);

      ctx.restore();
    }

    renderCastleFloor(ctx) {
      const beamR = this.currentBeamRadius();
      const bx = this.touch.x;
      const by = this.touch.y;

      // 底層暗夜背景
      ctx.fillStyle = '#090d18';
      ctx.fillRect(0, 0, this.width, this.height);

      // 手電筒照亮的地板強光區 (讓手電筒移到的地方真正被打亮！)
      const floorSpot = ctx.createRadialGradient(bx, by, 6, bx, by, beamR);
      if (this.superBeamTimer > 0) {
        floorSpot.addColorStop(0, 'rgba(224, 242, 254, 0.48)');
        floorSpot.addColorStop(0.65, 'rgba(34, 211, 238, 0.25)');
      } else {
        floorSpot.addColorStop(0, 'rgba(255, 247, 214, 0.44)');
        floorSpot.addColorStop(0.65, 'rgba(139, 92, 246, 0.24)');
      }
      floorSpot.addColorStop(1, 'rgba(9, 13, 24, 0)');
      ctx.fillStyle = floorSpot;
      ctx.beginPath();
      ctx.arc(bx, by, beamR, 0, Math.PI * 2);
      ctx.fill();

      // 洋館石磚格紋 (被照亮處會非常清晰)
      const tile = 54;
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.18)';
      ctx.lineWidth = 1;
      for (let y = 0; y < this.height; y += tile) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
        ctx.stroke();

        const offset = (Math.floor(y / tile) % 2) * (tile / 2);
        for (let x = offset; x < this.width; x += tile) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + tile);
          ctx.stroke();
        }
      }

      ctx.save();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.16)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, 110, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    renderEntities(ctx) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      this.entities.forEach((ent) => {
        const bobY = Math.sin(ent.bobPhase) * 5;
        const jitterX = ent.illuminated ? (Math.random() - 0.5) * 4 : 0;
        const drawX = ent.x + jitterX;
        const drawY = ent.y + bobY;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.scale(ent.scale, ent.scale);

        const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 30);
        glow.addColorStop(0, `${ent.spec.glow}55`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '36px sans-serif';
        ctx.fillText(ent.icon, 0, 0);

        if (ent.illuminated) {
          ctx.strokeStyle = ent.spec.glow;
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.font = 'bold 12px sans-serif';
          ctx.fillStyle = ent.type === 'cursedSkull' ? '#fb7185' : '#34d399';
          ctx.fillText(ent.type === 'cursedSkull' ? '⚠ -220' : '👆TAP', 0, -28);
        }

        ctx.restore();
      });
    }

    renderBonusTarget(ctx) {
      const bonus = this.bonusTarget;
      if (!bonus) return;
      const target = BONUS_TARGETS[bonus.typeIndex];
      if (!target.image.complete || !target.image.naturalWidth) return;
      const size = this.bonusTargetSize();
      const nearX = Math.max(0, Math.abs(bonus.x - this.touch.x) - size * 0.3);
      const nearY = Math.max(0, Math.abs(bonus.y - this.touch.y) - size * 0.4);
      const lit = Math.hypot(nearX, nearY) <= this.currentBeamRadius() * 0.86;
      const bobY = Math.sin(bonus.phase + performance.now() * 0.003) * 5;

      ctx.save();
      ctx.translate(bonus.x, bonus.y + bobY);
      if (lit) {
        const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, size * 0.7);
        glow.addColorStop(0, 'rgba(251, 191, 36, 0.28)');
        glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = lit ? 1 : 0.28;
      ctx.drawImage(target.image, -size / 2, -size / 2, size, size);
      ctx.globalAlpha = 1;
      if (lit) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.44, 0, Math.PI * 2);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`連點 +${BONUS_SCORE}`, 0, -size * 0.52);
      }
      ctx.restore();
    }

    renderFlashlightFog(ctx) {
      const beamR = this.currentBeamRadius();
      const bx = this.touch.x;
      const by = this.touch.y;

      // 全域黑霧遮罩（光圈中心完全透明 0%，讓底層被打亮的地板與怪物 100% 清晰顯現；外圍 96% 濃黑）
      ctx.save();
      const fogGrad = ctx.createRadialGradient(bx, by, beamR * 0.38, bx, by, beamR);
      fogGrad.addColorStop(0, 'rgba(3, 4, 8, 0)');
      fogGrad.addColorStop(0.72, 'rgba(3, 4, 8, 0.1)');
      fogGrad.addColorStop(0.9, 'rgba(3, 4, 8, 0.78)');
      fogGrad.addColorStop(1, 'rgba(3, 4, 8, 0.96)');

      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, this.width, this.height);

      // 手電筒雷達準星外框與十字中心
      ctx.strokeStyle = this.superBeamTimer > 0
        ? 'rgba(34, 211, 238, 0.8)'
        : 'rgba(52, 211, 153, 0.72)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([8, 6]);
      const rot = performance.now() * 0.0012;
      ctx.beginPath();
      ctx.arc(bx, by, beamR * 0.9, rot, rot + Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(bx - 8, by);
      ctx.lineTo(bx + 8, by);
      ctx.moveTo(bx, by - 8);
      ctx.lineTo(bx, by + 8);
      ctx.stroke();
      ctx.restore();
    }

    renderEffects(ctx) {
      this.lasers.forEach((l) => {
        const alpha = Math.max(0, l.life / l.maxLife);
        ctx.save();
        ctx.strokeStyle = l.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 5 * alpha;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.stroke();
        ctx.restore();
      });

      this.particles.forEach((p) => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.textAlign = 'center';
      ctx.font = '900 18px "Noto Sans TC", sans-serif';
      this.floatingTexts.forEach((ft) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, ft.life * 1.4));
        ctx.fillStyle = ft.color;
        ctx.shadowColor = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur = 6;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });
    }

    finishRound() {
      this.state = 'RESULT';
      sfx.playVictory();
      showResultScreen({
        score: this.score,
        maxCombo: this.maxCombo,
        counts: { ...this.counts }
      });
    }

    loop(now) {
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;
      this.update(dt);
      this.render();
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  // ============================================================================
  // 5. 結算稱號判定、結果卡繪製與高清海報下載
  // ============================================================================
  let currentSummary = null;
  const resultMusic = $('#result-music');
  const resultMusicBtn = $('#result-music-btn');

  function syncMusicButton() {
    const playing = !resultMusic.paused;
    resultMusicBtn.textContent = playing ? '⏸ 暫停結果音樂' : '🎵 播放結果音樂';
    resultMusicBtn.setAttribute('aria-pressed', String(playing));
  }

  function stopResultMusic() {
    resultMusic.pause();
    resultMusic.currentTime = 0;
    syncMusicButton();
  }

  function startResultMusic() {
    if (sfx.muted) return;
    resultMusic.currentTime = 0;
    const attempt = resultMusic.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(syncMusicButton);
    }
  }

  function pickArchetype(stats) {
    const { ghost, pumpkin, candy, bat, cursedSkull } = stats.counts;
    const result = (key) => ({ key, ...ARCHETYPES[key], isLegendary: key === 'legendary' });

    // 判定流水線：隱藏成就 → 風格成就 → 基準實力。先符合者即為結果。
    if (cursedSkull >= 6) return result('cursedBerserker');
    if (stats.maxCombo >= 20) return result('tempestStriker');
    if (stats.score >= 3000 && stats.maxCombo >= 8 && cursedSkull === 0) return result('legendary');
    if (stats.score > 1800 && candy >= 15 && candy >= pumpkin) return result('candyTycoon');
    if (stats.score >= 900 && stats.score <= 1799 && pumpkin >= 8 && pumpkin > candy) return result('pumpkinKing');
    if (stats.score >= 2000 && ghost + bat >= 30) return result('ghostHunter');
    if (stats.score >= 1800) return result('sharpshooter');
    if (stats.score >= 500) return result('nightWatcher');
    return result('sleepwalkingGuest');
  }

  function drawResultTrophy(archetype, stats) {
    const canvas = $('#result-art-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.save();
    const glow = ctx.createRadialGradient(w / 2, h / 2, 12, w / 2, h / 2, 130);
    glow.addColorStop(0, archetype.isLegendary ? 'rgba(34, 211, 238, 0.45)' : 'rgba(139, 92, 246, 0.42)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 130, 0, Math.PI * 2);
    ctx.fill();

    // 霓虹雷達底座
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 34, 125, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '60px sans-serif';
    ctx.fillText('👻', w / 2, h / 2 - 4);
    ctx.font = '46px sans-serif';
    ctx.fillText('🎃', w / 2 - 74, h / 2 + 2);
    ctx.fillText('🍬', w / 2 + 74, h / 2 + 4);
    ctx.font = '30px sans-serif';
    ctx.fillText('🦇', w / 2 - 46, h / 2 - 54);
    ctx.fillText('🍭', w / 2 + 48, h / 2 - 50);

    // 總分霓虹膠囊
    ctx.fillStyle = 'rgba(9, 13, 24, 0.95)';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(w / 2 - 82, h - 50, 164, 34, 17);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = '900 16px "Noto Sans TC", sans-serif';
    ctx.fillText(`SCORE · ${stats.score}`, w / 2, h - 32);
    ctx.restore();
  }

  function showResultScreen(stats) {
    const archetype = pickArchetype(stats);
    currentSummary = { archetype, stats };

    $('#result-capture').classList.toggle('is-legendary', archetype.isLegendary);
    $('#result-badge').textContent = archetype.badge;
    $('#result-name').textContent = archetype.name;
    $('#result-revelation').textContent = archetype.revelation;
    $('#result-personal-inscription').textContent = archetype.inscription;

    const { ghost, pumpkin, candy, bat, cursedSkull } = stats.counts;
    $('#result-stats').innerHTML = [
      `<span>🏆 總分 ${stats.score}</span>`,
      `<span>👻 幽靈 ×${ghost}</span>`,
      `<span>🎃 南瓜 ×${pumpkin}</span>`,
      `<span>🍬 糖果 ×${candy}</span>`,
      `<span>🦇 蝙蝠 ×${bat}</span>`,
      `<span>☠️ 詛咒 ×${cursedSkull}</span>`,
      `<span>🔥 最高連擊 ×${stats.maxCombo}</span>`
    ].join('');

    drawResultTrophy(archetype, stats);
    showScreen('result');
    startResultMusic();
  }

  function downloadResultCard() {
    if (!currentSummary) return;
    const { archetype, stats } = currentSummary;

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    const drawWrapped = (text, x, y, maxWidth, lineHeight, font, color) => {
      ctx.font = font;
      ctx.fillStyle = color;
      const lines = [];
      let line = '';
      for (const ch of text) {
        if (ctx.measureText(line + ch).width > maxWidth && line) {
          lines.push(line);
          line = ch;
        } else {
          line += ch;
        }
      }
      if (line) lines.push(line);
      lines.forEach((item, i) => ctx.fillText(item, x, y + i * lineHeight));
      return y + lines.length * lineHeight;
    };

    const bg = ctx.createLinearGradient(0, 0, 1080, 1350);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(0.55, '#090d18');
    bg.addColorStop(1, '#04060b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1350);

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.65)';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, 984, 1254);

    ctx.fillStyle = '#34d399';
    ctx.font = '800 30px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🔦 HALLOWEEN HUNTER · ${archetype.badge}`, 540, 130);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '900 56px "Noto Sans TC", sans-serif';
    ctx.fillText(archetype.name, 540, 215);

    ctx.font = '68px sans-serif';
    ctx.fillText('👻   🎃   🍬   🦇', 540, 310);

    ctx.textAlign = 'left';
    let y = 400;

    const section = (label, text, color = '#e2e8f0') => {
      ctx.fillStyle = '#22d3ee';
      ctx.font = '800 30px "Noto Sans TC", sans-serif';
      ctx.fillText(label, 108, y);
      y += 52;
      y = drawWrapped(text, 108, y, 864, 48, '500 30px "Noto Sans TC", sans-serif', color) + 36;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(108, y);
      ctx.lineTo(972, y);
      ctx.stroke();
      y += 50;
    };

    const { ghost, pumpkin, candy, bat, cursedSkull } = stats.counts;
    const statsLine = `總分 ${stats.score} 分 ｜ 👻 幽靈 ×${ghost}　🎃 南瓜 ×${pumpkin}　🍬 糖果 ×${candy}　🦇 蝙蝠 ×${bat}　☠️ 詛咒 ×${cursedSkull}　🔥 最高連擊 ×${stats.maxCombo}`;
    section('📊 午夜狩獵戰績', statsLine, '#f1f5f9');
    section('🔮 靈魂啟示', archetype.revelation, '#34d399');

    ctx.fillStyle = '#c4b5fd';
    ctx.font = '700 27px "Noto Sans TC", sans-serif';
    ctx.fillText('✦ 專屬銘文', 108, Math.max(y + 10, 1040));
    drawWrapped(archetype.inscription, 108, Math.max(y + 55, 1085), 864, 40, '500 28px "Noto Sans TC", sans-serif', '#e2e8f0');

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `萬聖夜幽靈獵手-${archetype.name}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('👻 萬聖獵人卡已下載！');
  }

  function showScreen(name) {
    Object.values(screens).forEach((el) => el.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo(0, 0);
  }

  function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2500);
  }

  initHeroPreview();
  const game = new FlashlightGame($('#gameCanvas'));
  resultMusic.volume = 0.55;
  ['play', 'pause', 'ended'].forEach((event) => resultMusic.addEventListener(event, syncMusicButton));

  resultMusicBtn.addEventListener('click', () => {
    if (resultMusic.paused) {
      if (sfx.muted) {
        sfx.toggleMute();
        $('#sound-toggle').textContent = '🔊';
        resultMusic.muted = false;
      }
      if (resultMusic.ended) resultMusic.currentTime = 0;
      const attempt = resultMusic.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => showToast('音樂未能播放，請稍後再試'));
      }
    } else {
      resultMusic.pause();
    }
  });

  $('#start-btn').addEventListener('click', () => {
    stopResultMusic();
    sfx.init();
    sfx.playSwitch();
    showScreen('game');
    game.startRound();
  });

  $('#sound-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.init();
    const muted = sfx.toggleMute();
    $('#sound-toggle').textContent = muted ? '🔇' : '🔊';
    resultMusic.muted = muted;
    if (muted) resultMusic.pause();
  });

  $('#restart-btn').addEventListener('click', () => {
    stopResultMusic();
    sfx.init();
    sfx.playSwitch();
    showScreen('game');
    game.startRound();
  });

  $('#share-btn').addEventListener('click', downloadResultCard);
})();
