// Seed a Shopify development store with the Flaire demo content (from the design prototype):
// metafield and metaobject definitions, product photos, 33 products with Finish/size variants, stock and
// metafields, collections, pages, the Journal blog with articles, reviews and menus.
//
// Usage (Node 18+):
//   node docs/tools/seed/seed.mjs --store your-store.myshopify.com --token shpat_xxx [--only step,step] [--dry]
//   node docs/tools/seed/seed.mjs --store your-store.myshopify.com --via-cli   (no app needed: see cli-gql.mjs)
//   Steps: definitions, files, products, collections, pages, blog, reviews, menus, pickup (default: all, in order)
//   --dry prints what would be created without calling the API.
//
// The token comes from a custom app in the store admin (Settings > Apps and sales channels > Develop apps)
// with these Admin API scopes: write_products, write_inventory, write_publications, write_content,
// write_online_store_pages, write_online_store_navigation, write_metaobject_definitions, write_metaobjects,
// write_files, read_locations. The script is safe to run again: everything is looked up by handle first.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cliGql } from './cli-gql.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const PKG = path.resolve(here, '..', '..', '..', '..', 'delicate-round11-full-package');
const SRC = path.join(PKG, 'prototypes', 'app-source', 'src');
const PHOTOS = path.join(PKG, 'assets', 'photos');
const API = '2026-01';

const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const STORE = arg('--store'); const TOKEN = arg('--token') || process.env.SHOPIFY_ADMIN_TOKEN;
const DRY = args.includes('--dry');
const VIA_CLI = args.includes('--via-cli');
const ONLY = (arg('--only') || '').split(',').filter(Boolean);
const STEPS = ['definitions', 'files', 'products', 'collections', 'pages', 'blog', 'reviews', 'menus', 'pickup'];
const run = (s) => !ONLY.length || ONLY.includes(s);
if (!DRY && (!STORE || (!TOKEN && !VIA_CLI))) { console.error('Need --store and --token, --via-cli or --dry. See the header of this file.'); process.exit(1); }

// ---- the prototype catalog is the source of truth ----
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
const C = await import(pathToFileURL(path.join(SRC, 'catalog.mjs')).href);
const { photoName } = await import(pathToFileURL(path.join(SRC, 'photos.mjs')).href);
const { PRODUCTS, COLLECTIONS, ARTICLES, PAGES, PAGE_BODY, GEM_NAMES, METALS } = C;

