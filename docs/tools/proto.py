"""Print one element of a Delicate prototype page as cleaned HTML.

Usage (run with python -I):
  python -I docs/tools/proto.py <page> <needle> [--max N] [--raw] [--nth K]

  <page>    file in ../delicate-round11-full-package/prototypes/pages, e.g. product.html or ss-account-main.html
  <needle>  attribute text that identifies the element, e.g. 'data-section="main-product"' or 'class="fc-card '
            The element whose start tag contains the needle is printed in full (balanced tags).
  --max N   truncate output to N characters (default 20000)
  --raw     keep inline SVG icons, images and the prototype-only data-* attributes
  --nth K   use the K-th match (1-based, default 1)

Cleaning replaces Phosphor icon SVGs with <ICON name size/> (render them with snippets/icon.liquid),
images with <IMG alt=".."/>, and drops prototype-only attributes (data-locale, data-shopify*, data-ut-role,
data-static-attr, data-repeat, data-component). data-locale keys are kept as a trailing comment when
--raw is not given, so you can see which copy is merchant text.
"""
import os
import re
import sys

PAGES = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'delicate-round11-full-package', 'prototypes', 'pages')
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}


def element_at(html, start):
    """Return the balanced element starting at index `start` (which points at '<')."""
    tag_re = re.compile(r'<(/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(/?)>', re.S)
    depth = 0
    pos = start
    root = None
    while True:
        m = tag_re.search(html, pos)
        if not m:
            return html[start:]
        closing, name, _, selfclose = m.group(1), m.group(2).lower(), m.group(3), m.group(4)
        if root is None:
            root = name
            if name in VOID or selfclose:
                return html[start:m.end()]
        if name == 'svg' and not closing and root != 'svg':
            end = html.find('</svg>', m.end())
            pos = end + 6
            continue
        if name in VOID or selfclose:
            pos = m.end()
            continue
        if closing:
            depth -= 1
        else:
            depth += 1
        pos = m.end()
        if depth == 0:
            return html[start:pos]


ICON_SNIPPET = os.path.join(os.path.dirname(__file__), '..', '..', 'snippets', 'icon.liquid')
ICON_BY_PATH = {}
try:
    for name, body in re.findall(r"when '([a-z0-9-]+)' -%\}(.*?)(?=\{%-)", open(ICON_SNIPPET, encoding='utf-8').read(), re.S):
        d = re.search(r'd="([^"]{0,60})', body)
        if d:
            ICON_BY_PATH[d.group(1)] = name
except OSError:
    pass


def icon_name(svg):
    d = re.search(r'd="([^"]{0,60})', svg)
    return ICON_BY_PATH.get(d.group(1), '?') if d else '?'


def clean(h):
    h = re.sub(r'<svg class="dl-icon ?([^"]*)" width="(\d+)"[^>]*>.*?</svg>',
               lambda m: '<ICON %s size=%s%s/>' % (icon_name(m.group(0)), m.group(2), (' class=' + m.group(1).strip()) if m.group(1).strip() else ''), h, flags=re.S)
    h = re.sub(r'<img [^>]*?alt="([^"]*)"[^>]*>', lambda m: '<IMG alt="%s"/>' % m.group(1), h)
    h = re.sub(r'<img [^>]*>', '<IMG/>', h)
    h = re.sub(r' data-(locale|static-attr|shopify-attrs?|shopify-field|shopify|ut-role|locale-attr|repeat|repeat-clone|component|static)="[^"]*"', '', h)
    h = re.sub(r' data-(locale|static|placeholder)(?==|\s|>)', '', h)
    return h


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print(__doc__)
        sys.exit(1)
    page, needle = args[0], args[1]
    mx = 20000
    raw = '--raw' in args
    nth = 1
    if '--max' in args:
        mx = int(args[args.index('--max') + 1])
    if '--nth' in args:
        nth = int(args[args.index('--nth') + 1])
    path = page if os.path.exists(page) else os.path.join(PAGES, page)
    html = open(path, encoding='utf-8').read()
    idx = -1
    for _ in range(nth):
        idx = html.find(needle, idx + 1)
        if idx < 0:
            print('needle not found:', needle)
            sys.exit(2)
    start = html.rfind('<', 0, idx)
    el = element_at(html, start)
    if not raw:
        el = clean(el)
    sys.stdout.reconfigure(encoding='utf-8')
    print(el[:mx])
    if len(el) > mx:
        print('\n... [%d more chars]' % (len(el) - mx))


if __name__ == '__main__':
    main()
