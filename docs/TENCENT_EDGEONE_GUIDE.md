# ☁️ 騰訊雲 EdgeOne Pages (OnePage) 託管與部署指南

本文件說明如何將本專案部署至**騰訊雲 EdgeOne Pages (靜態託管)**，並透過國內外頂級 CDN 節點提供全網極速存取。

---

## 📌 騰訊雲 EdgeOne Pages 與 GitHub Pages 的核心差異

1. **全球與國內存取極速**：EdgeOne 擁有中國大陸與全球 CDN 節點，買家在任何社群或通訊軟體內開啟 H5 速度極快。
2. **託管機制**：EdgeOne Pages 直接連結您的 GitHub 倉庫 `main` 分支。在 EdgeOne 控制台設定 **「構建命令 (Build Command)」** 與 **「輸出目錄 (Output Directory)」** 後，每次 Git Push 騰訊雲就會自動編譯加密並部署！

---

## ⚙️ 騰訊雲 EdgeOne Pages 控制台設定步驟 (4 步驟)

在騰訊雲 EdgeOne Pages 控制台新增專案並綁定 GitHub 倉庫 `Ruciffaello/stsatic-quiz-demo` 後，請進行以下關鍵設定：

### 1. 構建與部署參數 (Build Settings)
在 EdgeOne 專案設定的 **「Build configuration (構建配置)」** 中填寫：

| 欄位名稱 (Tencent Console) | 建議設定值 | 說明 |
|---|---|---|
| **Node.js 版本** | `20.x` (或 `18.x`) | 執行打包腳本之 Node 環境 |
| **構建命令 (Build Command)** | `node tools/build-and-encrypt.js` | 部署前自動執行內聯與 AES-256 加密 |
| **輸出目錄 (Output Directory)** | `release` | ⚠️ **極重要！** 告訴騰訊雲只發佈 release/ 資料夾 |

---

### 2. 單一網域子路徑路由對照 (EdgeOne Subpath Routes)

完成設定並部署後，騰訊雲給您的專屬網域（或綁定的自訂網域 `quiz.yourdomain.com`）網址結構如下：

- 🌐 **全站門戶頁**：`https://<EdgeOne網域>.edgeone.app/` (自動讀取 `release/index.html`)
- 🔒 **靈魂氣質色測驗 (卡密 8888)**：`https://<EdgeOne網域>.edgeone.app/q/soul-color/` (自動讀取 `release/q/soul-color/index.html`)
- 🔒 **隱藏守護神獸測驗 (卡密 9999)**：`https://<EdgeOne網域>.edgeone.app/q/guardian-beast/` (自動讀取 `release/q/guardian-beast/index.html`)
- 🔒 **戀愛依戀類型測驗 (卡密 7777)**：`https://<EdgeOne網域>.edgeone.app/q/love-attachment/` (自動讀取 `release/q/love-attachment/index.html`)

---

### 3. 重定向與 404 處理 (Rewrite Rules)
在 EdgeOne 控制台的 **「路由/重定向規則」** 中：
- 確保 **Index File** 設為 `index.html`。
- 這樣訪問子目錄 `/q/soul-color/` 時，EdgeOne CDN 節點會自動回傳 `/q/soul-color/index.html` 加密頁面，不會跳出 404！
