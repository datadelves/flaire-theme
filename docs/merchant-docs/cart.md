# Cart

Flaire calls the cart the "Bag." Customers can review their bag in a drawer that slides in from the side, or on a full bag page.

## Choose the drawer or the page

Open **Theme settings > Cart and bag** and choose a **Cart type**:

- **Bag drawer**: adding a product opens a drawer, so the customer stays on the page. The bag page is still available at `/cart`.
- **Bag page**: the bag icon in the header opens the bag page instead of the drawer. Adding a product shows a confirmation on the button and updates the bag count, so the customer can keep browsing.

**Open bag after add** opens the drawer after a customer adds a product. Turn it off to show only a confirmation on the button and an updated bag count.

## Cart and bag settings

These settings in **Theme settings > Cart and bag** apply to both the drawer and the page:

| Setting | What it does |
|---|---|
| **Delivery line** | A short delivery message in the summary, such as "Free overnight." Write a message that matches your shipping rates, or leave it empty to hide it. |
| **Show gift wrap notice** | Shows a gift wrap message. |
| **Gift notice text** | The text of the gift wrap message, such as "Gift wrap is free. Add a note at checkout." <!-- verify after merge: default text "check out" becomes "checkout" --> |
| **Order note field** | Lets customers add a note to their order, such as a gift message. The note appears on the order in your Shopify admin. |
| **Discount code field** | Lets customers enter a discount code in the bag. |
| **Shipping estimate** | Lets customers estimate shipping rates by entering their country, region and postal code. Rates come from your shipping settings. |

## Bag drawer

Edit the drawer in **Overlays > Bag drawer**. To see it in the theme editor, add a product to the bag in the preview, or select the drawer in the sidebar.

| Setting | What it does |
|---|---|
| **Recommendations** | Shows two products under the bag items. |
| **Discount field** | Shows the discount code field in the drawer. |
| **Gift notice** | Shows the gift wrap message in the drawer. |
| **Empty headline** and **Empty text** | Shown when the bag is empty. |
| **Empty-state collection link** | The collection the empty bag links to. |
| **Often worn together: products** | The products to recommend. Two are shown, skipping products already in the bag. |
| **Often worn together: collection** | Used when no products are picked. If empty, products from your all-products collection are used. |
| **Show accelerated checkout buttons** | Shows Shop Pay, Apple Pay, PayPal and other wallets enabled in your payment settings, under the checkout button. <!-- verify after merge --> |

Blocks:

- **Line details** (1): **Material line**, **Engraving line**, **Delivery line** and **Delivery text** under each item.
- **Summary row**: a row in the summary. **Row** is **Subtotal**, **Delivery** or **Taxes note**, with a **Label** and an optional **Value override**.
- **Trust note** (up to 2): a short reassurance, such as "30-day returns," with an **Icon** and **Link**.

## Bag page

The bag page has two main sections, **Bag lines** and **Bag summary**, followed by **Bag recommendations**.

### Bag lines

| Setting | What it does |
|---|---|
| **Headline** | The page heading, such as "Your Bag." |
| **Collection word** | Shows the product vendor above each item name. |
| **Empty headline** and **Empty text** | Shown when the bag is empty. |
| **Edit engraving link** | Lets customers change an engraving from the bag. |

Blocks:

- **Line details** (1): **Material and size**, **Engraving text**, **Delivery sentence** and **Delivery text**.
- **Plan line** (1): for subscription items, **Show plan name** shows the selling plan under the item, with a **Prefix**. **Allow change** lets customers switch plans in the bag.
- **Empty action** (up to 2): buttons for an empty bag. **Use last collection** links to the last collection the customer viewed.

Each item shows its image, name, options (such as Finish: Rose Gold and Size: 6), price, unit price, any discounts and a quantity selector. Changing a quantity updates every line and the totals.

### Bag summary

| Setting | What it does |
|---|---|
| **Order note** | Shows the order note field. |
| **Discount field** | Shows the discount code field. |
| **Shipping estimate** | Shows the shipping estimate. |
| **Checkout button label** | The text on the checkout button. <!-- verify after merge: currently "Check out label" --> |
| **Show accelerated checkout buttons** | Shows Shop Pay, Apple Pay, PayPal and other wallets enabled in your payment settings. Turned on by default. <!-- verify after merge --> |
| **Terms line** | Small print shown after the taxes and shipping note. <!-- verify after merge --> |

The summary always shows whether taxes are included in your prices, based on your tax settings. <!-- verify after merge -->

Blocks: **Summary row** (**Subtotal**, **Delivery** or **Total**), **Gift notice**, **Trust row** (up to 3), **Custom Liquid** and app blocks. <!-- verify after merge: Custom Liquid block -->

### Bag recommendations

| Setting | What it does |
|---|---|
| **Headline** and **Headline when the Bag is empty** | The section heading, with a different heading for an empty bag. |
| **Manual collection** | Shows products from this collection instead of automatic recommendations. |
| **Products** | How many products to show, from 3 to 8. |

Blocks: **Pinned product** (up to 4 products shown first), **Card options** (**Quick view**, **Material**, **Price**) and **Note**.

## Discounts

- **Automatic discounts** appear on the item they apply to and in the summary, with the amount saved.
- **Discount codes** can be entered in the bag when the **Discount code field** is on, or at checkout. Applied codes are listed with a **Remove** link.
- Order-level discounts, such as 10% off the order, are shown in the summary above the total.

Create discounts in your Shopify admin under **Discounts**.

## Express checkout

Accelerated checkout buttons let customers pay with a saved wallet in one step. The buttons show the payment methods you have turned on in **Settings > Payments**, such as Shop Pay, Apple Pay, Google Pay and PayPal. Their colors are set by each payment provider and can't be changed by the theme.

You can show them on product pages (**Buy buttons** block), in quick view, in the featured product section, in the bag drawer and on the bag page.

## Subscriptions

If you sell subscriptions with an app such as Shopify Subscriptions, customers choose a plan on the product page in the **Purchase options** block. The bag shows the plan name under the item, and the price reflects the plan's discount.

## Cart notes

Turn on **Theme settings > Cart and bag > Order note field**, and **Order note** in the **Bag summary** section. The note is saved with the order and shown in your Shopify admin and on the packing slip, if your packing slip template includes it.
