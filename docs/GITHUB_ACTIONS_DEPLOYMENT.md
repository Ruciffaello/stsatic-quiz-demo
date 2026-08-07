# 🤖 GitHub Actions 全自動化 CI/CD 部署機制說明

本文件詳細說明本專案如何利用 GitHub Actions (`.github/workflows/deploy.yml`) 實現**「推送代碼即自動打包、加密與全站部署」**的 CI/CD 機制。

---

## ❓ 為什麼多加了一個 `.yml` 檔案，GitHub 就知道要執行？

GitHub 平台內置了名為 **GitHub Actions** 的自動化引擎，採用了「約定優於配置（Convention over Configuration）」的設計：

1. **自動監聽**：每當有人將程式碼 `git push` 到 GitHub 時，GitHub 伺服器會自動掃描專案根目錄下是否有固定路徑 `.github/workflows/`。
2. **讀取說明書**：只要該目錄下存在 `.yml` 或 `.yaml` 檔案，GitHub 就會將其視為「自動化腳本說明書」並啟動雲端虛擬機執行。

---

## ⚙️ `.github/workflows/deploy.yml` 機制拆解

```yaml
# 1. 任務名稱
name: Deploy Single-Domain Quizzes to GitHub Pages

# 2. 觸發條件 (Trigger Event)
on:
  push:
    branches:
      - main  # 當有人 push 程式碼至 main 分支時自動啟動

# 3. 讀寫權限設定
permissions:
  contents: write

# 4. 具體執行步驟 (Jobs)
jobs:
  deploy:
    runs-on: ubuntu-latest  # 🤖 GitHub 在雲端免費提供一台全新的 Linux (Ubuntu) 虛擬主機

    steps:
      # Step 1: 檢查並下載最新專案程式碼
      - name: 📥 檢查專案程式碼 (Checkout)
        uses: actions/checkout@v4

      # Step 2: 在雲端主機安裝 Node.js 20 環境
      - name: 🟢 設定 Node.js 環境
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # Step 3: 在雲端主機自動執行打包與 AES-256 加密腳本
      - name: 🛠️ 執行一鍵自動打包與加密 (Build & Encrypt)
        run: node tools/build-and-encrypt.js

      # Step 4: 將產出的 release/ 目錄自動發佈至 gh-pages 分支
      - name: 🚀 自動發佈 release/ 資料夾至 gh-pages 分支
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./release
```

---

## 🔄 部署全生命週期 (Deployment Lifecycle)

```text
1. 開發者本地開發完成 ➔ 執行 git push origin main
              │
              ▼
2. GitHub 伺服器觸發 push 事件並讀取 .github/workflows/deploy.yml
              │
              ▼
3. GitHub 雲端 Linux 虛擬機自動啟動：
   - 下載程式碼 ➔ 安裝 Node.js ➔ 執行 node tools/build-and-encrypt.js ➔ 自動完成內聯與 AES-256 加密
              │
              ▼
4. 自動將產出的 release/ 目錄推送至 gh-pages 分支
              │
              ▼
5. 30 秒內 GitHub Pages 自動完成全站線上更新！
```

---

## ✨ 使用 GitHub Actions 的核心好處

1. **避免人為遺忘**：即便開發者在本地忘記執行打包指令，雲端 CI/CD 引擎也會自動完成編譯與加密，確保線上發佈的永遠是最安全的加密版本。
2. **完全免費**：GitHub 公開倉庫提供無限次 GitHub Actions 免費執行時間。
