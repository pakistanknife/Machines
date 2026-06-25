// Convert all JPG/PNG images to WebP
// Run once: node convert-to-webp.js
// Requires: npm install sharp

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const IMAGES_DIR = path.join(__dirname, 'images');
const QUALITY    = 82;

const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

(async () => {
  for (const file of files) {
    const input  = path.join(IMAGES_DIR, file);
    const output = path.join(IMAGES_DIR, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    if (fs.existsSync(output)) { console.log(`skip (exists): ${file}`); continue; }
    try {
      const info = await sharp(input).webp({ quality: QUALITY }).toFile(output);
      const orig = fs.statSync(input).size;
      const pct  = Math.round((1 - info.size / orig) * 100);
      console.log(`✓ ${file} → ${path.basename(output)} (−${pct}%)`);
    } catch (e) {
      console.error(`✗ ${file}:`, e.message);
    }
  }
})();
