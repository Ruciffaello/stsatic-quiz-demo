# GitHub Pages 心理測驗 Demo 部署完整步驟教學

本教學將手把手教您如何將 `1-github-pages-verification/poc-demo/` 中的心理測驗專案免費託管至 **GitHub Pages**，取得線上公開網址以供手機與小紅書測試。

---

## 🛠️ 前置準備

1. 已註冊 [GitHub 帳號](https://github.com/)。
2. 電腦已安裝 [Git](https://git-scm.com/)（或使用 GitHub Desktop / VS Code 內建 Git 介面）。

---

## 📌 步驟一：建立 Git 倉庫並提交本地程式碼

打開 Terminal / Command Prompt / PowerShell，進入本專案資料夾：

```bash
# 1. 切換至專案目錄
cd "D:\專案設計\小紅書心理測驗開發與專案紀錄"

# 2. 初始化 Git 倉庫
git init

# 3. 將所有檔案加入暫存區
git add .

# 4. 提交第一次 Commit
git commit -m "feat: 建立小紅書心理測驗專案與 GitHub Pages PoC Demo"
```

---

## 📌 步驟二：在 GitHub 上建立新倉庫 (Repository)

1. 開啟瀏覽器登入 GitHub，點擊右上角的 **`+`** -> **`New repository`**。
2. 填寫倉庫資訊：
   - **Repository name**：例如 `red-quiz-demo`（或您喜歡的名稱）。
   - **Description**：小紅書心理測驗靜態 Web Demo。
   - **Public / Private**：選擇 **Public**（GitHub Pages 免費版需設為 Public）。
   - **Initialize repository**：**不要勾選** Add a README file（因為本地已有檔案）。
3. 點擊 **Create repository** 建立倉庫。

---

## 📌 步驟三：將本地程式碼推送到 GitHub

在 GitHub 建立成功後，複製頁面上的指令，在終端機執行：

```bash
# 1. 綁定遠端 GitHub 倉庫 (請將 USERNAME 與 red-quiz-demo 替換為您的帳號與倉庫名)
git remote add origin https://github.com/USERNAME/red-quiz-demo.git

# 2. 將預設分支命名為 main
git branch -M main

# 3. 推送程式碼至 GitHub
git push -u origin main
```

---

## 📌 步驟四：設定 GitHub Pages 發佈

### ❓ 常見疑問：不用 `cd` 進 `poc-demo` 資料夾裡面嗎？

**答：不用！** 

因為我們使用的是 `git subtree` 技術。它的好處是：
- 您的專案可以保持整潔，整個 `小紅書心理測驗開發與專案紀錄` 作為一個主 Git 倉庫進行版控與備份。
- `git subtree push --prefix 1-github-pages-verification/poc-demo origin gh-pages` 這行指令會**自動只抓取** `poc-demo` 裡面的內容（`index.html`、`style.css`、`app.js`），並把它們設為 `gh-pages` 分支的最頂層（Root）。
- 這樣部署出來的 GitHub Pages 網址最簡短好記：`https://USERNAME.github.io/red-quiz-demo/`，而**不需要**在網址後面帶長長的子目錄路徑！

---

### 🚀 發佈步驟：使用 `gh-pages` 分支發佈 (最簡易)

1. 在專案**根目錄**終端機執行以下指令（將 `poc-demo` 子目錄單獨推送到 `gh-pages` 分支）：

```bash
git subtree push --prefix 1-github-pages-verification/poc-demo origin gh-pages
```

2. 開啟 GitHub 倉庫頁面：
   - 點擊頂部的 **Settings** 頁籤。
   - 在左側選單點擊 **Pages**。
   - 在 **Build and deployment** -> **Source** 選擇 **`Deploy from a branch`**。
   - 在 **Branch** 選項中：
     - 分支選擇：**`gh-pages`**
     - 資料夾選擇：**`/ (root)`**
   - 點擊 **Save** 儲存。

---

## 📌 步驟五：取得並測試您的線上網址

1. 儲存後等待 1~3 分鐘，重新整理 GitHub Pages 設定頁面。
2. 頂端會出現綠色提示標籤：
   > **Your site is live at `https://USERNAME.github.io/red-quiz-demo/`**
3. 點擊該連結，即可在瀏覽器中體驗完整的「尋找你的靈魂氣質色」心理測驗！

---

## 📱 步驟六：手機與小紅書測試技巧

1. **生成 QR Code 二維碼**：
   - 將您的 GitHub Pages 網址（例如 `https://USERNAME.github.io/red-quiz-demo/`）貼到二維碼生成器（如 [草料二維碼](https://cli.im/)）。
   - 用手機相機或微信/小紅書掃碼開啟，測試手機適配性與流暢度。

2. **卡密解鎖測試**：
   - 預設卡密為 `8888`，可於 Demo 開始頁面進行模擬輸入驗證。

3. **未來更新程式碼後重新發佈**：
   若修改了 `poc-demo` 中的內容，只需執行以下兩行指令即可更新上線：

   ```bash
   git add .
   git commit -m "update: 更新心理測驗題庫與樣式"
   git push origin main
   git subtree push --prefix 1-github-pages-verification/poc-demo origin gh-pages
   ```
