// Put each Flaire collection on "Featured" (manual) order with products in the prototype's catalog order.
// Usage: SHOPIFY_ADMIN_TOKEN=... node docs/tools/seed/order-collections.mjs --store your-store.myshopify.com [--via-cli]
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cliGql } from './cli-gql.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '..', '..', '..', '..', 'delicate-round11-full-package', 'prototypes', 'app-source', 'src');
const STORE = process.argv[process.argv.indexOf('--store') + 1];
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const VIA_CLI = process.argv.includes('--via-cli');
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
const C = await import(pathToFileURL(path.join(SRC, 'catalog.mjs')).href);

async function gql(query, variables = {}) {
  if (VIA_CLI) { const j = cliGql(STORE, '2026-01', query, variables); if (j.errors) throw new Error(JSON.stringify(j.errors)); return j.data; }
  const r = await fetch(`https://${STORE}/admin/api/2026-01/graphql.json`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN }, body: JSON.stringify({ query, variables }) });
  const j = await r.json(); if (j.errors) throw new Error(JSON.stringify(j.errors)); return j.data;
}

const order = C.PRODUCTS.map((p) => p.h);
for (const handle of Object.keys(C.COLLECTIONS)) {
  const d = await gql('query($h: String!) { collectionByHandle(handle: $h) { id sortOrder products(first: 100) { nodes { id handle } } } }', { h: handle });
  const c = d.collectionByHandle; if (!c) { console.log('  missing', handle); continue; }
  if (c.sortOrder !== 'MANUAL') {
    const u = await gql('mutation($i: CollectionInput!) { collectionUpdate(input: $i) { userErrors { message } } }', { i: { id: c.id, sortOrder: 'MANUAL' } });
    if (u.collectionUpdate.userErrors.length) console.log('  !', handle, JSON.stringify(u.collectionUpdate.userErrors));
  }
  const nodes = c.products.nodes;
  const ranked = [...nodes].sort((a, b) => (order.indexOf(a.handle) < 0 ? 999 : order.indexOf(a.handle)) - (order.indexOf(b.handle) < 0 ? 999 : order.indexOf(b.handle)));
  const moves = ranked.map((n, i) => ({ id: n.id, newPosition: String(i) }));
  const m = await gql('mutation($id: ID!, $moves: [MoveInput!]!) { collectionReorderProducts(id: $id, moves: $moves) { userErrors { message } } }', { id: c.id, moves });
  console.log(`  ${handle}: ${ranked.length} products ${m.collectionReorderProducts.userErrors.length ? JSON.stringify(m.collectionReorderProducts.userErrors) : 'ordered'}`);
}
