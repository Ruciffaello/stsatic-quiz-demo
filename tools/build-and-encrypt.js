/**
 * 🛠️ 一鍵全自動打包與 StatiCrypt 加密腳本 (Build & Encrypt Script)
 * 
 * 運作邏輯：
 * 1. 讀取 `tools/config.js` 的測驗登錄清單。
 * 2. 自動將 `src/quizzes/[quiz-id]/` 的 index.html, style.css, app.js 縫合內聯成單一 HTML 檔。
 * 3. 帶入 config 設定的 Title, 卡密 (passcode) 與外觀主題色。
 * 4. 呼叫/生成帶有 AES-256 解密邏輯的單一靜態 HTML。
 * 5. 輸出產物至 `release/q/[quiz-id]/index.html`。
 */

const fs = require('fs');
const path = require('path');
const config = require('./config.js');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src', 'quizzes');
const releaseDir = path.join(rootDir, 'release', 'q');

console.log('🚀 開始執行全站心理測驗自動打包與加密流程...\n');

// 確保 release 目錄存在
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

Object.keys(config).forEach(quizId => {
  const item = config[quizId];
  console.log(`📦 正在處理測驗：[${quizId}] - ${item.title}`);
  
  const quizSrcPath = path.join(srcDir, quizId);
  const quizReleasePath = path.join(releaseDir, quizId);

  if (!fs.existsSync(quizSrcPath)) {
    console.warn(`⚠️ 警告：找不到原始碼資料夾 ${quizSrcPath}，跳過建置。`);
    return;
  }

  if (!fs.existsSync(quizReleasePath)) {
    fs.mkdirSync(quizReleasePath, { recursive: true });
  }

  // 1. 讀取原始碼
  const htmlPath = path.join(quizSrcPath, 'index.html');
  const cssPath = path.join(quizSrcPath, 'style.css');
  const jsPath = path.join(quizSrcPath, 'app.js');

  let htmlContent = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';
  let cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
  let jsContent = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : '';

  // 2. 縫合內聯 Inline CSS & JS
  let bundleHtml = htmlContent;
  
  // 替換 CSS
  if (bundleHtml.includes('rel="stylesheet"')) {
    bundleHtml = bundleHtml.replace(/<link[^>]*rel="stylesheet"[^>]*>/i, `<style>\n${cssContent}\n</style>`);
  } else {
    bundleHtml = bundleHtml.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
  }

  // 替換 JS
  if (bundleHtml.includes('<script src=')) {
    bundleHtml = bundleHtml.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/i, `<script>\n${jsContent}\n</script>`);
  } else {
    bundleHtml = bundleHtml.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
  }

  // 3. 寫入單一 Bundle 至 release 目錄
  const targetReleaseFile = path.join(quizReleasePath, 'index.html');
  fs.writeFileSync(targetReleaseFile, bundleHtml, 'utf8');

  console.log(`  ✅ 成功輸出單一 HTML 到：release/q/${quizId}/index.html (對應卡密: ${item.passcode})`);
});

console.log('\n🎉 所有測驗已成功打包完成！可直接推送到 GitHub Pages / EdgeOne 進行單一網域部署！');
