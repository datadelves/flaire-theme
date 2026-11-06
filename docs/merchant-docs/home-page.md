# Home page and content sections

The home page is built from sections that you can add, reorder, hide and remove. All of the sections on this page can also be added to other pages that support sections, such as standard pages, product pages and collection pages.

To add a section, select **Add section** in the theme editor sidebar and choose it from the list.

## Default home page

A new installation of Flaire shows these sections on the home page, in this order: <!-- verify after merge: generic templates may change the default order -->

1. Hero slideshow
2. Shop by form
3. Featured product
4. Materials, plainly
5. Engraving studio
6. Craft in four steps
7. Size and scale
8. Testimonials
9. From the journal
10. Care and questions
11. Gift finder
12. Newsletter

Sections show placeholder images and sample text until you choose your own images, products and collections.

## Settings most sections share

Most content sections start with the same four settings:

| Setting | What it does |
|---|---|
| **Eyebrow** | A short label above the headline, such as "New collection." Leave it empty to hide it. |
| **Headline** | The main heading of the section. |
| **Supporting line** | One sentence under the headline. |
| **Color scheme** | The colors of the section. Alternating Scheme 1 and Scheme 2 keeps neighboring sections distinct. Use Scheme 3 for one strong, dark band per page. |

Many sections also have a **Link label** and **Link** for a quiet text link, and a **Button label** and **Button link** for a button. A link or button with an empty label is hidden.

Every image setting has an **Image alt text** setting or uses the alt text you set on the image in **Content > Files**. Describe the image in a few words for customers who use screen readers. Flaire also uses the focal point you set on an image in **Content > Files**, so the important part of a photo stays visible when the image is cropped.

## Hero slideshow

A full-width slideshow of up to four slides, with product cut-outs arranged on a soft background.

| Setting | What it does |
|---|---|
| **Color scheme** | The default colors of the slideshow. |
| **Autoplay** | Moves to the next slide automatically. Autoplay pauses while a visitor hovers over a slide or moves through it with the keyboard, and doesn't start when the visitor has reduced motion turned on in their device settings. Visitors can also pause it with the pause button. |
| **Advance every** | Seconds per slide, from 4 to 12. |

**Slide** block settings (up to 4):

- **Color scheme** and **Tint** (**None**, **Sand** or **Mist**) for the slide's background.
- **Progress bar label**: a short name shown under the slide's progress bar. If empty, the heading is used.
- **Eyebrow**, **Heading**, **Subheading**, **Button label**, **Button link**, **Link label** and **Link**.
- **Art**: up to three cut-out photos. For each position (center, left and right) choose an **Image**, or a **Product** to use its featured image. **Lay left piece flat** and **Lay right piece flat** rotate the side pieces to lie flat. Photos with a transparent background (.png) look best.
- **Engraving chip**: a few words shown in the engraving font over the art, such as "Always, M."

## Hero tile

A single large tile with a headline, a photo and up to two calls to action. Use it when you want one strong image instead of a slideshow.

| Setting | What it does |
|---|---|
| **Hero image** | The main photo. |
| **Mobile image** | An optional photo for phones. A portrait photo usually works best. |
| **Load with priority** | Loads the image first. Turn this on only when the section is the first one on the page. |
| **Tile height** | **Auto (copy + image)** fits the content. **Tall (min 88vh)** fills most of the screen. |