const STONE_SPEC = {
  diamond: (p) => ({ carat: p.carat || '0.30', colour: 'F', clarity: 'VS1', cut: 'Round brilliant' }),
  sapphire: (p) => ({ carat: p.carat || '0.80', colour: 'Deep blue', clarity: 'Eye clean', cut: 'Oval' }),
  emerald: (p) => ({ carat: p.carat || '0.70', colour: 'Deep green', clarity: 'Minor oil', cut: 'Emerald' }),
  ruby: (p) => ({ carat: p.carat || '0.60', colour: 'Deep red', clarity: 'Eye clean', cut: 'Cushion' }),
  pearl: () => ({ colour: 'White', cut: 'Round' }),
  onyx: () => ({ colour: 'Black', cut: 'Round, polished' }),
};
const DIMS = {
  ring: 'Band width: 2.1 mm; Stone width: 5.1 mm; Height off finger: 4.2 mm', band: 'Band width: 2.0 mm; Thickness: 1.6 mm; Weight: 2.4 g',
  pendant: 'Pendant height: 14 mm; Stone width: 6.0 mm; Chain: 1.1 mm cable', chain: 'Link width: 1.8 mm; Weight per inch: 0.9 g; Clasp: 7 mm spring ring',
  earring: 'Drop length: 18 mm; Stone width: 5.0 mm; Weight, each: 1.4 g', bracelet: 'Width: 3.0 mm; Thickness: 1.8 mm; Clasp: Hidden box clasp',
};
// style tags drive the mega menu and mobile menu links (/collections/rings/bands), as in the prototype's STYLES
const STYLES = {
  rings: [['Bands', 'bands', (p) => p.kind === 'band'], ['Solitaires', 'solitaires', (p) => p.kind === 'ring' && p.gem === 'diamond'], ['Stacking rings', 'stacking', (p) => p.kind === 'band' || p.price < 800], ['Gemstone rings', 'gemstone', (p) => p.kind === 'ring' && p.gem !== 'diamond'], ['New arrivals', 'new', (p) => p.badge === 'New']],
  necklaces: [['Pendants', 'pendants', (p) => p.kind === 'pendant'], ['Chains', 'chains', (p) => p.kind === 'chain'], ['Pearl', 'pearl', (p) => p.gem === 'pearl'], ['Gemstone', 'gemstone', (p) => !['diamond', 'pearl'].includes(p.gem)], ['New arrivals', 'new', (p) => p.badge === 'New']],
  earrings: [['Studs', 'studs', (p) => /Studs/.test(p.name)], ['Hoops', 'hoops', (p) => /Hoops/.test(p.name)], ['Drops', 'drops', (p) => /Drop/.test(p.name)], ['Pearl', 'pearl', (p) => p.gem === 'pearl'], ['New arrivals', 'new', (p) => p.badge === 'New']],
  bracelets: [['Bangles and cuffs', 'bangles', (p) => /Bangle|Cuff/.test(p.name)], ['Links and chains', 'links', (p) => /Chain|Line|Orbit/.test(p.name)], ['Pearl', 'pearl', (p) => p.gem === 'pearl'], ['New arrivals', 'new', (p) => p.badge === 'New']],
};
const styleTags = (p) => (STYLES[p.cat] || []).filter(([, , test]) => test(p)).map(([, key]) => key);
const TYPE = { ring: 'Ring', band: 'Ring', pendant: 'Necklace', chain: 'Necklace', earring: 'Earrings', bracelet: 'Bracelet' };
const GUIDE = { ring: 'rings', band: 'rings', pendant: 'necklaces', chain: 'necklaces', bracelet: 'bracelets' };
const REVIEWS = [['Maya R.', 'Austin', 'The band sits flat and has not left my finger in four months. Crisp, even finish.', 5], ['Daniel K.', 'Seattle', 'Arrived the next morning in a box I did not want to throw away. Brighter than the photo.', 5], ['Priya S.', 'Chicago', 'Sized at the studio, delivered on the day promised. Exactly as described.', 5], ['Tom H.', 'Denver', 'Heavier than I expected, in a good way. The clasp is easy with one hand.', 5], ['Elena V.', 'Boston', 'A gift for my sister. She has not taken it off since.', 5], ['Noah B.', 'Portland', 'The finish is a shade warmer than the photo. Still lovely.', 4], ['Aisha M.', 'Atlanta', 'Excellent quality, and the packaging was a pleasure to open.', 5], ['Chloe D.', 'Miami', 'Fits true to size and arrived with a handwritten note.', 4]];

// ---- Admin GraphQL ----
let calls = 0;
async function gql(query, variables = {}) {
  if (DRY) return {};
  for (let attempt = 0; attempt < 5; attempt++) {
    let json;
    calls++;
    if (VIA_CLI) json = cliGql(STORE, API, query, variables);
    else {
      const res = await fetch(`https://${STORE}/admin/api/${API}/graphql.json`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN }, body: JSON.stringify({ query, variables }) });
      if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 1500 * (attempt + 1))); continue; }
      json = await res.json();
    }
    if (json.errors) {
      if (JSON.stringify(json.errors).includes('THROTTLED')) { await new Promise((r) => setTimeout(r, 2000)); continue; }
      throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
  }
  throw new Error('Too many retries');
}
const userErrors = (o, label) => { const e = o && (o.userErrors || []).filter(Boolean); if (e && e.length) console.warn(`  ! ${label}:`, e.map((x) => `${(x.field || []).join('.')}: ${x.message}`).join('; ')); return e && e.length ? e : null; };
const log = (...a) => console.log(...a);

async function onlineStore() {
  const d = await gql('{ publications(first: 20) { nodes { id name } } }');
  return ((d.publications || {}).nodes || []).find((p) => /online store/i.test(p.name))?.id;
}
async function publish(id, pub) { if (!pub || DRY) return; const d = await gql('mutation($id: ID!, $input: [PublicationInput!]!) { publishablePublish(id: $id, input: $input) { userErrors { field message } } }', { id, input: [{ publicationId: pub }] }); userErrors(d.publishablePublish, 'publish'); }

