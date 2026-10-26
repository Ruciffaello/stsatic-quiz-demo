# 🎨 萬聖夜幽靈獵手 (Halloween Flashlight Shooter) 視覺與介面設計規範

## 1. 色彩計畫 (Color Palette) — 午夜幽靈電玩風 (Midnight Ghostbuster Arcade)
完全區隔於中秋節的暖金紅月風格，採用深邃暗夜與霓虹幽靈光感：
* **背景主色調 (Midnight Slate)**：`#05060a` ➔ `#0b0f19`
* **幽靈螢光綠 (Ectoplasm Green)**：`#34d399`
* **幻影電光紫 (Phantom Violet)**：`#8b5cf6` / `#c4b5fd`
* **強光電筒青 (Flashlight Cyan)**：`#22d3ee`
* **搞怪南瓜橘 (Spooky Orange)**：`#fb923c`
* **文字主色 (Crisp Slate)**：`#f1f5f9`（次要文字 `#94a3b8`）

---

## 2. 字型規範 (Typography)
* **全站字型**：`'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif`（現代俐落、電玩 HUD 清晰易讀）

---

## 3. 行動端 Canvas 與手電筒打光渲染規格
* **防遮擋偏移**：觸控滑動時光圈中心 $Y$ 軸向上偏移 `55px`，並套用 LERP (`0.24`) 平滑插值跟隨。
* **雙層打光與迷霧遮罩機制（重要技術規範）**：
  - ⚠️ **禁止在單層主 Canvas 直接使用 `destination-out`**：因為 `destination-out` 會連同已繪製的底層地板與怪物一併擦除為透明，導致露出底下黑色的 HTML 背景。
  - ✅ **正確實作方式**：
    1. **底層地板強光 (`floorSpot`)**：在 `(touch.x, touch.y)` 繪製暖白/紫青徑向漸層，讓手電筒移到的石磚格紋與魔法陣真正亮起來。
    2. **繪製怪物實體 (`renderEntities`)**：在地板強光之上繪製 `👻`、`🎃`、`🍬`、`🦇`、`🔋`，若位於光圈內 (`ent.illuminated`) 則加上虛線準星環與 `👆TAP` 提示。
    3. **頂層徑向黑霧遮罩 (`fogGrad`)**：使用標準 `source-over` 繪製中心透明度 `0%` (`rgba(3,4,8,0)`)、外圍透明度 `96%` (`rgba(3,4,8,0.96)`) 的全螢幕徑向漸層，確保光圈內 100% 透光清晰、光圈外濃黑神祕。
* **點擊擊破特效**：
  - 點擊光圈內的目標時，從下方發射霓虹魔力雷射光束，目標爆散為 14 顆彩色粒子並浮現得分飄字。

---

## 4. 結果卡與 PNG 素材擴充規範
* 支援在 `src/quizzes/halloween-quiz/assets/` 放入自訂 PNG 插圖，執行 `node tools/build-and-encrypt.js` 時會自動轉為 Base64 Data URI 內嵌至 `release/q/halloween-quiz/index.html`。
* 結算頁提供 `1080 × 1350` 高解析度 Canvas 繪製之萬聖節獵人報告卡一鍵下載。
* 結算卡與下載海報顯示九種稱號之一、戰績、該稱號的靈魂啟示與專屬銘文。
* 結算畫面另設獨立音樂播放按鈕；音樂來源為 `src/quizzes/halloween-quiz/assets/result-music.mp3`，正式建置時內嵌到單一 HTML。下載的 PNG 卡片不含音訊。
* 木乃伊與南瓜燈圖片來源放在 `src/quizzes/halloween-quiz/assets/`；每局南瓜燈僅在開局後第 10–15 秒出現於下方，木乃伊僅在第 20–25 秒等機率出現在左右側。圖片顯示尺寸約為初版的 4 倍；暗處保留輪廓，照亮時完整顯示並出現金色連點提示。
