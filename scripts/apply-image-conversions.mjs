import fs from "node:fs";
import path from "node:path";

const conv = JSON.parse(fs.readFileSync("scripts/image-conversions.json", "utf8"));

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|css|html|md|mjs)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = ["src", "elements"]
  .filter((d) => fs.existsSync(d))
  .flatMap((d) => walk(d));

let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  const orig = text;
  for (const { from, to } of conv) {
    if (text.includes(from)) text = text.split(from).join(to);
  }
  if (text !== orig) {
    fs.writeFileSync(file, text);
    changed++;
    console.log("upd", path.relative(process.cwd(), file));
  }
}
console.log("files updated:", changed);