// ---- 1. definitions ----
const PRODUCT_FIELDS = [
  ['kind', 'Kind', 'single_line_text_field', 'ring, band, pendant, earring, bracelet or chain. Drives placeholder art and the size guide.'],
  ['engravable', 'Engravable', 'boolean', 'Shows the engraving field and preview.'],
  ['tagline', 'Tagline', 'single_line_text_field', 'One sentence under the product name.'],
  ['card_material', 'Card material line', 'single_line_text_field', 'Material line on product cards.'],
  ['badge', 'Badge', 'single_line_text_field', 'Card and product badge, e.g. New or Limited edition.'],
  ['stone', 'Stone', 'single_line_text_field', 'Main stone. Used by the Stone filter.'],
  ['carat', 'Carat', 'single_line_text_field', 'Carat weight of the main stone, e.g. 0.50.'],
  ['metal', 'Metal', 'list.single_line_text_field', 'Metal description per finish, in finish order, e.g. 18-karat rose gold.'],
  ['colour', 'Colour', 'single_line_text_field', 'Stone colour grade.'],
  ['clarity', 'Clarity', 'single_line_text_field', 'Stone clarity.'],
  ['cut', 'Cut', 'single_line_text_field', 'Stone cut.'],
  ['made_in', 'Made in', 'single_line_text_field', 'Country of manufacture.'],
  ['certificate', 'Certificate', 'url', 'Grading report link.'],
  ['dimensions', 'Dimensions', 'single_line_text_field', 'Measured dimensions.'],
  ['craft_notes', 'Craft notes', 'multi_line_text_field', 'How the piece is made.'],
  ['size_guide', 'Size guide', 'single_line_text_field', 'rings, bracelets or necklaces: which size guide tab opens.'],
];
const COLLECTION_FIELDS = [
  ['kind', 'Kind', 'single_line_text_field', 'Placeholder art for the collection hero.'],
  ['size_guide', 'Size guide', 'single_line_text_field', 'Size guide tab for this collection.'],
  ['facts', 'Facts', 'list.single_line_text_field', 'Short material facts in the collection hero.'],
];
async function definitions() {
  log('Metafield definitions');
  const existing = await gql('{ metafieldDefinitions(first: 100, ownerType: PRODUCT, namespace: "custom") { nodes { key } } c: metafieldDefinitions(first: 100, ownerType: COLLECTION, namespace: "custom") { nodes { key } } }');
  const have = new Set(((existing.metafieldDefinitions || {}).nodes || []).map((n) => 'P' + n.key).concat(((existing.c || {}).nodes || []).map((n) => 'C' + n.key)));
  const make = async (owner, [key, name, type, description]) => {
    if (have.has(owner[0] + key)) return;
    log(`  + ${owner.toLowerCase()} custom.${key} (${type})`);
    const def = { name, namespace: 'custom', key, type, description, ownerType: owner, pin: true, access: { storefront: 'PUBLIC_READ' } };
    if (key === 'stone' || key === 'engravable') def.capabilities = { smartCollectionCondition: { enabled: true } };
    let d = await gql('mutation($d: MetafieldDefinitionInput!) { metafieldDefinitionCreate(definition: $d) { userErrors { field message code } } }', { d: def });
    if (userErrors(d.metafieldDefinitionCreate, key)) { delete def.capabilities; delete def.access; d = await gql('mutation($d: MetafieldDefinitionInput!) { metafieldDefinitionCreate(definition: $d) { userErrors { field message code } } }', { d: def }); userErrors(d.metafieldDefinitionCreate, key + ' (retry)'); }
  };
  for (const f of PRODUCT_FIELDS) await make('PRODUCT', f);
  for (const f of COLLECTION_FIELDS) await make('COLLECTION', f);

  log('Metaobject definition delicate_review');
  const mo = await gql('{ metaobjectDefinitionByType(type: "delicate_review") { id } }');
  if (!(mo.metaobjectDefinitionByType)) {
    const d = await gql(`mutation($d: MetaobjectDefinitionCreateInput!) { metaobjectDefinitionCreate(definition: $d) { userErrors { field message } } }`, { d: {
      type: 'delicate_review', name: 'Review', displayNameKey: 'author', access: { storefront: 'PUBLIC_READ' }, capabilities: { publishable: { enabled: true } },
      fieldDefinitions: [
        { key: 'product', name: 'Product', type: 'product_reference', required: true },
        { key: 'rating', name: 'Rating', type: 'rating', required: true, validations: [{ name: 'scale_min', value: '1' }, { name: 'scale_max', value: '5' }] },
        { key: 'title', name: 'Title', type: 'single_line_text_field' },
        { key: 'body', name: 'Review', type: 'multi_line_text_field', required: true },
        { key: 'author', name: 'Author', type: 'single_line_text_field', required: true },
        { key: 'location', name: 'Location', type: 'single_line_text_field' },
        { key: 'verified', name: 'Verified purchase', type: 'boolean' },
        { key: 'photo', name: 'Photo', type: 'file_reference', validations: [{ name: 'file_type_options', value: '["Image"]' }] },
        { key: 'response', name: 'Reply from the studio', type: 'multi_line_text_field' },
        { key: 'created', name: 'Date', type: 'date' },
      ] } });
    userErrors(d.metaobjectDefinitionCreate, 'delicate_review');
  }
}

