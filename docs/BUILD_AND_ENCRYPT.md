# 🛠️ 心理測驗一鍵打包與 StatiCrypt 加密指南

本文件說明如何將 `src/quizzes/` 目錄下的開發原始碼，自動縫合內聯 (Inline) 並透過 StatiCrypt 密文加密輸出至 `release/q/` 發佈目錄。

---

## 📌 【重要注意事項】每次新增測驗必做步驟！

> [!IMPORTANT]
> **每當在 `src/quizzes/` 下新建一個心理測驗（例如 `src/quizzes/career-potential/`）時，都「必須」先在 [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) 設定檔中登記該測驗的 ID、Title、解鎖卡密與外觀樣式！**
> 
> 如果沒有在 `tools/config.js` 登記，執行自動打包腳本時將無法讀取該測驗的加密與 Title 設定！

---

## 📋 `tools/config.js` 設定檔編輯教學

開啟 [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) 並加入您的新測驗資訊：

```javascript
module.exports = {
  // 現有測驗...
  "soul-color": { ... },

  // ➕ 您的新測驗 (例如: 職場潛力與避坑指南)
  "career-potential": {
    id: "career-potential",                       // 測驗 ID (需與 src/quizzes/ 下的資料夾名稱一致)
    title: "職場潛力與避坑指南 ｜ OnePage 心理測驗", // 網頁 Title 與標題
    passcode: "6666",                             // 發貨自動給買家的解鎖卡密
    instructions: "請輸入您的專屬 4 位數解鎖卡密",
    placeholder: "請輸入解鎖卡密",
    buttonText: "解鎖並開始診斷 ➔",
    themeColor: "#ff7675",                         // 測驗主題色
    bgStyle: "linear-gradient(135deg, #111 0%, #222 100%)"
  }
};
```

---

## 🚀 執行一鍵打包與加密

完成 `tools/config.js` 登記後，在專案根目錄開啟終端機並執行：

```bash
node tools/build-and-encrypt.js
```

### 打包腳本會自動為您完成以下工作：
1. 自動讀取 `src/quizzes/[quiz-id]/` 下的 `index.html`、`style.css`、`app.js`。
2. 將 CSS 與 JS 自動「縫合/內聯 (Inline)」進 HTML 中，產生單一獨立 HTML 檔案（無外連檔案破綻）。
3. 帶入在 `tools/config.js` 中設定的 Title、說明文字與卡密。
4. 將加密/單一檔案自動輸出至 `release/q/[quiz-id]/index.html`。

---

## 🌐 部署至單一網域

完成打包後，直接將 `release/` 目錄部署或推送到 GitHub Pages / EdgeOne / Vercel：

- 門戶主頁：`https://quiz.yourdomain.com/`
- 測驗 1 線上頁面：`https://quiz.yourdomain.com/q/soul-color/` (對應卡密 `8888`)
- 測驗 2 線上頁面：`https://quiz.yourdomain.com/q/guardian-beast/` (對應卡密 `9999`)
- 測驗 3 線上頁面：`https://quiz.yourdomain.com/q/career-potential/` (對應卡密 `6666`)
