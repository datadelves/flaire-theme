// Build the demo-store version of the theme: the theme as merchants install it, plus the demo store's own
// template, section group and settings JSON from docs/demo-store/ (store photos, collections, products, menus).
// The Theme Store requires demo-store resources to stay out of the theme's JSON files, so they live here.
// Usage: node docs/tools/demo-build.mjs [--out <dir>]   then   shopify theme push --path <dir> --store ... --theme ...
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const THEME = path.resolve(here, '..', '..');
const DEMO = path.join(THEME, 'docs', 'demo-store');
const args = process.argv.slice(2);
const OUT = path.resolve(args.includes('--out') ? args[args.indexOf('--out') + 1] : path.join(os.tmpdir(), 'flaire-demo-build'));
const DIRS = ['assets', 'blocks', 'config', 'layout', 'listings', 'locales', 'sections', 'snippets', 'templates'];

fs.rmSync(OUT, { recursive: true, force: true });
for (const d of DIRS) if (fs.existsSync(path.join(THEME, d))) fs.cpSync(path.join(THEME, d), path.join(OUT, d), { recursive: true });

let n = 0;
(function overlay(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { overlay(p); continue; }
    const rel = path.relative(DEMO, p);
    if (rel === 'README.md') continue;
    fs.mkdirSync(path.dirname(path.join(OUT, rel)), { recursive: true });
    fs.copyFileSync(p, path.join(OUT, rel)); n++;
  }
})(DEMO);
console.log(`Built ${OUT} (theme + ${n} demo-store files)`);
