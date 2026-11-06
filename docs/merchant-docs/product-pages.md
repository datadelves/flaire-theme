# Product pages

Product pages use the **Default product** template. The main section, **Product (main)**, holds the photos and the buy box. Each part of the buy box is a block that you can reorder, hide or remove. Sections below it add details, sizing, delivery, reviews and recommendations.

To create a different layout for some products, such as engagement rings or gift cards, select **Default product > Create template** in the page selector. Then assign the template to products in your Shopify admin under **Products > [product] > Theme template**.

## Product (main) section

| Setting | What it does |
|---|---|
| **Color scheme** | The colors of the section. |
| **Gallery layout** | **Single image + thumbnails**, or **2-up grid on desktop** to show photos two per row. |
| **Image zoom** | Lets customers open photos full screen and zoom in. |
| **Sticky gallery** | Keeps the photos in view while the customer scrolls the buy box on desktop. |
| **Build detail, side and on-scale views from one photo** | When a finish has only one photo and the product has no other images, the theme crops extra views from that photo. |
| **Sticky buy bar** | Shows a bar with the price and add-to-bag button after the customer scrolls past the buy box. |
| **Breadcrumbs** | Shows the path to the product, such as Home / Rings / Product name. |
| **Share** | Shows share links. You can also add the **Share** block for more control. |

### Product media

The gallery shows every image, video and 3D model you add to the product in your Shopify admin.

- **Images**: photos of different shapes (square, portrait or landscape) can be mixed.
- **Variant images**: when you assign an image to a variant in your Shopify admin, that image is shown when a customer chooses the variant. For example, choosing Rose Gold shows the rose gold photo.
- **Videos**: upload a video file, or add a YouTube or Vimeo link as product media. Videos load only when a customer presses play. <!-- verify after merge -->
- **3D models**: upload a .glb file as product media. Customers can rotate the model and, on supported phones, view it in their space with augmented reality. <!-- verify after merge -->

Videos and 3D models also play in quick view and in the **Featured product** section.

## Buy box blocks

### Badge

A small label above the product name, such as "New" or "Limited edition."

- **Text**: the label. To show a different label on each product, select the **Connect dynamic source** icon next to the setting and choose a product metafield. Products with an empty metafield show no badge.
- **Tone**: **Accent (New)**, **Neutral (Engravable)** or **Inverse (Limited edition)**.

### Title

The product name, never shortened.

- **Size**: **Headline 48** or **Title large 32**.
- **Collection word**: shows the product's vendor above the name.
- **SKU**: shows the selected variant's SKU.

### Lead

A short line under the product name.

- **Text**: to show a line per product, connect a product metafield. If empty, the start of the product description is used.
- **Max words**: from 8 to 30 words.
- **Muted**: shows the line in the muted text color.

### Price

Shows the price of the selected variant. It updates when the customer chooses another option.

| Setting | What it does |
|---|---|
| **Was price** | Shows the compare-at price, crossed out, when the product is on sale. |
| **Unit price** | Shows the unit price, such as $12.50 / 1 g, for products with unit pricing set up in your admin. |
| **Financing note** | Your own line of text about financing, such as "or {amount}/mo for 12 months, with 0% APR." `{amount}` is replaced with the price divided by 12. Only use this if you offer financing on these terms. Leave it empty to hide it. |
| **Show financing from (price)** | The financing note shows only when the price is at or above this amount. |
| **Show Shop Pay Installments banner** | Shows Shopify's installments message, such as "Pay in 4 interest-free installments." It appears only when Shop Pay Installments is available for your store and the price is in the eligible range. <!-- verify after merge --> |
| **Show tax and shipping note** | Says whether prices include tax, and links to your shipping policy when you have one. <!-- verify after merge --> |

### Variant picker

Shows one selector for each product option, such as Finish and Size.

