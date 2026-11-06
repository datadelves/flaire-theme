# Collection pages

Collection pages use the **Default collection** template. The collections list page (`/collections`) uses the **Collections list** template.

## Collection templates

You can create a separate template for a collection, for example a rings template with a ring-specific size guide and story.

1. In the theme editor, open the page selector and choose **Collections > Default collection > Create template**.
2. Name the template, for example `rings`, and choose **Default collection** as the base.
3. Change the sections you want.
4. In your Shopify admin, open **Products > Collections**, choose the collection, and select the template under **Theme template**.

## Collection hero

The top of the page, with the collection name, description and image.

| Setting | What it does |
|---|---|
| **Collection title** | Shows the collection name. <!-- verify after merge: may become "Collection heading" --> |
| **Description** | Shows the collection description from your admin. |
| **Image** | Shows the collection image from your admin. |
| **Eyebrow** | A short label above the name. |
| **Size guide link** | Shows a link to the size guide. The tab that opens matches the first product's type (rings, necklaces or bracelets). <!-- verify after merge --> |
| **Piece count** | Shows the number of products. |

Blocks: **Fact** (up to 4 short facts, such as "18-karat gold"), **Breadcrumb** (**Home crumb**, **Accessible separator**, **Compact on mobile**) and **Sub-collection link** (up to 8 links to related collections, each with a **Collection**, **Label** and **Current** to mark it as selected).

## Filters and sort

The filter bar above the product grid.

| Setting | What it does |
|---|---|
| **Filtering** | Shows filters. |
| **Sorting** | Shows the sort menu. |
| **Result count** | Shows the number of products that match. |
| **Stick below nav** | Keeps the filter bar under the header while the customer scrolls. |
| **Mobile filters** | **Bottom sheet** opens filters in a sheet on phones. **Inline disclosures** shows them in the page. |

Blocks:

- **Filter control** (up to 4): chooses which filters appear in the bar, and how. **Filter label** must match the filter's name in the Shopify Search & Discovery app exactly, for example `Finish` or `Price`. **Panel style** is **Swatches**, **Checkbox list** or **Price range**. **Counts** shows the number of products for each value. If you add no filter control blocks, every filter you set up in Search & Discovery is shown.
- **Sort control** (1): **Label**, **Default sort** and **Price sorts** (shows price low to high and high to low).
- **Quick filter chip** (up to 4): a one-tap filter. **Filter param** is the filter as it appears in the page address, for example `filter.v.availability=1` for in-stock products. **Default on** applies the chip when the page opens.

### Set up product filters

Filters come from Shopify, so they also work on the search page.

1. Install the free Shopify Search & Discovery app.
2. In the app, open **Filters** and select **Add filter**.
3. Add the filters you want, such as **Availability**, **Price**, **Product type**, **Vendor**, and product options such as **Finish** and **Size**. You can also filter by tags, by product metafields, and by category metafields such as Color.
4. Save. The filters appear on collection and search pages.

Filter values are shown as swatches when the option values have a swatch color or image, or when the value is a common metal or stone name. <!-- verify after merge -->

### Sorting

Customers can sort by **Featured** (your manual order), **Newest**, price and name. **Best selling** is added when you set **Default sort** to **Best selling**. The order a collection opens in is the sort order set on the collection in your Shopify admin.

## Filters drawer

On phones, and on desktop if you turn on **Use on desktop**, filters open in a drawer. Edit it in **Overlays > Filters drawer**.

| Setting | What it does |
|---|---|
| **Use on desktop** | Opens filters in the drawer on desktop too, instead of in the bar. |
| **Apply label** | The button that closes the drawer. Type `[count]` where the number of results should appear, for example `Show [count] results`. |
| **Clear label** | The button that removes every filter. |
| **Value counts** | Shows the number of products for each value. |

Blocks: **Facet group** (**Filter label**, **Style**, **Open by default**), **Price range** (**Label**, **Number fields**, **Slider step**) and **Availability** (**Label**, **In stock label**, **Engravable label**). <!-- verify after merge: "Slider step" may be renamed -->

## Product grid

| Setting | What it does |
|---|---|
| **Products per page** | From 8 to 48. |
| **Pagination** | **Load more** shows a button that adds the next page of products. **Numbered pages** shows page links. |
| **Columns** | 3 or 4 products per row on desktop. The number on phones is set in **Theme settings > Product cards and quick view > Cards per row on phones**. |
| **Empty headline** and **Empty text** | Shown when no products match the filters, or the collection is empty. |
| **Load more label** | The text on the load more button. |

Blocks:

- **Merchandising tile** (up to 4): a promotional tile placed among the products. **Position in grid** sets where it appears, for example 6 for the sixth place. Add an **Eyebrow**, **Headline**, **Caption**, **Image**, **Link label** and **Link**. **Sample engraving** shows an engraving preview on the tile.
- **Empty-state link** (up to 3): links shown when nothing matches, such as "Shop all rings."
- **Card options** (1): **Quick view link**, **Finish dots** (small swatches on each card) and **Rating** (stars from your review app).
- App blocks.

Product cards show the product name, price (with the compare-at price and a Sale badge when on sale), unit price, and the price range when variants have different prices, for example "From $450." Card settings that apply everywhere are in **Theme settings > Product cards and quick view**.

## Other collection sections

These sections can be added to collection templates:

- **Shop by material**: links to the collection filtered by metal or stone. **Layout** is **Pill chips with swatch** or **Tiles with macro image**. Blocks: **Metal link**, **Stone link** and **Guide link**.
- **Collection story**: a short story about the collection with a **Story**, **Detail image**, and blocks for **Paragraph**, **Detail** and **Pull quote**.
- **Collection questions**: an accordion of questions. Blocks: **Question**, **Contact** and **Policy**.
- **Closing tile**: a closing band with a **Button label**, **Image**, and blocks for **Action**, **Note** and **Featured product**.
- **Related collections**: links to other collections, with **Recently viewed** products. Blocks: **Collection**, **Link** and **Recently viewed** (**Count**, **Heading**, **Price**). <!-- verify after merge: "Title" becomes "Heading" -->

## Collections list page

The collections list page shows all your collections.

- **Collections hero**: an **Eyebrow**, **Headline**, **Supporting line** and **Image**, with **Fact**, **Link** and **Note** blocks.
- **Collection grid**:

| Setting | What it does |
|---|---|
| **Sort** | The order of collections when you haven't added collection tiles: **Manual**, **A–Z** or **Most pieces**. |
| **Columns** | 2, 3 or 4 per row on desktop. |
| **Count** | Shows the number of products in each collection. |

Add a **Collection tile** block for each collection you want to show, in the order you want. Each tile uses the collection image, or the first product's image when the collection has none. You can choose a different **Image** and add a **Line**. If you add no collection tiles, all collections are shown, 24 per page, in the order set by **Sort**. **Feature tile** and **Link** blocks add a promotion and a "Shop all" link.
