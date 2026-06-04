#!/usr/bin/env node
// frontend/scripts/optimize-images.mjs
//
// One-shot image optimizer for public/images/.
// Resizes anything wider than MAX_WIDTH down to MAX_WIDTH (no upscaling),
// re-encodes at QUALITY, and strips EXIF/IPTC/XMP metadata.
// Skips files that are already small enough that re-encoding would bloat them.
// Skips non-image files (MP4 etc.) silently.
//
// Run from frontend/ (sharp is a devDependency here):
//   cd frontend && node scripts/optimize-images.mjs
//
// Or to preview only:
//   DRY_RUN=1 node scripts/optimize-images.mjs

import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = resolve(__dirname, '..', 'public', 'images');

const MAX_WIDTH = 1600;
const QUALITY = 82;
const MIN_BYTES_TO_TOUCH = 80 * 1024; // skip files already <80KB

const DRY_RUN = process.env.DRY_RUN === '1';

const HANDLED = new Set(['.jpg', '.jpeg', '.png']);

function fmt(n) {
  if (n >= 1024 * 1024) return (n / (1024 * 1024)).toFixed(2) + ' MB';
  return (n / 1024).toFixed(1) + ' KB';
}

async function main() {
  const entries = await readdir(IMAGES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;
  let skipped = 0;

  for (const name of entries) {
    const ext = extname(name).toLowerCase();
    const path = join(IMAGES_DIR, name);
    const st = await stat(path);
    if (!st.isFile()) continue;
    if (!HANDLED.has(ext)) {
      console.log(`  · skip (${ext || 'no-ext'})  ${name}`);
      continue;
    }
    if (st.size < MIN_BYTES_TO_TOUCH) {
      console.log(`  · skip (small)   ${name}  ${fmt(st.size)}`);
      skipped++;
      continue;
    }

    const before = st.size;
    const input = await readFile(path);
    const pipeline = sharp(input).rotate(); // auto-orient via EXIF before stripping

    const meta = await pipeline.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    let outBuf;
    if (ext === '.png') {
      outBuf = await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();
    } else {
      outBuf = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    }

    const after = outBuf.length;
    if (after >= before) {
      console.log(`  = keep   ${name}  ${fmt(before)} → ${fmt(after)} (no win)`);
      skipped++;
      continue;
    }

    totalBefore += before;
    totalAfter += after;
    touched++;
    const savedPct = (((before - after) / before) * 100).toFixed(0);
    console.log(
      `  ✓ ${DRY_RUN ? 'WOULD-SHRINK' : 'shrink'}  ${name}  ${fmt(before)} → ${fmt(after)}  (-${savedPct}%)`
    );

    if (!DRY_RUN) {
      await writeFile(path, outBuf);
    }
  }

  console.log('');
  console.log(`${DRY_RUN ? '[dry-run] would touch' : 'touched'}: ${touched} files`);
  console.log(`skipped: ${skipped} files`);
  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    const pct = ((saved / totalBefore) * 100).toFixed(0);
    console.log(`total: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (saved ${fmt(saved)}, -${pct}%)`);
  }
  console.log(`(MP4/video files are ignored — handle those manually with ffmpeg if needed.)`);
}

main().catch((err) => {
  console.error('[optimize-images] failed:', err.message);
  console.error(err.stack);
  process.exit(1);
});