// ---- 2. product photos (Files) ----
const fileCache = path.join(here, '.files.json');
async function files() {
  log('Product photos');
  const cache = fs.existsSync(fileCache) ? JSON.parse(fs.readFileSync(fileCache, 'utf8')) : {};
  if (STORE && cache.__store && cache.__store !== STORE) for (const k of Object.keys(cache)) delete cache[k];
  cache.__store = STORE;
  const list = fs.readdirSync(PHOTOS).filter((f) => f.endsWith('.webp')).sort();
  for (const f of list) {
    if (cache[f]) continue;
    log(`  + ${f}`);
    if (DRY) { cache[f] = `https://cdn.example/${f}`; continue; }
    const buf = fs.readFileSync(path.join(PHOTOS, f));
    const st = await gql('mutation($i: [StagedUploadInput!]!) { stagedUploadsCreate(input: $i) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } } }', { i: [{ filename: f, mimeType: 'image/webp', httpMethod: 'POST', resource: 'IMAGE', fileSize: String(buf.length) }] });
    const t = st.stagedUploadsCreate.stagedTargets[0];
    const form = new FormData(); t.parameters.forEach((p) => form.append(p.name, p.value)); form.append('file', new Blob([buf], { type: 'image/webp' }), f);
    const up = await fetch(t.url, { method: 'POST', body: form }); if (!up.ok) throw new Error('upload failed ' + f + ' ' + up.status);
    const metal = f.replace('.webp', '').split('-').slice(-2).join('-').replace(/^(gold|platinum)$/, '');
    const alt = Object.entries(METALS).find(([k]) => f.endsWith(k + '.webp'))?.[1] || metal;
    const cr = await gql('mutation($f: [FileCreateInput!]!) { fileCreate(files: $f) { files { id } userErrors { field message } } }', { f: [{ originalSource: t.resourceUrl, contentType: 'IMAGE', alt }] });
    if (userErrors(cr.fileCreate, f)) continue;
    const id = cr.fileCreate.files[0].id; let url = null;
    for (let i = 0; i < 20 && !url; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      const n = await gql('query($id: ID!) { node(id: $id) { ... on MediaImage { fileStatus image { url } } } }', { id });
      if (n.node && n.node.fileStatus === 'READY' && n.node.image) url = n.node.image.url;
      if (n.node && n.node.fileStatus === 'FAILED') break;
    }
    if (url) { cache[f] = url; cache['id:' + f] = id; fs.writeFileSync(fileCache, JSON.stringify(cache, null, 2)); }
  }
  if (!DRY) fs.writeFileSync(fileCache, JSON.stringify(cache, null, 2));
  return cache;
}
const photoFor = (cache, p, metal) => cache[`${photoName({ h: p.h, gem: p.gem })}-${metal}.webp`];

