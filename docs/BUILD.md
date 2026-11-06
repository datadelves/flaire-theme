# Flaire theme: build conventions

The Flaire theme is a Shopify (Online Store 2.0) port of the prototype app in the design package (delicate-round11). **Goal: the live store looks
and behaves exactly like the prototype.** These rules keep sections built by different people consistent
with each other and with `assets/kernel.js` (the one shared script).

## 1. Sources of truth

| What | Where |
|---|---|
| Design package | `../delicate-round11-full-package/` (read `IMPLEMENTATION.md` section 11-12 for your sections) |
| Prototype markup | `../delicate-round11-full-package/prototypes/pages/*.html` (`{surface}.html`, section-state sheets `ss-{section}*.html`, component sheets `st-*.html`, overlays `ov-*.html`) |
| Screenshots | `prototypes/sections/{id}--desktop.png`, `--mobile.png`, `prototypes/section-states/`, `prototypes/screens/` |
| Section purpose, blocks, states | `surface-map.json`, `interaction-states.json`, `components.json`, `data-contracts.json` |
| Prototype app source (behavior) | `prototypes/app-source/src/*.mjs` (`pages-shop.mjs`, `pages-content.mjs`, `chrome.mjs`, `overlays.mjs`) |

Extract a prototype element as clean HTML with:

```
python -I docs/tools/proto.py product.html 'data-section="main-product"'
python -I docs/tools/proto.py home.html 'class="dl-review"' --nth 2
```

`<ICON name size=N class=x/>` in the output means `{% render 'icon', icon: 'name', size: N, class: 'x' %}`.
`<IMG alt=".."/>` is product or editorial imagery (see section 6).

**Precedence:** prototype markup and CSS classes > package JSON docs > your own judgment. Copy the prototype's
element structure, class names and inline styles exactly. Do not restyle, rename classes or "improve" layout.

## 2. Files and ownership

