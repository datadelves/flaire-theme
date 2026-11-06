# Theme settings reference

Theme settings apply to the whole store. To open them, select the paintbrush icon in the theme editor sidebar.

## Brand and logo

| Setting | What it does |
|---|---|
| **Logo image** | Your logo, shown on the password and gift card pages, in the footer, and in the header unless the header section has its own **Logo image**. A .png or .svg with a transparent background works best. Landscape and portrait logos both work. <!-- verify after merge: info text "PNG" becomes ".png" --> |
| **Logo width** | The logo's width, from 64 to 220px. |
| **Favicon** | The small icon in the browser tab. Use a square image. 32 x 32px .png recommended. |
| **Wordmark text** | Shown in the heading font when there's no logo image. If empty, your store name is used. |

## Colors

The color settings are in **Color schemes and preset**. See [Set your color schemes](index.md#set-your-color-schemes). <!-- verify after merge: group name and the "Theme preset" setting may change when the Dark preset is removed -->

Each scheme has these colors:

| Color | Used for |
|---|---|
| **Background** and **Background gradient** | The section background. A gradient replaces the solid color when set. |
| **Text** and **Muted text** | Headings and body text, and secondary text such as captions. |
| **Solid button**, **Solid button hover**, **Solid button label**, **Solid button border** | The main button, such as Add to Bag. |
| **Secondary button**, **Secondary button hover**, **Secondary button label**, **Secondary button label hover**, **Secondary button border** | Secondary buttons. |
| **Outline button label** and **Outline button border** | Outline buttons. |
| **Border** and **Control border** | Lines between content, and the borders of fields and swatches. |
| **Focus ring** | The outline shown around buttons and links when customers use a keyboard. Keep it clearly visible. |
| **Shadow** | Shadows on drawers and pop-ups. |
| **Link** | Text links. |
| **Success**, **Caution**, **Danger** | Messages, such as "Added," low stock and form errors. |
| **Disabled text** and **Panel and disabled background** | Sold-out options and unavailable buttons, and panel backgrounds. |
| **Scrim** | The dark layer behind open drawers. |

## Typography

All fonts come from Shopify's font library. Bold and italic styles are loaded automatically when the font has them.

| Setting | What it does |
|---|---|
| **Heading font** | Used for headings, product names and prices. Default: Figtree. |
| **Body font** | Used for body text, buttons, labels and forms. Default: Figtree. |
| **Engraving font** | Used for engraving previews and sample engravings. Default: Cormorant Italic. |

## Layout and spacing

| Setting | What it does |
|---|---|
| **Section spacing** | The space between sections. **Standard (120 / 80 / 64 px)** or **Compact (80 / 64 / 48 px)**, for desktop, tablet and phone. Each section also has **Top padding** and **Bottom padding** (0 to 160px) under **Section padding**; sections that use the section spacing scale those values down on tablets and phones and with **Compact**. |
| **Wide content width** | The widest that page content gets on large screens: **1100 px**, **1260 px (content-wide)** or **1440 px**. |
| **Sticky header** | Keeps the header at the top of the screen while customers scroll. |

## Cart and bag

See [Cart](cart.md#cart-and-bag-settings).

## Product cards and quick view

| Setting | What it does |
|---|---|
| **Quick view** | Lets customers open a product in a drawer from a product card. |
| **Add to Bag on cards** | **Single variant adds; others open quick view** adds products with one variant straight to the bag and opens quick view for the others. **Always open quick view** always opens quick view. **Hide add action** removes the add button from cards. |
| **Material line** | Shows a short material line under the product name, such as "Yellow Gold, Rose Gold." |
| **Badge** | Shows badges, such as Sale or New, on cards. |
| **Show New on recently added products** | Shows a New badge on products added within the number of days below, when the product has no badge of its own. |
| **Days a product counts as new** | How long the New badge shows. |
| **Card lift on hover** | Raises the card slightly when the pointer is over it. |
| **Cards per row on phones** | **1** or **2 (default)**. |

### Product metafields

Optional. Show your own product metafields on cards, in quick view and in menus. Enter each one as `namespace.key`, for example `custom.material`. Create metafields in your Shopify admin under **Settings > Custom data > Products**. <!-- verify after merge: this group is new -->

| Setting | What it does |
|---|---|
| **Material line** | A single line text metafield for the card's material line. If empty, the first finish names are shown. |
| **Badge** | A single line text metafield for a badge, such as "Limited edition." If empty, only the Sale and New badges are shown. |
| **Short description** | Shown in quick view and the featured product section. If empty, the start of the description is used. |
| **Stone** | Shown in quick view details and as stone links in the mega menu. If empty, they are hidden. |
| **Stone weight in carats** | Shown with the stone, for example "Diamond, 0.50 carat." |

## Pricing, stock and fulfilment

| Setting | What it does |
|---|---|
| **Sale and compare-at price** | Shows the compare-at price, crossed out, and a Sale badge when a product is on sale. |
| **Unit price** | Shows unit prices on cards, product pages and in the bag. |
| **Low stock threshold** | The stock level at or below which a low stock message appears, from 1 to 20. |
| **Show exact count** | Shows the number left, such as "Only 3 left," instead of a general message. Inventory must be tracked for the product. |
| **Pickup availability** | Shows local pickup availability. See [Local pickup](product-pages.md#local-pickup). |
| **Selling plans** | Shows subscription and purchase plans. |
| **Engraved final sale notice** | Shows a final sale note with the engraving field. |
| **Engravable product tag** | Engraving is offered on products with this tag. If empty, every product offers engraving. Default: `engravable`. <!-- verify after merge --> |

## Reviews and social proof

Flaire shows reviews from your review app. See [Add product reviews](product-pages.md#add-product-reviews). <!-- verify after merge: "Reviews source" setting is removed -->

| Setting | What it does |
|---|---|
| **Review photos** | Shows customer photos on testimonial cards. |
| **Rating on cards** | Shows star ratings on product cards, from your review app's rating metafields. |

## Search

See [Predictive search](search.md#predictive-search).

## Customer accounts

| Setting | What it does |
|---|---|
| **Customer account menu** | The links in the account sheet that opens from the header's account icon. |

## Localization

| Setting | What it does |
|---|---|
| **Country / region selector** | Shows the country selector, when your store sells to more than one country. |
| **Language selector** | Shows the language selector, when your store has more than one language. |
| **Show currency code** | Adds the currency code after prices, such as USD. |

## Social media

Enter the full address of your profiles: **Instagram**, **Pinterest**, **TikTok**, **YouTube** and **Facebook**. Empty fields are not shown.

## Footer payment

| Setting | What it does |
|---|---|
| **Payment icons** | Shows icons for the payment methods enabled in your store. The Footer section also needs **Payment icons** turned on. |

## Motion

| Setting | What it does |
|---|---|
| **Interface motion** | Turns animations on, such as drawers sliding in and sections fading in. Animations are always reduced for customers who have turned on reduced motion in their device settings. |

## SEO

| Setting | What it does |
|---|---|
| **Structured data** | Adds product, store and site search information that search engines use for rich results, such as a product's price and availability in Google search. |
| **Default social image alt** | The alt text for the image used when a page is shared on social media, when the image has none of its own. |

Set the page title, meta description and social sharing image for your store in **Online Store > Preferences**, and for each product, collection, page and article in its **Search engine listing** section.

## Performance

| Setting | What it does |
|---|---|
| **Largest image width** | The largest image size the theme requests, from 1200 to 3200px. <!-- verify after merge: setting has no effect in the current code --> |
| **Preload first image** | Loads the first large image on each page sooner. <!-- verify after merge: setting has no effect in the current code --> |

## Theme style and custom code

To add your own CSS or code, use the **Custom Liquid** section or block, or **Custom CSS** in a section's settings. Edits to theme code files are not covered by support and may be lost when you update the theme. <!-- verify after merge -->
