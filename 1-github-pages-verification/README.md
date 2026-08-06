# 1. GitHub Pages 部署與技術驗證 (GitHub Pages Verification)

本資料夾用於心理測驗技術與互動效果的先行驗證（Proof of Concept, PoC）。

---

## 📋 驗證項目清單 (Validation Checklist)

在將心理測驗商品化之前，需在此資料夾中完成以下技術測試：

- [ ] **GitHub Pages 免費託管部署**：驗證 `index.html` 是否能正常線上存取。
- [ ] **小紅書/微信手機端內建瀏覽器 (Webview) 相容性**：
  - CSS layout 彈性與適配（iPhone / Android 各種螢幕比例）。
  - 音效與動畫是否流暢（免加載過重套件）。
- [ ] **本地儲存與狀態維護**：`localStorage` 紀錄作答進度與測驗結果。
- [ ] **成果卡片導出/截圖分享**：驗證 html2canvas / 原生 Web API 產生圖片功能，方便買家一鍵保存測驗報告。
- [ ] **虛擬商品防護機制 (選用)**：兌換碼/驗證碼解鎖心理測驗機制。

---

## 🛠️ PoC 範例專案庫

本資料夾內目前提供 **2 款不同風格與玩法的心理測驗 PoC Demo**：

1. **`poc-demo/`**：『尋找你的靈魂氣質色』
   - **視覺風格**：柔和極光微光風 / 靈魂色彩診斷
   - **核心技術**：卡密輸入 (`8888`) + 色彩特質長條圖 + 滿分氣質卡
2. **`poc-demo-2/`**：『解鎖你的隱藏守護神獸』
   - **視覺風格**：宇宙星際賽博風 / 互動盲盒測驗
   - **核心技術**：卡密解鎖 (`9999`) + 動態神獸頭像光暈 + 獨立流水號神獸卡片

---

## 🚀 GitHub Pages 部署說明

您可以使用 `git subtree` 指令將任意一個 Demo 發佈為 GitHub Pages 網站：

- **部署 Demo 1 (靈魂氣質色)**：
  ```bash
  git subtree push --prefix 1-github-pages-verification/poc-demo origin gh-pages
  ```
- **部署 Demo 2 (隱藏守護神獸)**：
  ```bash
  git subtree push --prefix 1-github-pages-verification/poc-demo-2 origin gh-pages
  ```

---

## 🔒 虛擬商品防護與靜態加密 (StatiCrypt)

若希望小紅書買家下單後才能憑密碼存取心理測驗，可以使用 **StatiCrypt** 將 static web 透過 AES-256 加密。

👉 完整教學請參閱：[STATICRYPT_GUIDE.md](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/1-github-pages-verification/STATICRYPT_GUIDE.md)


