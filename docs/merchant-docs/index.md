<!-- progress: COMPLETE 2026-11-03. Files: index, header-and-footer, home-page, product-pages, collection-pages, cart, search, blog-and-articles, pages-and-contact, customer-accounts, password-page, gift-card-page, theme-settings, faq, support, release-notes, listing. Placeholders to fill before publishing: [SUPPORT_FORM_URL], [SUPPORT_EMAIL], [DEMO_STORE_URL], [DOCS_URL], [RELEASE_DATE]. Lines marked 'verify after merge' need checking against the merged theme. -->

# Flaire theme documentation

Flaire is a Shopify theme for fine-jewelry stores. It is built around calm, white space and large product photography, with features that jewelry customers look for before they buy: finish swatches, ring and bracelet size guides, on-scale views, engraving, gift options, and clear delivery and pickup details.

This documentation explains how to set up the theme and what each section and setting does. Setting names are written in **bold**, exactly as they appear in the theme editor.

## Who Flaire is for

Flaire suits stores that sell a focused catalog of considered pieces, such as:

- Fine and demi-fine jewelry: rings, necklaces, earrings and bracelets
- Engagement rings and wedding bands
- Watches and small accessories
- Other small, high-value goods where materials and size matter, such as eyewear or small leather goods

The theme works with any product, but several features (finish swatches, the size guide, engraving and the on-scale view) are designed with jewelry in mind. Each of them can be turned off.

## Pages in this documentation

| Page | What it covers |
|---|---|
| [Header and footer](header-and-footer.md) | Announcement bar, header, menus, mobile menu, footer, country and language selectors |
| [Home page](home-page.md) | Every section you can add to the home page and other pages |
| [Product pages](product-pages.md) | Product blocks, swatches, engraving, media, pickup, installments, recommendations, reviews |
| [Collection pages](collection-pages.md) | Filters, sorting, the product grid, collection templates |
| [Cart](cart.md) | Bag drawer and bag page, notes, discounts, express checkout, subscriptions |
| [Search](search.md) | Predictive search and the search results page |
| [Blog and articles](blog-and-articles.md) | Journal pages, article layout and comments |
| [Pages and contact](pages-and-contact.md) | Standard pages, the contact page and the 404 page |
| [Customer accounts](customer-accounts.md) | The account icon, sign-in and account pages |
| [Password page](password-page.md) | The page visitors see while your store is password protected |
| [Gift card page](gift-card-page.md) | The page your customers see when they receive a gift card |
| [Theme settings reference](theme-settings.md) | Every option under Theme settings |
| [FAQ](faq.md) | Answers to common questions |
| [Support](support.md) | What support includes and how to contact us |
| [Release notes](release-notes.md) | What changed in each version |

## Getting started

### Install the theme

1. In your Shopify admin, go to **Online Store > Themes**.
2. Select **Visit Theme Store**, search for Flaire, and choose **Try theme**. The theme is added to your theme library, unpublished, so you can set it up without changing your live store.
3. In the theme library, find Flaire and select **Customize** to open the theme editor.
4. When you are ready, select **Publish**.

Tip: Before you publish, preview the theme on a phone. In the theme editor, use the device icon at the top of the page to switch between desktop and mobile views.

### Preset

Flaire comes with one preset, also named Flaire. It uses a white canvas, near-black text, light gray bands to separate sections, blue buttons, a translucent header and generous spacing. Everything in the preset can be changed in the theme editor: colors, fonts, spacing and the sections on each page.

### Understand sections, blocks and templates

- A **template** controls the layout of a type of page, such as all product pages or all collection pages. You can create extra templates, for example a product template for engagement rings.
- A **section** is a horizontal band on a page, such as a slideshow or a product grid. You can add, hide, reorder and remove sections on most pages.
- A **block** is a piece of content inside a section, such as a slide, a question or a product detail row.

To change which page you are editing, use the page selector at the top of the theme editor. Changes to a template apply to every page that uses that template.

### Set your color schemes

Flaire uses color schemes so that sections stay consistent. Each section has a **Color scheme** setting, and you choose which scheme it uses.

1. In the theme editor, open **Theme settings** (the paintbrush icon) and then **Color schemes and preset**. <!-- verify after merge: group may be renamed when the Dark preset is removed -->
2. Select a scheme to edit its colors.

The preset includes four schemes:

| Scheme | Used for |
|---|---|
| Scheme 1 | The main light canvas, used by most sections |
| Scheme 2 | An alternate light canvas, used to separate neighboring sections |
| Scheme 3 | An inverse, dark band for one strong moment per page |
| Scheme 4 | The header |

Each scheme has its own **Background**, **Text**, **Muted text**, button colors (**Solid button**, **Secondary button** and their labels, borders and hover colors), **Border**, **Control border**, **Focus ring**, **Link**, and status colors (**Success**, **Caution**, **Danger**). When you change a background, also check the matching text and button label colors so text stays easy to read. A contrast of at least 4.5:1 between body text and its background is recommended.

You can add more schemes with **Add scheme**.

### Choose your fonts

Flaire uses fonts from Shopify's font library, so they load quickly and need no extra setup.

1. Open **Theme settings > Typography**.
2. Choose a **Heading font**, a **Body font** and an **Engraving font**. The preset uses Figtree for headings and body text, and Cormorant Italic for engravings.

The **Engraving font** is used for engraving previews, so a script or italic serif works well. See [Theme settings reference](theme-settings.md#typography) for details.

### Add your logo and favicon

1. Open **Theme settings > Brand and logo**.
2. Under **Logo image**, upload your logo. A .png or .svg with a transparent background works best, in landscape or portrait format. <!-- verify after merge: info text "PNG" changes to ".png" -->
3. Adjust **Logo width** (64 to 220px).
4. If you don't upload a logo, the header and footer show the **Wordmark text** in the heading font. Replace the default text with your store name. If you clear the field, your store name is used.
5. Under **Favicon**, upload a square image. 32 x 32px .png is recommended.

### Set up navigation menus

Menus are created in your Shopify admin under **Content > Menus** (in some admins, **Online Store > Navigation**). Flaire uses them in these places:

| Where | Setting | Default menu |
|---|---|---|
| Header | Header > **Main menu** | Main menu |
| Mobile menu | Overlays > Mobile menu drawer > **Menu** | Choose the same menu as the header, usually Main menu |
| Footer columns | Footer > Link list block > **Menu** | Footer menu <!-- verify after merge --> |
| Footer legal links | Footer > **Legal links menu** | Footer menu <!-- verify after merge --> |
| Account sheet | Theme settings > Customer accounts > **Customer account menu** | Customer account main menu |
| Popular searches | Theme settings > Search > **Popular searches menu** | None |

Menu items with their own child links open a mega panel on desktop. See [Header and footer](header-and-footer.md#mega-panels) for how columns are built.

### Add your social media links

1. Open **Theme settings > Social media**.
2. Paste the full address of each profile, for example `https://instagram.com/yourstore`. Fields you leave empty are not shown.
3. Social media icons appear in the footer when **Social links** is turned on in the Footer section. <!-- verify after merge: checkbox label may change to "Show social media icons" -->

Flaire supports Instagram, Pinterest, TikTok, YouTube and Facebook.

### Replace the placeholder content

A new store shows placeholder images and short sample text in some sections until you add your own products, collections and images. See [Why does a section look empty?](faq.md#why-does-a-section-look-empty-on-my-new-store) for what each section needs.

## Get help

If something doesn't work as described here, see the [FAQ](faq.md) or [contact support](support.md).
