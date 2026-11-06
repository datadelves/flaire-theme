/* Flaire kernel: the one shared script. It reads markup (see docs/BUILD.md section 8) and runs the
   storefront behaviors: overlays, product form, cart, facets, search, navigation, forms and small widgets.
   No dependencies; every opener is a real link or form, so the theme works without it. */
(() => {
  'use strict';

  const D = window.Flaire || {};
  const S = D.strings || {};
  const R = D.routes || {};
  const CFG = D.settings || {};
  const ICONS = {"caret-left":"<path d=\"M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z\"/>","caret-right":"<path d=\"M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z\"/>","check":"<path d=\"M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z\"/>","check-circle":"<path d=\"M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z\"/>","circle-notch":"<path d=\"M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z\"/>","gift":"<path d=\"M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z\"/>","info":"<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z\"/>","minus":"<path d=\"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z\"/>","pause":"<path d=\"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z\"/>","play":"<path d=\"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z\"/>","plus":"<path d=\"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z\"/>","warning":"<path d=\"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z\"/>","warning-circle":"<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z\"/>","x":"<path d=\"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z\"/>"};

  // ================= helpers =================
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fmt = (str, vars = {}) => String(str || '').replace(/\{(\w+)\}|__(\w+)__/g, (m, a, b) => { const k = a || b; return k in vars ? vars[k] : m; });
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const handleize = (s) => String(s || '').toLowerCase().trim().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const isMobile = () => window.matchMedia('(max-width: 734px)').matches;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('no-motion');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const parse = (html) => new DOMParser().parseFromString(html, 'text/html');
  const withParam = (url, key, value) => { const u = new URL(url, location.origin); u.searchParams.set(key, value); return u.pathname + u.search; };
  const route = (path) => (R.root || '/').replace(/\/$/, '') + path;

  function icon(name, size = 20, cls = '') {
    return `<svg class="dl-icon${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
  }
  function notice({ tone = 'info', title = '', text = '', link = '', linkAttrs = '' } = {}) {
    const ic = { info: 'info', success: 'check-circle', caution: 'warning', danger: 'warning-circle', gift: 'gift' }[tone];
    return `<div class="fc-notice fc-notice-${tone}" role="${tone === 'danger' ? 'alert' : 'status'}">${icon(ic, 20, 'fc-notice-icon')}<div>${title ? `<p class="fc-notice-title">${esc(title)}</p>` : ''}${text ? `<p class="fc-notice-text">${esc(text)}</p>` : ''}${link ? `<a href="#" ${linkAttrs}>${esc(link)}</a>` : ''}</div></div>`;
  }

  // The shopper's currency: kernel-config renders 1,234,567.89 with Shopify's money filter (which follows the
  // market's currency), and its symbol, separators and decimals are reused for every amount the kernel prints.
  let moneyParts;
  function moneyFromSample(cents) {
    if (moneyParts === undefined) {
      const s = D.moneySample || ''; const m = s.match(/\d[\d.,'   ]*\d/);
      moneyParts = null;
      if (m) {
        const num = m[0]; const dec = /[.,]\d{2}$/.test(num) ? num.slice(-3, -2) : '';
        const int = dec ? num.slice(0, -3) : num;
        moneyParts = { pre: s.slice(0, m.index), post: s.slice(m.index + num.length), dec, thou: (int.match(/\D/) || [''])[0] };
      }
    }
    if (!moneyParts) return null;
    const { pre, post, dec, thou } = moneyParts; const n = Number(cents || 0) / 100;
    const [i, f] = (dec ? n.toFixed(2) : String(Math.round(n))).split('.');
    return pre + i.replace(/\B(?=(\d{3})+(?!\d))/g, thou) + (dec ? dec + f : '') + post;
  }

  function money(cents) {
    const sampled = moneyFromSample(cents);
    if (sampled != null) return sampled;
    const format = D.moneyFormat || '${{amount}}';
    const n = Number(cents || 0) / 100;
    const group = (num, dec, thou, sep) => { const [i, f] = num.toFixed(dec).split('.'); return i.replace(/\B(?=(\d{3})+(?!\d))/g, thou) + (f ? sep + f : ''); };
    return format.replace(/\{\{\s*(\w+)\s*\}\}/, (m, k) => {
      switch (k) {
        case 'amount': return group(n, 2, ',', '.');
        case 'amount_no_decimals': return group(n, 0, ',', '.');
        case 'amount_with_comma_separator': return group(n, 2, '.', ',');
        case 'amount_no_decimals_with_comma_separator': return group(n, 0, '.', ',');
        case 'amount_with_apostrophe_separator': return group(n, 2, "'", '.');
        case 'amount_with_space_separator': return group(n, 2, ' ', ',');
        default: return group(n, 2, ',', '.');
      }
    });
  }

  let toastTimer = 0;
  function toast(msg, ms = 3200) {
    const el = $('#app-toast'); if (!el) return;
    el.textContent = msg; el.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('is-on'), ms);
  }
  function announce(msg) {
    const el = $('#app-live'); if (!el) return;
    el.textContent = ''; setTimeout(() => { el.textContent = msg; }, 30);
  }

  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusables = (root) => $$(FOCUSABLE, root).filter((e) => !e.closest('[hidden]') && e.getClientRects().length > 0);
  function snapFocus(root) {
    const a = document.activeElement; if (!a || !root.contains(a) || a === root) return null;
    return { id: a.id, act: a.dataset.act, key: a.dataset.key, value: a.dataset.value, opt: a.dataset.opt, d: a.dataset.d, name: a.getAttribute('name'), tag: a.tagName };
  }
  function restoreFocus(root, s) {
    if (!s) return;
    let el = s.id ? root.querySelector('#' + CSS.escape(s.id)) : null;
    if (!el) el = $$(s.tag.toLowerCase(), root).find((e) => (s.act === undefined || e.dataset.act === s.act) && (s.key === undefined || e.dataset.key === s.key) && (s.value === undefined || e.dataset.value === s.value) && (s.d === undefined || e.dataset.d === s.d) && (!s.name || e.getAttribute('name') === s.name));
    if (el) el.focus({ preventScroll: true });
  }

  async function getJSON(url, opts = {}) {
    const res = await fetch(url, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, ...opts });
    let json = null; try { json = await res.json(); } catch (e) { /* not json */ }
    if (!res.ok) { const err = new Error((json && (json.description || json.message)) || res.statusText); err.status = res.status; err.json = json; throw err; }
    return json;
  }
  // Section Rendering API (?sections=a,b): no JSON Accept header, or product and collection URLs answer with
  // their own JSON instead of the rendered sections.
  async function getSections(url) {
    const res = await fetch(url, { headers: { Accept: '*/*' } });
    if (!res.ok) { const err = new Error(res.statusText); err.status = res.status; throw err; }
    return res.json();
  }
  async function getHTML(url) {
    const res = await fetch(url, { headers: { Accept: 'text/html' } });
    if (!res.ok) { const err = new Error(res.statusText); err.status = res.status; throw err; }
    return res.text();
  }
  const sectionIdOf = (el) => (el && (el.dataset.sectionId || (el.closest('.shopify-section') || { id: '' }).id.replace('shopify-section-', ''))) || '';

  // ================= overlays (drawer) =================
  const PLACE = ['right', 'left', 'bottom', 'w560', 'nested', 'bag-full', 'dl-mnav'];
  const OV = { stack: [] };
  const overlayRoot = () => $('#app-overlay') || document.body;
  const ovEl = (type) => $(`.app-ov[data-ov="${type}"]`, overlayRoot()) || $(`.app-ov[data-ov="${type}"]`);
  const topOv = () => OV.stack[OV.stack.length - 1];

  function portalOverlays(scope = document) {
    const root = overlayRoot();
    $$('.app-ov', scope).forEach((el) => {
      if (root.contains(el)) return;
      const from = sectionIdOf(el.parentElement);
      if (from) { $$(`.app-ov[data-portal-from="${from}"][data-ov="${el.dataset.ov}"]`, root).forEach((old) => { if (old !== el) old.remove(); }); el.dataset.portalFrom = from; }
      root.appendChild(el);
    });
  }
  function setInert() {
    const n = OV.stack.length;
    const mw = $('#app-main-wrap');
    if (mw) { mw.toggleAttribute('inert', n > 0); if (n) mw.setAttribute('aria-hidden', 'true'); else mw.removeAttribute('aria-hidden'); }
    const sticky = $('[data-stickybuy]'); if (sticky) sticky.toggleAttribute('inert', n > 0);
    OV.stack.forEach((o, i) => { const under = i < n - 1; o.el.toggleAttribute('inert', under); if (under) o.el.setAttribute('aria-hidden', 'true'); else o.el.removeAttribute('aria-hidden'); });
    document.body.classList.toggle('ov-lock', n > 0);
  }
  function place(el) {
    const panel = $('[data-ov-panel]', el); if (!panel || !panel.classList.contains('dl-drawer')) return;
    const want = (isMobile() && panel.dataset.placeMobile) || panel.dataset.place;
    if (!want) return;
    PLACE.forEach((c) => panel.classList.remove(c));
    want.split(/\s+/).forEach((c) => c && panel.classList.add(c));
  }
  function focusInitial(o) {
    const panel = $('[data-ov-panel]', o.el);
    const t = $('[autofocus], [data-initial]', panel) || $('h2[id^="ov-title"]', panel) || focusables(panel)[0];
    if (t) { if (!t.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
  }
  function openOv(type, { trigger, props = {} } = {}) {
    const el = ovEl(type); if (!el) return null;
    const existing = OV.stack.find((o) => o.type === type);
    if (existing) { Object.assign(existing.props, props); return existing; }
    const o = { type, el, props, trigger: trigger || (document.activeElement !== document.body ? document.activeElement : null) };
    place(el);
    clearTimeout(el._closeTimer);
    el.classList.remove('is-out');
    el.hidden = false;
    OV.stack.push(o); setInert();
    void el.offsetWidth;
    el.classList.add('is-in');
    focusInitial(o);
    el.dispatchEvent(new CustomEvent('dl:open', { bubbles: true, detail: o }));
    return o;
  }
  function closeOv(type, { restore = true, immediate = false } = {}) {
    const i = OV.stack.findIndex((o) => o.type === type); if (i < 0) return;
    const [o] = OV.stack.splice(i, 1); const el = o.el;
    el.classList.remove('is-in'); el.classList.add('is-out');
    const done = () => { el.hidden = true; el.classList.remove('is-out'); el.dispatchEvent(new CustomEvent('dl:closed', { bubbles: true, detail: o })); };
    if (immediate || reduceMotion()) done(); else el._closeTimer = setTimeout(done, 300);
    setInert();
    if (restore) {
      let target = o.trigger && document.contains(o.trigger) && !o.trigger.closest('[hidden]') ? o.trigger : null;
      if (!target && o.props.returnSel) target = $(o.props.returnSel);
      const next = topOv();
      if (target) { try { target.focus({ preventScroll: true }); } catch (e) { /* gone */ } } else if (next) focusInitial(next); else { const m = $('#main'); if (m) m.focus({ preventScroll: true }); }
    }
  }
  const closeTop = (opts) => { const t = topOv(); if (t) closeOv(t.type, opts); return !!t; };
  const closeAll = () => [...OV.stack].reverse().forEach((o) => closeOv(o.type, { restore: false, immediate: true }));
  function trapTab(e) {
    const t = topOv(); if (!t || e.key !== 'Tab') return;
    const f = focusables($('[data-ov-panel]', t.el)); if (!f.length) return;
    const first = f[0], last = f[f.length - 1], a = document.activeElement;
    if (e.shiftKey && (a === first || !t.el.contains(a))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (a === last || !t.el.contains(a))) { e.preventDefault(); first.focus(); }
  }
  window.addEventListener('resize', debounce(() => OV.stack.forEach((o) => place(o.el)), 150));

  // fetch a section that renders a product (quick view, variant sheet) and swap the panel content
  async function loadPanel(o, url) {
    const el = o.el; const panel = $('[data-ov-panel]', el); const sid = el.dataset.sectionId;
    const loading = $('template[data-ov-loading]', el);
    if (loading) panel.innerHTML = loading.innerHTML;
    panel.setAttribute('aria-busy', 'true');
    o.props.url = url;
    try {
      const html = await getHTML(withParam(url, 'section_id', sid));
      if (!OV.stack.includes(o) || o.props.url !== url) return false;
      const fresh = $('[data-ov-panel]', parse(html));
      panel.innerHTML = fresh ? fresh.innerHTML : '';
      panel.removeAttribute('aria-busy');
      initScope(panel);
      return true;
    } catch (err) {
      const tpl = $('template[data-ov-error]', el);
      if (tpl) { panel.innerHTML = tpl.innerHTML; const pl = $('[data-ov-product-link]', panel); if (pl) pl.href = url.split('?')[0]; }
      panel.removeAttribute('aria-busy');
      return false;
    } finally { focusInitial(o); }
  }

  // ================= product form =================
  const ENGR_OK = /[A-Za-z0-9 .,\-&']/;
  function engravingError(t, max) {
    if (!t) return '';
    const bad = [...new Set(t.split('').filter((c) => !ENGR_OK.test(c)))];
    if (bad.length) return fmt(bad.length > 1 ? S.engravingInvalidMany : S.engravingInvalidOne, { chars: bad.join('') });
    if (t.length > max) return fmt(S.engravingTooLong, { max });
    return '';
  }

  const PF = {
    roots: () => $$('[data-product-form]'),
    byCtx: (ctx) => $$(`[data-product-form][data-ctx="${ctx}"]`).find((r) => !r.closest('[hidden]')) || $(`[data-product-form][data-ctx="${ctx}"]`),

    init(root, presel) {
      const script = $('script[data-product-json]', root); if (!script) return null;
      let data; try { data = JSON.parse(script.textContent); } catch (e) { return null; }
      const n = data.options.length;
      const values = new Array(n).fill(null);
      $$('[role="radiogroup"][data-group]', root).forEach((g) => { const on = $('[aria-checked="true"]', g); if (on) values[+g.dataset.group] = on.dataset.value; });
      const input = $('[data-variant-input], [data-variant-select]', root);
      if (data.variants.length === 1) data.variants[0].options.forEach((v, i) => { values[i] = v; });
      if (data.finishIndex >= 0 && values[data.finishIndex] == null) {
        const v = data.variants.find((x) => String(x.id) === String(input && input.value)) || data.variants.find((x) => x.available) || data.variants[0];
        if (v) values[data.finishIndex] = v.options[data.finishIndex];
      }
      if (!$$('[role="radiogroup"][data-group]', root).length && $('.dl-opt-row.is-on', root) && input) {
        const v = data.variants.find((x) => String(x.id) === String(input.value)); if (v) v.options.forEach((o, i) => { values[i] = o; });
      }
      const st = { data, values, engr: '', plan: '', qty: 1, ui: { state: 'idle', error: null, msg: '', showNeed: false }, lastFinish: values[data.finishIndex], lastVariant: null };
      if (presel) {
        if (presel.values) presel.values.forEach((v, i) => { if (i < n) st.values[i] = v; });
        if (presel.engr != null) st.engr = presel.engr;
        if (presel.plan != null) st.plan = presel.plan;
      }
      const eb = $('[data-engr-block]', root); st.max = eb ? +eb.dataset.max || 16 : 16;
      root._pf = st;
      const engrInput = $('[data-engr-input]', root);
      if (engrInput) { engrInput.value = st.engr; const msg = $('[data-engr-msg]', root); if (msg && !msg.dataset.hint) msg.dataset.hint = msg.innerHTML; }
      const plan = $$('input[data-act="plan"]', root).find((r) => r.value === st.plan); if (plan) plan.checked = true;
      const addBtn = $('[data-add]', root); if (addBtn && !addBtn.dataset.label) addBtn.dataset.label = (addBtn.textContent || '').trim() === S.soldOut ? S.addToBag : (addBtn.textContent || '').trim();
      GiftRecipient.init(root);
      PF.render(root, { finishChanged: !!presel });
      if (st.engr) PF.syncEngraving(root);
      if (root.dataset.ctx === 'pdp') { Recent.push(data.handle); Sticky.update(); }
      Media.init(PF.scope(root));
      if (root.closest('[data-ov-panel]') && $('[data-payment-button]', root)) Pay.init();
      return st;
    },

    // the area around a configurator that holds its gallery (product page, overlay panel, featured product)
    scope: (root) => root.closest('[data-pdp]') || root.closest('[data-ov-panel]') || root.closest('[data-section]') || root,

    resolve(st) {
      const d = st.data; const v = st.values;
      const need = v.some((x) => x == null);
      const variant = need ? null : d.variants.find((x) => x.options.every((o, i) => o === v[i])) || null;
      const combo = !need && (!variant || !variant.available);
      const finish = d.finishIndex >= 0 ? v[d.finishIndex] : '';
      const priceVariant = variant || d.variants.find((x) => (d.finishIndex < 0 || x.options[d.finishIndex] === finish) && x.available) || d.variants.find((x) => d.finishIndex < 0 || x.options[d.finishIndex] === finish) || d.variants[0];
      const planPrice = st.plan && priceVariant.plans ? priceVariant.plans[st.plan] : null;
      const engrErr = d.engravable ? engravingError(st.engr, st.max || 16) : '';
      const si = d.sizeIndex;
      const sizeName = si >= 0 ? String(d.options[si] || '').toLowerCase() : '';
      const isRing = sizeName.includes('ring');
      const needName = sizeName.includes('ring') || sizeName.includes('size') ? 'size' : (!sizeName || sizeName.includes('length') || sizeName.includes('chain') ? 'length' : sizeName);
      const needText = d.needText || (needName === 'size' ? S.selectSize : S.selectLength);
      let summary = finish || '';
      if (si >= 0 && v[si] != null && d.variants.length > 1) summary += (summary ? ', ' : '') + (isRing ? fmt(S.sizeValue, { value: v[si] }) : v[si]);
      const qty = variant ? variant.qty : null;
      const low = !!variant && qty != null && qty > 0 && qty <= (CFG.lowStock || 5) && CFG.showStockCount;
      return { d, need, needName, needText, variant, combo, finish, priceVariant, price: planPrice != null ? planPrice : priceVariant.price, compare: priceVariant.compare, engrErr, isRing, summary, qty, low, soldOutAll: !d.available, canAdd: !need && !combo && !engrErr && d.available };
    },

    optionOff(st, i, value) {
      return !st.data.variants.some((x) => x.available && x.options[i] === value && x.options.every((o, j) => j === i || st.values[j] == null || o === st.values[j]));
    },

    tpl(root, name, vars = {}) {
      const t = $(`template[data-tpl="${name}"]`, root);
      return t ? fmt(t.innerHTML, vars) : '';
    },

    render(root, { finishChanged = false } = {}) {
      const st = root._pf; if (!st) return;
      const r = PF.resolve(st); const d = r.d; const ctx = root.dataset.ctx; const ui = st.ui;
      // option groups
      $$('[role="radiogroup"][data-group]', root).forEach((g) => {
        const i = +g.dataset.group; const btns = $$('[role="radio"]', g); let anyOn = false;
        btns.forEach((b) => {
          const val = b.dataset.value; const on = st.values[i] === val; const off = PF.optionOff(st, i, val);
          anyOn = anyOn || on;
          b.setAttribute('aria-checked', String(on)); b.classList.toggle('is-on', on); b.classList.toggle('is-off', off); b.tabIndex = on ? 0 : -1;
          if (b.classList.contains('fc-swatch-opt')) b.setAttribute('aria-label', val + (off ? ' ' + S.soldOutSuffix : ''));
          const ol = $('[data-off-label]', b); if (ol) ol.hidden = !off;
        });
        if (!anyOn && btns[0]) btns[0].tabIndex = 0;
        const cap = $(`[data-opt-caption="${i}"]`, root); if (cap) cap.textContent = st.values[i] != null ? st.values[i] : S.select;
      });
      const showNeed = ui.showNeed && r.need;
      $$('[data-size-block]', root).forEach((b) => { b.classList.toggle('is-error', showNeed); const m = $('[data-size-error]', b); if (m) m.hidden = !showNeed; });
      const needErr = $('[data-need-error]', root); if (needErr) needErr.hidden = !showNeed;
      // price
      $$('[data-price]', root).forEach((p) => {
        const amt = $('[data-price-amount]', p); if (amt) amt.textContent = money(r.price);
        const was = $('[data-price-was]', p); const sale = !p.hasAttribute('data-hide-compare') && r.compare > r.priceVariant.price;
        if (was) { was.hidden = !sale; const wa = $('[data-price-was-amount]', was); if (wa) wa.textContent = sale ? money(r.compare) : ''; }
        p.classList.toggle('fc-price-sale', sale);
        const from = $('.fc-price-from', p); if (from && r.variant) from.remove();
        const unit = $('[data-price-unit]', p); if (unit) { const u = p.hasAttribute('data-hide-unit') ? '' : r.priceVariant.unit; unit.hidden = !u; unit.textContent = u || ''; }
        const note = $('[data-price-note], .fc-price-note', p);
        if (d.financingNote && d.financingNote.includes('{amount}')) {
          const show = r.price >= (d.financingMin || 60000);
          const text = d.financingNote.replace('{amount}', money(Math.round(r.price / 12)));
          if (note) { note.hidden = !show; note.textContent = text; } else if (show) p.insertAdjacentHTML('beforeend', `<div class="fc-price-note" data-price-note>${esc(text)}</div>`);
        }
      });
      $$('[data-plan-price]', root).forEach((s) => { const id = s.dataset.planPrice; const p = id ? (r.priceVariant.plans || {})[id] : r.priceVariant.price; if (p != null) s.textContent = money(p); });
      $$('input[data-act="plan"]', root).forEach((inp) => { const row = inp.closest('.fc-radio-row'); if (row) row.classList.toggle('is-on', inp.checked); if (inp.checked) { const cap = $('[data-plan-caption]', root); if (cap) cap.textContent = inp.dataset.label || ''; } });
      // sku, specs, option row
      // before a size is chosen the prototype shows the finish's SKU stem with OS (one size), e.g. AB-RG-OS
      const skuText = r.variant ? r.variant.sku || '' : (r.priceVariant.sku && r.priceVariant.sku.includes('-') ? r.priceVariant.sku.replace(/[^-]+$/, 'OS') : '');
      const sku = $('[data-sku]', root); if (sku) { sku.hidden = !skuText; sku.textContent = skuText ? fmt(S.sku, { sku: skuText }) : ''; }
      const skuCell = $('[data-sku-cell]', root); if (skuCell) skuCell.textContent = skuText;
      const specFinish = $('[data-spec-finish]', root); if (specFinish) specFinish.textContent = r.finish;
      const rowLabel = $('[data-opt-row-label]', root);
      if (rowLabel) {
        const si = d.sizeIndex; let size = '';
        if (si >= 0 && d.variants.length > 1) size = r.need ? r.needText : (r.isRing ? fmt(S.sizeValueCap, { value: st.values[si] }) : st.values[si]);
        rowLabel.textContent = [r.finish, size].filter(Boolean).join(' · ');
        const row = rowLabel.closest('.dl-opt-row'); if (row) row.classList.toggle('is-on', !r.need);
      }
      // variant inputs
      const id = r.variant ? r.variant.id : r.priceVariant.id;
      $$('[data-variant-input], [data-variant-select]', root).forEach((inp) => { if (String(inp.value) !== String(id)) { inp.value = id; inp.dispatchEvent(new Event('change', { bubbles: true })); } });
      const wl = $('[data-waitlist-variant]'); if (wl && ctx === 'pdp') wl.value = d.title + (r.summary ? ' / ' + r.summary : '');
      const full = $('[data-full-link]', root); if (full) full.href = d.url + (r.variant ? '?variant=' + r.variant.id : '');
      // finish photo, engraving metal
      if (finishChanged || r.finish !== st.lastFinish) {
        if (ctx === 'pdp' && r.finish !== st.lastFinish) Below.refresh(r.variant ? r.variant.id : r.priceVariant.id);
        st.lastFinish = r.finish;
        const img = (d.finishImages || {})[r.finish];
        if (img) $$('img[data-finish-img]', root.closest('[data-pdp]') || root.closest('[data-ov-panel]') || root).forEach((im) => { im.src = img.src; if (im.hasAttribute('srcset')) im.srcset = img.srcset; });
        if (img && img.focal) $$('.media-detail', root.closest('[data-pdp]') || root.closest('[data-ov-panel]') || root).forEach((m) => m.style.setProperty('--org', img.focal));
        $$('.fc-engr', root).forEach((f) => f.style.setProperty('--m', `var(--metal-${handleize(r.finish)})`));
      }
      // products without a Finish option: show the selected variant's image
      if (d.finishIndex < 0 && r.variant && r.variant.media && st.lastMedia !== r.variant.media) {
        st.lastMedia = r.variant.media;
        const area = PF.scope(root); const g = $('[data-gallery]', area);
        const plate = g && $(`[data-plate][data-media-id="${r.variant.media}"]`, g);
        if (plate) { if (Gallery.index(g) !== +plate.dataset.plate) Gallery.go(g, +plate.dataset.plate); }
        else if (r.variant.img) $$('img[data-finish-img]', area).forEach((im) => { im.src = r.variant.img; im.removeAttribute('srcset'); });
      }
      // accelerated checkout: hidden when sold out, blocked (a click shows what is missing) until the selection is complete
      $$('[data-payment-button]', root).forEach((w) => {
        const gone = r.soldOutAll || r.combo; const blocked = !gone && (r.need || !!r.engrErr);
        w.hidden = gone; w.classList.toggle('is-blocked', blocked);
        const inner = $('[data-pay-inner]', w); if (inner) inner.inert = blocked;
      });
      // buttons, helper line, stock
      if (ctx === 'sheet') PF.renderSheetFooter(root, r);
      else PF.renderAdd(root, r);
      PF.renderStock(root, r);
      if (ctx === 'pdp') {
        if (r.variant && st.lastVariant !== r.variant.id) { PF.refreshPickup(root, r.variant.id); }
        st.lastVariant = r.variant ? r.variant.id : null;
        try { const u = new URL(location.href); if (r.variant) u.searchParams.set('variant', r.variant.id); else u.searchParams.delete('variant'); history.replaceState(history.state, '', u.pathname + u.search + u.hash); } catch (e) { /* ignore */ }
        Sticky.render(root, r);
      }
    },

    setButton(b, { label, act, disabled, state }) {
      if (!b) return;
      b.classList.remove('is-loading'); b.removeAttribute('aria-busy');
      if (state === 'loading') { b.classList.add('is-loading'); b.setAttribute('aria-busy', 'true'); b.setAttribute('aria-disabled', 'true'); b.innerHTML = icon('circle-notch', 20, 'spin') + `<span>${esc(S.adding)}</span>`; return; }
      if (state === 'success') { b.removeAttribute('aria-disabled'); b.innerHTML = icon('check', 20) + `<span>${esc(S.added)}</span>`; return; }
      if (act) b.dataset.act = act;
      if (disabled) b.setAttribute('aria-disabled', 'true'); else b.removeAttribute('aria-disabled');
      b.innerHTML = `<span>${esc(label)}</span>`;
    },

    renderAdd(root, r) {
      const ui = root._pf.ui; const b = $('[data-add]', root);
      if (b) {
        if (ui.state === 'loading' || ui.state === 'success') PF.setButton(b, { state: ui.state });
        else if (r.soldOutAll || r.combo) PF.setButton(b, { label: S.soldOut, act: 'add-blocked', disabled: true });
        else PF.setButton(b, { label: b.dataset.label || S.addToBag, act: 'add', disabled: r.need || !!r.engrErr });
      }
      const line = $('[data-line]', root);
      if (line) {
        let t = '';
        if (r.soldOutAll) t = S.soldOutText;
        else if (ui.state === 'success') t = '';
        else if (r.need) t = r.needText;
        else if (r.combo) t = S.chooseAvailable;
        else t = (r.summary ? r.summary + '. ' : '') + S.deliveryFree;
        line.textContent = t;
      }
      const succ = $('[data-qv-success]', root);
      if (succ) {
        succ.hidden = ui.state !== 'success';
        const n = $('[data-qv-success-notice] .fc-notice-text', succ) || $('.fc-notice-text', succ);
        if (n) n.textContent = `${r.d.title}${r.summary ? ', ' + r.summary : ''}.`;
      }
    },

    renderSheetFooter(root, r) {
      const ui = root._pf.ui; const mode = (OV.stack.find((o) => o.type === 'variant') || { props: {} }).props.mode;
      const done = $('[data-act="sheet-done"]', root);
      if (done) { if (r.need || r.combo || r.engrErr) done.setAttribute('aria-disabled', 'true'); else done.removeAttribute('aria-disabled'); }
      const line = $('[data-line]', root);
      if (line) line.textContent = r.need ? r.needText : r.combo ? S.chooseAvailableShort : mode === 'cart' ? S.updatesBag : S.returnsToAdd;
      if (ui.showNeed && r.need) $$('[data-size-block]', root).forEach((b) => b.classList.add('is-error'));
    },

    renderStock(root, r) {
      const box = $('[data-stock]', root); if (!box) return;
      const ui = root._pf.ui; const ctx = root.dataset.ctx;
      let html = '';
      if (ui.error === 'limit') html = PF.tpl(root, 'error-limit', { msg: esc(ui.msg) });
      else if (ui.error === 'network') html = PF.tpl(root, 'error-network');
      else if (r.soldOutAll) html = PF.tpl(root, 'sold-out');
      else if (r.need) html = '';
      else if (r.combo) html = PF.tpl(root, 'combo');
      else if (ui.state === 'success' && ctx === 'pdp') html = PF.tpl(root, 'added', { title: esc(r.d.title), summary: esc(r.summary) });
      else if (ui.state === 'success' && ctx === 'qv') html = '';
      else if (r.low) html = PF.tpl(root, 'low', { count: r.qty, summary: esc(r.summary), ready: root._pf.engr ? S.readyEngraved : S.shipsTomorrow });
      else html = PF.tpl(root, 'in-stock', { summary: esc(r.summary), ready: root._pf.engr ? S.readyEngraved : S.shipsTomorrow });
      if (box.innerHTML !== html) box.innerHTML = html;
    },

    refreshPickup: debounce(async (root, variantId) => {
      const box = $('[data-pickup]', root); const sid = root.dataset.sectionId; if (!box || !sid) return;
      try {
        const html = await getHTML(withParam(withParam(location.pathname, 'variant', variantId), 'section_id', sid));
        const fresh = $('[data-pickup]', parse(html)); if (fresh) box.innerHTML = fresh.innerHTML;
      } catch (e) { /* keep the old row */ }
    }, 250),

    select(root, i, value) {
      const st = root._pf; if (!st) return;
      st.values[i] = value; st.ui.error = null;
      if (st.ui.state === 'success') st.ui.state = 'idle';
      if (i !== st.data.finishIndex) st.ui.showNeed = false;
      PF.render(root);
      const r = PF.resolve(st);
      announce(`${r.summary || value}. ${money(r.price)}${r.combo ? '. ' + S.soldOut : ''}`);
    },

    syncEngraving(root) {
      const st = root._pf; const block = $('[data-engr-block]', root); if (!st || !block) return;
      const max = +block.dataset.max || 16; const t = st.engr; const err = engravingError(t, max); const shown = err ? '' : t;
      const fig = $('[data-engr]', block);
      if (fig) {
        const txt = $('[data-engr-text]', fig); if (txt) txt.textContent = shown;
        const cap = $('[data-engr-cap]', fig); if (cap) cap.textContent = (shown ? fmt(S.engravingCount, { count: shown.length, max }) : fmt(S.engravingEmpty, { max })) + ' · ' + S.engravingSampleNote;
        const stage = $('.fc-engr-stage', fig); if (stage) stage.setAttribute('aria-label', shown ? fmt(S.engravingPreview, { text: shown }) : S.engravingPreviewEmpty);
      }
      const count = $('[data-engr-count]', block); if (count) count.textContent = `${t.length} / ${max}`;
      const field = $('[data-engr-field]', block); if (field) field.classList.toggle('is-error', !!err);
      const inp = $('[data-engr-input]', block); if (inp) { if (err) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid'); }
      const msg = $('[data-engr-msg]', block);
      if (msg) {
        if (err) { msg.className = 'fc-field-msg is-error'; msg.setAttribute('role', 'alert'); msg.innerHTML = icon('warning-circle', 16) + `<span>${esc(err)}</span>`; }
        else { msg.className = 'fc-field-msg'; msg.removeAttribute('role'); msg.innerHTML = msg.dataset.hint || ''; }
      }
      const fin = $('[data-engr-final]', block); if (fin) fin.innerHTML = t && !err ? PF.tpl(root, 'final-sale') : '';
      const r = PF.resolve(st);
      if (root.dataset.ctx === 'sheet') PF.renderSheetFooter(root, r); else PF.renderAdd(root, r);
      PF.renderStock(root, r);
    },

    async add(root) {
      const st = root._pf; if (!st) return; const ui = st.ui; const r = PF.resolve(st); const ctx = root.dataset.ctx;
      if (ui.state === 'loading') return;
      ui.error = null;
      if (r.need) {
        ui.showNeed = true; PF.render(root);
        announce(fmt(S.selectToContinue, { option: r.needName }));
        if (ctx === 'qv' && $('.dl-opt-row', root)) { Sheet.open('qv', $('.dl-opt-row', root)); return; }
        const g = $(`[role="radiogroup"][data-group="${st.data.sizeIndex}"] [tabindex="0"]`, root); if (g) { g.focus(); g.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' }); }
        return;
      }
      if (r.engrErr) { const i = $('[data-engr-input]', root); if (i) i.focus(); return; }
      if (r.combo || r.soldOutAll) return;
      const gift = GiftRecipient.collect(root);
      if (gift.invalid) { gift.invalid.focus(); announce(S.problemOne || ''); return; }
      ui.state = 'loading'; PF.render(root);
      const qtyInput = $('input[name="quantity"]', root);
      const item = { id: r.variant.id, quantity: Math.max(1, +(qtyInput ? qtyInput.value : 1) || 1) };
      const engrInput = $('[data-engr-input]', root);
      if (st.engr && engrInput) { const m = /^properties\[(.+)\]$/.exec(engrInput.name || ''); item.properties = { [m ? m[1] : 'Engraving']: st.engr }; }
      if (st.plan) item.selling_plan = st.plan;
      if (gift.props) item.properties = Object.assign(item.properties || {}, gift.props);
      try {
        await Cart.add([item]);
        ui.state = 'success'; PF.render(root); announce(fmt(S.addedAnnounce, { title: st.data.title }));
        if (ctx === 'pdp') {
          if (Cart.useDrawer()) openOv('cart', { props: { returnSel: '[data-product-form][data-ctx="pdp"] [data-add]' } });
          setTimeout(() => { if (ui.state === 'success') { ui.state = 'idle'; PF.render(root); } }, 2400);
        }
      } catch (err) {
        ui.state = 'idle';
        if (err.status === 422 && GiftRecipient.errors(root, err.json && err.json.errors)) { PF.render(root); return; }
        if (err.status === 422) {
          ui.error = 'limit';
          const left = Math.max(0, (r.qty || 0) - Cart.qtyOf(r.variant.id));
          ui.msg = r.qty != null ? (left ? fmt(S.onlyMore, { count: left }) : fmt(S.onlyInBag, { count: r.qty })) : (err.message || S.genericError);
        } else { ui.error = 'network'; announce(S.addError); }
        PF.render(root);
      }
    },
  };

  // product sections that show the selected finish (specs, detail tiles, on scale) re-render with ?variant=
  const Below = {
    types: ['product-specs', 'product-details-tiles', 'product-on-scale'],
    refresh: debounce(async (variantId) => {
      const live = Below.types.map((t) => $(`[data-section="${t}"]`)).filter(Boolean).map((el) => el.closest('.shopify-section')).filter(Boolean);
      if (!live.length) return;
      const ids = live.map((sec) => sec.id.replace('shopify-section-', ''));
      try {
        const json = await getSections(withParam(withParam(location.pathname, 'variant', variantId), 'sections', ids.join(',')));
        live.forEach((sec, i) => {
          const html = json[ids[i]]; if (!html) return;
          const doc = parse(html); const fresh = $('.shopify-section', doc) || doc.body;
          const snap = snapFocus(sec); sec.innerHTML = fresh.innerHTML; restoreFocus(sec, snap); initScope(sec);
        });
      } catch (e) { /* keep the current finish */ }
    }, 200),
  };

  // ================= gallery and zoom (media-gallery) =================
  const Gallery = {
    count: (g) => $$('[data-plate]', g).length,
    index: (g) => +(g.dataset.i || 0),
    go(g, i) {
      const n = Gallery.count(g); if (!n) return;
      i = ((i % n) + n) % n;
      if (i !== Gallery.index(g)) Media.pause(g);
      g.dataset.i = i;
      $$('[data-plate]', g).forEach((p) => { p.hidden = +p.dataset.plate !== i; });
      $$('.thumb', g).forEach((t, k) => { const on = k === i; t.classList.toggle('is-on', on); t.setAttribute('aria-checked', String(on)); t.tabIndex = on ? 0 : -1; });
      $$('.mdots span', g).forEach((s, k) => s.classList.toggle('on', k === i));
      $$('.dots button', g).forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-current', String(k === i)); });
      const c = $('[data-counter]', g); if (c) c.textContent = fmt(S.imageCount, { index: i + 1, count: n });
      const zb = $('[data-open="zoom"]', g); const cur = $(`[data-plate="${i}"]`, g); if (zb) zb.hidden = !!(cur && $('[data-media]', cur));
      Zoom.sync();
    },
  };
  const Zoom = {
    gallery: null,
    // the zoom dialog shows photos only: video and 3D plates are skipped
    images: (g) => $$('[data-plate]', g).filter((p) => !$('[data-media]', p)).map((p) => +p.dataset.plate),
    open(trigger) {
      const g = $('.dl-gallery[data-gallery]'); if (!g) return;
      const imgs = Zoom.images(g); if (!imgs.length) return;
      if (!imgs.includes(Gallery.index(g))) Gallery.go(g, imgs[0]);
      Zoom.gallery = g; openOv('zoom', { trigger }); Zoom.sync();
    },
    step(d) {
      const g = Zoom.gallery; if (!g) return;
      const imgs = Zoom.images(g); if (!imgs.length) return;
      const k = Math.max(0, imgs.indexOf(Gallery.index(g)));
      Gallery.go(g, imgs[(((k + d) % imgs.length) + imgs.length) % imgs.length]);
    },
    sync() {
      const el = ovEl('zoom'); const g = Zoom.gallery; if (!el || el.hidden || !g) return;
      const imgs = Zoom.images(g); const i = Gallery.index(g); const k = imgs.indexOf(i); if (k < 0) return;
      const n = imgs.length;
      const plate = $(`[data-plate="${i}"]`, g); const box = $('[data-zoom-plate]', el);
      if (plate && box) { const c = plate.cloneNode(true); c.hidden = false; $$('img', c).forEach((im) => { im.sizes = '80vw'; im.loading = 'eager'; }); box.replaceChildren(c); }
      const cnt = $('[data-zoom-count]', el); if (cnt) cnt.textContent = fmt(S.imageCount, { index: k + 1, count: n });
      const t = $('[data-zoom-title]', el); if (t && t.dataset.template) t.textContent = fmt(t.dataset.template, { index: k + 1, count: n });
    },
  };

  // ================= rich product media: video, YouTube/Vimeo, 3D models (snippets/product-media) =================
  // Players load from the plate's <template> only when the shopper presses the poster. Shopify's model viewer UI
  // and AR (shopify-xr) load through Shopify.loadFeatures, so every script stays on Shopify's servers.
  const Media = {
    load(btn) {
      const box = btn.closest('[data-media]'); const tpl = box && $('template[data-media-tpl]', box); if (!tpl) return;
      const g = box.closest('[data-gallery]'); if (g) Media.pause(g);
      const live = document.createElement('div'); live.className = 'dl-media-live'; live.setAttribute('data-media-live', '');
      live.appendChild(tpl.content.cloneNode(true));
      btn.replaceWith(live);
      const el = $('video, iframe, model-viewer', live); if (!el) return;
      if (el.tagName === 'MODEL-VIEWER') Media.modelUI(el);
      if (el.tagName === 'VIDEO') { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
      if (!el.hasAttribute('tabindex') && el.tagName === 'MODEL-VIEWER') el.setAttribute('tabindex', '0');
      el.focus({ preventScroll: true });
    },
    pause(scope) {
      $$('[data-media-live]', scope).forEach((live) => {
        const box = live.closest('[data-media]');
        $$('video', live).forEach((v) => { try { v.pause(); } catch (e) { /* not playing */ } });
        $$('iframe', live).forEach((f) => {
          if (!f.contentWindow) return;
          const msg = box && box.dataset.host === 'vimeo' ? '{"method":"pause"}' : '{"event":"command","func":"pauseVideo","args":""}';
          try { f.contentWindow.postMessage(msg, '*'); } catch (e) { /* cross-origin player gone */ }
        });
        $$('model-viewer', live).forEach((m) => { if (m._dlUI && m._dlUI.pause) m._dlUI.pause(); });
      });
    },
    features(list) { if (window.Shopify && typeof window.Shopify.loadFeatures === 'function') { window.Shopify.loadFeatures(list); return true; } return false; },
    modelUI(mv) {
      if (!document.getElementById('dl-model-ui-css')) {
        const css = document.createElement('link'); css.id = 'dl-model-ui-css'; css.rel = 'stylesheet';
        css.href = '//cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css'; document.head.appendChild(css);
      }
      Media.features([{ name: 'model-viewer-ui', version: '1.0', onLoad: (err) => { if (err || !window.Shopify.ModelViewerUI) return; mv._dlUI = new window.Shopify.ModelViewerUI(mv); } }]);
    },
    init(scope) {
      if (!$('script[data-model-json]', scope)) return;
      Media.features([{ name: 'shopify-xr', version: '1.0', onLoad: (err) => {
        if (err) return;
        const setup = () => {
          $$('script[data-model-json]').forEach((json) => { try { window.ShopifyXR.addModels(JSON.parse(json.textContent)); } catch (e) { /* bad data */ } json.remove(); });
          window.ShopifyXR.setupXRElements();
        };
        if (window.ShopifyXR) setup(); else document.addEventListener('shopify_xr_initialized', setup, { once: true });
      } }]);
    },
  };
  document.addEventListener('dl:closed', (e) => Media.pause(e.target));

  // Shopify's accelerated checkout buttons render themselves on page load; forms loaded later (quick view,
  // theme editor reloads) ask Shopify to render them again
  const Pay = { init() { try { if (window.Shopify && window.Shopify.PaymentButton && typeof window.Shopify.PaymentButton.init === 'function') window.Shopify.PaymentButton.init(); } catch (e) { /* buttons stay as rendered */ } } };
  document.addEventListener('shopify:section:load', (e) => { if (e.target && $('[data-payment-button]', e.target)) Pay.init(); });

  // the featured product's finish swatches (previews) also choose the variant its checkout buttons buy
  document.addEventListener('click', (e) => {
    const sw = e.target instanceof Element && e.target.closest('[data-swatches] [role="radio"]');
    if (!sw || sw.closest('[data-product-form]')) return;
    const sec = sw.closest('[data-section]') || sw.closest('.shopify-section'); const root = sec && $('[data-product-form][data-ctx="fp"]', sec); const st = root && root._pf;
    if (!st || st.data.finishIndex < 0) return;
    const fi = st.data.finishIndex; const match = st.data.variants.map((v) => v.options[fi]).find((v) => handleize(v) === handleize(sw.dataset.value));
    if (match && st.values[fi] !== match) { st.values[fi] = match; PF.render(root); }
  });

  // ================= gift card recipient (snippets/product-gift-recipient) =================
  const GiftRecipient = {
    box: (root) => $('[data-gc-recipient]', root),
    day: (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    init(root) {
      const box = GiftRecipient.box(root); if (!box) return;
      const date = $('[data-gc-field="send_on"]', box);
      if (date) { const now = new Date(); date.min = GiftRecipient.day(now); date.max = GiftRecipient.day(new Date(now.getTime() + 90 * 864e5)); }
      GiftRecipient.toggle(box);
    },
    toggle(box) {
      const on = !!($('[data-gc-toggle]', box) || {}).checked;
      const fields = $('[data-gc-fields]', box); if (fields) fields.hidden = !on;
      $$('[data-gc-field], [data-gc-offset]', box).forEach((i) => { i.disabled = !on; if (!on) Forms.clearField(i); });
      const offset = $('[data-gc-offset]', box); if (offset) offset.value = String(new Date().getTimezoneOffset());
    },
    check(i) {
      const m = Forms.check(i); if (m) return m;
      const v = String(i.value || '').trim();
      if (i.dataset.gcField === 'message' && i.maxLength > 0 && v.length > i.maxLength) return i.dataset.msgInvalid || '';
      if (i.dataset.gcField === 'send_on' && v && (!/^\d{4}-\d{2}-\d{2}$/.test(v) || (i.min && v < i.min) || (i.max && v > i.max))) return i.dataset.msgInvalid || '';
      return '';
    },
    // validated line item properties when "send to a recipient" is on: { props } or { invalid: firstField }
    collect(root) {
      const box = GiftRecipient.box(root); const toggle = box && $('[data-gc-toggle]', box);
      if (!toggle || !toggle.checked) return { props: null };
      let invalid = null;
      $$('[data-gc-field]', box).forEach((i) => { Forms.clearField(i); const m = GiftRecipient.check(i); if (m) { Forms.fieldError(i, m); if (!invalid) invalid = i; } });
      if (invalid) return { invalid };
      const props = {};
      [toggle, ...$$('[data-gc-field], [data-gc-offset]', box)].forEach((i) => {
        const k = /^properties\[(.+)\]$/.exec(i.name || ''); const v = String(i.value || '').trim();
        if (k && v) props[k[1]] = v;
      });
      return { props };
    },
    // the cart's 422 answer names the recipient fields it rejected (email, name, message, send_on)
    errors(root, errors) {
      const box = GiftRecipient.box(root); if (!box || !errors || typeof errors !== 'object') return false;
      let first = null;
      Object.entries(errors).forEach(([k, v]) => {
        const i = $(`[data-gc-field="${k}"]`, box); if (!i) return;
        const msg = (Array.isArray(v) ? v.join(', ') : String(v)).trim();
        Forms.fieldError(i, /^[a-z]/.test(msg) ? `${Forms.labelOf(i)} ${msg}.` : msg);
        if (!first) first = i;
      });
      if (first) { first.focus(); announce(S.problemOne || ''); }
      return !!first;
    },
  };
  document.addEventListener('change', (e) => { const t = e.target; if (t instanceof Element && t.matches('[data-gc-toggle]')) GiftRecipient.toggle(t.closest('[data-gc-recipient]')); });
  document.addEventListener('input', (e) => {
    const t = e.target; if (!(t instanceof Element) || !t.matches('[data-gc-field]')) return;
    if (t.getAttribute('aria-invalid') === 'true') Forms.clearField(t);
    if (t.dataset.gcField === 'message') { const c = $('.fc-field-counter', t.closest('.fc-field')); if (c) c.textContent = `${t.value.length} / ${t.maxLength > 0 ? t.maxLength : 200}`; }
  });

  // ================= sticky buy bar =================
  const Sticky = {
    bar: () => $('[data-stickybuy]'),
    render(root, r) {
      const bar = Sticky.bar(); if (!bar) return;
      const price = $('[data-sticky-price]', bar); if (price) price.textContent = money(r.price);
      const b = $('button', bar); if (!b) return;
      const tab = bar.classList.contains('is-on') ? 0 : -1;
      if (r.soldOutAll || r.combo) PF.setButton(b, { label: S.soldOut, act: 'add-blocked', disabled: true });
      else if (r.need) PF.setButton(b, { label: r.needText, act: 'sticky-pick', disabled: false });
      else PF.setButton(b, { label: S.addToBag, act: 'add', disabled: !!r.engrErr });
      b.tabIndex = tab;
    },
    update() {
      const bar = Sticky.bar(); if (!bar) return;
      const b = $('[data-product-form][data-ctx="pdp"] [data-add]');
      const show = !!b && b.getBoundingClientRect().bottom < 56 && !OV.stack.length;
      bar.classList.toggle('is-on', show); bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      $$('button, a', bar).forEach((e) => { e.tabIndex = show ? 0 : -1; });
    },
  };
  window.addEventListener('scroll', () => requestAnimationFrame(Sticky.update), { passive: true });

  // ================= variant sheet =================
  const Sheet = {
    async open(mode, trigger, { key, url } = {}) {
      let source = null; let presel = null;
      if (mode === 'qv') { source = $('[data-ov="qv"] [data-product-form]'); }
      else if (mode === 'pdp') { source = PF.byCtx('pdp'); }
      if (source && source._pf) { const s = source._pf; presel = { values: [...s.values], engr: s.engr, plan: s.plan }; url = s.data.url; }
      let line = null;
      if (mode === 'cart') {
        const cart = await Cart.get(); line = cart.items.find((x) => x.key === key); if (!line) return;
        url = line.url;
        const props = line.properties || {}; const ek = Object.keys(props).find((k) => /engrav/i.test(k));
        presel = { variantId: line.variant_id, engr: ek ? props[ek] : '', plan: line.selling_plan_allocation ? String(line.selling_plan_allocation.selling_plan.id) : '' };
      }
      if (!url) return;
      const returnSel = mode === 'qv' ? '[data-ov="qv"] .dl-opt-row' : mode === 'pdp' ? '[data-stickybuy] button' : `[data-key="${key}"] [data-act="edit-line"]`;
      const o = openOv('variant', { trigger, props: { mode, key, returnSel, line } });
      if (!o) return;
      o.props.mode = mode; o.props.key = key; o.props.line = line;
      const ok = await loadPanel(o, url);
      if (!ok) return;
      const root = $('[data-product-form][data-ctx="sheet"]', o.el);
      if (!root) return;
      const title = $('#ov-title-variant', o.el); if (title) title.textContent = mode === 'cart' ? S.editPiece : S.chooseFinishSize;
      if (presel && presel.variantId) { const data = JSON.parse($('script[data-product-json]', root).textContent); const v = data.variants.find((x) => x.id === presel.variantId); if (v) presel.values = [...v.options]; }
      PF.init(root, presel);
      focusInitial(o);
    },
    async done() {
      const o = OV.stack.find((x) => x.type === 'variant'); if (!o) return;
      const root = $('[data-product-form][data-ctx="sheet"]', o.el); if (!root || !root._pf) return;
      const st = root._pf; const r = PF.resolve(st);
      if (r.need || r.combo || r.engrErr) {
        st.ui.showNeed = true; PF.render(root);
        announce(r.need ? fmt(S.selectToContinue, { option: r.needName }) : S.chooseAvailableShort);
        const g = $(`[role="radiogroup"][data-group="${st.data.sizeIndex}"] [tabindex="0"]`, root); if (g && r.need) g.focus();
        return;
      }
      const sel = { values: [...st.values], engr: st.engr, plan: st.plan };
      if (o.props.mode === 'qv' || o.props.mode === 'pdp') {
        const target = o.props.mode === 'qv' ? $('[data-ov="qv"] [data-product-form]') : PF.byCtx('pdp');
        if (target && target._pf) {
          Object.assign(target._pf, { values: sel.values, engr: sel.engr, plan: sel.plan });
          Object.assign(target._pf.ui, { state: 'idle', error: null, showNeed: false });
          const ei = $('[data-engr-input]', target); if (ei) ei.value = sel.engr;
          $$('input[data-act="plan"]', target).forEach((x) => { x.checked = x.value === sel.plan; });
          PF.render(target, { finishChanged: true }); if (sel.engr) PF.syncEngraving(target);
        }
        closeOv('variant');
      } else {
        const line = o.props.line; closeOv('variant');
        const props = { ...(line.properties || {}) };
        const engrInput = $('[data-engr-input]', root);
        const propName = engrInput ? (/^properties\[(.+)\]$/.exec(engrInput.name || '') || [])[1] : null;
        if (propName) { if (sel.engr) props[propName] = sel.engr; else delete props[propName]; }
        try {
          await Cart.request(R.cartChange, { id: o.props.key, quantity: 0 }, { render: false });
          const item = { id: r.variant.id, quantity: line.quantity, properties: props };
          if (sel.plan) item.selling_plan = sel.plan;
          await Cart.add([item]);
          toast(S.bagUpdated);
        } catch (e) { toast(e.status === 422 ? S.comboSoldToast : S.genericError); Cart.refresh(); }
      }
    },
  };

  // ================= quick view and quick add =================
  async function openQuickView(trigger, { metal, showNeed = false } = {}) {
    const url = trigger.dataset.url || (trigger.dataset.handle ? route('/products/' + trigger.dataset.handle) : trigger.getAttribute('href'));
    if (!url || !ovEl('qv')) { if (url) location.href = url; return; }
    const o = openOv('qv', { trigger, props: { returnSel: `[data-open="quick-view"][data-url="${url}"]` } });
    if (!o) return;
    const ok = await loadPanel(o, url);
    if (!ok) return;
    const root = $('[data-product-form][data-ctx="qv"]', o.el); if (!root) return;
    PF.init(root);
    const st = root._pf;
    if (st && metal && st.data.finishIndex >= 0) {
      const match = st.data.variants.map((v) => v.options[st.data.finishIndex]).find((v) => handleize(v) === handleize(metal));
      if (match) { st.values[st.data.finishIndex] = match; PF.render(root, { finishChanged: true }); }
    }
    if (st && showNeed) { st.ui.showNeed = true; PF.render(root); }
    announce(fmt(S.quickViewLoaded, { title: st ? st.data.title : '' }));
  }

  async function quickAdd(el) {
    if (el.dataset.hasOptions === 'true' || CFG.quickAddMode === 'always_quick_view') { openQuickView(el, { showNeed: true }); return; }
    const label = $('span', el); const prev = label ? label.textContent : '';
    if (label) label.textContent = S.adding; el.setAttribute('aria-busy', 'true');
    try {
      await Cart.add([{ id: +el.dataset.variantId, quantity: 1 }]);
      el.removeAttribute('aria-busy');
      if (label) label.textContent = S.addedShort;
      announce(fmt(S.addedAnnounce, { title: (el.closest('[data-card]') && $('.fc-card-name', el.closest('[data-card]')) || {}).textContent || '' }));
      setTimeout(() => { if (label && document.contains(label)) label.textContent = prev; }, 1600);
      if (Cart.useDrawer()) openOv('cart', { trigger: el });
    } catch (err) {
      el.removeAttribute('aria-busy'); if (label) label.textContent = prev;
      toast(err.status === 422 ? S.allInBag : S.addError);
    }
  }

  // ================= cart (cart-store, cart-item, cart-section, cart-count, cart-drawer, cart-discount) =================
  const Cart = {
    state: null,
    undo: null,
    lineErr: {},
    useDrawer: () => CFG.cartType !== 'page' && !!ovEl('cart') && CFG.cartAutoOpen !== false,
    sectionIds() {
      const ids = new Set();
      $$('[data-cart-section][data-section-id]').forEach((e) => ids.add(e.dataset.sectionId));
      const d = ovEl('cart'); if (d && d.dataset.sectionId) ids.add(d.dataset.sectionId);
      return [...ids];
    },
    async get(force = false) { if (!Cart.state || force) Cart.state = await getJSON(R.cart + '.js'); return Cart.state; },
    qtyOf: (variantId) => ((Cart.state && Cart.state.items) || []).filter((i) => i.variant_id === variantId).reduce((n, i) => n + i.quantity, 0),
    async request(url, body, { render = true } = {}) {
      const ids = render ? Cart.sectionIds() : [];
      if (ids.length) { body.sections = ids.join(','); body.sections_url = location.pathname; }
      Cart.busy(true);
      try {
        const json = await getJSON(url.replace(/\.js$/, '') + '.js', { method: 'POST', body: JSON.stringify(body) });
        if (json && json.items && json.token) Cart.state = json;
        if (json && json.sections) Cart.apply(json.sections);
        if (json && typeof json.item_count === 'number') Cart.count(json.item_count);
        return json;
      } finally { Cart.busy(false); }
    },
    async add(items) {
      const json = await Cart.request(R.cartAdd, { items });
      const cart = await Cart.get(true); Cart.count(cart.item_count);
      document.dispatchEvent(new CustomEvent('dl:cart', { detail: cart }));
      return json;
    },
    async refresh() {
      const ids = Cart.sectionIds(); if (!ids.length) { const c = await Cart.get(true); Cart.count(c.item_count); return; }
      try { const json = await getSections(withParam(location.pathname, 'sections', ids.join(','))); Cart.apply(json); } catch (e) { /* keep */ }
      const c = await Cart.get(true); Cart.count(c.item_count);
    },
    busy(on) {
      $$('[data-cart-section], .app-ov[data-ov="cart"]').forEach((s) => { s.toggleAttribute('aria-busy', on); });
      $$('button[name="checkout"], [data-checkout]').forEach((b) => { if (on) b.setAttribute('aria-disabled', 'true'); else b.removeAttribute('aria-disabled'); });
    },
    apply(sections) {
      Object.entries(sections || {}).forEach(([id, html]) => {
        if (!html) return;
        const doc = parse(html);
        const drawer = $(`.app-ov[data-ov="cart"][data-section-id="${id}"]`);
        if (drawer) {
          const live = $('[data-ov-panel]', drawer); const fresh = $('[data-ov-panel]', doc); if (!live || !fresh) return;
          const snap = snapFocus(live); const bd = $('.bd', live); const top = bd ? bd.scrollTop : 0;
          live.innerHTML = fresh.innerHTML;
          const bd2 = $('.bd', live); if (bd2) bd2.scrollTop = top;
          Cart.decorate(live); restoreFocus(live, snap); initScope(live);
          return;
        }
        $$(`[data-cart-section][data-section-id="${id}"]`).forEach((live) => {
          const fresh = $('[data-cart-section]', doc); if (!fresh) return;
          const snap = snapFocus(live); live.innerHTML = fresh.innerHTML; Cart.decorate(live); restoreFocus(live, snap); initScope(live);
        });
      });
      // re-rendered accelerated checkout buttons (bag-checkout-buttons) need Shopify's payment button script again
      if ($('[data-accelerated-checkout]') && window.Shopify && window.Shopify.PaymentButton && typeof window.Shopify.PaymentButton.init === 'function') window.Shopify.PaymentButton.init();
    },
    decorate(scope) {
      if (Cart.undo) $$('[data-undo-slot]', scope).forEach((s) => { s.innerHTML = `<div class="fc-bag undo" role="status"><span>${esc(fmt(S.removed, { title: Cart.undo.title }))}</span><button type="button" class="fc-btn fc-btn-link no-chev" data-act="undo"><span>${esc(S.undo)}</span></button></div>`; });
      Object.entries(Cart.lineErr).forEach(([key, msg]) => {
        const line = $(`[data-line][data-key="${CSS.escape(key)}"]`, scope); const slot = line && $('[data-line-error]', line);
        if (slot) slot.innerHTML = `<p class="fc-field-msg is-error" role="alert" style="margin-top:6px">${icon('warning-circle', 16)}<span>${esc(msg)}</span></p>`;
      });
    },
    count(n) {
      $$('[data-bag-count]').forEach((c) => { const inner = $('span', c) || c; inner.textContent = n; c.hidden = !n; });
      $$('[data-bag-btn]').forEach((b) => b.setAttribute('aria-label', n ? (n === 1 ? S.bagButtonOne : fmt(S.bagButtonCount, { count: n })) : S.bagButton));
    },
    async qty(el) {
      const key = el.dataset.key; const d = +el.dataset.d; const cur = +el.dataset.qty || +(el.closest('[data-line]') || {}).dataset?.qty || 1;
      delete Cart.lineErr[key];
      if (d > 0 && el.getAttribute('aria-disabled') === 'true') { Cart.lineErr[key] = fmt(S.quantityLimit, { count: el.dataset.max || cur }); Cart.decorate(document); return; }
      const next = cur + d;
      if (next <= 0) { Cart.remove(key); return; }
      const line = el.closest('[data-line]'); if (line) line.classList.add('is-busy');
      try { await Cart.request(R.cartChange, { id: key, quantity: next }); }
      catch (err) {
        if (line) line.classList.remove('is-busy');
        Cart.lineErr[key] = err.status === 422 ? (el.dataset.max ? fmt(S.quantityLimit, { count: el.dataset.max }) : err.message || fmt(S.quantityLimit, { count: cur })) : S.networkError;
        Cart.decorate(document);
      }
    },
    async remove(key) {
      const cart = await Cart.get(); const item = cart.items.find((i) => i.key === key);
      const line = $(`[data-line][data-key="${CSS.escape(key)}"]`); if (line) line.classList.add('is-busy');
      try {
        if (item) Cart.undo = { title: item.product_title, item: { id: item.variant_id, quantity: item.quantity, properties: item.properties || {}, ...(item.selling_plan_allocation ? { selling_plan: item.selling_plan_allocation.selling_plan.id } : {}) } };
        delete Cart.lineErr[key];
        await Cart.request(R.cartChange, { id: key, quantity: 0 });
        announce(S.removedAnnounce);
        setTimeout(() => { const u = $('[data-act="undo"]'); if (u) u.focus(); }, 0);
      } catch (err) { if (line) line.classList.remove('is-busy'); Cart.undo = null; toast(S.networkError); }
    },
    async restore() {
      const u = Cart.undo; if (!u) return; Cart.undo = null;
      try { await Cart.add([u.item]); announce(S.restored); setTimeout(() => { const r = $('.app-ov[data-ov="cart"]:not([hidden]) [data-act="remove"], [data-cart-section] [data-act="remove"]'); if (r) r.focus(); }, 0); }
      catch (e) { toast(S.networkError); }
    },
    codes() { return ((Cart.state && Cart.state.discount_codes) || []).map((c) => c.code); },
    async applyCode(form) {
      const input = $('input[name="discount"], input', form); const code = (input.value || '').trim();
      Forms.clearField(input);
      if (!code) { Forms.fieldError(input, S.discountEmpty); input.focus(); return; }
      await Cart.get(true);
      const codes = [...new Set([...Cart.codes(), code])];
      try {
        const cart = await Cart.request(R.cartUpdate, { discount: codes.join(',') });
        const hit = (cart.discount_codes || []).find((c) => c.code.toLowerCase() === code.toLowerCase());
        if (!hit || !hit.applicable) {
          await Cart.request(R.cartUpdate, { discount: codes.filter((c) => c !== code).join(',') });
          const f = $(`form[data-form="code"]#${CSS.escape(form.id)}`) || $('form[data-form="code"]');
          if (f) { f.hidden = false; const t = $(`[aria-controls="${f.id}"]`); if (t) t.setAttribute('aria-expanded', 'true'); const i = $('input', f); i.value = code; Forms.fieldError(i, S.discountInvalid); i.focus(); }
          announce(S.discountInvalid);
        } else announce(S.discountApplied);
      } catch (e) { Forms.fieldError(input, S.networkError); }
    },
    async removeCode(code) {
      await Cart.get(true);
      await Cart.request(R.cartUpdate, { discount: Cart.codes().filter((c) => c !== code).join(',') });
      announce(S.discountRemoved);
    },
    saveNote: debounce((value) => { getJSON(R.cartUpdate + '.js', { method: 'POST', body: JSON.stringify({ note: value }) }).catch(() => {}); }, 600),
    async estimate(form) {
      const zip = $('input[name="zip"]', form); const country = $('[name="country"]', form); const province = $('[name="province"]', form);
      const out = $('[data-estimate-out]', form); Forms.clearField(zip);
      if (!zip.value.trim()) { Forms.fieldError(zip, S.zipInvalid); zip.focus(); if (out) out.innerHTML = ''; return; }
      const q = new URLSearchParams({ 'shipping_address[zip]': zip.value.trim(), 'shipping_address[country]': country ? country.value : '', 'shipping_address[province]': province ? province.value : '' });
      try {
        await fetch(R.cart + '/prepare_shipping_rates.json?' + q, { method: 'POST' });
        let rates = null;
        for (let i = 0; i < 10 && !rates; i++) {
          const res = await fetch(R.cart + '/async_shipping_rates.json?' + q);
          if (res.status === 200) { const j = await res.json(); if (j && j.shipping_rates) rates = j.shipping_rates; }
          else if (res.status === 422) { const j = await res.json(); Forms.fieldError(zip, Object.values(j).flat().join(' ') || S.zipInvalid); if (out) out.innerHTML = ''; return; }
          if (!rates) await sleep(500);
        }
        if (out) out.innerHTML = rates && rates.length ? rates.map((r) => notice({ tone: 'success', title: r.name, text: Number(r.price) === 0 ? r.presentment_name || '' : money(Math.round(Number(r.price) * 100)) })).join('') : notice({ tone: 'info', title: S.estimateNone });
        announce(S.estimated);
      } catch (e) { if (out) out.innerHTML = notice({ tone: 'danger', title: S.somethingWrong, text: S.networkError }); }
    },
  };

  // ================= facets =================
  const Facets = {
    token: 0,
    ids() {
      const ids = new Set();
      $$('[data-facets][data-section-id], [data-grid-section][data-section-id]').forEach((e) => ids.add(e.dataset.sectionId));
      return [...ids];
    },
    urlFromForm(form) {
      const fd = new FormData(form); const q = new URLSearchParams();
      for (const [k, v] of fd.entries()) if (String(v).trim() !== '') q.append(k, v);
      const base = form.getAttribute('action') || location.pathname;
      const s = q.toString(); return base.split('?')[0] + (s ? '?' + s : '');
    },
    async apply(url) {
      const ids = Facets.ids(); if (!ids.length) { location.href = url; return; }
      const t = ++Facets.token;
      const grids = $$('[data-grid-section]'); grids.forEach((g) => { g.setAttribute('aria-busy', 'true'); g.classList.add('is-updating'); });
      const openPops = $$('[data-act="pop"][aria-expanded="true"]').map((b) => b.dataset.pop).filter(Boolean);
      try {
        const json = await getSections(withParam(url, 'sections', ids.join(',')));
        if (t !== Facets.token) return;
        Object.entries(json).forEach(([id, html]) => {
          const doc = parse(html);
          $$(`[data-section-id="${id}"]`).forEach((live) => {
            if (live.closest('#app-overlay')) return;
            const sel = live.hasAttribute('data-facets') ? '[data-facets]' : '[data-grid-section]';
            const fresh = $(sel, doc); if (!fresh) return;
            const snap = snapFocus(live); live.innerHTML = fresh.innerHTML;
            ['data-count', 'data-total'].forEach((a) => { if (fresh.hasAttribute(a)) live.setAttribute(a, fresh.getAttribute(a)); });
            openPops.forEach((k) => { const b = $(`[data-act="pop"][data-pop="${CSS.escape(k)}"]`, live); if (b) togglePop(b, true, { focus: false }); });
            restoreFocus(live, snap); initScope(live);
          });
        });
        history.replaceState(history.state, '', url);
        const grid = $('[data-grid-section]'); const n = grid && grid.dataset.count;
        if (n != null) announce(fmt(+n === 1 ? S.piecesOne : S.piecesOther, { count: n }));
        Facets.refreshDrawer(url);
      } catch (e) { location.href = url; }
      finally { $$('[data-grid-section]').forEach((g) => { g.removeAttribute('aria-busy'); g.classList.remove('is-updating'); }); }
    },
    async refreshDrawer(url) {
      const el = ovEl('filters'); if (!el || !el.dataset.sectionId) return;
      try {
        const html = await getHTML(withParam(url, 'section_id', el.dataset.sectionId));
        const fresh = $('[data-ov-panel]', parse(html)); const live = $('[data-ov-panel]', el);
        if (fresh && live && el.hidden) live.innerHTML = fresh.innerHTML;
        else if (fresh && live) { const c = $('[data-facets-count]', fresh); const lc = $('[data-facets-count]', live); if (c && lc) lc.innerHTML = c.innerHTML; }
      } catch (e) { /* keep */ }
    },
    previewCount: debounce(async (form) => {
      const el = form.closest('.app-ov'); const sid = el && el.dataset.sectionId; if (!sid) return;
      try {
        const html = await getHTML(withParam(Facets.urlFromForm(form), 'section_id', sid));
        const fresh = $('[data-facets-count]', parse(html)); const live = $('[data-facets-count]', form) || $('[data-facets-count]', el);
        if (fresh && live) live.innerHTML = fresh.innerHTML;
      } catch (e) { /* keep */ }
    }, 250),
    async more(btn) {
      const url = btn.dataset.nextUrl; const section = btn.closest('[data-grid-section]'); if (!url || !section) return;
      const label = $('span', btn); const prev = label ? label.textContent : '';
      if (label) label.textContent = S.loadingMore; btn.setAttribute('aria-busy', 'true'); announce(S.loadingMore);
      try {
        const html = await getHTML(withParam(url, 'section_id', section.dataset.sectionId));
        const doc = parse(html); const grid = $('[data-grid]', section); const freshGrid = $('[data-grid]', doc);
        const before = grid ? grid.children.length : 0;
        if (grid && freshGrid) grid.append(...Array.from(freshGrid.children));
        const slot = $('[data-more-slot]', section); const freshSlot = $('[data-more-slot]', doc);
        if (slot && freshSlot) slot.innerHTML = freshSlot.innerHTML; else if (slot) slot.innerHTML = '';
        const first = grid && grid.children[before]; const f = first && $('a, button', first); if (f) f.focus({ preventScroll: false });
        initScope(section);
      } catch (e) { if (label) label.textContent = prev; btn.removeAttribute('aria-busy'); toast(S.networkError); }
    },
  };

  // ================= header: mega menu, search, localization, announcement =================
  const Header = {
    mega: '', megaHover: false,
    openMega(key) {
      if (Header.mega === key) return; Header.closeMega(); Search.close();
      const b = $(`[data-mega-li="${key}"] [data-act="mega"]`); const panel = b && document.getElementById(b.getAttribute('aria-controls'));
      if (!panel) return;
      Header.mega = key; panel.hidden = false; b.setAttribute('aria-expanded', 'true'); b.parentElement.classList.add('is-open');
    },
    closeMega(focus) {
      if (!Header.mega) return; const key = Header.mega; Header.mega = '';
      const b = $(`[data-mega-li="${key}"] [data-act="mega"]`); const panel = b && document.getElementById(b.getAttribute('aria-controls'));
      if (panel) panel.hidden = true;
      if (b) { b.setAttribute('aria-expanded', 'false'); b.parentElement.classList.remove('is-open'); if (focus) b.focus(); }
    },
    // account component (<shopify-account>): its sheet opens right under the nav bar, wherever the sticky header is
    accountOpen(e) {
      const acc = e.target; if (!(acc instanceof HTMLElement) || !acc.matches('shopify-account')) return;
      Header.closeMega(); Search.close();
      const bar = acc.closest('.fc-nav') || acc;
      acc.style.setProperty('--account-dialog-top', `${Math.max(0, Math.round(bar.getBoundingClientRect().bottom))}px`);
    },
  };
  document.addEventListener('open', (e) => Header.accountOpen(e), true); // 'open' is composed but does not bubble
  const Search = {
    open: false, token: 0, active: -1,
    panel: () => $('#ps'),
    sectionId() { const t = $('template[data-ps-empty]'); const s = t && (t.closest('[data-section-id]') || t.closest('.shopify-section')); return s ? (s.dataset.sectionId || s.id.replace('shopify-section-', '')) : ''; },
    tpl(name) { const t = $(`template[data-ps-${name}]`); return t ? t.innerHTML : ''; },
    show() {
      const p = Search.panel(); if (!p) { location.href = R.search; return; }
      Header.closeMega(); Search.open = true; p.hidden = false;
      const b = $('[data-act="search-toggle"]'); if (b) b.setAttribute('aria-expanded', 'true');
      const inp = $('[data-ps-input]', p); if (inp) { if (!inp.value.trim()) Search.body(Search.tpl('empty')); inp.focus(); }
    },
    close(focus) {
      if (!Search.open) return; Search.open = false; const p = Search.panel(); if (p) p.hidden = true;
      const b = $('[data-act="search-toggle"]'); if (b) { b.setAttribute('aria-expanded', 'false'); if (focus) b.focus(); }
    },
    body(html) { const b = $('[data-ps-body]'); if (b) { b.innerHTML = html; initScope(b); } },
    run: debounce(async () => {
      const inp = $('[data-ps-input]'); if (!inp) return; const q = inp.value.trim(); const t = ++Search.token; Search.active = -1; inp.removeAttribute('aria-activedescendant');
      if (!q) { Search.body(Search.tpl('empty')); return; }
      Search.body(Search.tpl('loading'));
      const sid = Search.sectionId();
      const url = `${R.predictiveSearch}?q=${encodeURIComponent(q)}&resources[type]=product,collection,article,page&resources[limit]=${CFG.predictiveLimit || 4}&resources[options][unavailable_products]=last&section_id=${sid}`;
      try {
        const html = await getHTML(url); if (t !== Search.token) return;
        const res = $('[data-ps-results]', parse(html));
        Search.body(res ? res.innerHTML : '');
        const opts = $$('[data-ps-opt]'); if (opts.length) Search.setActive(0);
        const n = res && res.dataset.count != null ? +res.dataset.count : opts.length;
        announce(n ? fmt(S.searchCount, { count: n }) : S.noResults);
      } catch (e) { if (t === Search.token) Search.body(Search.tpl('error')); }
    }, 220),
    setActive(i) {
      const opts = $$('[data-ps-opt]'); const inp = $('[data-ps-input]'); if (!opts.length) return;
      Search.active = (i + opts.length) % opts.length;
      opts.forEach((o, k) => { const on = k === Search.active; o.classList.toggle('opt-active', on); o.setAttribute('aria-selected', String(on)); });
      if (inp) inp.setAttribute('aria-activedescendant', opts[Search.active].id);
    },
  };
  const Announcement = {
    key: 'dl-announce-dismissed',
    init(scope) {
      let dismissed = ''; try { dismissed = sessionStorage.getItem(Announcement.key) || ''; } catch (e) { /* storage blocked */ }
      $$('[data-dismiss-key]', scope).forEach((bar) => { if (dismissed && bar.dataset.dismissKey === dismissed && !(window.Shopify && window.Shopify.designMode)) { const s = bar.closest('.shopify-section') || bar; s.hidden = true; } });
      Announcement.countdown(scope);
      $$('[data-rotate]', scope).forEach((el) => {
        if (el._rot) return; const msgs = $$('[data-msg]', el); if (msgs.length < 2) return;
        const secs = Math.max(3, +el.dataset.rotate || 6); let i = Math.max(0, msgs.findIndex((m) => !m.hidden)); let paused = false;
        msgs.forEach((m, k) => { m.hidden = k !== i; });
        el.addEventListener('mouseenter', () => { paused = true; }); el.addEventListener('mouseleave', () => { paused = false; });
        el.addEventListener('focusin', () => { paused = true; }); el.addEventListener('focusout', () => { paused = false; });
        el._rot = setInterval(() => { if (paused || reduceMotion() || document.hidden) return; msgs[i].hidden = true; i = (i + 1) % msgs.length; msgs[i].hidden = false; }, secs * 1000);
      });
    },
    countdown(scope) {
      $$('[data-countdown]', scope).forEach((el) => {
        if (el._cd) return;
        const tick = () => {
          const [h, m] = String(el.dataset.cutoff || '').split(':').map(Number); if (Number.isNaN(h)) return;
          const off = String(el.dataset.utcOffset || '+0000'); const sign = off[0] === '-' ? -1 : 1;
          const offMin = sign * (parseInt(off.slice(1, 3), 10) * 60 + parseInt(off.slice(3, 5), 10));
          const now = new Date(); const local = (now.getUTCHours() * 60 + now.getUTCMinutes() + offMin + 1440) % 1440;
          const past = local >= h * 60 + (m || 0);
          const suffix = $('[data-countdown-suffix]', el);
          if (suffix) { if (suffix.dataset.before === undefined) suffix.dataset.before = suffix.textContent; suffix.textContent = past && el.dataset.after ? el.dataset.after : suffix.dataset.before; }
        };
        tick(); el._cd = setInterval(tick, 60000);
      });
    },
    dismiss(b) {
      const bar = b.closest('[data-dismiss-key]');
      try { sessionStorage.setItem(Announcement.key, bar ? bar.dataset.dismissKey : '1'); } catch (e) { /* storage blocked */ }
      const s = b.closest('.shopify-section') || b.closest('[data-section]'); if (s) s.hidden = true; announce(S.dismissed);
    },
  };

  // ================= hero slides =================
  const Hero = {
    MS: 6500, STEP: 80,
    init(scope) {
      $$('[data-hs]', scope).forEach((r) => {
        if (r._hs) return;
        r._hs = { i: Math.max(0, $$('.hs-slide', r).findIndex((s) => s.classList.contains('is-on'))), t: 0, paused: reduceMotion() || r.dataset.autoplay === 'false', hover: false, focus: false, ms: +r.dataset.interval || Hero.MS };
        Hero.toggleLabel(r);
        r.addEventListener('mouseover', (e) => { r._hs.hover = !!e.target.closest('.hs-slide, .hs-ctl'); });
        r.addEventListener('mouseleave', () => { r._hs.hover = false; });
        r.addEventListener('focusin', (e) => { r._hs.focus = e.target.matches(':focus-visible'); });
        r.addEventListener('focusout', () => { r._hs.focus = false; });
        let sx = null;
        r.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch' && e.target.closest('.hs-slide')) sx = e.clientX; });
        r.addEventListener('pointerup', (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 48) Hero.go(r, r._hs.i + (dx < 0 ? 1 : -1)); });
        r.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); Hero.go(r, r._hs.i + (e.key === 'ArrowRight' ? 1 : -1)); } });
        Hero.go(r, r._hs.i);
        // the other slides' photos load once the page has (see hero-slides.liquid), so the first slide paints first
        const ready = () => r.classList.add('is-ready');
        if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready, { once: true });
        // track visibility without measuring layout on every tick
        if ('IntersectionObserver' in window) new IntersectionObserver((es) => { r._hs.vis = es[es.length - 1].isIntersecting; }).observe(r);
      });
    },
    go(r, i) {
      const slides = $$('.hs-slide', r); const n = slides.length; if (!n) return;
      i = ((i % n) + n) % n; r._hs.i = i; r._hs.t = 0;
      slides.forEach((s, k) => { const on = k === i; s.classList.toggle('is-on', on); if (on) { s.removeAttribute('aria-hidden'); s.removeAttribute('inert'); } else { s.setAttribute('aria-hidden', 'true'); s.setAttribute('inert', ''); } });
      $$('.hs-bar', r).forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-current', String(k === i)); const f = $('.hs-bar-line i', b) || $('i', b); if (f) f.style.transform = k < i ? 'scaleX(1)' : 'scaleX(0)'; });
    },
    toggle(r) { r._hs.paused = !r._hs.paused; Hero.toggleLabel(r); },
    toggleLabel(r) {
      const b = $('[data-act="hs-toggle"]', r); if (!b) return;
      b.setAttribute('aria-label', r._hs.paused ? S.play : S.pause); b.innerHTML = icon(r._hs.paused ? 'play' : 'pause', 20);
      const track = $('.hs-track', r); if (track) track.setAttribute('aria-live', r._hs.paused ? 'polite' : 'off');
    },
    tick() {
      $$('[data-hs]').forEach((r) => {
        const h = r._hs; if (!h || h.paused || h.hover || h.focus || document.hidden || document.body.classList.contains('ov-lock')) return;
        if (h.vis === false) return;
        if (h.vis === undefined) { const rc = r.getBoundingClientRect(); if (rc.bottom < 0 || rc.top > innerHeight) return; }
        h.t += Hero.STEP; const bar = $$('.hs-bar', r)[h.i]; const f = bar && ($('.hs-bar-line i', bar) || $('i', bar));
        if (f) f.style.transform = `scaleX(${Math.min(1, h.t / h.ms)})`;
        if (h.t >= h.ms) Hero.go(r, h.i + 1);
      });
    },
  };
  setInterval(Hero.tick, Hero.STEP);

  // ================= slider (testimonials) =================
  // [data-slider] region > [data-slider-track] scroll-snap rail of [data-slide] items (swipe and scroll are native).
  // Controls: data-act slider-prev | slider-next | slider-go (data-i) | slider-toggle; arrow keys, Home and End.
  // Dots past the last scroll position hide; [data-slider-controls] hides when everything fits.
  // Autoplay only with data-autoplay="true" (data-interval ms); it waits while the slider is hovered, focused or
  // off screen, and never runs with reduced motion.
  const Slider = {
    STEP: 250,
    init(scope) {
      $$('[data-slider]', scope).forEach((r) => {
        const track = $('[data-slider-track]', r); if (r._sl || !track) return;
        const h = r._sl = { track, i: 0, max: 0, t: 0, paused: reduceMotion() || r.dataset.autoplay !== 'true', hover: false, focus: false, ms: +r.dataset.interval || 6000 };
        let raf = 0;
        track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => Slider.sync(r)); }, { passive: true });
        track.addEventListener('pointerdown', () => { h.t = 0; }, { passive: true });
        r.addEventListener('keydown', (e) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key) || e.target.closest('input, textarea, select, [role="radio"], [role="tab"]')) return;
          e.preventDefault(); Slider.go(r, e.key === 'Home' ? 0 : e.key === 'End' ? h.max : h.i + (e.key === 'ArrowRight' ? 1 : -1));
        });
        r.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') h.hover = true; });
        r.addEventListener('pointerleave', () => { h.hover = false; });
        r.addEventListener('focusin', () => { h.focus = true; });
        r.addEventListener('focusout', (e) => { if (!r.contains(e.relatedTarget)) h.focus = false; });
        if ('ResizeObserver' in window) new ResizeObserver(() => Slider.sync(r)).observe(track);
        if ('IntersectionObserver' in window) new IntersectionObserver((es) => { h.vis = es[es.length - 1].isIntersecting; }).observe(r);
        Slider.sync(r); Slider.label(r);
        if (r.dataset.autoplay === 'true' && !Slider.timer) Slider.timer = setInterval(Slider.tick, Slider.STEP);
      });
    },
    metrics(r) {
      const tr = r._sl.track; const sl = $$('[data-slide]', tr); const n = sl.length;
      const step = (n > 1 && sl[1].offsetLeft - sl[0].offsetLeft) || tr.clientWidth || 1;
      const gap = n > 1 ? step - sl[0].offsetWidth : 0;
      const per = Math.max(1, Math.round((tr.clientWidth + gap) / step));
      return { sl, n, step, max: Math.max(0, n - per), end: Math.max(0, tr.scrollWidth - tr.clientWidth) };
    },
    sync(r) {
      const h = r._sl; const tr = h.track; const m = Slider.metrics(r); h.max = m.max;
      h.i = m.end && tr.scrollLeft >= m.end - 2 ? m.max : Math.min(m.max, Math.round(tr.scrollLeft / m.step));
      $$('[data-act="slider-go"]', r).forEach((d, k) => { const on = k === h.i; d.hidden = k > m.max; d.classList.toggle('on', on); d.setAttribute('aria-current', String(on)); });
      const prev = $('[data-act="slider-prev"]', r); if (prev) prev.setAttribute('aria-disabled', String(h.i <= 0));
      const next = $('[data-act="slider-next"]', r); if (next) next.setAttribute('aria-disabled', String(h.i >= m.max));
      const ctl = $('[data-slider-controls]', r); if (ctl) ctl.hidden = m.max === 0;
    },
    go(r, i) {
      const h = r._sl; const m = Slider.metrics(r); if (!m.n) return;
      i = Math.max(0, Math.min(m.max, i)); h.t = 0;
      h.track.scrollTo({ left: Math.min(m.end, m.sl[i].offsetLeft - m.sl[0].offsetLeft), behavior: reduceMotion() ? 'auto' : 'smooth' });
    },
    toggle(r) { r._sl.paused = !r._sl.paused; r._sl.t = 0; Slider.label(r); },
    label(r) {
      const b = $('[data-act="slider-toggle"]', r); if (!b) return;
      b.setAttribute('aria-label', r._sl.paused ? S.play : S.pause); b.innerHTML = icon(r._sl.paused ? 'play' : 'pause', 20);
    },
    tick() {
      $$('[data-slider]').forEach((r) => {
        const h = r._sl; if (!h || h.paused || h.hover || h.focus || h.vis === false || document.hidden || document.body.classList.contains('ov-lock')) return;
        h.t += Slider.STEP; if (h.t >= h.ms) Slider.go(r, h.i >= h.max ? 0 : h.i + 1);
      });
    },
  };

  // ================= forms (form-error-focus) =================
  const Forms = {
    labelOf(input) { const l = input.id && $(`label[for="${CSS.escape(input.id)}"]`); return (l ? l.textContent : input.getAttribute('aria-label') || input.name || '').trim().replace(/\s*\(optional\)$/i, ''); },
    fieldError(input, msg) {
      const f = input.closest('.fc-field'); input.setAttribute('aria-invalid', 'true'); if (!f) return;
      f.classList.add('is-error');
      let m = $('.fc-field-msg', f);
      if (m && !m.classList.contains('is-error') && f.dataset.hintHtml === undefined) f.dataset.hintHtml = m.outerHTML;
      if (!m) { m = document.createElement('p'); f.appendChild(m); }
      m.id = (input.id || 'f') + 'e'; m.className = 'fc-field-msg is-error'; m.setAttribute('role', 'alert');
      m.innerHTML = icon('warning-circle', 16) + '<span></span>'; m.querySelector('span').textContent = msg;
      input.setAttribute('aria-describedby', m.id);
    },
    clearField(input) {
      if (!input) return; const f = input.closest('.fc-field'); input.removeAttribute('aria-invalid'); if (!f) return;
      f.classList.remove('is-error'); const m = $('.fc-field-msg.is-error', f);
      if (m) { if (f.dataset.hintHtml) m.outerHTML = f.dataset.hintHtml; else m.remove(); }
    },
    summary(form, msg, title = S.formProblem) {
      let s = $('[data-summary]', form);
      if (!msg) { if (s && !s.dataset.server) s.innerHTML = ''; return; }
      if (!s) { s = document.createElement('div'); s.setAttribute('data-summary', ''); form.prepend(s); }
      s.innerHTML = notice({ tone: 'danger', title, text: msg });
    },
    check(input) {
      const v = input.type === 'checkbox' ? (input.checked ? 'on' : '') : String(input.value || '').trim();
      const label = Forms.labelOf(input).toLowerCase();
      if (input.required && !v) return input.dataset.msgRequired || (input.type === 'email' ? S.emailEmpty : fmt(S.required, { label }));
      if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return input.dataset.msgInvalid || S.emailInvalid;
      if (v && input.minLength > 0 && v.length < input.minLength) return input.dataset.msgInvalid || fmt(S.minLength, { count: input.minLength });
      if (v && input.pattern && !new RegExp('^(?:' + input.pattern + ')$').test(v)) return input.dataset.msgInvalid || S.patternInvalid;
      return '';
    },
    validate(form) {
      let first = null; let n = 0;
      $$('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])', form).forEach((el) => {
        if (el.closest('[hidden]') || el.closest('template')) return;
        Forms.clearField(el); const m = Forms.check(el);
        if (m) { Forms.fieldError(el, m); n++; if (!first) first = el; }
      });
      Forms.summary(form, n ? (n === 1 ? S.fixOne : S.fixMany) : '');
      if (first) { first.focus(); announce(n === 1 ? S.problemOne : fmt(S.problemMany, { count: n })); }
      return !first;
    },
    busy(form, on) {
      const b = $('button[type="submit"], [type="submit"]', form); if (!b) return;
      if (on) { form.dataset.busy = '1'; b.dataset.html = b.innerHTML; b.setAttribute('aria-busy', 'true'); b.setAttribute('aria-disabled', 'true'); b.classList.add('is-loading'); if (b.dataset.busyLabel) b.innerHTML = icon('circle-notch', 20, 'spin') + `<span>${esc(b.dataset.busyLabel)}</span>`; }
      else { delete form.dataset.busy; if (b.dataset.html) b.innerHTML = b.dataset.html; b.removeAttribute('aria-busy'); b.removeAttribute('aria-disabled'); b.classList.remove('is-loading'); }
    },
    async ajax(form) {
      Forms.busy(form, true);
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'text/html' } });
        if (/\/challenge/.test(res.url)) { form.dataset.native = '1'; form.submit(); return; }
        if (!res.ok) throw new Error(res.statusText);
        const html = await res.text(); const doc = parse(html);
        const errs = form.id && $(`#${CSS.escape(form.id)} .errors, #${CSS.escape(form.id)} [data-form-errors]`, doc);
        if (errs && errs.textContent.trim()) { Forms.busy(form, false); Forms.summary(form, errs.textContent.trim()); return; }
        const tpl = $('template[data-success]', form);
        const wrap = document.createElement('div'); wrap.innerHTML = tpl ? tpl.innerHTML : notice({ tone: 'success', title: S.copied });
        const panel = form.closest('[data-ov-panel]');
        form.replaceWith(...wrap.childNodes);
        const h = panel && $('h2[id^="ov-title"]', panel); if (h) h.focus();
        const st = panel ? $('[role="status"]', panel) : null; announce(st ? st.textContent.trim() : '');
      } catch (e) { Forms.busy(form, false); Forms.summary(form, S.networkError, S.somethingWrong); }
    },
  };

  // ================= small widgets =================
  const Recent = {
    key: 'dl-viewed',
    list() { try { return JSON.parse(localStorage.getItem(Recent.key) || '[]'); } catch (e) { return []; } },
    push(h) { try { const l = Recent.list().filter((x) => x !== h); l.unshift(h); localStorage.setItem(Recent.key, JSON.stringify(l.slice(0, 12))); } catch (e) { /* storage blocked */ } },
    clear() { try { localStorage.removeItem(Recent.key); } catch (e) { /* storage blocked */ } },
    async init(scope) {
      for (const el of $$('[data-recent]', scope)) {
        if (el._recent) continue; el._recent = true;
        const pdp = PF.byCtx('pdp'); const current = pdp && pdp._pf ? pdp._pf.data.handle : el.dataset.exclude;
        const handles = Recent.list().filter((h) => h !== current).slice(0, +el.dataset.limit || 4);
        const sid = el.dataset.sectionId || sectionIdOf(el);
        const sec = el.closest('.shopify-section');
        if (!handles.length || !sid) continue;
        try {
          const q = handles.map((h) => `handle:${h}`).join(' OR ');
          const html = await getHTML(`${R.search}?q=${encodeURIComponent(q)}&type=product&options[unavailable_products]=last&section_id=${sid}`);
          const fresh = $('[data-recent]', parse(html)); if (!fresh) continue;
          el.innerHTML = fresh.innerHTML;
          const holder = $('[data-product-handle]', el) && $('[data-product-handle]', el).parentElement;
          if (holder) handles.forEach((h) => { const c = $(`[data-product-handle="${h}"]`, holder); if (c) holder.appendChild(c.closest('[data-type]') && c.closest('[data-type]').parentElement === holder ? c.closest('[data-type]') : c); });
          if ($('[data-product-handle]', el)) { el.hidden = false; if (sec) sec.hidden = false; initScope(el); }
        } catch (e) { /* stays hidden */ }
      }
    },
  };

  const Recommendations = {
    init(scope) {
      $$('[data-recommendations][data-url]', scope).forEach((el) => {
        if (el._recs) return; el._recs = true;
        const load = async () => {
          try {
            const html = await getHTML(el.dataset.url);
            const fresh = $('[data-recommendations]', parse(html));
            if (fresh && fresh.innerHTML.trim() && $('.fc-card, [data-product-handle], .dl-rec', fresh)) { el.innerHTML = fresh.innerHTML; el.hidden = false; initScope(el); }
            else { const s = el.closest('.shopify-section'); if (s && !(window.Shopify && window.Shopify.designMode)) s.hidden = true; }
          } catch (e) { /* keep placeholder */ }
        };
        if ('IntersectionObserver' in window) { const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { io.disconnect(); load(); } }, { rootMargin: '600px 0px' }); io.observe(el); } else load();
      });
    },
    filter(btn) {
      const f = btn.dataset.f; const scope = btn.closest('[data-section]') || btn.closest('.shopify-section') || document;
      $$('[data-act="rec-filter"], [data-act="recs"]', scope).forEach((b) => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
      $$('[data-type]', scope).forEach((c) => { c.hidden = !(f === 'all' || c.dataset.type === f || (c.dataset.type || '').split(' ').includes(f)); });
    },
  };

  function previewSwatch(btn) {
    const group = btn.closest('[role="radiogroup"]'); const scope = btn.closest('[data-swatch-scope]') || btn.closest('[data-section]') || btn.closest('.shopify-section') || document;
    $$('[role="radio"]', group).forEach((r) => { const on = r === btn; r.setAttribute('aria-checked', String(on)); r.classList.toggle('is-on', on); r.tabIndex = on ? 0 : -1; });
    const v = btn.dataset.value; const label = btn.dataset.label || (btn.getAttribute('aria-label') || v).replace(/\s*\(.*\)$/, '');
    const cap = group.parentElement && ($('[data-swatch-label]', group.parentElement) || $('[data-swatch-label]', scope)); if (cap) cap.textContent = label;
    if (btn.hasAttribute('data-img')) $$('img[data-swatch-img]', scope).forEach((im) => swapPhoto(im, btn.dataset));
    $$('.fc-engr', scope).forEach((f) => f.style.setProperty('--m', `var(--metal-${handleize(v)})`));
    $$('[data-open="quick-view"]', scope).forEach((b) => { b.dataset.metal = v; });
    const panels = $$('[data-swatch-panel]', scope).filter((p) => !group.dataset.panels || p.dataset.swatchPanelGroup === group.dataset.panels);
    if (panels.some((p) => p.dataset.swatchPanel === v)) panels.forEach((p) => { p.hidden = p.dataset.swatchPanel !== v; });
    if (btn.dataset.href) $$('[data-swatch-link]', scope).forEach((a) => { a.href = btn.dataset.href; });
  }

  // swatch photo: the chosen swatch's data-img / data-srcset / data-sizes / data-alt. An empty data-img shows the
  // frame's drawn placeholder ([data-swatch-fallback]) instead. A [data-swatch-fade] frame fades out, swaps once the
  // new photo is decoded and fades back in (CSS .is-swapping); reduced motion swaps at once.
  function swapPhoto(im, d) {
    const frame = im.closest('[data-swatch-fade]'); const fb = im.parentElement && $('[data-swatch-fallback]', im.parentElement);
    const apply = () => {
      if (d.img && im.getAttribute('src') !== d.img) { if (d.srcset) im.srcset = d.srcset; else im.removeAttribute('srcset'); if (d.sizes) im.sizes = d.sizes; im.src = d.img; }
      if (d.img && d.alt !== undefined) im.alt = d.alt;
      im.hidden = !d.img; if (fb) fb.hidden = !!d.img;
    };
    const same = d.img ? !im.hidden && im.getAttribute('src') === d.img : im.hidden;
    if (!frame || same || reduceMotion()) { apply(); if (frame) frame.classList.remove('is-swapping'); return; }
    const token = (im._swap = (im._swap || 0) + 1);
    frame.classList.add('is-swapping');
    setTimeout(() => {
      if (token !== im._swap) return;
      apply();
      const show = () => { if (token === im._swap) frame.classList.remove('is-swapping'); };
      if (d.img && im.decode) im.decode().then(show, show); else show();
    }, 160);
  }

  function studioInput(input) {
    const sec = input.closest('[data-section]') || input.closest('.shopify-section'); const max = +input.dataset.max || 16;
    const err = engravingError(input.value, max); const shown = err ? '' : input.value;
    const fig = $('[data-engr]', sec);
    if (fig) {
      const t = $('[data-engr-text]', fig); if (t) t.textContent = shown;
      const cap = $('[data-engr-cap]', fig); if (cap) cap.textContent = (shown ? fmt(S.engravingCount, { count: shown.length, max }) : fmt(S.engravingEmpty, { max })) + ' · ' + S.engravingSampleNote;
      const stage = $('.fc-engr-stage', fig); if (stage) stage.setAttribute('aria-label', shown ? fmt(S.engravingPreview, { text: shown }) : S.engravingPreviewEmpty);
    }
    const c = $('[data-studio-count]', sec); if (c) c.textContent = input.value.length + ' / ' + max;
    const f = input.closest('.fc-field'); if (f) f.classList.toggle('is-error', !!err);
    if (err) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    const m = $('[data-studio-msg]', sec);
    if (m) { if (m.dataset.hint === undefined) m.dataset.hint = m.textContent; m.className = 'fc-field-msg' + (err ? ' is-error' : ''); m.textContent = err || m.dataset.hint; if (err) m.setAttribute('role', 'alert'); else m.removeAttribute('role'); }
  }

  function selectTab(tab, focus) {
    const list = tab.closest('[role="tablist"]'); if (!list) return;
    $$('[role="tab"]', list).forEach((t) => {
      const on = t === tab; t.setAttribute('aria-selected', String(on)); t.classList.toggle('is-on', on); t.tabIndex = on ? 0 : -1;
      const p = t.getAttribute('aria-controls') && document.getElementById(t.getAttribute('aria-controls')); if (p) p.hidden = !on;
    });
    if (focus) tab.focus();
  }

  function togglePop(btn, force, { focus = true } = {}) {
    const panel = document.getElementById(btn.getAttribute('aria-controls')); if (!panel) return;
    const open = force != null ? force : btn.getAttribute('aria-expanded') !== 'true';
    if (open) $$('[data-act="pop"][aria-expanded="true"]').forEach((b) => { if (b !== btn) togglePop(b, false); });
    btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open;
    if (open && focus) { const f = focusables(panel)[0]; if (f) setTimeout(() => f.focus({ preventScroll: true }), 0); }
  }

  async function copyCode(btn) {
    const codeEl = $('[data-gc-code]'); const msg = $('[data-gc-msg]'); if (!codeEl) return;
    const code = codeEl.textContent.trim(); const html = btn.innerHTML;
    try {
      await navigator.clipboard.writeText(code);
      if (msg) { msg.className = 'fc-field-msg'; msg.removeAttribute('role'); msg.textContent = S.codeCopied; }
      btn.innerHTML = icon('check') + `<span>${esc(btn.dataset.copiedLabel || S.copied)}</span>`; setTimeout(() => { btn.innerHTML = html; }, 2000);
    } catch (e) {
      const sel = window.getSelection(); const range = document.createRange(); range.selectNodeContents(codeEl); sel.removeAllRanges(); sel.addRange(range);
      if (msg) { msg.className = 'fc-field-msg is-error'; msg.setAttribute('role', 'alert'); msg.innerHTML = icon('warning-circle', 16) + `<span>${esc(S.copyFailed)}</span>`; }
    }
  }

  async function share(btn) {
    const url = btn.dataset.url || location.href; const title = btn.dataset.title || document.title;
    if (btn.hasAttribute('data-native') && navigator.share && isMobile()) { try { await navigator.share({ title, url }); return; } catch (e) { /* cancelled */ } }
    try { await navigator.clipboard.writeText(url); toast(S.linkCopied); } catch (e) { toast(S.copyFromBar); }
  }

  // ================= openers and actions =================
  function openTrigger(el, e) {
    const t = el.dataset.open;
    switch (t) {
      case 'quick-view': e.preventDefault(); openQuickView(el, { metal: el.dataset.metal }); break;
      case 'cart': case 'cart-drawer':
        if (CFG.cartType === 'page' || !ovEl('cart')) { if (el.tagName !== 'A') location.href = R.cart; return; }
        e.preventDefault(); if (OV.stack.some((o) => o.type === 'qv')) closeOv('qv', { restore: false }); openOv('cart', { trigger: el }); break;
      case 'variant-sheet': e.preventDefault(); Sheet.open(el.dataset.mode || 'qv', el, { key: el.dataset.key, url: el.dataset.url }); break;
      case 'search': e.preventDefault(); Search.show(); break;
      case 'zoom': e.preventDefault(); Zoom.open(el); break;
      case 'size-guide': {
        if (!ovEl('size-guide')) return; e.preventDefault(); const o = openOv('size-guide', { trigger: el });
        let tab = el.dataset.tab; if (!tab) { const pdp = PF.byCtx('pdp'); const kind = pdp && pdp._pf && pdp._pf.data.kind; tab = { bracelet: 'bracelets', pendant: 'necklaces', chain: 'necklaces' }[kind] || 'rings'; }
        const tb = o && $(`[role="tab"][data-tab="${tab}"]`, o.el); if (tb) selectTab(tb);
        break;
      }
      case 'pickup': {
        const o0 = ovEl('pickup'); if (!o0) return; e.preventDefault();
        const o = openOv('pickup', { trigger: el });
        const pdp = PF.byCtx('pdp'); const st = pdp && pdp._pf; const r = st && PF.resolve(st);
        const qvRoot = $('[data-ov="qv"] [data-product-form]'); const st2 = !st && qvRoot && qvRoot._pf; const r2 = st2 && PF.resolve(st2);
        const data = (st || st2 || {}).data; const res = r || r2;
        if (o && data) loadPanel(o, res && res.variant ? `${data.url}?variant=${res.variant.id}` : data.url);
        break;
      }
      default: {
        const map = { 'mobile-nav': 'mobile-nav', filters: 'filters', review: 'review', waitlist: 'waitlist', loc: 'loc' };
        const type = map[t] || t; if (!ovEl(type)) return;
        e.preventDefault(); if (type === 'loc') closeTop({ restore: false });
        openOv(type, { trigger: el });
      }
    }
  }

  const ACT = {
    close: () => closeTop(),
    scrim: () => closeTop(),
    'ov-retry': (el, e) => { e.preventDefault(); const o = topOv(); if (o && o.props.url) { loadPanel(o, o.props.url).then((ok) => { if (!ok) return; const root = $('[data-product-form]', o.el); if (root) PF.init(root); }); } },
    // product form
    opt: (el) => { const root = el.closest('[data-product-form]'); if (root) PF.select(root, +el.dataset.opt, el.dataset.value); },
    add: (el, e) => { e.preventDefault(); const root = el.closest('[data-product-form]') || PF.byCtx(el.dataset.ctx || 'pdp'); if (root) PF.add(root); },
    'add-blocked': (el, e) => e.preventDefault(),
    'retry-add': (el, e) => { e.preventDefault(); const root = el.closest('[data-product-form]'); if (root) PF.add(root); },
    'sticky-pick': (el) => {
      if (isMobile() && ovEl('variant')) { Sheet.open('pdp', el); return; }
      const g = $('[data-product-form][data-ctx="pdp"] [data-size-block] [tabindex="0"]'); if (g) { g.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' }); g.focus({ preventScroll: true }); }
    },
    'sheet-done': (el, e) => { e.preventDefault(); Sheet.done(); },
    'pf-qty': (el) => { const inp = $('input[name="quantity"]', el.closest('[data-pf-qty]')); if (!inp) return; const v = Math.min(+inp.max || 99, Math.max(+inp.min || 1, (+inp.value || 1) + +el.dataset.d)); inp.value = v; },
    gal: (el) => { const g = el.closest('[data-gallery]'); if (g) Gallery.go(g, Gallery.index(g) + +el.dataset.dir); },
    'gal-to': (el) => { const g = el.closest('[data-gallery]'); if (g) Gallery.go(g, +el.dataset.i); },
    zoom: (el) => Zoom.open(el),
    'zoom-nav': (el) => Zoom.step(+el.dataset.dir),
    'media-load': (el, e) => { e.preventDefault(); Media.load(el); },
    'pay-blocked': (el, e) => {
      if (!el.classList.contains('is-blocked')) return;
      e.preventDefault(); const root = el.closest('[data-product-form]'); if (!root) return;
      if (root.dataset.ctx === 'fp') { const r = root._pf && PF.resolve(root._pf); openQuickView(el, { metal: r && r.finish ? handleize(r.finish) : '', showNeed: true }); return; }
      PF.add(root);
    },
    'goto-engr': (el, e) => { e.preventDefault(); const t = $('[data-product-form][data-ctx="pdp"] [data-engr-block]'); if (t) { t.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' }); const i = $('[data-engr-input]', t); if (i) i.focus({ preventScroll: true }); } },
    share: (el, e) => { e.preventDefault(); share(el); },
    // cart
    qty: (el, e) => { e.preventDefault(); Cart.qty(el); },
    remove: (el, e) => { e.preventDefault(); Cart.remove(el.dataset.key); },
    undo: () => Cart.restore(),
    'edit-line': (el, e) => { e.preventDefault(); Sheet.open('cart', el, { key: el.dataset.key }); },
    'code-toggle': (el) => {
      const f = document.getElementById(el.getAttribute('aria-controls')) || $('form[data-form="code"]', el.closest('[data-cart-section], [data-ov-panel]') || document);
      if (!f) return; const open = f.hidden; f.hidden = !open;
      const toggles = $$(`[data-act="code-toggle"][aria-controls="${CSS.escape(f.id)}"]`).filter((t) => !f.contains(t));
      toggles.forEach((t) => { t.setAttribute('aria-expanded', String(open)); if (t.hasAttribute('data-hide-when-open')) t.hidden = open; });
      if (open) { const i = $('input', f); if (i) i.focus(); }
      else { const i = $('input', f); if (i) Forms.clearField(i); const t = toggles.find((x) => !x.hidden); if (t) t.focus(); }
    },
    'code-remove': (el, e) => { e.preventDefault(); Cart.removeCode(el.dataset.code); },
    // header
    mega: (el) => { const key = el.closest('[data-mega-li]').dataset.megaLi; if (Header.mega === key && Header.megaHover) { Header.megaHover = false; return; } if (Header.mega === key) Header.closeMega(true); else Header.openMega(key); },
    'search-toggle': (el, e) => { e.preventDefault(); if (Search.open) Search.close(true); else Search.show(); },
    'ps-retry': (el, e) => { e.preventDefault(); Search.run(); },
    'mnav-sub': (el) => ACT.toggle(el),
    country: (el, e) => {
      e.preventDefault(); const form = el.closest('form') || $('form#localization_form, form[action*="localization"]');
      if (!form) return; const inp = $('input[name="country_code"]', form); if (inp) inp.value = el.dataset.code;
      const lang = el.dataset.language && $('input[name="language_code"]', form); if (lang) lang.value = el.dataset.language;
      form.submit();
    },
    'dismiss-announce': (el) => Announcement.dismiss(el),
    // hero
    'hs-go': (el) => { const r = el.closest('[data-hs]'); if (r) Hero.go(r, +el.dataset.i); },
    'hs-prev': (el) => { const r = el.closest('[data-hs]'); if (r) Hero.go(r, r._hs.i - 1); },
    'hs-next': (el) => { const r = el.closest('[data-hs]'); if (r) Hero.go(r, r._hs.i + 1); },
    'hs-toggle': (el) => { const r = el.closest('[data-hs]'); if (r) Hero.toggle(r); },
    'slider-prev': (el) => { const r = el.closest('[data-slider]'); if (r && r._sl) Slider.go(r, r._sl.i - 1); },
    'slider-next': (el) => { const r = el.closest('[data-slider]'); if (r && r._sl) Slider.go(r, r._sl.i + 1); },
    'slider-go': (el) => { const r = el.closest('[data-slider]'); if (r && r._sl) Slider.go(r, +el.dataset.i); },
    'slider-toggle': (el) => { const r = el.closest('[data-slider]'); if (r && r._sl) Slider.toggle(r); },
    // rails, disclosure, tabs
    'rail-prev': (el) => { const s = el.closest('[data-section]') || el.closest('.shopify-section'); const c = s && $('[data-carousel]', s); if (c) c.scrollBy({ left: -c.clientWidth * 0.9, behavior: reduceMotion() ? 'auto' : 'smooth' }); },
    'rail-next': (el) => { const s = el.closest('[data-section]') || el.closest('.shopify-section'); const c = s && $('[data-carousel]', s); if (c) c.scrollBy({ left: c.clientWidth * 0.9, behavior: reduceMotion() ? 'auto' : 'smooth' }); },
    toggle: (el, e) => {
      const id = el.getAttribute('aria-controls') || (el.getAttribute('href') || '').replace(/^#/, '');
      const t = id && document.getElementById(id); if (!t) return;
      if (e && el.tagName === 'A') e.preventDefault();
      const open = t.hidden; t.hidden = !open;
      const sel = ['toggle', 'mnav-sub'].map((a) => `[data-act="${a}"][aria-controls="${CSS.escape(id)}"]`).concat(`[data-act="toggle"][href="#${CSS.escape(id)}"]`).join(', ');
      $$(sel).forEach((b) => { b.setAttribute('aria-expanded', String(open)); if (b.hasAttribute('data-hide-when-open')) b.hidden = open; });
      if (!open && el.hidden) { const vis = $$(`[aria-controls="${CSS.escape(id)}"], [href="#${CSS.escape(id)}"]`).find((b) => !b.hidden && !t.contains(b)); if (vis) vis.focus(); }
      if (open && el.hasAttribute('data-focus-target')) {
        const f = focusables(t)[0];
        if (f) f.focus();
        else { const first = t.firstElementChild || t; if (!first.hasAttribute('tabindex')) first.setAttribute('tabindex', '-1'); first.focus(); }
      }
    },
    pop: (el) => togglePop(el),
    'pop-close': (el) => { const p = el.closest('[id]'); const b = p && $(`[data-act="pop"][aria-controls="${p.id}"]`); if (b) { togglePop(b, false); b.focus(); } },
    more: (el, e) => { e.preventDefault(); Facets.more(el); },
    'facets-clear': (el, e) => {
      const ov = el.closest('.app-ov'); const form = (ov && $('form[data-facets-form]', ov)) || el.closest('form[data-facets-form]');
      if (!form) return; e.preventDefault();
      $$('input', form).forEach((i) => { if (i.type === 'checkbox' || i.type === 'radio') i.checked = false; else if (i.type !== 'hidden' && i.type !== 'submit') i.value = ''; });
      const firstSort = $('input[type="radio"]', form); if (firstSort) firstSort.checked = true;
      Facets.previewCount(form);
    },
    'studio-fill': (el) => {
      const sec = el.closest('[data-section]') || el.closest('.shopify-section'); const inp = sec && $('[data-studio-input]', sec);
      if (!inp) return; inp.value = el.dataset.text || ''; studioInput(inp); inp.focus();
    },
    'rec-filter': (el) => Recommendations.filter(el),
    recs: (el) => Recommendations.filter(el),
    'clear-viewed': (el) => { Recent.clear(); const s = el.closest('.shopify-section') || el.closest('[data-recent]'); if (s) s.hidden = true; },
    'gc-copy': (el) => copyCode(el),
    print: () => window.print(),
  };

  // ================= global events =================
  document.addEventListener('click', (e) => {
    const t = e.target; if (!(t instanceof Element)) return;
    // outside clicks close light popovers
    if (Header.mega && !t.closest('header[data-section="header"], [data-section="header"]')) Header.closeMega();
    if (Search.open && !t.closest('#ps') && !t.closest('[data-act="search-toggle"]')) Search.close();
    $$('[data-act="pop"][aria-expanded="true"]').forEach((b) => { const p = document.getElementById(b.getAttribute('aria-controls')); if (!b.contains(t) && !(p && p.contains(t))) togglePop(b, false); });

    const tab = t.closest('[role="tablist"][data-tabs] [role="tab"]');
    if (tab) { e.preventDefault(); selectTab(tab); return; }
    const sw = t.closest('[data-swatches] [role="radio"]');
    if (sw && !sw.closest('[data-product-form]')) { e.preventDefault(); previewSwatch(sw); return; }
    const op = t.closest('[data-open]');
    if (op && !op.matches('[aria-disabled="true"]')) { openTrigger(op, e); return; }
    const q = t.closest('[data-quick]');
    if (q) { e.preventDefault(); if (q.getAttribute('aria-busy') !== 'true') quickAdd(q); return; }
    const facetLink = t.closest('a[data-facet-link]');
    if (facetLink) { e.preventDefault(); Facets.apply(facetLink.getAttribute('href')); return; }
    const a = t.closest('[data-act]');
    if (a && ACT[a.dataset.act] && !(a.tagName === 'INPUT' && a.type !== 'button')) { ACT[a.dataset.act](a, e); return; }
  });

  function fillProvinces(countrySelect) {
    const form = countrySelect.closest('form'); const prov = form && $('select[name="province"]', form); if (!prov) return;
    const opt = countrySelect.selectedOptions[0]; let list = [];
    try { list = JSON.parse((opt && opt.dataset.provinces) || '[]'); } catch (err) { list = []; }
    prov.innerHTML = list.map(([code, name]) => `<option value="${esc(code)}">${esc(name)}</option>`).join('');
    const field = prov.closest('[data-province-field]') || prov.closest('.fc-field'); if (field) field.hidden = !list.length;
  }
  document.addEventListener('change', (e) => {
    const el = e.target; if (!(el instanceof Element)) return;
    if (el.matches('form[data-form="estimate"] select[name="country"]')) { fillProvinces(el); return; }
    if (el.matches('input[data-act="plan"]')) { const root = el.closest('[data-product-form]'); if (root && root._pf) { root._pf.plan = el.value; root._pf.ui.error = null; PF.render(root); } return; }
    const ff = el.closest('form[data-facets-form]');
    if (ff && !el.matches('[data-no-auto]')) {
      if (ff.hasAttribute('data-facets-deferred')) { Facets.previewCount(ff); return; }
      if (el.type === 'number' || el.inputMode === 'numeric' || el.type === 'text') return;
      Facets.apply(Facets.urlFromForm(ff));
    }
  });

  document.addEventListener('input', (e) => {
    const el = e.target; if (!(el instanceof Element)) return;
    if (el.matches('[data-engr-input]')) { const root = el.closest('[data-product-form]'); if (root && root._pf) { root._pf.engr = el.value; PF.syncEngraving(root); } return; }
    if (el.matches('[data-studio-input]')) { studioInput(el); return; }
    if (el.matches('[data-ps-input]')) { Search.run(); return; }
    if (el.matches('textarea[data-note]')) { Cart.saveNote(el.value); return; }
    if (el.matches('[data-loc-search]')) { Loc.filter(el); return; }
    if (el.getAttribute('aria-invalid') === 'true' && el.closest('form[data-validate]')) Forms.clearField(el);
  });

  // ================= country selector drawer: search =================
  // Matches the start of any word in the country name, the 2-letter country code or the 3-letter currency code.
  const Loc = {
    norm: (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim(),
    filter(input) {
      const ov = input.closest('[data-ov="loc"]'); if (!ov) return;
      const q = Loc.norm(input.value); let n = 0;
      $$('[data-loc-row]', ov).forEach((row) => {
        if (row._q === undefined) { const name = $('.n', row); row._q = ' ' + Loc.norm(name ? name.textContent : row.textContent); }
        const hit = !q || row._q.includes(' ' + q) || (q.length === 2 && row.dataset.code === q) || (q.length === 3 && row.dataset.currency === q);
        row.hidden = !hit; if (hit) n += 1;
      });
      const empty = $('[data-loc-empty]', ov); if (empty) empty.hidden = n > 0;
      clearTimeout(Loc.t);
      if (q) Loc.t = setTimeout(() => announce(n ? (n === 1 ? S.countriesOne : S.countriesOther).replace('__count__', n) : $('[data-loc-empty]', ov).textContent), 500);
    },
    reset(ov) {
      const input = $('[data-loc-search]', ov); if (input && input.value) { input.value = ''; Loc.filter(input); clearTimeout(Loc.t); }
      const bd = $('.bd', ov); if (bd) bd.scrollTop = 0;
    },
  };
  document.addEventListener('dl:open', (e) => { if (e.detail && e.detail.type === 'loc') Loc.reset(e.detail.el); });

  // A label written with [price] shows an amount set in the store's currency in the shopper's currency,
  // rounded to two significant figures (gift finder price bands)
  function localPrices(scope = document) {
    const rate = Number((window.Shopify && Shopify.currency && Shopify.currency.rate) || 1);
    if (!rate || rate === 1) return;
    $$('[data-money-base]', scope).forEach((el) => {
      const units = Number(el.dataset.moneyBase) / 100 * rate; if (!units) return;
      const step = Math.pow(10, Math.max(0, Math.floor(Math.log10(units)) - 1));
      el.textContent = money(Math.round(units / step) * step * 100).replace(/[.,]00(?=\D*$)/, '');
    });
  }

  document.addEventListener('submit', (e) => {
    const form = e.target; if (!(form instanceof HTMLFormElement)) return;
    if (form.dataset.native) return;
    if (form.matches('[data-product-form]')) { e.preventDefault(); PF.add(form); return; }
    if (form.matches('form[data-facets-form]')) {
      e.preventDefault(); const url = Facets.urlFromForm(form);
      if (form.closest('.app-ov')) closeOv(form.closest('.app-ov').dataset.ov);
      Facets.apply(url); $$('[data-act="pop"][aria-expanded="true"]').forEach((b) => togglePop(b, false)); return;
    }
    const kind = form.dataset.form;
    if (kind === 'code') { e.preventDefault(); Cart.applyCode(form); return; }
    if (kind === 'estimate') { e.preventDefault(); Cart.estimate(form); return; }
    if (form.hasAttribute('data-validate')) {
      if (form.dataset.busy) { e.preventDefault(); return; }
      if (e.submitter && e.submitter.hasAttribute('formnovalidate')) return;
      if (!Forms.validate(form)) { e.preventDefault(); return; }
      if (form.hasAttribute('data-form-ajax')) { e.preventDefault(); Forms.ajax(form); return; }
      Forms.busy(form, true);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') trapTab(e);
    if (e.key === 'Escape') {
      if (OV.stack.length) { e.preventDefault(); closeTop(); return; }
      if (Search.open) { Search.close(true); return; }
      if (Header.mega) { Header.closeMega(true); return; }
      const pop = $('[data-act="pop"][aria-expanded="true"]');
      if (pop) { togglePop(pop, false); pop.focus(); }
      return;
    }
    const t = e.target; if (!(t instanceof Element)) return;
    if (e.key === 'Enter' && t.matches('[data-loc-search]')) {
      e.preventDefault(); const ov = t.closest('[data-ov="loc"]');
      const hits = ov ? $$('[data-loc-row]:not([hidden]) [data-act="country"]', ov) : [];
      if (hits.length === 1) hits[0].click(); else if (hits.length) hits[0].focus();
      return;
    }
    const arrows = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    // radio groups (options, swatches, thumbnails, chips): arrows move and select
    if (arrows.includes(e.key) && t.matches('[role="radio"]')) {
      const grp = t.closest('[role="radiogroup"]'); if (!grp) return;
      e.preventDefault(); const items = $$('[role="radio"]', grp).filter((x) => !x.disabled);
      const i = items.indexOf(t); const n = items[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length];
      n.click(); n.focus(); return;
    }
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && t.matches('[role="tablist"][data-tabs] [role="tab"]')) {
      e.preventDefault(); const tabs = $$('[role="tab"]', t.closest('[role="tablist"]')); const i = tabs.indexOf(t);
      selectTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length], true); return;
    }
    if (t.matches('[data-ps-input]')) {
      const opts = $$('[data-ps-opt]');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (opts.length) Search.setActive(Search.active + (e.key === 'ArrowDown' ? 1 : -1)); }
      else if (e.key === 'Enter') {
        e.preventDefault(); const q = t.value.trim();
        const opt = opts[Search.active]; const link = opt && $('a[href]', opt);
        if (link && q) location.href = link.href; else if (q) location.href = `${R.search}?q=${encodeURIComponent(q)}&options[prefix]=last&type=product,article,page`;
      }
    }
  });

  // header hover opens mega menus on desktop
  document.addEventListener('mouseover', (e) => {
    if (!window.matchMedia('(hover: hover) and (min-width: 1069px)').matches) return;
    const t = e.target; if (!(t instanceof Element)) return;
    const li = t.closest('[data-mega-li]'); const hdr = t.closest('header[data-section="header"], [data-section="header"]');
    if (li && $('[data-act="mega"]', li)) { const was = Header.mega; Header.openMega(li.dataset.megaLi); if (was !== li.dataset.megaLi) Header.megaHover = true; }
    else if (!hdr && Header.mega && !t.closest('.dl-mega')) Header.closeMega();
    else if (hdr && Header.mega && !t.closest('.dl-mega') && !t.closest('[data-mega-li]') && t.closest('.fc-nav-brand, .fc-nav-tools, .fc-nav-list a')) Header.closeMega();
  });

  // swipe on gallery plates
  let swipeX = null; let swipeEl = null;
  document.addEventListener('pointerdown', (e) => { const p = e.pointerType === 'touch' && e.target.closest && !e.target.closest('[data-media-live]') && e.target.closest('[data-swipe], .dl-qv-gallery'); if (p) { swipeX = e.clientX; swipeEl = p.closest('[data-gallery]') || p; } });
  document.addEventListener('pointerup', (e) => { if (swipeX == null) return; const dx = e.clientX - swipeX; swipeX = null; if (Math.abs(dx) > 48 && swipeEl) Gallery.go(swipeEl, Gallery.index(swipeEl) + (dx < 0 ? 1 : -1)); swipeEl = null; });

  // accordions: one open at a time
  document.addEventListener('toggle', (e) => {
    const d = e.target; if (!(d instanceof HTMLDetailsElement) || !d.open) return;
    const group = d.closest('[data-acc-single]'); if (!group) return;
    $$('details', group).forEach((x) => { if (x !== d && x.closest('[data-acc-single]') === group) x.open = false; });
  }, true);

  document.addEventListener('dl:cart', () => { if (OV.stack.some((o) => o.type === 'qv')) { /* quick view keeps its own success state */ } });

  // ================= init and theme editor lifecycle (editor-lifecycle) =================
  const LAST_COLLECTION = 'dl-last-collection';
  function lastCollection(scope) {
    try {
      if (document.body.classList.contains('template-collection') && scope === document) sessionStorage.setItem(LAST_COLLECTION, location.pathname);
      const last = sessionStorage.getItem(LAST_COLLECTION);
      if (last) $$('a[data-last-collection]', scope).forEach((a) => { a.href = last; });
    } catch (e) { /* storage blocked */ }
  }
  function initScope(scope = document) {
    lastCollection(scope);
    $$('form[data-form="estimate"] select[name="country"]', scope).forEach((sel) => { if (sel.dataset.default) { const o = $$('option', sel).find((x) => x.value === sel.dataset.default); if (o) sel.value = o.value; } fillProvinces(sel); });
    $$('[data-product-form]', scope).forEach((root) => { if (!root._pf) PF.init(root); });
    Announcement.init(scope); Hero.init(scope); Slider.init(scope); Recommendations.init(scope); Recent.init(scope);
    localPrices(scope);
  }

  function boot() {
    portalOverlays(document);
    initScope(document);
    Sticky.update();
    if (location.hash === '#cart' && ovEl('cart')) openOv('cart');
    if (/[?&](contact_posted|customer_posted)=true/.test(location.search)) {
      const posted = $('[data-review-posted]') || $('[data-form-posted]');
      if (posted) { posted.scrollIntoView({ block: 'center' }); if (!posted.hasAttribute('tabindex')) posted.setAttribute('tabindex', '-1'); posted.focus({ preventScroll: true }); }
    }
  }

  document.addEventListener('shopify:section:load', (e) => { portalOverlays(e.target); initScope(e.target); if (e.target.querySelector('[data-cart-section]')) Cart.get(true).catch(() => {}); });
  document.addEventListener('shopify:section:unload', (e) => {
    const id = (e.detail && e.detail.sectionId) || sectionIdOf(e.target);
    $$(`.app-ov[data-portal-from="${id}"]`).forEach((el) => { const o = OV.stack.find((x) => x.el === el); if (o) closeOv(o.type, { restore: false, immediate: true }); el.remove(); });
  });
  document.addEventListener('shopify:section:select', (e) => {
    const id = (e.detail && e.detail.sectionId) || sectionIdOf(e.target);
    if (e.target.querySelector('template[data-ps-empty]')) { Search.show(); return; }
    const el = e.target.querySelector('.app-ov') || $(`.app-ov[data-portal-from="${id}"]`);
    if (el && el.hidden) { el.classList.add('is-editor-open'); openOv(el.dataset.ov); }
  });
  document.addEventListener('shopify:section:deselect', (e) => {
    const id = (e.detail && e.detail.sectionId) || sectionIdOf(e.target);
    if (e.target.querySelector('template[data-ps-empty]')) { Search.close(); return; }
    const el = e.target.querySelector('.app-ov') || $(`.app-ov[data-portal-from="${id}"]`);
    if (el) { el.classList.remove('is-editor-open'); if (!el.hidden) closeOv(el.dataset.ov, { restore: false }); }
  });
  document.addEventListener('shopify:block:select', (e) => {
    const slide = e.target.closest('.hs-slide'); const r = slide && slide.closest('[data-hs]');
    if (r && r._hs) { Hero.go(r, $$('.hs-slide', r).indexOf(slide)); r._hs.paused = true; Hero.toggleLabel(r); }
    const msg = e.target.closest('[data-msg]'); if (msg) { const box = msg.closest('[data-rotate]'); if (box) $$('[data-msg]', box).forEach((m) => { m.hidden = m !== msg; }); }
    // a selected testimonial scrolls into the slider's view; a selected metal or stone shows its panel and photo
    const sl = e.target.closest('[data-slide]'); const sr = sl && sl.closest('[data-slider]');
    if (sr && sr._sl) { sr._sl.paused = true; Slider.label(sr); Slider.go(sr, $$('[data-slide]', sr._sl.track).indexOf(sl)); }
    const panel = e.target.closest('[data-swatch-panel]'); const ps = panel && panel.closest('[data-section]');
    const sw = ps && $$('[data-swatches] [role="radio"]', ps).find((b) => b.dataset.value === panel.dataset.swatchPanel && (!panel.dataset.swatchPanelGroup || b.closest('[data-swatches]').dataset.panels === panel.dataset.swatchPanelGroup));
    if (sw && !sw.closest('[data-product-form]')) previewSwatch(sw);
  });

  window.Flaire = Object.assign(D, { kernel: { open: openOv, close: closeOv, closeTop, cart: Cart, toast, announce, money, initScope } });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