- **Do not edit** (owned by the lead): `assets/base.css`, `assets/tokens.css`, `assets/theme.css`,
  `assets/kernel.js`, `layout/*`, `config/*`, `snippets/kernel-config.liquid`, and the shared snippets
  listed in section 7. If you need a change there, say so in your final report. Missing Phosphor icon?
  Add a `when` branch to `snippets/icon.liquid` with the Edit tool (path from `@phosphor-icons/core`
  regular weight; the prototype's `prototypes/assets/icons/*.svg` has the ones it used).
- Do not run `shopify theme dev`, `push` or `pull` (the store is not connected yet).
- You own the section files assigned to you, the templates whose sections are all yours, and any new snippet
  you create (prefix it with your section or component name).
- **CSS:** `base.css` already contains every prototype rule. If a section needs Shopify-only glue (e.g. a
  wrapper the prototype did not have), put it in that section's `{% stylesheet %}` tag (plain CSS, no Liquid).
- **Strings:** use existing keys from `locales/en.default.json` first. Theme check fails on missing keys, so
  add any new fixed UI string to `locales/en.default.json` yourself, **only with the Edit tool** (small
  insertions; if the edit fails because the file changed, re-read and retry). Never rewrite that file with
  Write or a script: other people edit it at the same time. Merchant-editable copy is a section or block
  setting whose default is the prototype's text.
- `sections/overlay-group.json`, `header-group.json`, `footer-group.json` and templates JSON: edit with the
  Edit tool only, and only the entries of sections you own.

## 3. Section file shape

```liquid
{%- liquid
  assign scheme = section.settings.color_scheme | default: 'scheme-1'
-%}
<div class="band {{ scheme }}" data-section="account-main">  {# root = the prototype root element #}
  ...
</div>

{% schema %} ... {% endschema %}
```

- The schema already in each file came from `section-schemas.json`. Keep it. You may add a setting or block
  when the prototype shows content the schema cannot express; keep ids snake_case and give a default equal to
  the prototype copy. Never remove settings.
- Shopify wraps each section in `<section class="shopify-section dl-section dl-{id}">` (tag/class from the
  schema). So the prototype's root `<section ...>` becomes a `<div ...>` with the same classes and attributes.
  Keep semantic roots that CSS selects by tag: `<header data-section="header">`, `<footer class="dl-footer">`.
- Always keep `data-section="{section id}"` on the root (CSS and the kernel use it) and replace the
  prototype's scheme class with `{{ section.settings.color_scheme }}`.
- Add `{{ block.shopify_attributes }}` on each block's root element, and loop `section.blocks` so the
  merchant controls order.
- Drop prototype-only attributes: `data-locale*`, `data-shopify*`, `data-ut-role`, `data-static*`,
  `data-repeat*`, `data-component`, `data-placeholder`.
- Empty states: when a setting is blank the element is omitted (see each setting's `info`/doc in
  `section-schemas.json#/sections/{id}/settingDocs` if present). When a section has nothing to show
  (no products, no reviews) follow `interaction-states.json` (often: render nothing).
- Theme editor: sections must render with no data (e.g. no product chosen yet) using placeholders
  (`{% render 'specimen' %}` for product art, prototype demo copy for text). Never output Liquid errors.
- Use `{%- liquid %}` for logic, `{% render %}` (never `include`), `| escape` on user text in attributes,
  `image_url` + `image_tag` or the `product-photo` snippet for images, `loading="lazy"` except first-screen.
- Filters are not allowed on `render` arguments: `{% assign l = 'key' | t %}{% render 'button', label: l %}`.
- Spec for a section: `node docs/tools/spec.mjs {section-id}` (settings docs, blocks, states, evidence).

## 4. Routes

Prototype hash links map to real routes:

| Prototype | Liquid |
|---|---|
| `#/` | `{{ routes.root_url }}` |
| `#/collection/{h}` | `{{ collections[h].url }}` (falls back to `/collections/{h}`); `all` = `{{ routes.all_products_collection_url }}` |
| `#/collections` | `{{ routes.collections_url }}` |
| `#/product/{h}` | `{{ product.url }}` |
| `#/cart` / `#/checkout` | `{{ routes.cart_url }}` / checkout button `name="checkout"` in the cart form |
| `#/search?q=` | `{{ routes.search_url }}?q=` |
| `#/blog`, `#/blog/{slug}` | `{{ blogs.journal.url }}`, `{{ article.url }}` |
| `#/page/{h}`, `#/contact` | `{{ pages[h].url }}`, `{{ pages.contact.url }}` |
| `#/login`, `#/register`, `#/account`, `#/addresses`, `#/order/{n}` | `routes.account_login_url`, `routes.account_register_url`, `routes.account_url`, `routes.account_addresses_url`, `order.customer_url` |

Links that are settings (`url` type) default to blank. The theme's own templates JSON stays generic (only
`shopify://collections/all`, `shopify://pages/contact`, blog `news`, menus `main-menu`/`footer`); the demo store's
handles (collections: rings, necklaces, earrings, bracelets, gifts, engravable; pages: about, materials, craft, engraving,
care-guide, ring-sizing, delivery, returns, stores, contact; blog: journal) go in `docs/demo-store/` (see its README).

## 5. Store data model (demo data is created to match)

- **Options:** option 1 `Finish` with values `Yellow Gold`, `Rose Gold`, `White Gold`, `Platinum`
  (`value | handleize` gives the metal key and the CSS var `--metal-{key}`). Sized products have option 2:
  `Ring size` (5 ... 9), `Length` (bracelets `15 cm`/`17 cm`/`19 cm`; chains `14 in`...`24 in`) or
  `Chain length` (`40 cm`/`45 cm`/`50 cm`). Earrings have no size option.
