/**
 * 🛠️ 一鍵全自動打包與 StatiCrypt 加密腳本 (Build & Encrypt Script)
 * 
 * 運作邏輯：
 * 1. 讀取 `tools/config.js` 的測驗登錄清單。
 * 2. 自動將 `src/quizzes/[quiz-id]/` 的 index.html, style.css, app.js 縫合內聯成單一 HTML 檔。
 * 3. 呼叫 `staticrypt` CLI 命令，帶入對應的卡密 (passcode)、Title、主題色彩進行真正 AES-256 全密文加密。
 * 4. 將輸出的加密單檔 HTML 寫入至 `release/q/[quiz-id]/index.html`。
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('./config.js');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src', 'quizzes');
const releaseDir = path.join(rootDir, 'release', 'q');

console.log('🚀 開始執行全站心理測驗自動打包與 StatiCrypt 加密流程...\n');

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

  // 寫入臨時單檔 temp_bundle.html
  const tempBundleFile = path.join(rootDir, 'tools', `temp_${quizId}.html`);
  fs.writeFileSync(tempBundleFile, bundleHtml, 'utf8');

  // 3. 呼叫 npx staticrypt 命令進行 AES-256 加密
  try {
    const passcode = item.passcode || '8888';
    const title = item.title || '🔒 心理測驗解鎖';
    const instructions = item.instructions || '請輸入解鎖卡密';
    const buttonText = item.buttonText || '解鎖並開始測驗 ➔';
    const placeholder = item.placeholder || '請輸入解鎖卡密';
    const primaryColor = item.themeColor || '#6c5ce7';

    // 命令組合
    const cmd = `npx staticrypt "${tempBundleFile}" -p "${passcode}" -d "${quizReleasePath}" --short --template-title "${title}" --template-instructions "${instructions}" --template-button "${buttonText}" --template-placeholder "${placeholder}" --template-color-primary "${primaryColor}" --template-color-secondary "#0b0f19"`;

    execSync(cmd, { cwd: rootDir, stdio: 'inherit', shell: true });

    // StatiCrypt 產生的檔案名稱預設為 temp_[quizId].html，需要重命名為 index.html
    const generatedFile = path.join(quizReleasePath, `temp_${quizId}.html`);
    const finalReleaseFile = path.join(quizReleasePath, 'index.html');

    if (fs.existsSync(generatedFile)) {
      if (fs.existsSync(finalReleaseFile)) {
        fs.unlinkSync(finalReleaseFile);
      }
      fs.renameSync(generatedFile, finalReleaseFile);
    }

    console.log(`  ✅ [${quizId}] 成功加密！輸出檔：release/q/${quizId}/index.html (卡密: ${passcode})`);
  } catch (err) {
    console.error(`  ❌ [${quizId}] 加密過程失敗:`, err.message);
  } finally {
    // 清理臨時檔
    if (fs.existsSync(tempBundleFile)) {
      fs.unlinkSync(tempBundleFile);
    }
  }
});

// 清理 staticrypt 設定檔
const staticryptConfig = path.join(rootDir, '.staticrypt.json');
if (fs.existsSync(staticryptConfig)) {
  fs.unlinkSync(staticryptConfig);
}

console.log('\n🎉 所有測驗已成功通過 StatiCrypt 完成加密打包！');
