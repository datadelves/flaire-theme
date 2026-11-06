# Theme Store submission prep: status (started 2026-11-02)

Target store for updates: **flaire-ddfwvwmz only** (live theme "Datadelves Theme" #190000333012). Don't push to testdev.
CLI account: the CLI has two saved logins and the active one (vishakha@scopegen.in) can't see flaire or testdev. Prefix every
`shopify theme ...` command with `SHOPIFY_FLAG_AUTH_ALIAS=vishakha@datadelves.com`; don't switch the active login.

## Work in progress
Five parallel agents, each on its own copy of the theme (nothing merged into this folder yet):
`C:\Users\VISHAK~1\AppData\Local\Temp\claude\c--Users-Vishakha-Dedha-Desktop-datadelves-theme\0c2900b2-2b53-4f46-9171-08f013106769\scratchpad\work\`
- `base/`: pristine snapshot of this folder before the work started (merge base).
- `media/`: product page: video, YouTube/Vimeo and 3D media; Shop Pay Installments banner; tax note; gift card recipient form; native swatches; Custom Liquid block.
- `cart/`: cart express checkout; tax note; Follow on Shop; `<shopify-account>`; password message; Custom Liquid section; delete robots.txt.liquid; fonts via font_picker only; routes instead of hard-coded paths; empty social defaults.
- `data/`: remove custom metafield and `delicate_review` metaobject dependencies (settings with dynamic sources, reviews via app blocks plus standard reviews.rating, testimonials as blocks).
- `perf/`: Lighthouse performance to >= 60 mobile and desktop (LCP photo painted ~4s late); focal points; responsive images.
- `pages/`: audit and fix collection, list, blog, article, search, 404, gift card and customer pages; Firefox e2e.
- docs agent (6th): merchant documentation, FAQ, support policy, release notes and listing draft in this repo's `docs/merchant-docs/` (progress note at the top of its index.md).
- `<name>-tests/`: each agent's test scripts. `BRIEF-COMMON.md`: shared rules. `merge.sh <name>`: 3-way merge of a copy into this folder.
- Requirements: `scratchpad\theme-store-requirements.md`.
Agents test on unpublished "WIP <name>" themes on testdev or flaire; delete those afterwards.

## Merged so far
- cart (2026-11-02 23:54): merged with 0 conflicts; theme check 0/0. Fonts now Figtree (body/headings) and Cormorant italic (accent).
  Left for the lead: `settings.brand_name` defaults to "Delicate" (should fall back to shop.name); product.json
  `show_dynamic_checkout` must be true (asked the media agent).

- perf: merged with 0 conflicts; theme check 0/0. Flaire Lighthouse (median of 3): mobile avg 71 (home 75, collection 63-69,
  product 76), desktop avg 92, accessibility 97-100. Suggestion left: product gallery main plate `sizes` should be
  '(max-width: 734px) 62vw, 520px'.

- docs: 17 pages in docs/merchant-docs (index, per-area pages, faq with 23 questions, support policy and contact form spec,
  release notes 1.0.0, listing draft). 117 lines marked `<!-- verify after merge -->`; placeholders [SUPPORT_FORM_URL],
  [SUPPORT_EMAIL], [DEMO_STORE_URL], [DOCS_URL], [RELEASE_DATE].

- media: merged with 0 conflicts (kernel.js, locale, quick-view and variant-sheet auto-merged with cart/perf edits);
  theme check 0/0, kernel.js parses. Untested live: 3D/MP4 (testdev Admin token expired), native swatch data, installments
  and tax note (testdev not eligible). Follow-ups: sticky bar says "Select a length" for other options; material-swatch and
  card dots ignore native swatches; quick view dots are 8px (touch target must be >= 24px); Escape inside YouTube iframe.

- data and pages: MERGED 2026-11-04 ~10:30. data's 2 conflicts resolved (media's version + data's product-data calls);
  pages' kernel.js / predictive-search / list-collections-tile conflicts were line-ending artifacts (re-merged on LF copies,
  written back CRLF); theme.css kept both appended blocks. Theme check 0/0, no metafields.custom reads outside
  snippets/product-data.liquid (which reads merchant-chosen metafields from theme settings). Neither agent ran its final e2e.
- Integration check (merged theme pushed to flaire as unpublished "Delicate integration" #190197956820): sweep 60/60,
  e2e 39/39 (the old reviews check was replaced: built-in reviews are gone, the section hides without rating/app content).
- Finish agent started 2026-11-04 ~10:30 on Part A (demo-content split into docs/demo-store) and Part B (settings pass);
  it pushes "Delicate generic" and "Delicate demo build" as unpublished themes on flaire.
- (history) data and pages: STOPPED on 2026-11-03 09:57 to save the weekly usage limit (97% used, resets Wed 2026-11-04 10:30 AM).
  Their code is finished; only their final test runs were left (data: sweep 59/59 passed, screenshot parity fine apart from
  the reviews section; full e2e not run. pages: Chromium e2e and Firefox run not finished). NOT merged yet.
  `bash merge.sh data --dry` shows 2 conflicts (snippets/product-json.liquid, snippets/product-options.liquid, 1 hunk each,
  against the media edits); `bash merge.sh pages --dry` shows 2 (assets/kernel.js, assets/theme.css, 1 hunk each, likely
  both appending at the same spot). Next: merge data, resolve its 2 hunks (keep both sides), theme check, then the same for
  pages. Agents can be resumed with SendMessage if their own final tests are wanted.

## Steps 2-3 done (finish agent, 2026-11-04)
- Demo JSON split: `docs/demo-store/` holds the flaire demo's templates (incl. the 7 `collection.<handle>.json`), section
  groups and settings_data; the theme's own JSON is generic (no shop_images, demo products/collections/pages/menus or
  metafield dynamic sources; collection links -> `shopify://collections/all`, blog -> `news`, page links except `contact`
  removed; footer menus `main-menu`/`footer`). One preset "Delicate" (+ scheme-5 black from the old dark preset).
  `docs/demo-store` also keeps the one old default it relied on (product.json `arrival_text`).
