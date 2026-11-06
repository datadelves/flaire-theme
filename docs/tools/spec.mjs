// Print everything the design package says about one section, compactly.
// Usage: node docs/tools/spec.mjs <section-id> [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const PKG = path.join(here, '..', '..', '..', 'delicate-round11-full-package');
const read = (f) => JSON.parse(fs.readFileSync(path.join(PKG, f), 'utf8'));
const id = process.argv[2];
if (!id) { console.log('usage: node docs/tools/spec.mjs <section-id>'); process.exit(1); }

const schemas = read('section-schemas.json').sections[id];
const surface = read('surface-map.json').sections?.[id];
const sectionStates = read('interaction-states.json').sections?.[id];

if (process.argv.includes('--json')) { console.log(JSON.stringify({ surface, schemas, sectionStates }, null, 1)); process.exit(0); }

const out = [];
if (surface) {
  out.push(`# ${id}: ${surface.name} (${surface.colorScheme}, ${surface.placement})`);
  out.push(`Purpose: ${surface.purpose}`);
  if (surface.contentNeeds) out.push(`Content: ${JSON.stringify(surface.contentNeeds)}`);
  if (surface.responsive) out.push(`Responsive: ${JSON.stringify(surface.responsive)}`);
  const names = (a) => (a || []).map((x) => (typeof x === 'string' ? x : x.name || x.id || JSON.stringify(x))).join(', ');
  out.push(`Components: ${names(surface.components)}  Behaviors: ${names(surface.behaviors)}`);
  if (surface.evidence) out.push(`Evidence: ${JSON.stringify(surface.evidence)}`);
}
if (schemas) {
  out.push('\n## Settings');
  for (const d of schemas.settingDocs || []) out.push(`- ${d.id} (${d.type}): ${d.controls} | empty: ${d.empty}`);
  out.push('\n## Blocks');
  for (const [type, b] of Object.entries(schemas.blockDocs || {})) {
    out.push(`- ${type} (${b.name})`);
    for (const d of b.settings || []) out.push(`    - ${d.id} (${d.type}): ${d.controls || ''} | data: ${d.data || ''} | empty: ${d.empty || ''}`);
  }
}
if (sectionStates) {
  out.push('\n## States (captured = has screenshot)');
  for (const s of sectionStates) out.push(`- ${s.id} [${s.status}] ${(s.evidence || []).join(', ')}${s.note ? ' | ' + s.note : ''}${s.description ? ' | ' + s.description : ''}`);
}
console.log(out.join('\n'));
