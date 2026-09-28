# Photo Optimization & Resizing Guide

High-resolution camera photos (10–20MB each) will slow down page speed if served uncompressed. To keep the site fast and responsive, photos should be resized to **~2000px on the longest edge** and converted to **WebP format** (~150KB–400KB).

---

## Method 1: Using the Included Script (macOS)

1. Place your raw/original high-res photos into:
   ```
   public/photography/originals/
   ```

2. Run the optimization script:
   ```bash
   node scripts/optimize-photos.mjs
   ```

3. The script automatically resizes images to **max 2000px** and exports optimized WebP files into `public/photography/`.

4. Update `site.photos` in `content/site.ts` to reference the filenames (e.g. `/photography/my-photo.webp`).

---

## Method 2: Manual macOS Terminal (`sips` command)

`sips` is built into every Mac and requires no software installation.

1. Open Terminal in your project directory:
   ```bash
   cd ~/thys-portfolio
   ```

2. Resize a single image to 2000px max dimension and convert to WebP:
   ```bash
   sips -Z 2000 -s format webp path/to/my-photo.jpg --out public/photography/my-photo.webp
   ```

3. Or batch process an entire folder of JPEGs:
   ```bash
   for f in ~/Desktop/raw-photos/*.jpg; do
     sips -Z 2000 -s format webp "$f" --out "public/photography/$(basename "${f%.*}.webp")"
   done
   ```

---

## Method 3: Using Squoosh or Photoshop / Lightroom

- **Squoosh.app** (Web browser tool):
  - Drag image into [squoosh.app](https://squoosh.app)
  - Set resize width to `2000px`
  - Select `WebP` output format with Quality `80%`
  - Download and save to `public/photography/`

- **Lightroom / Photoshop**:
  - Export settings: Format `WebP`, Quality `80-85`, Long Edge `2000px`, Resolution `72 dpi`.
