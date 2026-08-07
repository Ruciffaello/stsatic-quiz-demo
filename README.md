# 🌸 小紅書心理測驗開發與專案紀錄 (Single-Domain Quiz Suite)

本專案採用 **單一網域 (Single Domain)** 託管與 **「開發 (Src) ➔ 打包與加密 ➔ 發佈 (Release)」** 的現代化前端架構，專為小紅書商城販售的互動心理測驗虛擬商品設計。

---

## 📁 全新專案架構概觀

```text
小紅書心理測驗開發與專案紀錄/
├── README.md                      # 本說明文件 (專案總導覽)
│
├── docs/                          # 📚 專案輔助說明與營運文檔 (集中管理)
│   ├── BUILD_AND_ENCRYPT.md       # 🛠️ 一鍵打包與 config.js 設定教學 (必看!)
│   ├── SINGLE_DOMAIN_ARCHITECTURE.md # 🏛️ 單一網域架構與路由設計細節
│   ├── STATICRYPT_GUIDE.md        # 🔒 StatiCrypt 卡密防護與加密原理
│   └── XIAOHONGSHU_COMMERCIAL.md  # 🛍️ 小紅書商品化、發貨與社交裂變指南
│
├── src/                           # 💻 開發原始碼 (未加密、模組化、便於開發維護)
│   ├── shared/                    # 跨測驗共享公共庫 (CSS 動畫、截圖引擎、音效)
│   └── quizzes/                   # 各心理測驗開發源碼
│       ├── soul-color/            # 測驗 01: 尋找你的靈魂氣質色
│       └── guardian-beast/        # 測驗 02: 解鎖隱藏守護神獸
│
├── release/                       # 🚀 正式發佈資料夾 (部署至 GitHub Pages / 雲端託管)
│   ├── index.html                 # 全站旗艦門戶頁 (Quiz Hub)
│   └── q/                         # 心理測驗線上路徑 (子目錄)
│       ├── soul-color/            # 🔒 加密後之靈魂色彩測驗頁面
│       └── guardian-beast/        # 🔒 加密後之守護神獸測驗頁面
│
└── tools/                         # 🛠️ 自動化打包與加密工具
    ├── config.js                  # ⚠️ 測驗登錄設定檔 (新增測驗時必修改此處!)
    └── build-and-encrypt.js       # 一鍵縫合 CSS/JS 與 StatiCrypt 加密腳本
```

---

## ⚠️ 【極重要】開發與新增測驗規範

> [!IMPORTANT]
> **每次新增或建置一個新的心理測驗時（例如在 `src/quizzes/career-potential/` 建立新題目），都「必須」先在 [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) 設定檔中進行註冊修改！**
> 
> 在 [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) 中設定好該測驗的 ID、網頁 Title、小紅書解鎖卡密與主題顏色後，打包腳本才能成功讀取並為該測驗進行 AES-256 加密輸出。

詳情請參閱：[一鍵打包與 config.js 設定指南](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/docs/BUILD_AND_ENCRYPT.md)

---

## 🛠️ 開發與發佈流程 (Workflow)

### 1. 本地開發與測試
在 `src/quizzes/[quiz-id]/` 下直接開發 HTML/CSS/JS。可直接開啟 `src/quizzes/[quiz-id]/index.html` 進行無加密即時調試。

### 2. 在 config.js 註冊測驗資訊
開啟 [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js)，填寫新測驗的 ID、Title 與小紅書發貨卡密。

### 3. 一鍵打包與加密
於終端機執行：
```bash
node tools/build-and-encrypt.js
```
腳本將自動縫合 CSS/JS 成為單一獨立 HTML，並帶入卡密與加密產物寫入至 `release/q/[quiz-id]/index.html`。

### 4. 部署上線
將 `release/` 目錄託管於 GitHub Pages / EdgeOne / Vercel 即可完成單一網域全站部署！

---

## 📚 專案輔助說明文檔索引 (Documentation Index)

- 🤖 [AGENTS.md (AI Agent 開發規範與 SOP 指南)](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/AGENTS.md)
- 🛠️ [一鍵打包與 config.js 設定教學](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/docs/BUILD_AND_ENCRYPT.md)
- 🏛️ [單一網域架構與路由說明](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/docs/SINGLE_DOMAIN_ARCHITECTURE.md)
- 🔒 [StatiCrypt 卡密防護與加密指南](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/docs/STATICRYPT_GUIDE.md)
- 🛍️ [小紅書虛擬商品化與自動發貨指南](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/docs/XIAOHONGSHU_COMMERCIAL.md)