| Setting | What it does |
|---|---|
| **Finish style** | **Round swatches** or **Chips** for the Finish option. |
| **Size style** | **48px chips** or **Select** (a drop-down) for the Size option. |
| **Size guide link** | Shows a link that opens the size guide for rings, bracelets or necklaces. See [Add a size guide](#size-guide-drawer). |
| **Variant sheet on mobile** | On phones, opens options in a sheet from the bottom of the screen. |

**Swatches.** A swatch shows the color or image you set for the option value in your Shopify admin. To set one, open the product, edit the option (for example Color or Finish), and choose a color or image for each value. Options linked to a category metafield, such as Color, get their swatches from the metafield entry. If a value has no swatch, Flaire uses its own metal colors for common finish names, such as Yellow Gold, Rose Gold, White Gold and Platinum. Any option whose values have swatches is shown as swatches. <!-- verify after merge -->

Combinations that are sold out or don't exist are shown as unavailable. The first available variant is selected when the page loads.

### Engraving

A text field where customers add a short engraving. The engraving is saved with the item in the cart and on the order as **Engraving**, so you can see it in your Shopify admin under **Orders**.

| Setting | What it does |
|---|---|
| **Max characters** | The longest engraving allowed, from 4 to 32 characters. |
| **Label** | The label above the field, such as "Engraving (optional)." |
| **Final-sale note** | A note shown under the field, such as "Engraved pieces are final sale." Turn it off for all products in **Theme settings > Pricing, stock and fulfilment > Engraved final sale notice**. |

Customers can use letters, numbers, spaces and the characters . , - &.

The field appears only on products that have the tag set in **Theme settings > Pricing, stock and fulfilment > Engravable product tag** (default: `engravable`). If you clear that setting, every product offers engraving. <!-- verify after merge -->

Engraving is free by default. To charge for it, use an app that adds a fee for line item properties, or create an engraving product and ask customers to add it to their cart.

### Purchase options

Shows subscription or purchase plans (selling plans) when the product has them. Plans are created by a subscription app, such as Shopify Subscriptions.

- **One-time label**: the label for buying without a plan.
- **Plan heading**: the heading above the plans.
- **Savings text**: shows how much the customer saves with a plan.

The block is hidden for products without plans. To hide plans everywhere, turn off **Theme settings > Pricing, stock and fulfilment > Selling plans**.

### Quantity

- **Minimum** and **Maximum**: the range customers can choose.
- **Show stepper**: shows minus and plus buttons. <!-- verify after merge: default changes to on -->

### Buy buttons

| Setting | What it does |
|---|---|
| **Add label** | The text on the add button, such as "Add to Bag." When the variant is sold out, the button is disabled and says Sold out. |
| **Show dynamic checkout buttons** | Shows accelerated checkout buttons, such as Shop Pay, Apple Pay, Google Pay or PayPal, depending on the payment methods your store offers. Turned on by default. <!-- verify after merge: currently "Express checkout" --> |
| **Selection line** | The message shown when the customer needs to choose an option first, such as "Select a size." |

Gift card products show a recipient form above the buttons. See [Gift cards](#gift-card-products).

### Availability

| Setting | What it does |
|---|---|
| **Stock Notice** | Shows a low stock message when inventory is at or below **Theme settings > Pricing, stock and fulfilment > Low stock threshold**. **Show exact count** in the same place shows the number left. <!-- verify after merge: "Stock Notice" may become "Stock notice" --> |
| **Pickup row** | Shows where the selected variant can be picked up. See [Local pickup](#local-pickup). |
| **Delivery line** | A line of text about delivery. |
| **Arrival line** | A second line, for example the expected arrival day. |

The delivery and arrival lines are plain text. Write them to match the delivery you actually offer, and keep them up to date. Leave them empty to hide them.

### Gift note

A short note about gift wrapping or gift messages, with a **Heading**, **Text** and **Show** setting. <!-- verify after merge: "Title" becomes "Heading" -->

### Collapsible row

A row that opens to show more information, such as care instructions or shipping details. You can add up to five.

- **Heading**: the row's label.
- **Source**: **Text** shows the **Body**. **Page** shows the content of the chosen **Page**, which is useful for text you share across many products.
- **Body**: connect a product metafield to show different text per product.

### Share

- **Label**: the text on the share button.
- **Copy link**: adds a button that copies the page address.
- **Native share**: on phones, opens the device's share menu.

### Custom Liquid and app blocks

Add a **Custom Liquid** block to place your own code in the buy box, or an app block from an installed app, such as a size chart, a wishlist or a review stars widget. <!-- verify after merge -->

## Gift card products

When a product is a gift card, the buy box shows a **Send it to a recipient by email** checkbox. When the customer selects it, they can enter: <!-- verify after merge -->

- **Recipient email** (required)
- **Recipient name** (optional)
- **Message** (optional)
- **Send on** (optional): a date up to 90 days from today. If left blank, the gift card is sent right away.

Shopify emails the gift card to the recipient. If the customer leaves the checkbox off, the gift card is emailed to the customer who bought it.

To sell gift cards, create a gift card product in your Shopify admin under **Products > Gift cards**.

## Local pickup

The pickup row shows the first location where the selected variant can be picked up, and a link to check other locations.

To set up local pickup:

1. In your Shopify admin, go to **Settings > Shipping and delivery**.
2. Under **Local pickup**, turn on pickup for each location and set the pickup time message, such as "Usually ready in 24 hours."
3. Make sure the product is stocked at that location.
4. In the theme editor, make sure **Theme settings > Pricing, stock and fulfilment > Pickup availability** and the **Pickup row** setting in the **Availability** block are on.

The row is hidden when no location offers pickup.

### Pickup drawer

The link opens a drawer listing every pickup location. Edit it in **Overlays > Pickup drawer**.

| Setting | What it does |
|---|---|
| **Title** | The drawer heading. <!-- verify after merge: may become "Heading" --> |
| **Address** | Shows each location's address. |
| **Opening hours metafield** | Optional. A location metafield, such as `custom.hours`, shown under each location. |

Blocks: **Location note** (a **Note** and **Booking link** for one **Location name**), **Ready time** (**Label** and **Icon**; **Prefer native time** uses the pickup time from your admin when there is one) and **Help** (**Text**, **Link**, **Link label**).

## Size guide drawer

The size guide opens in a drawer from the product page, quick view, the collection hero, the mega menu and the **Size and scale** section. It has a tab for **Rings**, **Bracelets** and **Necklaces**. Edit it in **Overlays > Size guide drawer**.

The product page opens the matching tab based on the product type or tags. For example, a product with the type Ring or Band opens the Rings tab, Bracelet, Bangle or Cuff opens Bracelets, and Necklace, Pendant or Chain opens Necklaces. Earrings and other products don't show a size guide link. <!-- verify after merge -->

| Setting | What it does |
|---|---|
| **Guide page** | Optional. A page whose content is shown under the tables, for example your full sizing advice. |
| **Default tab** | The tab that opens when no tab is specified. |
| **Title** | The drawer heading. <!-- verify after merge: may become "Heading" --> |

Blocks:

- **Conversion table**: a size table for one **Tab**. Enter **Rows (US \| circumference mm \| diameter mm \| EU)** one per line, for example `7 | 54.4 | 17.3 | 54`. Turn on **Zebra** for striped rows, and add a **Note under the table**.
- **How to measure**: **Steps** and an **Illustration** for one **Tab**.
- **Book a visit**: a **Label**, **Link** and **Note** for an in-person sizing appointment.

A tab appears only when it has at least one table or how-to block. Replace the sample sizes with your own measured sizes before you publish.

## Sections below the buy box

These sections can only be added to product templates.

### Close details

Close-up photos with short captions, such as the setting or the clasp.

- **Use product media**: uses the product's own photos instead of the images chosen in the blocks.
- Blocks: **Detail** (up to 6; **Macro image**, **Heading**, **Text**, **Image alt text**), **Hallmark** (**Heading**, **Text**, **Image**) and **Video** (**Video**, **Poster**, **Caption**). <!-- verify after merge -->

### Specifications

A table of facts about the piece.

| Setting | What it does |
|---|---|
| **Dimensions** | Label and value pairs separated by semicolons, for example `Band width: 2.1 mm; Weight: 2.4 g`. Connect a product metafield for values per product. <!-- verify after merge --> |
| **Certificate link** | Shows a link to a grading report. |
| **Certificate** | The link to the grading report. Connect a product metafield for a report per product. <!-- verify after merge --> |

Blocks:

- **Row** (up to 10): **Label** and **Value**. Connect a product metafield to the value for values per product. Type `{hallmark}` in the value to show 750 or 950 for the selected finish. **Hide if empty** hides the row when the value is empty. **Column** places the row under **Material** or **Stone group**. <!-- verify after merge -->
- **Stone group** (up to 3): a **Heading** and **Rows (label \| value)**, one per line. <!-- verify after merge -->
- **Dimensions** (up to 6): **Label**, **Value** and **Note**.
- **Download** (up to 2): **Label**, **Link** and **Note**, for example a care guide PDF.

### On scale

Shows the piece at real size, on a hand, ear, neck or wrist.

- **Mode**: **Photograph** or **Scale drawing**.
- **On-model image**, **Image alt text** and **Dimensions** (connect a product metafield for values per product). <!-- verify after merge -->
- Blocks: **Scale view** (up to 4; **Body part**, **Image**, **Caption**), **Measurement** (up to 8; **Label**, **Value**, **Note**) and **Fit tip** (up to 2; **Heading**, **Text**, **Tone**). <!-- verify after merge -->

### Care and details

An accordion of product information.

| Setting | What it does |
|---|---|
| **One open at a time** | Closes the open row when another opens. |
| **Description as first row** | Shows the product description as the first row. |
| **Description row title** | The heading of that row, such as "Materials and craft." <!-- verify after merge: may become "Description row heading" --> |
| **Description row text** | Connect a product metafield for text per product. Empty uses the product description. <!-- verify after merge --> |

Blocks: **Tab** (up to 6; **Heading**, **Body**, **Link**), **Metafield tab** (up to 3; **Heading**, **Metafield key** such as `custom.care`, **Open**) and **Policy** (up to 2; **Heading**, **Policy page**, **Use shop policy**). A metafield tab is hidden when the product has no value. <!-- verify after merge -->

### Delivery and pickup

Delivery options, pickup locations and gifting in one place.

- **Pickup stores**: lists the locations where the selected variant can be picked up.
- Blocks: **Delivery** (up to 2; **Icon**, **Heading**, **Text**), **Pickup** (**Heading**, **Fallback text**, **Check another store**) and **Gifting** (**Heading**, **Text**, **Link**). <!-- verify after merge -->

### Reviews

Shows the product rating and reviews from your review app. Flaire doesn't store reviews itself. See [Add product reviews](#add-product-reviews). <!-- verify after merge -->

- **Rating summary** block: the average rating and number of reviews, read from the product's standard rating metafields (`reviews.rating` and `reviews.rating_count`), which most review apps fill in. **Label for screen readers** is read aloud after the number.
- **Custom Liquid** block: paste a review widget snippet from your review app.
- App blocks: add your review app's block, such as a review list.

The section is hidden on products that have no rating and no review content.

### Complete the set

Product recommendations.

| Setting | What it does |
|---|---|
| **Intent** | **Complementary** shows products that go with this one, which you choose in the Shopify Search & Discovery app. **Related** shows similar products, chosen automatically by Shopify. |
| **Products** | How many products to show, from 4 to 10. |
| **Filter chips** | Shows chips that filter the recommendations by product type. |

Blocks: **Filter chip** (up to 6; **Label**, **Product type**, **Default**), **Hand-picked product** (up to 4; **Product**, **Badge**, **Pin to start**) and **Bundle note** (**Heading**, **Text**, **Tone**). <!-- verify after merge -->

To set complementary products, install the free Shopify Search & Discovery app, open **Recommendations**, choose a product and add its complementary products. Automatic related recommendations can take a few days to appear on a new store, because Shopify learns them from orders and product data.

### Recently viewed

Products the customer looked at recently, stored in their browser.

- **Cards**: how many products, from 2 to 8.
- Blocks: **Card options** (**Price**, **Material line**, **Quick view**), **Empty link** (shown before the customer has viewed anything) and **Clear history**.

### Engrave or gift

A closing band that invites customers to engrave the piece or send it as a gift.

- Blocks: **Action** (up to 2; **Label**, **Link**, **Style**), **Example** (up to 2 engraving examples, each with a **Metal**) and **Note** (up to 2).

## Quick view

Quick view opens a product in a drawer from a product card, so customers can choose options and add to the bag without leaving the collection. Turn it on or off in **Theme settings > Product cards and quick view > Quick view**. Edit it in **Overlays > Quick view**.

| Setting | What it does |
|---|---|
| **Desktop presentation** | **Right drawer (560px)** or **Centered dialog (980px)**. <!-- verify after merge: "Centred" becomes "Centered" --> |
| **Short description** | Shows a short description. Set the source in **Theme settings > Product cards and quick view > Short description**. <!-- verify after merge --> |
| **Mini spec list** | Shows a few key facts. |
| **Pickup row** | Shows pickup availability. |
| **Open bag after add** | Opens the bag drawer after the customer adds the product. |
| **Show dynamic checkout buttons** | Shows accelerated checkout buttons. <!-- verify after merge --> |
| **Show Shop Pay Installments banner** | Shows the installments message. <!-- verify after merge --> |
| **Show tax and shipping note** | Says whether prices include tax. <!-- verify after merge --> |

Blocks: **Gallery** (**Max images**, **Dots**, **Zoom link**), **Options** (**Use variant sheet**, **Require size**, **Size guide link**), **Reassurance** (up to 3 short lines with an **Icon**) and app blocks.

## Variant selector sheet

On phones, the variant picker can open a sheet from the bottom of the screen with every option, the engraving field and purchase options. Edit it in **Overlays > Variant selector sheet**.

- Settings: **SKU**, **Engraving**, **Purchase options**, **Confirm label** and **Unavailable message**.
- Blocks: **Option group** (one per option; **Style**, **Option name** and **Size guide link**), **Live summary** (**Price**, **Image**, **Availability**) and **Engraving** (**Max characters**, **Field label**, **Final-sale note**).

The **Option name** must match the option name in your products exactly, for example `Finish` or `Size`.

## Add product reviews

1. Install a review app from the Shopify App Store that supports theme app blocks.
2. In the theme editor, open a product page. In the **Reviews** section, select **Add block** and choose the app's review block.
3. To show star ratings on product cards, turn on **Theme settings > Reviews and social proof > Rating on cards**. Ratings come from the standard product rating metafields, which most review apps fill in automatically.

If your app gives you a code snippet instead of a block, add a **Custom Liquid** block to the **Reviews** section and paste the snippet there.