// ---- 3. products ----
function sizeOption(p) {
  const set = C.sizeSet(p); if (!set) return null;
  return { name: set.cap, values: set.list.map((o) => ({ v: o.v, label: o.label })) };
}
async function products(cache) {
  log('Products');
  // stock the location that ships (in a shipping profile), or the storefront treats every piece as sold out
  const locs = DRY ? [] : (await gql('{ locations(first: 20) { nodes { id name shipsInventory fulfillsOnlineOrders isActive } } }')).locations.nodes;
  const shipLoc = locs.find((l) => l.isActive && l.shipsInventory && l.fulfillsOnlineOrders) || locs.find((l) => l.isActive) || locs[0];
  const loc = DRY ? 'gid://shopify/Location/1' : shipLoc.id;
  if (!DRY) log(`  stock location: ${shipLoc.name}${shipLoc.shipsInventory ? '' : ' (warning: not in a shipping profile, products will show as sold out)'}`);
  const pub = DRY ? null : await onlineStore();
  const ids = {};
  const created = Date.now();
  for (const p of PRODUCTS) {
    const size = sizeOption(p);
    const finishValues = p.metals.map((m) => METALS[m]);
    const productOptions = [{ name: 'Finish', values: finishValues.map((name) => ({ name })) }];
    if (size) productOptions.push({ name: size.name, values: size.values.map((o) => ({ name: o.label })) });
    const variants = [];
    for (const m of p.metals) {
      const sizes = size ? size.values : [{ v: null, label: null }];
      for (const s of sizes) {
        const price = C.priceOf(p, m, s.v ?? undefined);
        const was = C.wasOf(p, m, s.v ?? undefined);
        const stock = p.soldout ? 0 : (C.stockOf(p, m, s.v) ?? 3);
        const v = {
          optionValues: [{ optionName: 'Finish', name: METALS[m] }].concat(size ? [{ optionName: size.name, name: s.label }] : []),
          price: price.toFixed(2), sku: C.skuOf(p, m, s.v), inventoryPolicy: 'DENY', inventoryItem: { tracked: true },
          inventoryQuantities: [{ locationId: loc, name: 'available', quantity: stock }],
        };
        if (was) v.compareAtPrice = was.toFixed(2);
        const img = photoFor(cache, p, m); if (img) v.file = { originalSource: img, contentType: 'IMAGE', alt: METALS[m] };
        variants.push(v);
      }
    }
    const filesIn = p.metals.map((m) => photoFor(cache, p, m)).filter(Boolean).map((u, i) => ({ originalSource: u, contentType: 'IMAGE', alt: METALS[p.metals[i]] }));
    // the product's own finish first, so the featured image matches the prototype card
    const firstIdx = p.metals.indexOf(p.metal); if (firstIdx > 0) { const [f] = filesIn.splice(firstIdx, 1); if (f) filesIn.unshift(f); }
    const spec = p.stone ? STONE_SPEC[p.stone](p) : {};
    const mf = [
      ['kind', 'single_line_text_field', p.kind], ['engravable', 'boolean', String(!!p.engr)], ['tagline', 'single_line_text_field', p.blurb],
      ['card_material', 'single_line_text_field', p.mat], ['made_in', 'single_line_text_field', 'Italy'], ['dimensions', 'single_line_text_field', DIMS[p.kind]],
      ['craft_notes', 'multi_line_text_field', `${p.mat}. Cast in recycled metal and finished by hand. Each stone is set under magnification and checked a second time.`],
    ];
    if (p.badge) mf.push(['badge', 'single_line_text_field', p.badge]);
    if (p.stone) mf.push(['stone', 'single_line_text_field', GEM_NAMES[p.stone]]);
    if (spec.carat) mf.push(['carat', 'single_line_text_field', String(spec.carat)]);
    mf.push(['metal', 'list.single_line_text_field', JSON.stringify(p.metals.map((m) => (m === 'platinum' ? 'Platinum 950' : '18-karat ' + METALS[m].toLowerCase())))]);
    ['colour', 'clarity', 'cut'].forEach((k) => { if (spec[k]) mf.push([k, 'single_line_text_field', spec[k]]); });
    if (p.stone === 'diamond') mf.push(['certificate', 'url', 'https://www.gia.edu/report-check-landing']);
    if (GUIDE[p.kind] && size) mf.push(['size_guide', 'single_line_text_field', GUIDE[p.kind]]);
    const tags = [...new Set([p.cat, p.kind, p.stone ? GEM_NAMES[p.stone].toLowerCase() : null, p.gift ? 'gift' : null, p.engr ? 'engravable' : null, ...styleTags(p)].filter(Boolean))];
    const input = {
      title: p.name, handle: p.h, descriptionHtml: `<p>${p.blurb}</p>`, productType: TYPE[p.kind], vendor: 'Flaire', status: 'ACTIVE', tags,
      productOptions, variants, files: filesIn, metafields: mf.map(([key, type, value]) => ({ namespace: 'custom', key, type, value })),
    };
    log(`  + ${p.h} (${variants.length} variants${p.soldout ? ', sold out' : ''})`);
    if (DRY) continue;
    const d = await gql(`mutation($input: ProductSetInput!, $id: ProductSetIdentifiers) { productSet(synchronous: true, input: $input, identifier: $id) { product { id } userErrors { field message code } } }`, { input, id: { handle: p.h } });
    if (userErrors(d.productSet, p.h)) continue;
    ids[p.h] = d.productSet.product.id;
    await publish(ids[p.h], pub);
  }
  log(`  products took ${Math.round((Date.now() - created) / 1000)}s`);
  return ids;
}