- Settings pass: every item below is done (Performance settings and the no-op "Theme preset" removed). Wording and
  default changes: `C:\Users\VISHAK~1\AppData\Local\Temp\claude\c--Users-Vishakha-Dedha-Desktop-datadelves-theme\0c2900b2-2b53-4f46-9171-08f013106769\scratchpad\finish\label-changes.tsv`
  (old -> new for every label/info/default).
- Fixed-promise theme strings in `locales/en.default.json` made neutral (delivery_free, order_by, ships_tomorrow,
  ready_engraved, cart trust, contact success), plus Check out / Color / Canceled spelling.
- Quick view dots: 24x24px targets around the 8px dot. Sticky bar: uses the product's need text (d.needText).
- Test themes on flaire: "Delicate generic" #190198710484, "Delicate demo build" #190198743252 (both unpublished).
- TODO (user): theme_info `theme_documentation_url` and `theme_support_url` in config/settings_schema.json are still the
  Shopify placeholders (shopify.dev / help.shopify.com); replace with the real docs and support URLs. `theme_author` is
  "Delicate" (should be the partner/developer name).
- TODO: docs/merchant-docs still use the old setting names (e.g. "Cart and bag", "Color schemes and preset",
  "Performance"); update them from label-changes.tsv.

## Settings pass to-do (found by the docs agent; DONE, see above)
- Unused settings: Performance > "Largest image width" and "Preload first image" (connect or remove).
- Misleading-content risk in defaults: "Arrives Thursday", "Free overnight", "Order by 3 pm for delivery tomorrow",
  financing "or {amount}/mo for 12 months, with 0% APR" (on by default from $600), "We reply within one working day".
  Make defaults empty or neutral; keep the demo values in docs/demo-store.
- Internal jargon in merchant-facing text: "Facet alternates canvas, canvas-alt and one inverse band per page" (color scheme
  info), "Glass (scheme-4) is the nav role", "4 (Facet content-wide)", "1260 px (content-wide)", "Aria label", "Stock Notice",
  "Colour" in default facts, "Demo values. A real store would use…", "[STORE ADDRESS]", "Slider step" with "$" unit.
