import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * scripts/optimize-photos.mjs
 * ----------------------------------------------------------------------------
 * Resizes and compresses original high-res photo files into ~2000px wide WebP
 * images optimized for fast web loading.
 *
 * Usage:
 *   1. Drop full-res photos into: public/photography/originals/
 *   2. Run: node scripts/optimize-photos.mjs
 *   3. Optimized WebP files will be saved to: public/photography/
 * ----------------------------------------------------------------------------
 */

const INPUT_DIR = path.join(process.cwd(), "public", "photography", "originals");
const OUTPUT_DIR = path.join(process.cwd(), "public", "photography");
const MAX_DIMENSION = 2000;

function ensureDirs() {
  if (!fs.existsSync(INPUT_DIR)) {
    fs.mkdirSync(INPUT_DIR, { recursive: true });
    console.log(`📁 Created input folder: ${INPUT_DIR}`);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function optimizeImages() {
  ensureDirs();

  const files = fs.readdirSync(INPUT_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".heic"].includes(ext);
  });

  if (files.length === 0) {
    console.log(`ℹ️ No photos found in public/photography/originals/`);
    console.log(`👉 Add your raw photos there and re-run: node scripts/optimize-photos.mjs`);
    return;
  }

  console.log(`🚀 Found ${files.length} photo(s) to optimize (Max dimension: ${MAX_DIMENSION}px)...\n`);

  files.forEach((file, index) => {
    const inputPath = path.join(INPUT_DIR, file);
    const filenameWithoutExt = path.parse(file).name;
    const outputPath = path.join(OUTPUT_DIR, `${filenameWithoutExt}.webp`);

    try {
      // Step 1: Use macOS 'sips' to resize max dimension to 2000px if needed
      const tempPath = path.join(OUTPUT_DIR, `_temp_${file}`);
      execSync(`sips -Z ${MAX_DIMENSION} "${inputPath}" --out "${tempPath}"`, {
        stdio: "pipe",
      });

      // Step 2: Convert to WebP if sips supports format, or keep optimized JPEG/WebP
      try {
        execSync(`sips -s format webp "${tempPath}" --out "${outputPath}"`, {
          stdio: "pipe",
        });
        fs.unlinkSync(tempPath);
      } catch {
        // Fallback: Rename temp file to destination if direct WebP conversion fails
        const fallbackPath = path.join(OUTPUT_DIR, `${filenameWithoutExt}.jpg`);
        fs.renameSync(tempPath, fallbackPath);
        console.log(`  [${index + 1}/${files.length}] Resized ${file} -> ${path.basename(fallbackPath)}`);
        return;
      }

      const originalSize = (fs.statSync(inputPath).size / (1024 * 1024)).toFixed(2);
      const newSize = (fs.statSync(outputPath).size / 1024).toFixed(1);

      console.log(
        `  ✅ [${index + 1}/${files.length}] ${file} (${originalSize} MB) -> ${path.basename(outputPath)} (${newSize} KB)`
      );
    } catch (err) {
      console.error(`  ❌ Failed to process ${file}:`, err.message);
    }
  });

  console.log(`\n✨ Photo optimization complete! Output saved to /public/photography/`);
}

optimizeImages();