// ---- 4. collections ----
const COLLECTION_RULES = { rings: ['TAG', 'rings'], necklaces: ['TAG', 'necklaces'], earrings: ['TAG', 'earrings'], bracelets: ['TAG', 'bracelets'], gifts: ['TAG', 'gift'], engravable: ['TAG', 'engravable'] };
async function collections(cache) {
  log('Collections');
  const pub = DRY ? null : await onlineStore();
  const ids = {};
  for (const [h, c] of Object.entries(COLLECTIONS)) {
    const rule = COLLECTION_RULES[h] || ['VARIANT_PRICE', null];
    const ruleSet = { appliedDisjunctively: false, rules: [rule[1] ? { column: rule[0], relation: 'EQUALS', condition: rule[1] } : { column: 'VARIANT_PRICE', relation: 'GREATER_THAN', condition: '0' }] };
    const img = cache[`${photoName({ h: '', gem: c.gem })}-${c.metal}.webp`];
    const input = { title: c.title, handle: h, descriptionHtml: `<p>${c.sub}</p>`, ruleSet, templateSuffix: h, sortOrder: h === 'all' ? 'CREATED_DESC' : 'MANUAL',
      metafields: [{ namespace: 'custom', key: 'kind', type: 'single_line_text_field', value: c.kind }, { namespace: 'custom', key: 'facts', type: 'list.single_line_text_field', value: JSON.stringify(c.facts) }].concat(c.guide ? [{ namespace: 'custom', key: 'size_guide', type: 'single_line_text_field', value: c.guide }] : []) };
    if (img) input.image = { src: img, altText: c.title };
    log(`  + ${h}`);
    if (DRY) continue;
    const ex = await gql('query($h: String!) { collectionByHandle(handle: $h) { id } }', { h });
    if (ex.collectionByHandle) {
      delete input.ruleSet; input.id = ex.collectionByHandle.id;
      const d = await gql('mutation($input: CollectionInput!) { collectionUpdate(input: $input) { collection { id } userErrors { field message } } }', { input });
      userErrors(d.collectionUpdate, h); ids[h] = input.id;
    } else {
      // created as Featured (manual); order-collections.mjs puts the products in catalog order
      const d = await gql('mutation($input: CollectionInput!) { collectionCreate(input: $input) { collection { id } userErrors { field message } } }', { input });
      if (userErrors(d.collectionCreate, h)) continue; ids[h] = d.collectionCreate.collection.id;
    }
    await publish(ids[h], pub);
  }
  return ids;
}

// ---- 5. pages ----
function pageHtml(blocks) {
  return blocks.map((b) => {
    const [k, a, c] = b;
    if (k === 'lead') return `<p><strong>${a}</strong></p>`;
    if (k === 'h') return `<h2>${a}</h2>`;
    if (k === 'p') return `<p>${a}</p>`;
    if (k === 'n') return `<blockquote><p><strong>${a}</strong></p><p>${c}</p></blockquote>`;
    if (k === 'ul') return `<ul>${(Array.isArray(a) ? a : [a]).map((x) => `<li>${x}</li>`).join('')}</ul>`;
    return `<p>${[a, c].filter(Boolean).join(' ')}</p>`;
  }).join('\n');
}
async function pages() {
  log('Pages');
  const list = Object.entries(PAGES).map(([h, pg]) => ({ handle: h, title: pg.title, body: pageHtml(PAGE_BODY[h] || [['p', pg.lead || '']]) }));
  list.push({ handle: 'contact', title: 'Contact', body: '<p>Write to the studio, or book a visit for sizing and engraving.</p>', templateSuffix: 'contact' });
  list.push({ handle: 'about', title: 'About', body: '<p>Flaire makes fine jewelry to be worn every day, set by hand in 18-karat gold and platinum.</p>' });
  const ids = {};
  for (const pg of list) {
    log(`  + ${pg.handle}`);
    if (DRY) continue;
    const ex = await gql('query($q: String!) { pages(first: 1, query: $q) { nodes { id handle } } }', { q: `handle:${pg.handle}` });
    const found = ex.pages.nodes.find((n) => n.handle === pg.handle);
    const page = { title: pg.title, handle: pg.handle, body: pg.body, isPublished: true, ...(pg.templateSuffix ? { templateSuffix: pg.templateSuffix } : {}) };
    if (found) { const d = await gql('mutation($id: ID!, $page: PageUpdateInput!) { pageUpdate(id: $id, page: $page) { page { id } userErrors { field message } } }', { id: found.id, page }); userErrors(d.pageUpdate, pg.handle); ids[pg.handle] = found.id; }
    else { const d = await gql('mutation($page: PageCreateInput!) { pageCreate(page: $page) { page { id } userErrors { field message } } }', { page }); if (!userErrors(d.pageCreate, pg.handle)) ids[pg.handle] = d.pageCreate.page.id; }
  }
  return ids;
}

