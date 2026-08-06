# StatiCrypt 靜態網頁加密與小紅書卡密對接教學

[StatiCrypt](https://robinmoisson.github.io/staticrypt/) 是一個基於 **AES-256** 的靜態網頁加密工具。它可以將您的心理測驗 `index.html` 整個加密成一個輸入密碼解鎖頁面。

非常適合小紅書商城販售虛擬商品的模式：
1. **賣家部署**：將加密後的 `index.html` 部署上 GitHub Pages。
2. **買家下單**：買家在小紅書下單後取得卡密（例如 `password123`）。
3. **輸入解鎖**：買家打開網址後輸入卡密，瀏覽器會在本地端用 AES-256 解密並呈現完整心理測驗！

> [!NOTE]
> **測試備註**：本專案所有 PoC 驗證與測試用密碼統一設定為：`test123`

---

## 🛠️ 處理方式一：線上工具生成 (最直覺免安裝)

1. 開啟 [StatiCrypt 線上加密工具](https://robinmoisson.github.io/staticrypt/)。
2. 將您的 `index.html` 原始碼貼上，或在頁面上設定：
   - **Passphrase (密碼)**：設定買家購買後要輸入的卡密（測試用密碼：`test123`）。
   - **HTML to encrypt**：選擇或貼入 `poc-demo/index.html` 的內容（注意：如果是多檔案結構，亦可使用 CLI 打包）。
3. 點擊 **Encrypt** 產生加密後的 HTML。
4. 下載新產生的 `index.html`，並將其替換掉準備發佈到 GitHub Pages 的 `index.html`。

---

## 🛠️ 處理方式二：使用 CLI 自動化加密 (推薦大批量/商品化)

如果您有多個心理測驗商品，建議使用 Node.js / npx 在本地一行指令加密：

### 1. 安裝或免安裝執行 StatiCrypt CLI

```bash
# 免安裝直接透過 npx 執行加密 (測試用密碼: test123)
npx staticrypt 1-github-pages-verification/poc-demo/index.html -p "test123" -o dist/index.html
```

### 2. 參數說明與常用選單

```bash
npx staticrypt <輸入檔案> -p "<密碼>" -o <輸出檔案> [選項]
```

常用參數：
- `-p, --passphrase`：設定解鎖密碼（例如 `-p "test123"`）。
- `-o, --output`：設定加密後的檔案輸出路徑（例如 `-o encrypted/index.html`）。
- `-t, --title`：設定加密解鎖頁面的網頁標題（例如 `-t "小紅書靈魂測驗解鎖"`）。
- `--instructions`：設定密碼輸入框上方的提示文字（例如 `--instructions "請輸入您在小紅書下單後取得的 4 位數卡密 (預設測試密碼: test123)"`）。

---

## 💡 小紅書實務部署流程 (Workflow)

```text
原始原始碼 (poc-demo/) 
       │
       ▼ (執行 npx staticrypt 加密)
加密後的單一 index.html 
       │
       ▼ (推送到 GitHub Pages)
GitHub Pages 公開網址 (買家看到輸入密碼框)
       │
       ▼ (買家輸入小紅書購得密碼: test123)
瀏覽器本地 AES-256 解密 ➔ 展示完整心理測驗
```

### 範例：將 Demo 1 加密後發佈的完整指令

```bash
# 1. 建立加密輸出資料夾
mkdir encrypted-demo

# 2. 使用 staticrypt 加密 Demo 1 (測試密碼設為 test123)
npx staticrypt 1-github-pages-verification/poc-demo/index.html -p "test123" -o encrypted-demo/index.html --title "靈魂氣質色測驗解鎖" --instructions "請輸入小紅書買家卡密 (測試密碼: test123)："


# 3. 把 CSS 與 JS 檔案一併複製到發佈目錄（若未內聯）
cp 1-github-pages-verification/poc-demo/style.css encrypted-demo/
cp 1-github-pages-verification/poc-demo/app.js encrypted-demo/

# 4. 使用 git subtree 將加密資料夾發佈到 gh-pages
git subtree push --prefix encrypted-demo origin gh-pages
```

---

## ⚠️ 注意事項與優缺點分析

- **優點**：
  - **零伺服器成本**：完全無需後端資料庫，GitHub Pages 免費託管。
  - **高安全性 AES-256**：網頁原始碼在解密前都是亂碼，無法直接透過「檢視原始碼」破解。
  - **可記住密碼**：StatiCrypt 支援 `Remember Me` 設定，買家輸入一次後可重複觀看報告。
- **注意事項**：
  - 解密密碼是硬編碼（Hardcoded）在發佈版本中的，因此同一個商品頁面通常共用同一個密碼（或是依商品版本更新密碼）。若要一單一密碼，可配合短網址帶參數或建立動態驗證機制。
