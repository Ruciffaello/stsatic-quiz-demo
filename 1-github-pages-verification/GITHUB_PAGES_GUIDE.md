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
   - **Repository name**：請輸入 `stsatic-quiz-demo`。
   - **Description**：小紅書心理測驗靜態 Web Demo。
   - **Public / Private**：選擇 **Public**（GitHub Pages 免費版需設為 Public）。
   - **Initialize repository**：**不要勾選** Add a README file（因為本地已有檔案）。
3. 點擊 **Create repository** 建立倉庫。

---

## 📌 步驟三：將本地程式碼推送到 GitHub

在 GitHub 建立成功後，複製頁面上的指令，在終端機執行：

```bash
# 1. 綁定遠端 GitHub 倉庫 (請將 USERNAME 替換為您的 GitHub 帳號)
git remote add origin https://github.com/USERNAME/stsatic-quiz-demo.git

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
- 這樣部署出來的 GitHub Pages 網址最簡短好記：`https://USERNAME.github.io/stsatic-quiz-demo/`，而**不需要**在網址後面帶長長的子目錄路徑！

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
   > **Your site is live at `https://USERNAME.github.io/stsatic-quiz-demo/`**
3. 點擊該連結，即可在瀏覽器中體驗完整的「尋找你的靈魂氣質色」心理測驗！

---

## 🔄 GitHub Pages Demo 切換切換指令教學

當您有多個 Demo（例如 `poc-demo` 與 `poc-demo-2`）並希望切換 GitHub Pages 目前展示哪一個 Demo 時，請使用以下指令：

### 1️⃣ 切換展示 Demo 1 (尋找你的靈魂氣質色)

```powershell
git subtree split --prefix 1-github-pages-verification/poc-demo -b temp-gh-pages
git push origin temp-gh-pages:gh-pages --force
git branch -D temp-gh-pages
```

### 2️⃣ 切換展示 Demo 2 (解鎖你的隱藏守護神獸)

```powershell
git subtree split --prefix 1-github-pages-verification/poc-demo-2 -b temp-gh-pages
git push origin temp-gh-pages:gh-pages --force
git branch -D temp-gh-pages
```

---

## 📝 日常開發與程式碼更新 Push 流程

當您修改了程式碼（例如修改了題庫、調整了 CSS 樣式或新增了商品文檔），完整更新需包含**兩個步驟**：

### 步驟一：備份整專案到 GitHub `main` 主分支 (保存所有程式碼)

```powershell
# 1. 追蹤所有更動過的檔案
git add .

# 2. 提交修改紀錄 (說明這次改了什麼)
git commit -m "update: 修改心理測驗樣式與說明文檔"

# 3. 推送到 GitHub main 分支
git push origin main
```

---

### 步驟二：更新 GitHub Pages 線上網站 (讓網路體驗同步更新)

根據您當前想要線上展示的是哪一個 Demo，執行對應的推送指令：

```powershell
# 如果是更新 Demo 2 (守護神獸) 的線上網站：
git subtree split --prefix 1-github-pages-verification/poc-demo-2 -b temp-gh-pages
git push origin temp-gh-pages:gh-pages --force
git branch -D temp-gh-pages

# 如果是更新 Demo 1 (靈魂氣質色) 的線上網站：
git subtree split --prefix 1-github-pages-verification/poc-demo -b temp-gh-pages
git push origin temp-gh-pages:gh-pages --force
git branch -D temp-gh-pages
```