// ---- 6. blog ----
async function blog(cache) {
  log('Journal');
  let blogId = null;
  if (!DRY) {
    const ex = await gql('{ blogs(first: 20) { nodes { id handle } } }');
    blogId = (ex.blogs.nodes.find((b) => b.handle === 'journal') || {}).id;
    if (!blogId) { const d = await gql('mutation($blog: BlogCreateInput!) { blogCreate(blog: $blog) { blog { id } userErrors { field message } } }', { blog: { title: 'Journal', handle: 'journal', commentPolicy: 'MODERATED' } }); userErrors(d.blogCreate, 'journal'); blogId = d.blogCreate.blog && d.blogCreate.blog.id; }
  }
  const year = new Date().getFullYear();
  for (const a of ARTICLES) {
    log(`  + ${a.slug}`);
    if (DRY || !blogId) continue;
    const img = cache[`aurora-band-${a.metal}.webp`]; // the app draws every journal card with the Aurora photo
    const body = `<p><strong>${a.lead}</strong></p>` + (a.body || []).map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('');
    const date = new Date(`${a.d} ${year} 09:00:00`); if (date > new Date()) date.setFullYear(year - 1);
    const article = { blogId, title: a.t, handle: a.slug, body, summary: `<p>${a.lead}</p>`, tags: [a.tag], isPublished: true, publishDate: date.toISOString(), author: { name: 'Flaire studio' }, ...(img ? { image: { url: img, altText: a.t } } : {}) };
    const ex = await gql('query($q: String!) { articles(first: 1, query: $q) { nodes { id handle } } }', { q: `handle:${a.slug}` });
    const found = ex.articles.nodes.find((n) => n.handle === a.slug);
    if (found) { delete article.blogId; const d = await gql('mutation($id: ID!, $article: ArticleUpdateInput!) { articleUpdate(id: $id, article: $article) { article { id } userErrors { field message } } }', { id: found.id, article }); userErrors(d.articleUpdate, a.slug); }
    else { const d = await gql('mutation($article: ArticleCreateInput!) { articleCreate(article: $article) { article { id } userErrors { field message } } }', { article }); userErrors(d.articleCreate, a.slug); }
  }
}

// ---- 7. reviews ----
async function reviews(productIds) {
  log('Reviews (delicate_review metaobjects)');
  let n = 0;
  for (const p of PRODUCTS.slice(0, 12)) {
    const off = C.hash(p.h) % REVIEWS.length;
    for (let i = 0; i < 4; i++) {
      const [author, location, body, rating] = REVIEWS[(i + off) % REVIEWS.length];
      const handle = `${p.h}-${i + 1}`; n++;
      if (DRY) continue;
      const pid = productIds[p.h]; if (!pid) continue;
      const fields = [
        { key: 'product', value: pid }, { key: 'rating', value: JSON.stringify({ value: String(rating), scale_min: '1', scale_max: '5' }) },
        { key: 'body', value: body }, { key: 'author', value: author }, { key: 'location', value: location }, { key: 'verified', value: String(i !== 1) },
        { key: 'created', value: new Date(Date.now() - (i + 1) * 9 * 86400000).toISOString().slice(0, 10) },
      ];
      if (i === 0 && p.h === 'aurora-band') fields.push({ key: 'response', value: 'Thank you for the kind words. We are glad it arrived on time.' });
      const d = await gql('mutation($h: MetaobjectHandleInput!, $m: MetaobjectUpsertInput!) { metaobjectUpsert(handle: $h, metaobject: $m) { metaobject { id } userErrors { field message } } }', { h: { type: 'delicate_review', handle }, m: { fields, capabilities: { publishable: { status: 'ACTIVE' } } } });
      userErrors(d.metaobjectUpsert, handle);
    }
  }
  log(`  ${n} reviews`);
}

