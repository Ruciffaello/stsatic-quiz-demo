/**
 * 🛠️ 高效能極速版一鍵打包與 StatiCrypt (AES-256-GCM) 加密腳本
 * 
 * 🔍 DOM 替換與腳本執行修復：
 * 避開現代瀏覽器對非同步 document.write() 的限制與腳本阻擋，
 * 採用 DOMParser + 元素替換 + Script 動態注入，確保解密後 100% 無縫替換網頁並執行 JS 邏輯！
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('./config.js');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src', 'quizzes');
const releaseDir = path.join(rootDir, 'release', 'q');
const hubSrcPath = path.join(rootDir, 'src', 'hub', 'index.html');
const hubReleasePath = path.join(rootDir, 'release', 'index.html');

console.log('🚀 開始執行全站心理測驗【DOMParser 穩定解密版】自動打包與加密流程...\n');

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
  
  if (bundleHtml.includes('rel="stylesheet"')) {
    bundleHtml = bundleHtml.replace(/<link[^>]*rel="stylesheet"[^>]*>/i, `<style>\n${cssContent}\n</style>`);
  } else {
    bundleHtml = bundleHtml.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
  }

  if (bundleHtml.includes('<script src=')) {
    bundleHtml = bundleHtml.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/i, `<script>\n${jsContent}\n</script>`);
  } else {
    bundleHtml = bundleHtml.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
  }

  // 3. 執行 AES-256-GCM 高效能極速加密
  const passcode = item.passcode || '8888';
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);

  // PBKDF2 金鑰生成 (1000 迭代)
  const key = crypto.pbkdf2Sync(passcode, salt, 1000, 32, 'sha256');

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(bundleHtml, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  const payload = {
    salt: salt.toString('hex'),
    iv: iv.toString('hex'),
    tag: authTag,
    ciphertext: encrypted
  };

  // 4. 生成極速解密 Standalone HTML
  const encryptedPageHtml = generateFastUnlockTemplate({
    title: item.title,
    instructions: item.instructions || '請輸入解鎖卡密',
    placeholder: item.placeholder || '請輸入解鎖卡密',
    buttonText: item.buttonText || '解鎖並開始測驗 ➔',
    themeColor: item.themeColor || '#6c5ce7',
    bgStyle: item.bgStyle || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    payloadJson: JSON.stringify(payload)
  });

  const finalReleaseFile = path.join(quizReleasePath, 'index.html');
  fs.writeFileSync(finalReleaseFile, encryptedPageHtml, 'utf8');

  console.log(`  ⚡ [${quizId}] 已完成極速加密與 DOMParser 解密優化！輸出：release/q/${quizId}/index.html`);
});

// 同步單一網域 Quiz Hub 首頁來源至 release，避免手動修改正式產物。
if (fs.existsSync(hubSrcPath)) {
  fs.copyFileSync(hubSrcPath, hubReleasePath);
  console.log('  🏛️ Quiz Hub 首頁已同步：src/hub/index.html → release/index.html');
} else {
  console.warn(`⚠️ 警告：找不到 Hub 來源 ${hubSrcPath}，略過首頁同步。`);
}

console.log('\n🎉 所有測驗已成功完成打包！');

/**
 * 產生極速 WebCrypto AES-256-GCM 解密 UI 模板
 */
function generateFastUnlockTemplate(data) {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: ${data.themeColor};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: ${data.bgStyle};
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .unlock-card {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 1.5rem;
      padding: 2.5rem 2rem;
      max-width: 420px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: inline-block;
    }
    h1 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #f8fafc;
    }
    p.desc {
      font-size: 0.9rem;
      color: #94a3b8;
      margin-bottom: 1.75rem;
      line-height: 1.5;
    }
    .input-group {
      margin-bottom: 1.25rem;
    }
    input[type="password"], input[type="text"] {
      width: 100%;
      padding: 0.9rem 1.2rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      font-size: 1rem;
      text-align: center;
      letter-spacing: 0.1em;
      outline: none;
      transition: all 0.2s;
    }
    input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.3);
    }
    .btn-unlock {
      width: 100%;
      padding: 0.9rem;
      border-radius: 0.75rem;
      border: none;
      background: var(--primary-color);
      color: #fff;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
    }
    .btn-unlock:active { transform: scale(0.98); }
    .btn-unlock:disabled { opacity: 0.6; cursor: not-allowed; }
    .error-msg {
      color: #ff7675;
      font-size: 0.85rem;
      margin-top: 0.75rem;
      min-height: 1.2rem;
    }
  </style>
</head>
<body>
  <div class="unlock-card">
    <div class="icon">🔒</div>
    <h1>${data.title}</h1>
    <p class="desc">${data.instructions}</p>
    
    <form id="unlock-form">
      <div class="input-group">
        <input type="password" id="passcode-input" placeholder="${data.placeholder}" required autocomplete="off">
      </div>
      <button type="submit" id="unlock-btn" class="btn-unlock">${data.buttonText}</button>
      <div id="error-msg" class="error-msg"></div>
    </form>
  </div>

  <script>
    const PAYLOAD = ${data.payloadJson};

    function hexToBuf(hex) {
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return bytes.buffer;
    }

    document.getElementById('unlock-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('passcode-input').value.trim();
      const errorEl = document.getElementById('error-msg');
      const btnEl = document.getElementById('unlock-btn');

      if (!input) return;

      errorEl.textContent = '';
      btnEl.disabled = true;
      btnEl.textContent = '⚡ 解密解鎖中...';

      try {
        const enc = new TextEncoder();
        const pwBytes = enc.encode(input);
        const saltBuf = hexToBuf(PAYLOAD.salt);
        const ivBuf = hexToBuf(PAYLOAD.iv);
        const tagBuf = hexToBuf(PAYLOAD.tag);
        const cipherBuf = hexToBuf(PAYLOAD.ciphertext);

        const combined = new Uint8Array(cipherBuf.byteLength + tagBuf.byteLength);
        combined.set(new Uint8Array(cipherBuf), 0);
        combined.set(new Uint8Array(tagBuf), cipherBuf.byteLength);

        const baseKey = await crypto.subtle.importKey('raw', pwBytes, 'PBKDF2', false, ['deriveKey']);
        const aesKey = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: saltBuf, iterations: 1000, hash: 'SHA-256' },
          baseKey,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );

        const decryptedBuf = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: ivBuf, tagLength: 128 },
          aesKey,
          combined
        );

        const dec = new TextDecoder();
        const decryptedHtml = dec.decode(decryptedBuf);

        // 🟢【DOMParser 完美替換法】：不使用 document.write()，徹底避免瀏覽器鎖死腳本！
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(decryptedHtml, 'text/html');

        // 1. 替換 Head (CSS / Title / Fonts)
        document.head.innerHTML = newDoc.head.innerHTML;

        // 2. 替換 Body HTML
        document.body.innerHTML = newDoc.body.innerHTML;
        document.body.className = newDoc.body.className;
        document.body.style.cssText = newDoc.body.style.cssText;

        // 3. 解析並動態執行所有內嵌 Script 腳本
        const scripts = newDoc.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
        });

      } catch (err) {
        console.error(err);
        errorEl.textContent = '⚠️ 解鎖卡密錯誤，請重新核對發貨訊息或輸入之卡密！';
        btnEl.disabled = false;
        btnEl.textContent = '${data.buttonText}';
      }
    });
  </script>
</body>
</html>`;
}