- **Media:** one transparent cut-out photo per finish (variant image). Image alt text is the finish name.
- **Metafields** (namespace `custom`): `engravable` (boolean), `tagline` (single line), `card_material`
  (single line, the card's material line), `stone`, `carat`, `cut`, `clarity`, `colour`, `made_in`
  (single line), `certificate` (url), `dimensions` (single line), `craft_notes` (rich text), `badge`
  (single line, e.g. "Limited edition"), `kind` (ring|band|pendant|earring|bracelet|chain: drives the
  specimen placeholder and size guide tab), `size_guide` (rings|bracelets|necklaces).
- **"New" badge:** shown when `custom.badge` is blank and `product.created_at` is within
  `settings.badge_new_days`.
- **Reviews:** metaobject `delicate_review` (see `data-contracts.json`); product rating from
  `product.metafields.reviews.rating` / `reviews.rating_count` when present.
- **Collections:** rings, necklaces, earrings, bracelets, gifts, engravable, plus `all`.
- **Menus:** `main-menu` (Rings, Necklaces, Earrings, Bracelets with child links, Gifts, Engrave),
  `footer-shop`, `footer-make`, `footer-help`, `footer-company`, `legal`.

## 6. Images

- Product photos: `{% render 'product-photo', image: media_or_image, size: 180, alt: ..., class: ... %}`
  outputs the prototype's `<img class="fc-photo">` with `srcset`. With no image it renders the specimen.
- Editorial images (hero, tiles, articles): `image_settings | image_url: width: 1600 | image_tag: loading: 'lazy',
  widths: '...', sizes: '...', class: '...'`; with no image, render the same specimen photo/placeholder the
  prototype shows (`{% render 'specimen', kind: 'ring', metal: 'rose-gold', size: N %}`).
- The first image of the page is `loading: 'eager', fetchpriority: 'high'`.

## 7. Shared snippets (already written; use them, do not edit)

| Snippet | Purpose and parameters |
|---|---|
| `icon` | `icon` name, `size` (20), `class` |
| `button` | `label`, `variant` primary\|secondary\|outline\|link\|icon, `size` sm\|lg, `block`, `url` (renders `<a>`), `type` (button\|submit), `icon` (before label), `icon_after`, `no_chev` (link variant without chevron), `class`, `attrs` (raw extra attributes) |
| `badge` | `text`, `tone` neutral\|accent\|inverse |
| `price` | `product`, `variant`, `lg`, `note`, `show_from` |
| `notice` | `tone` info\|success\|caution\|danger\|gift, `title`, `text`, `link_label`, `link_url`, `link_attrs`, `attrs`, `live` |
| `section-head` | `eyebrow`, `heading`, `sub`, `level`, `role` (t-headline), `left`, `class` |
| `specimen` | placeholder product art: `kind`, `metal`, `gem`, `size`, `label`, `class` |
| `product-photo` | `image` (image or media), `size` px, `alt`, `class`, `loading`, `sizes`, plus specimen fallbacks `kind`, `metal`, `gem` |
| `product-card` | `product`, `quick` (true), `add` (true), `rating`, `dots`, `size` (180), `metal` (finish handle to show), `heading_level` (3), `show_material`, `show_price`, `badge` (override), `attrs` |
| `field` | `label`, `name`, `id`, `type`, `value`, `placeholder`, `autocomplete`, `required`, `hint`, `error`, `success`, `textarea`, `rows`, `counter`, `attrs`, `class` |
| `drawer-head` | `title`, `close_label`, `id` (heading id), `initial` (focus the close button first) |
| `breadcrumb` | builds Home > collection > product/article/page from the current template; `items_html` to override |
| `article-card` | `article`, `size` (image px), `show_tag`, `show_date`, `show_excerpt` |
| `review-card` | `rating`, `body`, `author`, `location`, `verified`, `image`, `response` |
| `pagination` | `paginate` |
| `empty-state` | `title`, `text`, `button_label`, `button_url`, `button_attrs`, `link_label`, `link_url` |
| `newsletter-form` | `id` (form id suffix), `layout` inline\|stack, `heading`, `button_label`, `button_size` |

## 8. Kernel contract (`assets/kernel.js`)

The kernel reads markup; sections do not ship their own JavaScript unless noted. Every opener is a real link
or a native form so the page works without JavaScript.

### 8.1 Openers and actions

- `data-open="{type}"` on a link/button opens an overlay. Types: `cart`, `quick-view` (with
  `data-url="{{ product.url }}"`, optional `data-metal`), `variant-sheet` (`data-mode` pdp\|qv\|cart,
  `data-key` for cart lines, `data-url`), `mobile-nav`, `size-guide` (`data-tab` rings\|bracelets\|necklaces),
  `filters`, `pickup`, `search`, `zoom`, `review`, `waitlist`, `loc`.
- `data-act="{action}"` runs an in-place action (names below). On an `<a>` the kernel prevents navigation.
- `data-quick="{{ product.handle }}"` + `data-variant-id="{{ product.selected_or_first_available_variant.id }}"`
  + `data-has-options="{{ product.has_only_default_variant | not }}"`: card "Add to Bag". Single-variant
  products are added directly; products whose size must be chosen open quick view with the size error.

### 8.2 Overlays (drawer behavior)

Every overlay section renders its shell closed:

```liquid
<div class="app-ov" data-ov="cart" data-section-id="{{ section.id }}" hidden>
  <div class="dl-scrim" data-act="scrim"></div>
  <aside class="dl-drawer right scheme-1" data-place="right" data-place-mobile="bottom bag-full"
         role="dialog" aria-modal="true" aria-labelledby="ov-title-cart" data-ov-panel>
    <span class="dl-grab"></span>
    {% render 'drawer-head', title: ..., close_label: ..., id: 'ov-title-cart' %}
    <div class="bd">...</div>
    <div class="ft">...</div>
  </aside>
</div>
```

- `data-ov` values (CSS depends on them): `cart`, `qv`, `variant`, `mobile-nav`, `filters`, `size-guide`,
  `pickup`, `loc`, `zoom`, `review`, `waitlist`.
- `data-place` / `data-place-mobile` (≤734px) set the panel side classes at open time: `right`, `right w560`,
  `right nested`, `left dl-mnav`, `bottom`, `bottom bag-full`. Dialogs use
  `<div class="app-dialog scheme-1 ..." role="dialog" aria-modal="true" data-ov-panel>` instead of `<aside>`.
- The kernel moves `.app-ov` elements rendered inside page sections to `#app-overlay`, keeps a stack (Escape
  and the scrim close the top one), traps focus, sets `inert` on the page, locks scroll and returns focus to
  the opener. `data-act="close"` closes the top overlay. `data-initial` marks the element focused on open.
- Content that depends on a product is fetched with the Section Rendering API:
  `{{ product.url }}?section_id={{ section.id }}` for `quick-view`, `variant-sheet`; pickup uses
  `{{ variant.url }}?section_id=` of `pickup-drawer`. When the section renders with a product it outputs the
  full panel; the kernel swaps the inner HTML of `[data-ov-panel]`.

### 8.3 Cart (cart-store, cart-item, cart-drawer, cart-section, cart-count, cart-discount, cart-form)

- Header bag button: `data-open="cart" data-bag-btn` with `<span class="fc-nav-count" data-bag-count>`.
- Cart sections (`cart-drawer`, `main-cart-items`, `main-cart-footer`) put `data-cart-section` and
  `data-section-id="{{ section.id }}"` on their root. After every cart change the kernel re-renders all of
  them with the `sections` parameter and swaps the root's inner HTML (the drawer swaps `[data-ov-panel]`).
- Line: `<div class="fc-bag" data-line data-key="{{ item.key }}" data-line-index="{{ forloop.index }}">`.
  Controls: `data-act="qty" data-key data-d="-1|1" data-qty="{{ item.quantity }}"`,
  `data-act="remove" data-key`, `data-act="edit-line" data-key data-url="{{ item.url }}"`.
  Per-line error slot: `<div data-line-error></div>` inside the text column.
- Undo slot: `<div data-undo-slot aria-live="polite"></div>` above the lines (the kernel renders
  "Removed X. Undo").
- Discount: toggle button `data-act="code-toggle" aria-controls="{id}"`, hidden
  `<form data-form="code" id="{id}" hidden>` with an input `name="discount"`; applied codes show
  `data-act="code-remove" data-code="{{ code }}"`.
- Note: `<textarea name="note" data-note>` (saved with debounce). Checkout: inside
  `<form action="{{ routes.cart_url }}" method="post" id="cart-form">`, `<button type="submit" name="checkout">`.
- Shipping estimate: `<form data-form="estimate">` with `select[name="country"]`, `input[name="zip"]`,
  output `<div data-estimate-out></div>`.

### 8.4 Product form (product-form, media-gallery, sticky-buy-bar, engraving-preview)

Owned by the lead: `main-product`, `quick-view`, `variant-sheet` and the `product-*` configurator snippets.
Other sections only need: swatch preview (8.6), `data-quick`, `data-open="quick-view"`.

- A configurator root is `[data-product-form][data-ctx="pdp|qv|sheet"]` (the product `<form>` on pdp/qv)
  holding `script[data-product-json]` (`snippets/product-json.liquid`) and the `<template data-tpl>` notices
  (`snippets/product-templates.liquid`). The kernel keeps the selection on the root and updates:
  `[data-group]` option radios, `[data-opt-caption]`, `[data-size-block]`/`[data-size-error]`,
  `[data-need-error]`, `[data-price]`, `[data-plan-price]`, `[data-sku]`, `[data-sku-cell]`,
  `[data-opt-row-label]`, `[data-variant-input]`/`[data-variant-select]`, `img[data-finish-img]`,
  `[data-add]`, `[data-line]`, `[data-stock]`, `[data-pickup]` (re-rendered with `?variant=`), `[data-stickybuy]`.
- Gallery: `[data-gallery]` with `[data-plate="N"]` plates (one visible), `.thumb`, `.mdots`, `.dots button`,
  `[data-counter]`; zoom dialog `data-ov="zoom"` copies the active plate.
- Variant sheet modes: `qv` (stacked over quick view), `pdp` (sticky bar on phones), `cart` (edit a Bag line:
  the line is removed and the new variant added with the same quantity and properties).

### 8.5 Collection and search (facets)

- Facets root: `<div ... data-facets data-section-id="{{ section.id }}">` with a GET
  `<form data-facets-form>` holding Shopify filter inputs (`filter.v.option.finish`, `filter.p.m.custom.stone`,
  `filter.v.price.gte/lte`, `filter.v.availability`, `sort_by`). Changes inside the form fetch the page URL
  with `sections={facets id},{grid id}` and swap both; history is updated. Links with `data-facet-link`
  (active chip remove, clear all) do the same.
- Popovers: `button[data-act="pop"][data-pop="{key}"][aria-expanded][aria-controls]` toggles the panel with
  that id (`hidden`); outside click and Escape close it.
- Grid root: `data-grid-section data-section-id="{{ section.id }}"`, cards in `[data-grid]`. Load more:
  `button[data-act="more"][data-next-url="{{ paginate.next.url }}"]` inside `[data-more-slot]`.
- Filters drawer: same form contract with `data-facets-form data-facets-deferred`; changes update the
  result count button (`[data-facets-count]`) and Apply (`type="submit"`) applies and closes.

### 8.6 Small behaviors

| Contract | Behavior |
|---|---|
| `<details class="fc-acc-item">` + `<summary class="fc-acc-btn">` inside `.fc-acc[data-acc-single]` | accordion, one open at a time (disclosure) |
| `button[data-act="toggle"][aria-controls][aria-expanded]` | toggles `hidden` on the controlled element |
| `[role="tablist"][data-tabs]` with `[role="tab"][aria-controls]` | tabs; arrow keys move |
| icons inside a toggle: `class: 'ico-closed'` / `'ico-open'` | shown by `aria-expanded` |
| `[data-swatches]` radiogroup of `button[role="radio"][data-value]` with optional `data-img`, `data-srcset`, `data-label` | swatch preview: updates `aria-checked`/`is-on`, `[data-swatch-label]`, swaps `img[data-swatch-img]` in the section, sets `--m` on `.fc-engr`, sets `data-metal` on quick-view openers, shows `[data-swatch-panel="{value}"]` |
| swatch photo: `data-img` (+ `data-srcset`, `data-sizes`, `data-alt`) on a swatch; `data-img=""` | swaps `img[data-swatch-img]`; an empty value shows the frame's `[data-swatch-fallback]` placeholder; a `[data-swatch-fade]` frame fades (CSS `.is-swapping`, skipped with reduced motion) |
| `[data-carousel]` scroll container + `data-act="rail-prev|rail-next"` | native scroll rail with buttons |
| `[data-slider]` region > `[data-slider-track]` rail of `[data-slide]` + `data-act="slider-prev|slider-next|slider-go|slider-toggle"`, `[data-slider-controls]`, `data-autoplay`/`data-interval` | testimonials slider: one slide per step, dots per scroll position, arrow/Home/End keys, optional autoplay (waits on hover/focus/off screen, never with reduced motion) |
| `style="{% render 'section-padding', top:, bottom:, fixed: %}"` on the section's spacing element | Top/Bottom padding settings as `--pad-top`/`--pad-bottom` (theme.css; fallbacks are the original spacing) |
| `[data-hs]` hero slides (prototype markup) | autoplay 6.5s, bars, arrows, swipe, keys, pause |
| `input[data-studio-input][data-max]`, `[data-engr]`, `[data-studio-count]`, `[data-studio-msg]` | engraving studio live preview |
| `<form data-validate>` | client validation of `[required]`, `type=email`, `minlength`, `pattern`; field errors in `.fc-field-msg`, summary notice in `[data-summary]`, focus first invalid; submit button gets the loading state using `data-busy-label` |
| `data-act="gc-copy"` + `[data-gc-code]` + `[data-gc-msg]` | gift card copy |
| `[data-recommendations][data-url]` | fetches the URL (section rendering) and replaces content; hides the section if empty |
| `data-act="rec-filter" data-f="{type}"` chips + cards wrapped in `[data-type]` | recommendation filter |
| `[data-recent][data-section-id][data-limit]` | recently viewed rail (localStorage), `data-act="clear-viewed"` |
| `data-act="dismiss-announce"`, `[data-rotate]` with `[data-msg]` children | announcement bar |
| header: `[data-mega-li]` > `button[data-act="mega"][aria-controls="mega-{key}"]`, panels `.dl-mega[hidden]` | mega menu (click, hover ≥1069px, Escape) |
| header: `button[data-act="search-toggle"][aria-controls="ps"]`, panel `#ps[hidden]`, `[data-ps-input]`, `[data-ps-body]` | predictive search (results via `predictive-search` section rendering) |
| footer: `button[data-act="loc-toggle"][aria-controls]` and links `data-act="country" data-code` inside a localization form | localization |
| mobile nav: `button.row[data-act="mnav-sub"][aria-controls][aria-expanded]` | submenu |

Editor lifecycle: the kernel re-binds on `shopify:section:load`, opens an overlay section when it is selected
in the editor and closes it on deselect.

## 9. Checks before you report

1. `shopify theme check --path . --output json` shows no errors for your files (warnings about unused
   snippets are fine).
2. Each section compares against its prototype page and screenshots at desktop and mobile: same elements,
   order, classes, copy.
3. Every setting in the schema is used, or noted in your report as unused with the reason.