// ---- 8. menus ----
async function lookupIds() {
  if (DRY) return { c: {}, p: {}, b: null };
  const d = await gql('{ collections(first: 50) { nodes { id handle } } pages(first: 50) { nodes { id handle } } blogs(first: 10) { nodes { id handle } } }');
  return { c: Object.fromEntries(d.collections.nodes.map((n) => [n.handle, n.id])), p: Object.fromEntries(d.pages.nodes.map((n) => [n.handle, n.id])), b: (d.blogs.nodes.find((x) => x.handle === 'journal') || {}).id };
}
async function menus() {
  log('Menus');
  const ids = await lookupIds();
  const col = (title, h, items) => ({ title, type: ids.c[h] ? 'COLLECTION' : 'HTTP', ...(ids.c[h] ? { resourceId: ids.c[h] } : { url: `/collections/${h}` }), ...(items ? { items } : {}) });
  const page = (title, h) => ({ title, type: ids.p[h] ? 'PAGE' : 'HTTP', ...(ids.p[h] ? { resourceId: ids.p[h] } : { url: `/pages/${h}` }) });
  const http = (title, url) => ({ title, type: 'HTTP', url });
  const MENUS = {
    'main-menu': ['Main menu', [
      ...['rings', 'necklaces', 'earrings', 'bracelets'].map((h) => col(COLLECTIONS[h].title, h, STYLES[h].map(([label, key]) => http(label, `/collections/${h}/${key}`)))),
      col('Gifts', 'gifts'), page('Engrave', 'engraving'),
    ]],
    'footer-shop': ['Shop', ['rings', 'necklaces', 'earrings', 'bracelets', 'gifts'].map((h) => col(COLLECTIONS[h].title, h))],
    'footer-make': ['Make it yours', [page('Engraving', 'engraving'), page('Ring sizing', 'ring-sizing'), http('Gift cards', '/products/gift-card'), page('Book a visit', 'contact')]],
    'footer-help': ['Help', [page('Delivery', 'delivery'), page('Returns', 'returns'), page('Care guide', 'care-guide'), page('Contact', 'contact')]],
    'footer-company': ['Company', [page('Our materials', 'materials'), page('Craft', 'craft'), ids.b ? { title: 'Journal', type: 'BLOG', resourceId: ids.b } : http('Journal', '/blogs/journal'), page('Stores', 'stores')]],
    legal: ['Legal', [page('Privacy', 'privacy'), page('Terms', 'terms'), page('Shipping policy', 'shipping-policy')]],
    'popular-searches': ['Popular searches', [http('Engagement rings', '/search?q=diamond+ring'), http('Rose gold', '/search?q=rose+gold'), http('Pearl earrings', '/search?q=pearl'), http('Gift under $500', '/search?q=gift'), http('Ring size guide', '/pages/ring-sizing')]],
  };
  const existing = DRY ? { menus: { nodes: [] } } : await gql('{ menus(first: 50) { nodes { id handle } } }');
  for (const [handle, [title, items]] of Object.entries(MENUS)) {
    log(`  + ${handle}`);
    if (DRY) continue;
    const found = existing.menus.nodes.find((m) => m.handle === handle);
    if (found) { const d = await gql('mutation($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) { menuUpdate(id: $id, title: $title, items: $items) { menu { id } userErrors { field message } } }', { id: found.id, title, items }); userErrors(d.menuUpdate, handle); }
    else { const d = await gql('mutation($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) { menuCreate(title: $title, handle: $handle, items: $items) { menu { id } userErrors { field message } } }', { title, handle, items }); userErrors(d.menuCreate, handle); }
  }
}

// ---- 9. local pickup ----
async function pickup() {
  log('Local pickup at the first location');
  if (DRY) return;
  const all = (await gql('{ locations(first: 20) { nodes { id name shipsInventory isActive } } }')).locations.nodes;
  const loc = all.find((l) => l.isActive && l.shipsInventory) || all[0];
  const d = await gql('mutation($s: DeliveryLocationLocalPickupEnableInput!) { locationLocalPickupEnable(localPickupSettings: $s) { localPickupSettings { pickupTime } userErrors { field message } } }', { s: { locationId: loc.id, pickupTime: 'TWENTY_FOUR_HOURS', instructions: 'Bring photo ID. Engraved pieces need two working days.' } });
  userErrors(d.locationLocalPickupEnable, 'pickup');
}

// ---- run ----
log(`Flaire demo data → ${DRY ? 'dry run' : STORE}`);
if (run('definitions')) await definitions();
let cache = fs.existsSync(fileCache) ? JSON.parse(fs.readFileSync(fileCache, 'utf8')) : {};
if (run('files')) cache = await files();
let productIds = {};
if (run('products')) productIds = await products(cache);
else if (run('reviews') && !DRY) {
  const d = await gql('{ products(first: 100) { nodes { id handle } } }');
  productIds = Object.fromEntries(d.products.nodes.map((n) => [n.handle, n.id]));
}
if (run('collections')) await collections(cache);
if (run('pages')) await pages();
if (run('blog')) await blog(cache);
if (run('reviews')) await reviews(productIds);
if (run('menus')) await menus();
if (run('pickup')) await pickup();
if (run('collections') && !DRY) {
  const { execFileSync } = await import('node:child_process');
  execFileSync(process.execPath, [path.join(here, 'order-collections.mjs'), '--store', STORE, ...(VIA_CLI ? ['--via-cli'] : [])], { stdio: 'inherit', env: VIA_CLI ? process.env : { ...process.env, SHOPIFY_ADMIN_TOKEN: TOKEN } });
}
log(`Done (${calls} API calls).`);
log('Next: Search & Discovery app > Filters: add Finish (variant option), Stone (custom.stone), Price, Availability and Engravable (custom.engravable).');