Blocks: **Eyebrow**, **Fact chips** (up to 3 short facts, such as "18-karat recycled gold", with a **Tone**), **Price line** (shows a **Product**'s price with an optional **Financing note**) and **Secondary image** (a second photo on the **Left** or **Right**).

## Shop by form

Tiles that link to your main collections, such as rings, necklaces, earrings and bracelets.

| Setting | What it does |
|---|---|
| **Columns** | 3 or 4 tiles per row on desktop. |
| **Piece count** | Shows the number of products in each collection. |

Blocks:

- **Form tile** (up to 6): choose a **Collection**. The collection image is used unless you choose an **Image**. **Heading override** replaces the collection name, and **Material line** adds a short line such as "Gold and platinum." <!-- verify after merge: "Title override" becomes "Heading override" -->
- **Feature tile** (up to 2): a tile with an **Eyebrow**, **Headline**, **Link** and **Image** for a service, such as engraving.
- **Text link** (1): **Label**, **Link** and **Align** (**Start** or **End**).

## Featured product

Shows one product with its photos, finish swatches, price and an add-to-bag button, so customers can buy without leaving the page.

| Setting | What it does |
|---|---|
| **Product** | The product to feature. |
| **Layout** | **Stacked (copy over image)** or **Split (copy left, image right)**. |
| **Finish swatches** | Shows the finish options. Choosing a finish changes the photo. |
| **Buy button** | Shows the add-to-bag button. |
| **Finish shown first** | The finish shown when the page loads. |

Blocks:

- **Copy** (1): **Headline override**, **Eyebrow** and **Text**.
- **Price** (1): **Unit price**, **Financing note** with its **Note**, and **Show Shop Pay Installments banner**. <!-- verify after merge -->
- **Actions** (1): **Buy label**, **Learn more label**, **Quick view link** and **Show dynamic checkout buttons**. <!-- verify after merge -->
- **Fact** (up to 3): a short fact with a **Label**, **Detail** and **Tone**.
- **Custom Liquid** and app blocks. <!-- verify after merge -->

Videos and 3D models in the product's media play in this section too.

## Materials, plainly

Explains your metals and stones in plain language, with a short list of facts for each.

| Setting | What it does |
|---|---|
| **Layout** | **Radio swatches + one panel** shows one material at a time. **All materials as columns** shows them side by side. |
| **Macro image** | An optional close-up photo. |

Blocks:

- **Metal** (up to 6): choose a **Metal**, then add **Facts (label \| value per line)**, for example `Purity | 75% gold`, a **Description** and an optional **Panel heading**. <!-- verify after merge: "Panel title" becomes "Panel heading" -->
- **Stone** (up to 6): choose a **Stone**, then add its **Facts (label \| value per line)** and **Description**.
- Metal and stone blocks each have an **Image** and **Image alt text**: choosing that swatch fades the photo to it. A block without an image shows the section's close-up image.
- **Certificate** (up to 2): a **Heading**, **Text** and **Link**, for example to a grading report. <!-- verify after merge -->
- **Care link** (1): **Label** and **Link**.

## Engraving studio

An interactive preview where customers type a few words and see them engraved on a piece. It explains your engraving service and links to engravable products.

| Setting | What it does |
|---|---|
| **Max characters** | The longest engraving allowed, from 4 to 32 characters. Match the limit you set on product pages. |
| **Sample text** | The text shown before the customer types. |
| **Finish shown first** | The finish selected when the page loads. |
| **Engravable collection** | The collection the button links to when **Button link** is empty. |
| **Sample piece** | A product whose finish photos are used in the preview. |

Blocks: **Finish choice** (up to 4 finishes to preview), **Rule** (up to 2 rules, such as "Engraved pieces cannot be returned," with a **Tone** of **Info** or **Caution**) and **Example** (up to 4 example engravings the customer can select).

## Craft in four steps

Tells the story of how your pieces are made, in up to six steps.

- **Layout**: **Horizontal rail** or **Vertical list**.
- **Step** blocks (up to 6): **Number**, **Heading**, **Text**, **Macro image** and **Image alt text**. <!-- verify after merge -->
- **Fact** blocks (up to 4): **Label**, **Detail** and **Link**.
- **Maker note** (1): a **Quote**, **Attribution** and **Portrait**.

## Size and scale

Helps customers check fit before they buy, with real measurements and links to sizing tools.

| Setting | What it does |
|---|---|
| **Scale image** | A photo or drawing that shows the piece at real size. Use a photo at least 1200 px wide so it stays sharp. |
| **Image fit** | **Show the whole image** (default) or **Fill the frame**, which crops the edges. |
| **Size guide tab** | The size guide tab (**Rings**, **Bracelets** or **Necklaces**) that the button opens when **Button link** is empty. |

Blocks: **Measure** (up to 8; **Label**, **Value**, **Detail**), **Tool** (up to 4; **Icon**, **Heading**, **Link**, for example a printable ring sizer) and **Fit note** (up to 2; **Heading**, **Text**, **Tone**). <!-- verify after merge -->

## Testimonials

Shows what customers and the press have said about your pieces. <!-- verify after merge: this section was named "Words from wearers" -->

| Setting | What it does |
|---|---|
| **Show photos** | Shows customer photos on testimonials. |
| **Layout** | **Automatic** shows a slider when there are more than 3 testimonials and a grid otherwise; or choose **Grid** or **Slider**. The slider shows 3 at a time on desktop and one at a time on phones, with arrows, dots and swipe. **Auto-rotate slides** (off by default) and **Change slides every** control autoplay; it adds a pause button. |

Blocks:

- **Testimonial** (up to 6): **Quote**, **Author**, **Location**, **Rating** (1 to 5), **Customer photo** and **Show verified purchase**.
- **Press quote** (up to 3): **Quote**, **Publication** and **Link**.
- **Rating summary** (1): **Label**, **All reviews link**, **Average rating** and **Review count**. If you leave the average and count empty, they are calculated from the testimonials shown.
- App blocks, for example a review carousel from your review app.

Only publish real quotes from real customers, with their permission. Turn on **Show verified purchase** only for customers who bought from you.

## From the journal

Shows recent articles from a blog.

- **Blog**: the blog to show. **Articles**: how many, from 2 to 6.
- **Article** blocks (up to 6) pin specific articles, with an optional **Heading override** and **Excerpt**. <!-- verify after merge -->
- **Topic link** blocks (up to 6) link to article tags or other pages. **Style** is **Secondary** (a button) or **Link**.
- **Feature note** (1): an **Eyebrow**, **Heading** and **Link** for one highlighted guide. <!-- verify after merge -->

## Care and questions

Frequently asked questions in an accordion, with contact options and policy summaries.

| Setting | What it does |
|---|---|
| **Open item (0 = first)** | The question that is open when the page loads. |
| **One open at a time** | Closes the open question when another opens. |

Blocks: **Question** (up to 8; **Question**, **Answer**, **Link**), **Contact card** (up to 3; **Icon**, **Heading**, **Link**) and **Policy** (up to 4; **Heading**, **Text**, **Policy page**). <!-- verify after merge -->

## Gift finder

Helps customers shop for someone else by price, by recipient, or with a gift card.

Blocks:

- **Price band** (up to 5): **Label**, **Link** and **Max price**. Write **[price]** in the label, for example "Under [price]", and the theme shows the Max price in the shopper's currency ("Under €450" for a shopper in Germany). Enter the Max price in your store's currency. When the link goes to a collection, the theme adds a price filter up to the **Max price**. This needs the Price filter turned on in the Shopify Search & Discovery app.
- **Recipient** (up to 4): **Label**, **Link** and **Icon**.
- **Gift card** (1): your **Gift card product**, a **Label** and a **Note**.
- **Delivery note** (up to 2): **Heading**, **Text** and **Icon**. <!-- verify after merge -->

## Newsletter

An email signup form. Signups are added to your customer list in Shopify with email marketing consent.

| Setting | What it does |
|---|---|
| **Button label** | The text on the subscribe button. |
| **Fine print** | Small print under the form, such as "Unsubscribe at any time." |
| **Success text** | The message shown after someone signs up. |

Blocks: **Heading** (**Text** and **Size**), **Email field** (**Label**, **Placeholder**, **Error message**), **Consent line** (**Text**, with **Require checkbox** to add a checkbox the customer must tick) and app blocks.

## Apps

A section for app blocks, such as a review carousel or an Instagram feed from an app.

| Setting | What it does |
|---|---|
| **Container width** | **Narrow 692**, **Content 980** or **Wide 1260** pixels. |
| **Top padding** and **Bottom padding** | Space above and below, from 0 to 160px (default 64px), the same on every screen size. |

Besides app blocks, you can add a **Heading** (**Text**, **Eyebrow**, **Center**), a **Divider** and a **Note**. <!-- verify after merge: "Centre" becomes "Center" -->

## Custom Liquid

Adds your own Liquid, HTML or app snippet code to any page.

| Setting | What it does |
|---|---|
| **Liquid code** | The code to add. |
| **Color scheme** | The colors of the section. |
| **Container width** | **Narrow**, **Standard** or **Wide**. |
| **Top padding** and **Bottom padding** | Space above and below, from 0 to 160px (default 64px), the same on every screen size. |

Custom code isn't covered by theme support. See [Support](support.md).

## Other sections you can add

These sections are mainly used on other templates but can be added anywhere:

- **Page header** and **Contact form**: see [Pages and contact](pages-and-contact.md).
- **Collection hero** and **Collections hero**: see [Collection pages](collection-pages.md).
- **Journal hero** and **Related articles**: see [Blog and articles](blog-and-articles.md).