- Mobile menu "Menu" setting has no default: default it to main-menu.
- Best selling sort only shows when it is the default sort.
- "Days a product counts as new" range 7-107 (likely a typo).
- settings.brand_name default "Delicate" should fall back to shop.name.

## Remaining steps after the agents finish
1. `bash merge.sh <name>` for each copy (`--dry` first); resolve conflicts by hand.
2. Move the current demo JSON (templates/*.json, sections/*-group.json, config/settings_data.json) into `docs/demo-store/`, then make the theme's own templates generic (placeholders, no store photos/collections/products/menus). `node docs/tools/demo-build.mjs --out <dir>` rebuilds the demo version for pushing to flaire.
3. One preset named "Delicate" (drop "Delicate Dark"); theme_info (name "Delicate", real docs and support URLs); footer menus default to `footer`; settings wording (Title -> Heading, Centre -> Center, Slider, Check out, Sign-up, Social links, PNG). DONE except the real docs/support URLs.
4. Verify: `shopify theme check` 0/0, section sweep, e2e in Chromium, WebKit and Firefox, Lighthouse mobile and desktop on home/collection/product.
5. Push the demo build to flaire #190000333012 only. Clean up WIP themes and any temporary test media.

## Still for the user (not code)
Client transfer store for the demo (dev stores can't be used); rights to the photos and copy; remove the sample reviews; documentation site with FAQ and a support contact form; listing copy, screenshots, price, version 1.0.0 with release notes; uninstall the Shopify CLI app on flaire and rotate the nj app secret.

## Live on flaire (2026-11-04)
- Demo build pushed to live #190000333012 (backup of the previous live theme: ..\flaire-live-backup). Live e2e 39/39.
- Team change 1 (live): quantity stepper beside Add to Bag on one line, Buy it now full width (main-product.liquid,
  theme.css). Add-to-Bag and size-error checks pass; "quantity 2 adds 2" and the phone sticky-bar check still to re-run
  (Cloudflare was challenging the test browser).

## Team fixes (2026-11-04, tested on "Delicate demo build" #190198743252; NOT on live yet)
- Materials: metal and stone blocks have Image + Image alt text; choosing a swatch fades the photo (src, srcset, sizes,
  alt; reduced motion swaps at once; square frame, no layout shift); a block without an image shows the section image
  (no section image: the drawn specimen). Kernel `swapPhoto` + editor block select shows that block's panel. Demo: metals on
  the Aurora band, diamond Cascade ring, sapphire Vesper, emerald Verdant, ruby Ember, onyx Noir band; pearl has no photo
  (uses the section image).
- Padding: 58 page sections have Section padding > Top padding / Bottom padding (0-160px, step 4) via
  `snippets/section-padding.liquid` and theme.css `--pad-top`/`--pad-bottom` (fallbacks = old values). Defaults equal the old
  spacing: bands 120/120 scaled with Section spacing (120/80/64, Compact 80/64/48), tight bands 64/64 fixed, tiles 120/0
  (no-image tiles and split featured product keep at least the top padding below), main product 32/64, footer 48/32,
  facets bar 0/0, hero slides 0/0, cart footer 0/48, apps + custom liquid 64/64 (replaces "Vertical padding"; templates
  migrated). Skipped: overlays/drawers, predictive search, header, header mega, announcement bar. Proof: 0 padding
  differences in 1199 elements on 11 pages x 3 widths; screenshots pixel-identical (home above testimonials, rings) or
  data-only differences (product page product grid).
- Testimonials: Layout Automatic (slider when > 3) / Grid / Slider; slider = theme rail, 3 per view desktop, 2 tablet,
  ~1.2 phone, prev/next, dots, swipe, arrow/Home/End keys, region + labelled slides, optional Auto-rotate (off) with pause
  button. Demo has 6 testimonials (3 new).
- Header: Logo image + Logo width are the header's first settings; header uses it, else Theme settings logo, else wordmark.
  Theme settings logo info relabelled (password, gift card, footer, header fallback).
- Checks: theme check 0/0 (theme and demo build), sweep 60/60, e2e material/home/mega/phone pass (phone filters needs the
  preview-only cookie banner removed: DL_NO_BANNER=1 in team-fixes-tests/e2e.py), team checks 142/142, local kernel 13/13.
  Tests: scratchpad\team-fixes-tests\.
- Multi-currency (2026-11-04): flaire now sells in 130+ currencies. kernel.js formats browser-side prices from a
  `moneySample` rendered by Shopify's money filter (kernel-config.liquid), unit-tested for $, €, £, CHF, kr, ¥, Rs.
  Fixed product-json `"qty": ,` (invalid JSON) for markets with no inventory quantity. Verified in Germany: €1.165,95.
  Store-side: products show Sold out in Germany, so flaire's Markets need the Shop location / products for that market.

## Renamed Delicate -> Flaire (2026-11-06)
- Theme name Flaire, author Datadelves (settings_schema theme_info), one preset "Flaire" (settings_data), assets/delicate.css
  -> assets/base.css (head-assets.liquid), script namespace window.Delicate -> window.Flaire (kernel.js, kernel-config.liquid).
  Docs, merchant docs and seed tools say Flaire. Kept: the design package path (delicate-round11), the store's
  delicate_review metaobject type, old test theme names in the admin, and the dated history below.
- The `dl-` class prefix (from the old name) is internal only and stays.
- Git: the user runs git (repo datadelves/flaire-theme; branches main, dev, demo; demo connects to Shopify). Don't run git.
- Storefront brand: Theme settings > Wordmark text (brand_name) on the published theme says "Delicate"; the team changes it.
- Team edit carried over: they set `.sec-head` bottom margin to 0 in live delicate.css (written as `var(--space-0)`, which
  doesn't exist, so headings lost their auto centring). base.css now has `margin: 0 auto 0`.
- Pushed to the published theme 2026-11-06 (code only): base.css, kernel.js, theme.css, head-assets, kernel-config,
  bag-line, settings_schema. Live check: base.css loads, window.Flaire, headings centred, drawer and Add to Bag work,
  settings_data and index.json untouched. assets/delicate.css is still on the published theme, unused (the user may delete it).

## Country selector and photo fixes (2026-11-05)
- The team edits the published theme in the customizer (images). Update live with code files only: pull live, diff,
  merge locales, push with --nodelete; never push templates/*.json, *-group.json or settings_data.json, never publish a
  draft over it. docs/demo-store JSON is now older than live.
- Country selector (Healix-style): footer / announcement bar / phone-menu buttons (flag + country + currency) open one
  right-hand drawer rendered once in layout/theme.liquid: "Region and currency", search (word starts, 2-letter code,
  3-letter currency; Enter picks a single match; result count announced), 237 rows with Shopify CDN flags
  (`country | image_url`), current ticked. Page locked (body.ov-lock), list scrolls; stays a side drawer on phones.
  Old disclosure panel and kernel loc-toggle code removed. New strings localization.heading/search/no_results/results.
- Currency switching itself already worked (US -> GBP/EUR/INR). 53 of 237 countries are set to USD in flaire's Markets.
- Gift finder price bands: "[price]" in the label shows Max price in the shopper's currency (kernel `localPrices`, rate
  from Shopify.currency, 2 significant figures). The filter link stays in store currency (Shopify reads price filters in
  the shop's default currency). Live labels still say "Under $500"; change them to "Under [price]" in the customizer.
- Tile photos (featured product, closing tile, gift finder) keep a 24-40px gap above the tile edge (cut-out PNGs touching
  their own bottom edge looked sliced). Size and scale: new Image fit setting, default Show the whole image (contain).
- Follow-up: with a photo, a tile's art area takes the photo's height (`aspect-ratio: auto !important`; the fixed 16:6 /
  phone 4:5 shapes left ~240px of empty space around photos on phones); FP gallery square on phones. Size and scale's
  frame fits the photo in contain mode. Tested on the preview; the theme.css + size-and-scale.liquid push to live is
  for the user to run (push-live2 folder in the session scratchpad).
  Closing tile: "Image" header above its picker.
- Flaire content found: Untamed seed articles in the journal blog (no images, so the drawing shows); the size-and-scale
  image is now a 294px screenshot (blurry); closing tiles have no images.
