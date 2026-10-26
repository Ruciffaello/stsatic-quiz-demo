# 萬聖節手機 Web 手電筒遊戲技術規格書 (Technical Specification)

## 1. 專案概述 (Project Overview)
本專案為一款直式（Portrait）手機 Web 萬聖節探險小遊戲。玩家在完全漆黑的密室或墓園中，透過手指觸控滑動手電筒光圈探索環境，需在倒數時間內尋找指定萬聖節道具（如糖果、南瓜燈、鑰匙），同時避開或逃離遊蕩幽靈的追蹤。

* **技術棧**：純前端原生技術（HTML5 Canvas 2D + Vanilla JavaScript ES6+ + CSS3）。
* **目標平台**：行動裝置瀏覽器（iOS Safari / Android Chrome / LINE 內嵌瀏覽器）。
* **無外部依賴**：不依賴大型遊戲引擎（如 Phaser 或 Pixi.js），維持輕量、極速載入（< 300KB）與零依賴部署特性。

---

## 2. 行動端環境與視口防護 (Mobile Viewport & Touch Setup)

手機端 Web 遊戲最容易遭遇**下拉重新整理**、**雙擊縮放**、**手指遮擋光圈**以及**畫面邊界彈跳**等問題。

### 2.1 Viewport 與 CSS 鎖定
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
```

```css
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #050508;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none; /* 徹底禁用瀏覽器滾動與手勢縮放 */
}

#gameCanvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

### 2.2 手指遮擋偏移演算法 (Finger Occlusion Offset)
手機單指操作時，手指肚半徑約 20~30px，若手電筒中心精確落在觸控點，玩家視線會被手指直接遮擋。
* **解法**：手電筒光圈中心點 $Y$ 軸向上平移 $40 \sim 60\text{ px}$。
* **平滑跟隨 (LERP)**：避免手指瞬移造成光影撕裂，採用線性插值平滑過渡。

---

## 3. 核心技術：動態手電筒光影與黑霧遮罩 (Fog of War)

遊戲視覺核心是「全黑迷霧中的局部照明與衰減光暈」。

### 3.1 雙層畫布 vs. 單層複合渲染 (Compositing)
推薦使用 **單一 Canvas 搭配 `globalCompositeOperation = 'destination-out'`** 或 **雙緩衝離屏畫布 (Offscreen Canvas)**。以下採用效能最佳、相容性最高的「遮罩挖空法」：

1. **底層繪製**：繪製背景物件、道具、幽靈、場景細節。
2. **全域黑霧層**：
   * 建立一個與螢幕等大的暗色覆蓋層（如 `rgba(5, 5, 10, 0.96)`，保留極微弱環境光，避免純黑一片失去層次感）。
3. **光圈挖空**：
   * 切換合成模式：`ctx.globalCompositeOperation = 'destination-out'`。
   * 使用徑向漸變（Radial Gradient）在手指位置畫圓，中心完全透明（$alpha = 1$ 在 destination-out 下代表完全挖空），邊緣漸變為透明（$alpha = 0$ 保留黑霧）。
4. **還原合成模式**：`ctx.globalCompositeOperation = 'source-over'`。
5. **光源疊加 (可選)**：用 `source-over` 疊加一層微弱的暖黃色光暈（`rgba(255, 230, 150, 0.15)`）增強手電筒質感。

### 3.2 光圈抖動與手電筒閃爍效能實現
模擬真實手電筒電力不穩：
```javascript
// 每一幀微調半徑，產生呼吸/抖動效果
const baseRadius = 90;
const flicker = Math.sin(Date.now() * 0.01) * 3 + (Math.random() - 0.5) * 2;
const currentRadius = Math.max(70, baseRadius + flicker);
```

---

## 4. 系統架構與狀態機 (State Machine)

```
[ INIT / ASSETS_LOAD ]
         │
         ▼
    [ START_MENU ] ──── (點擊「開始探險」)
         │
         ▼
    [ PLAYING ] ◄────┐
      ├── Update Entities (幽靈遊走/糖果動畫)
      ├── Collision Check (道具收集 / 幽靈驚嚇)
      └── Render Loop (底層 -> 挖空黑霧 -> UI)
         │
         ├──► [ GAME_OVER ] (被幽靈抓到 / 時間耗盡)
         └──► [ VICTORY ]   (收集完全部道具)
```

---

## 5. 核心程式碼骨架 (Core Implementation Skeleton)

以下是可直接執行的最小完整架構，包含高解析度適配、觸控偏移、光影合成與遊戲主循環：

