# 🏛️ 單一網域 (Single Domain) 專案架構說明

本專案採用**「單一網域託管 (Single Domain Hosting)」**與**「開發 / 發佈分離 (Src / Release Separation)」**設計，旨在解決多元心理測驗虛擬商品在各通路（小紅書、蝦皮、LINE、微信、自營官網等）販售時網域成本過高、部署繁瑣的問題。

---

## 📁 完整專案資料夾架構 (Repository Structure)

```text
OnePage心理測驗開發/
├── README.md                      # 專案總說明與全站導覽指引
│
├── docs/                          # 📚 輔助說明與營運文檔 (集中管理)
│   ├── SINGLE_DOMAIN_ARCHITECTURE.md # 本架構說明文檔
│   ├── BUILD_AND_ENCRYPT.md       # 一鍵打包與 config.js 設定指南
│   ├── STATICRYPT_GUIDE.md        # StatiCrypt 卡密防護與加密原理
│   ├── COMMERCIALIZATION_GUIDE.md # 🛍️ 虛擬商品化、多平台發貨與社交裂變指南
│   ├── GITHUB_ACTIONS_DEPLOYMENT.md # 🤖 GitHub Actions 全自動 CI/CD 部署說明
│   └── TENCENT_EDGEONE_GUIDE.md   # ☁️ 騰訊雲 EdgeOne Pages 託管指南
│
├── src/                           # 💻 開發原始碼 (未加密、模組化、好維護)
│   ├── shared/                    # 跨測驗共享公共庫 (Core UI, Utils, 截圖引擎)
│   └── quizzes/                   # 各心理測驗開發源碼
│       ├── soul-color/            # 測驗 01: 尋找你的靈魂氣質色 (index.html, style.css, app.js)
│       ├── guardian-beast/        # 測驗 02: 解鎖隱藏守護神獸 (index.html, style.css, app.js)
│       ├── love-attachment/       # 測驗 03: 戀愛依戀類型與契合度 (index.html, style.css, app.js)
│       ├── partner-species-report/# 測驗 04: 對象成分暨物種分析報告 (index.html, style.css, app.js)
│       └── qixi-love-quiz/        # 測驗 05: 七夕戀愛依附型診斷 (index.html, style.css, app.js)
│
├── release/                       # 🚀 正式發佈資料夾 (部署至 GitHub Pages / 雲端託管)
│   ├── index.html                 # 旗艦門戶頁 (Quiz Hub / 展示頁)
│   └── q/                         # 心理測驗線上路徑 (子目錄)
│       ├── soul-color/
│       │   └── index.html         # 🔒 縫合 CSS/JS 並加密之單一獨立 HTML
│       ├── guardian-beast/
│       │   └── index.html         # 🔒 縫合 CSS/JS 並加密之單一獨立 HTML
│       ├── love-attachment/
│       │   └── index.html         # 🔒 縫合 CSS/JS 並加密之單一獨立 HTML
│       ├── partner-species-report/
│       │   └── index.html         # 🔒 縫合 CSS/JS 並加密之單一獨立 HTML
│       └── qixi-love-quiz/
│           └── index.html         # 🔒 縫合 CSS/JS 並加密之單一獨立 HTML
│
└── tools/                         # 🛠️ 自動化打包與加密腳本
    ├── config.js                  # ⚠️ 測驗登錄設定檔 (新增測驗時必須修改此處!)
    └── build-and-encrypt.js       # 一鍵打包編譯腳本
```

---

## 🌐 網址路由對照表 (URL Routing Map)

部署時，將整個 `release/` 目錄託管於您的單一網域（例如 `https://quiz.yourdomain.com/`）之下：

| 專案發佈檔案 | 線上 URL | 頁面用途與情境 |
|---|---|---|
| `release/index.html` | `https://quiz.yourdomain.com/` | 全站門戶展示頁 / 品牌入口 (Quiz Hub) |
| `release/q/soul-color/index.html` | `https://quiz.yourdomain.com/q/soul-color/` | 🔒 靈魂氣質色測驗 (解鎖卡密：8888) |
| `release/q/guardian-beast/index.html` | `https://quiz.yourdomain.com/q/guardian-beast/` | 🔒 守護神獸測驗 (解鎖卡密：9999) |
| `release/q/love-attachment/index.html` | `https://quiz.yourdomain.com/q/love-attachment/` | 🔒 戀愛依戀類型測驗 (解鎖卡密：7777) |
| `release/q/partner-species-report/index.html` | `https://quiz.yourdomain.com/q/partner-species-report/` | 🔒 對象成分物種分析 (解鎖卡密：6666) |
| `release/q/qixi-love-quiz/index.html` | `https://quiz.yourdomain.com/q/qixi-love-quiz/` | 🔒 七夕戀愛依附診斷 (解鎖卡密：5277) |

---

## 🔄 開發與上線維護工作流程 (Developer Workflow)

1. **開發階段**：在 `src/quizzes/[quiz-id]/` 目錄下維護獨立的 `index.html`、`style.css` 與 `app.js`。
2. **登記設定**：在 [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) 填寫測驗標題、卡密與主題顏色。
3. **打包編譯**：執行 `node tools/build-and-encrypt.js` 生成單一加密檔案至 `release/q/[quiz-id]/index.html`。
4. ** Git 部署**：推送至 GitHub，完成線上單一網域全站更新！
