# Frequently asked questions

## Setup

### Why does a section look empty on my new store?

Most sections show your store's own products, collections, articles and images. On a new store, or before you choose content in a section's settings, a section shows placeholder images or sample text, or hides itself. Check these:

- **Featured product**, **Engraving studio** (**Sample piece**) and **Featured product** blocks: choose a **Product**.
- **Shop by form** and **Collection tile** blocks: choose a **Collection** for each tile. Collections without an image use their first product's image.
- **Hero slideshow**: choose an **Image** or a **Product** for each art position.
- **From the journal** and **Related articles**: choose a **Blog** and publish at least one article.
- **Complete the set**: related recommendations can take a few days to appear on a new store. Complementary products need to be set in the Shopify Search & Discovery app.
- **Recently viewed**: stays empty until a customer has viewed other products.
- **Reviews**: hidden until a product has a rating or review content from your review app.
- **Delivery and pickup** and the **Pickup row**: hidden until at least one location offers local pickup.
- **Filters and sort**: shows no filters until you set them up in the Shopify Search & Discovery app.
- **Size guide drawer**: a tab appears only when it has a conversion table or a how-to block.

### How do I make my store look like the demo store?

Install the theme and keep the Flaire preset. The layout, colors, fonts and sections match the demo. Images, products and text don't transfer, so add your own products, collections and photos, then choose them in each section. The demo store is at [DEMO_STORE_URL].

### How do I create a different layout for some products or collections?