```javascript
class FlashlightGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // 螢幕與高解析度適配 (DPR)
    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // 手電筒狀態
    this.touch = {
      x: this.width / 2,
      y: this.height / 2,
      targetX: this.width / 2,
      targetY: this.height / 2,
      radius: 95,
      offsetY: -50, // 向上偏移 50px 防止手指遮蔽
      isActive: false
    };

    // 遊戲實體
    this.items = [];   // 糖果 / 萬聖節道具
    this.ghosts = [];  // 遊蕩幽靈
    this.score = 0;
    this.timeLeft = 45;
    this.state = 'PLAYING'; // PLAYING, VICTORY, GAMEOVER

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
    this.spawnEntities();
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    const updatePos = (clientX, clientY) => {
      this.touch.targetX = clientX;
      this.touch.targetY = clientY + this.touch.offsetY;
      this.touch.isActive = true;
    };

    // 手機觸控事件
    this.canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      updatePos(t.clientX, t.clientY);
      // 首次觸碰平移目標，避免瞬移
      this.touch.x = this.touch.targetX;
      this.touch.y = this.touch.targetY;
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      updatePos(t.clientX, t.clientY);
    }, { passive: false });

    // 電腦除錯支援
    this.canvas.addEventListener('mousemove', (e) => {
      updatePos(e.clientX, e.clientY - this.touch.offsetY); // 電腦滑鼠可不需要偏移
    });
  }

  spawnEntities() {
    // 生成 6 顆隨機糖果
    for (let i = 0; i < 6; i++) {
      this.items.push({
        x: Math.random() * (this.width - 80) + 40,
        y: Math.random() * (this.height - 140) + 70,
        radius: 20,
        type: '🍬',
        collected: false
      });
    }

    // 生成 2 隻漫遊幽靈
    for (let i = 0; i < 2; i++) {
      this.ghosts.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 26,
        type: '👻'
      });
    }
  }

  update(dt) {
    if (this.state !== 'PLAYING') return;

    // 手電筒座標 LERP 平滑跟隨
    this.touch.x += (this.touch.targetX - this.touch.x) * 0.2;
    this.touch.y += (this.touch.targetY - this.touch.y) * 0.2;

    // 更新幽靈遊走與邊界反彈
    this.ghosts.forEach(ghost => {
      ghost.x += ghost.vx;
      ghost.y += ghost.vy;

      if (ghost.x < 30 || ghost.x > this.width - 30) ghost.vx *= -1;
      if (ghost.y < 30 || ghost.y > this.height - 30) ghost.vy *= -1;

      // 判定幽靈是否觸碰到光圈中心 (過近觸發驚嚇)
      const dist = Math.hypot(ghost.x - this.touch.x, ghost.y - this.touch.y);
      if (dist < 40) {
        this.triggerGhostAlert();
      }
    });

    // 道具收集判定：手電筒照到且中心重合
    this.items.forEach(item => {
      if (!item.collected) {
        const dist = Math.hypot(item.x - this.touch.x, item.y - this.touch.y);
        if (dist < this.touch.radius * 0.6) {
          item.collected = true;
          this.score += 100;
          this.vibrate(30);
          if (this.items.every(i => i.collected)) {
            this.state = 'VICTORY';
          }
        }
      }
    });
  }

  triggerGhostAlert() {
    this.vibrate(80);
    // 可加入手電筒閃爍或畫面紅光震動
  }

  vibrate(ms) {
    if (navigator.vibrate) navigator.vibrate(ms);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. 底層世界渲染（道具、幽靈、底圖）
    this.renderWorld(ctx);

    // 2. 繪製全域黑霧層 (黑暗遮罩)
    ctx.save();
    ctx.fillStyle = 'rgba(8, 8, 12, 0.97)';
    ctx.fillRect(0, 0, this.width, this.height);

    // 3. 挖出光圈洞口 (destination-out)
    ctx.globalCompositeOperation = 'destination-out';
    const flicker = (Math.random() - 0.5) * 4;
    const currentR = this.touch.radius + flicker;

    const grad = ctx.createRadialGradient(
      this.touch.x, this.touch.y, currentR * 0.2,
      this.touch.x, this.touch.y, currentR
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');      // 中心完全挖空透明
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');      // 邊緣保留黑霧

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.touch.x, this.touch.y, currentR, 0, Math.PI * 2);
    ctx.fill();

    // 4. 恢復合成模式
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();

    // 5. 繪製頂層 UI（HUD、計分板、倒數）
    this.renderUI(ctx);
  }

  renderWorld(ctx) {
    // 繪製道具
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.items.forEach(item => {
      if (!item.collected) {
        ctx.fillText(item.type, item.x, item.y);
      }
    });

    // 繪製幽靈
    this.ghosts.forEach(ghost => {
      ctx.fillText(ghost.type, ghost.x, ghost.y);
    });
  }

  renderUI(ctx) {
    ctx.save();
    ctx.fillStyle = '#ffaa00';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${this.score}`, 20, 40);
    ctx.restore();
  }

  gameLoop(currentTime) {
    const dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}
```

---

## 6. 音效與震動設計 (Web Audio API & Haptics)

在行動瀏覽器中，Audio 自動播放會被阻擋（Autoplay Policy）。建議使用合成音效或將音訊解鎖綁定在玩家的「第一次點擊/Touch」事件中。

### 6.1 純 Web Audio API 合成音效（免加載音頻文件）
```javascript
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 拾取糖果音效 (高音正弦波波形上升)
  playCollect() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1040, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }
}
```

---

## 7. 給本地 Agent (AGY) 的開發任務清單 (Prompt Instructions)

將以下需求指令直接提供給本地 Agent 進行實作拓展：

1. **視覺強化**：
   * 背景不要全黑，改為使用 Canvas 繪製磚牆或木質地板格紋，並疊加噪點（Noise Texture）。
   * 道具收集時增加粒子飛散效果（Candy Particles Burst）。
2. **遊戲性擴充**：
   * 加入「手電筒電池電量機制」：隨著時間推移光圈慢慢縮小，地圖上會隨機刷出「電池」讓玩家充能。
   * 幽靈行為增強：當手電筒照到幽靈時，幽靈有 0.5 秒停頓受驚，隨後轉向朝手電筒反方向加速逃跑，或憤怒朝玩家反撲。
3. **結算與分享**：
   * 遊戲結束時以萬聖節風格彈窗顯示評級（如：「靈異偵探」、「南瓜勇士」），並提供 Web Share API 一鍵分享到通訊軟體。
