/**
 * Create a standalone, unencrypted preview without touching release/.
 * Usage: node tools/build-preview.js <quiz-id>
 */
const fs = require('fs');
const path = require('path');

const quizId = process.argv[2];
if (!quizId) throw new Error('Usage: node tools/build-preview.js <quiz-id>');

const root = path.join(__dirname, '..');
const source = path.join(root, 'src', 'quizzes', quizId);
const output = path.join(root, 'preview', 'q', quizId, 'index.html');
if (!fs.existsSync(source)) throw new Error(`Unknown quiz source: ${quizId}`);

const read = (name) => fs.readFileSync(path.join(source, name), 'utf8');
const toDataUri = (relativePath) => {
  const asset = path.resolve(source, relativePath);
  if (!asset.startsWith(source) || !fs.existsSync(asset)) return null;
  const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' }[path.extname(asset).toLowerCase()];
  return mime ? `data:${mime};base64,${fs.readFileSync(asset).toString('base64')}` : null;
};

let html = read('index.html');
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/i, `<style>\n${read('style.css')}\n</style>`);
html = html.replace(/<script[^>]*src="app\.js"[^>]*><\/script>/i, `<script>\n${read('app.js')}\n</script>`);
html = html.replace(/(<img[^>]*\ssrc=")([^"]+)("[^>]*>)/gi, (match, before, src, after) => `${before}${toDataUri(src) || src}${after}`);
html = html.replace(/(["'])assets\/([^"']+\.(?:png|jpe?g|webp|gif|svg))\1/gi, (match, quote, filename) => `${quote}${toDataUri(`assets/${filename}`) || `assets/${filename}`}${quote}`);

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html, 'utf8');
console.log(`Preview built: ${path.relative(root, output)}`);