Create a template. In the theme editor, open the page selector, choose the page type (such as **Products**), and select **Create template**. Change the sections you want, then assign the template to products or collections in your Shopify admin under **Theme template**. See [Product pages](product-pages.md) and [Collection templates](collection-pages.md#collection-templates).

### How do I set up a mega menu?

Create a menu in **Content > Menus** with top-level items (such as Rings) and child links under them (such as Engagement rings and Wedding bands). Then make sure **Mega panels** is on in the **Header** section. For a fully custom panel, add a third level of links: each second-level link becomes a column. See [Mega panels](header-and-footer.md#mega-panels).

## Products

### How do I set up product filters?

Install the free Shopify Search & Discovery app, open **Filters**, and add the filters you want, such as Availability, Price, Product type, Vendor, and options like Finish and Size. Filters appear on collection and search pages. To choose which filters show in the filter bar, and in what style, add **Filter control** blocks to the **Filters and sort** section. See [Set up product filters](collection-pages.md#set-up-product-filters).

### How do I add a size guide?

1. In the theme editor, open **Overlays > Size guide drawer**.
2. Add a **Conversion table** block for each tab you need (**Rings**, **Bracelets** or **Necklaces**), and replace the sample rows with your own measured sizes.
3. Optionally add **How to measure** and **Book a visit** blocks, or choose a **Guide page** with your full sizing advice.
4. Make sure **Size guide link** is on in the **Variant picker** block on your product template.

The link appears on products whose product type or tags include words like ring, band, bracelet, bangle, cuff, necklace, pendant or chain. See [Size guide drawer](product-pages.md#size-guide-drawer).

### How do I show engraving only on some products?

Add the tag `engravable` to those products in your Shopify admin. The engraving field appears only on tagged products. To use a different tag, change **Theme settings > Pricing, stock and fulfilment > Engravable product tag**. If you clear that setting, every product offers engraving. To remove engraving entirely, remove the **Engraving** block from the product template. <!-- verify after merge -->

### Can I charge for engraving?

The theme saves the engraving text with the item but doesn't add a fee. To charge for engraving, use an app that prices line item properties, or create an "Engraving" product that customers add to their bag.

### How do I show different content on each product with metafields?

Many text, image and URL settings in product sections can be connected to a metafield. For example, to show a different badge on each product:

1. In your Shopify admin, go to **Settings > Custom data > Products** and add a metafield definition, such as `custom.badge` (single line text).
2. Fill in the metafield on each product.
3. In the theme editor, open the product template, select the **Badge** block, and select the **Connect dynamic source** icon next to **Text**. Choose your metafield.

Products with an empty metafield show nothing for that setting. Settings that work well with metafields include the **Badge**, **Lead** and **Collapsible row** blocks, **Specifications** rows, **Dimensions** in **On scale**, and the **Description row text** in **Care and details**. For metafields on cards, quick view and menus, see [Product metafields](theme-settings.md#product-metafields). <!-- verify after merge -->

### How do I show finish swatches?

Flaire shows swatches for the Finish option automatically, using its own colors for common metals, such as Yellow Gold, Rose Gold, White Gold and Platinum. For other options or your own colors, open the product in your Shopify admin, edit the option, and set a color or image for each value. Any option whose values have swatches is shown as swatches. <!-- verify after merge -->

### How do I add a video or 3D model to a product?

In your Shopify admin, open the product and add media: upload a video or a .glb 3D model, or select **Add media from URL** and paste a YouTube or Vimeo link. The media appears in the product gallery, in quick view and in the **Featured product** section. <!-- verify after merge -->

### How do I add a review app?

Install a review app that supports theme app blocks. Then, in the theme editor, open a product page, select **Add block** in the **Reviews** section, and choose the app's block. To show stars on product cards, turn on **Theme settings > Reviews and social proof > Rating on cards**. See [Add product reviews](product-pages.md#add-product-reviews).

### How do I recommend products that go together?

Install the Shopify Search & Discovery app, open **Recommendations**, choose a product and add complementary products. Then set **Intent** to **Complementary** in the **Complete the set** section on your product template.

### How do I show Shop Pay Installments?

Turn on Shop Pay and Shop Pay Installments in **Settings > Payments**. The installments message appears in the **Price** block when **Show Shop Pay Installments banner** is on and the price is within the eligible range. Shop Pay Installments is available only in some countries. <!-- verify after merge -->

### Why don't the accelerated checkout buttons appear?

Check that **Show dynamic checkout buttons** is on in the **Buy buttons** block, and that you have turned on at least one accelerated payment method, such as Shop Pay, Apple Pay, Google Pay or PayPal, in **Settings > Payments**. Some wallets only appear on supported devices and browsers, for example Apple Pay in Safari. Buttons don't appear in the theme editor for some payment methods; check your store's preview instead.

### How do I set up local pickup?

In **Settings > Shipping and delivery > Local pickup**, turn on pickup for a location and set its pickup time. Make sure the product is stocked there. The product page then shows where the selected variant can be picked up. See [Local pickup](product-pages.md#local-pickup).

## Appearance

### How do I change fonts?

Open **Theme settings > Typography** and choose a **Heading font**, **Body font** and **Engraving font** from Shopify's font library. Fonts in Shopify's font library are free to use on your store and load from Shopify's servers. Custom font files can't be chosen in theme settings.

### How do I change colors?

Open **Theme settings > Color schemes and preset** and edit a scheme. Every section uses one scheme, which you choose in its **Color scheme** setting. See [Set your color schemes](index.md#set-your-color-schemes). <!-- verify after merge -->

### How do I set up the delivery cut-off message in the announcement bar?

1. In the theme editor, select the **Announcement bar** in the header.
2. Add a **Cut-off time** block.
3. Enter the **Label** (such as "Order by"), the **Cut-off time (HH:MM, shop timezone)** (such as `15:00`), the **Suffix** (such as "for delivery tomorrow") and the **Suffix after the cut-off** (such as "for delivery the day after tomorrow").

The message changes automatically once the time has passed in your store's time zone. It is not a ticking timer and doesn't account for weekends or holidays, so word it to match your real delivery promise.

## Languages and markets

### How do I translate the theme?

1. Add languages in **Settings > Languages**.
2. Translate your content and the theme's text with the free Shopify Translate & Adapt app.
3. Turn on **Theme settings > Localization > Language selector** so customers can switch languages.

To change the theme's default text in your store's main language, such as button labels or messages, go to **Online Store > Themes**, select **...** next to Flaire, and choose **Edit default theme content**.

### How do I sell in more than one currency?

Set up markets and currencies in **Settings > Markets**. Then turn on **Theme settings > Localization > Country / region selector**. Prices are converted automatically. Turn on **Show currency code** if you sell in currencies that share a symbol, such as US and Canadian dollars.

## Updates and support

### How do I update the theme?

When a new version is available, Shopify shows a notice in **Online Store > Themes**. Select **Update** to add a new copy of the theme to your library with your settings and content. Edits you made to theme code are not carried over. Review the new copy and publish it when you are ready. See [Release notes](release-notes.md).

### What does support cover?

Theme bugs and questions about setting up the theme. See [Support](support.md) for what's included and how to contact us.
