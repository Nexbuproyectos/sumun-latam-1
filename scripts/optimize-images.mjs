import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const MAX_EDGE = 1920;
const JPG_QUALITY = 78;
const PNG_QUALITY = 75;
const MIN_BYTES = 80 * 1024; // skip tiny files

const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function hasMeaningfulAlpha(img) {
  const { channels, hasAlpha } = await img.metadata();
  if (!hasAlpha) return false;
  // Sample a resized version for alpha usage
  const { data, info } = await img
    .clone()
    .ensureAlpha()
    .resize(64, 64, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const stride = info.channels;
  let transparent = 0;
  for (let i = stride - 1; i < data.length; i += stride) {
    if (data[i] < 250) transparent++;
  }
  return transparent / (data.length / stride) > 0.01;
}

async function optimizeFile(file) {
  const before = fs.statSync(file).size;
  if (before < MIN_BYTES) return null;

  const ext = path.extname(file).toLowerCase();
  const base = sharp(file, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const pipeline = base.resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  const tmp = `${file}.opt.tmp`;

  try {
    if (ext === ".jpg" || ext === ".jpeg") {
      await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(tmp);
    } else if (ext === ".webp") {
      await pipeline.webp({ quality: JPG_QUALITY }).toFile(tmp);
    } else {
      // PNG: keep alpha if needed; otherwise jpeg-in-png-slot isn't valid.
      // Opaque photos → rewrite as JPEG sibling (.jpg) for max savings.
      const alpha = await hasMeaningfulAlpha(sharp(file, { failOn: "none" }));
      if (alpha) {
        await pipeline
          .png({ compressionLevel: 9, quality: PNG_QUALITY, effort: 7 })
          .toFile(tmp);
      } else {
        const jpgPath = file.replace(/\.png$/i, ".jpg");
        const jpgTmp = `${jpgPath}.opt.tmp`;
        await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(jpgTmp);
        const afterJpg = fs.statSync(jpgTmp).size;
        // Only switch to jpg if clearly smaller
        if (afterJpg < before * 0.85) {
          fs.renameSync(jpgTmp, jpgPath);
          if (jpgPath !== file && fs.existsSync(file)) fs.unlinkSync(file);
          return {
            file,
            before,
            after: afterJpg,
            convertedTo: jpgPath,
          };
        }
        fs.unlinkSync(jpgTmp);
        await sharp(file, { failOn: "none" })
          .rotate()
          .resize({
            width: MAX_EDGE,
            height: MAX_EDGE,
            fit: "inside",
            withoutEnlargement: true,
          })
          .png({ compressionLevel: 9, quality: PNG_QUALITY, effort: 7 })
          .toFile(tmp);
      }
    }

    const after = fs.statSync(tmp).size;
    if (after < before) {
      fs.renameSync(tmp, file);
      return { file, before, after };
    }
    fs.unlinkSync(tmp);
    return { file, before, after: before, skipped: true };
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    return { file, before, error: String(err) };
  } finally {
    // metadata var unused intentionally kept for future tuning
    void meta;
  }
}

const files = walk(ROOT);
const converted = [];
let saved = 0;
let beforeTotal = 0;
let afterTotal = 0;

console.log(`Optimizing ${files.length} images under public/images ...`);

for (const file of files) {
  const result = await optimizeFile(file);
  if (!result) continue;
  if (result.error) {
    console.error("ERR", path.relative(ROOT, result.file), result.error);
    continue;
  }
  beforeTotal += result.before;
  afterTotal += result.after;
  saved += result.before - result.after;
  const rel = path.relative(process.cwd(), result.file);
  const pct = Math.round((1 - result.after / result.before) * 100);
  if (result.convertedTo) {
    converted.push({
      from: "/" + path.relative("public", result.file).replaceAll("\\", "/"),
      to: "/" + path.relative("public", result.convertedTo).replaceAll("\\", "/"),
    });
    console.log(
      `→ JPG ${rel} → ${path.relative(process.cwd(), result.convertedTo)} (${(result.before / 1e6).toFixed(1)}→${(result.after / 1e6).toFixed(1)} MB, -${pct}%)`,
    );
  } else if (!result.skipped) {
    console.log(
      `OK  ${rel} (${(result.before / 1e6).toFixed(1)}→${(result.after / 1e6).toFixed(1)} MB, -${pct}%)`,
    );
  }
}

fs.writeFileSync(
  "scripts/image-conversions.json",
  JSON.stringify(converted, null, 2),
);

console.log("\n---");
console.log(
  `Done. ${(beforeTotal / 1e6).toFixed(1)} MB → ${(afterTotal / 1e6).toFixed(1)} MB (saved ${(saved / 1e6).toFixed(1)} MB)`,
);
console.log(`Converted PNG→JPG: ${converted.length} (see scripts/image-conversions.json)`);
