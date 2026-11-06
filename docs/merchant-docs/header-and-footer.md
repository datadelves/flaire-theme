# Header and footer

The header and footer appear on every page. In the theme editor they are in the **Header** and **Footer** groups at the top and bottom of the sidebar. Drawers and pop-up panels, such as the bag drawer and the mobile menu, are in the **Overlays** group below the footer.

## Announcement bar

The announcement bar sits above the header. It can show up to three messages that rotate, a delivery cut-off message and up to two utility links.

| Setting | What it does |
|---|---|
| **Color scheme** | The colors of the bar. |
| **Dismissible** | Shows a close button. A closed bar stays hidden until the visitor's browser session ends. |
| **Rotate every** | How long each message shows before the next one, from 4 to 12 seconds. |
| **Show country selector** | Shows the country selector in the bar. It appears only when your store sells to more than one country. |

Blocks:

- **Message** (up to 3): **Message**, **Link label** and **Link**.
- **Cut-off time** (1): a daily ordering deadline, such as "Order by 3:00 pm for delivery tomorrow." Settings are **Label**, **Cut-off time (HH:MM, shop timezone)**, **Suffix** and **Suffix after the cut-off**. Enter the time in 24-hour format, for example `15:00`. Once that time has passed in your store's time zone, the bar shows the **Suffix after the cut-off** text instead of the **Suffix**. The time zone is set in **Settings > General** in your Shopify admin.
- **Utility link** (up to 2): **Label** and **Link**, shown beside the messages, for example a link to book a ring-sizing visit.

Only promise delivery times that you can keep. The cut-off message is plain text; it doesn't check your carrier, weekends or holidays.

## Header

| Setting | What it does |
|---|---|
| **Logo image** and **Logo width** | A logo for the header only (desktop and phone). If empty, the header uses the logo from **Theme settings > Brand and logo**, then the wordmark text. |
| **Color scheme** | The colors of the header. The preset uses a translucent scheme so the page shows softly behind it. |
| **Main menu** | The menu shown in the header. Defaults to your Main menu. <!-- verify after merge --> |
| **Logo position** | **Left**, or **Center (menu splits around it)**. <!-- verify after merge: "Centre" becomes "Center" --> |
| **Search button** | Shows the search icon, which opens predictive search. |
| **Account link** | Shows the account icon. See [Customer accounts](customer-accounts.md). |
| **Mega panels** | Opens a wide panel under menu items that have child links. Turn off for simple drop-down menus. |
| **Bag count badge** | Shows the number of items in the bag on the bag icon. |

The sticky header is controlled in **Theme settings > Layout and spacing > Sticky header**.

### Mega panels

When **Mega panels** is on, a top-level menu item with child links opens a panel with up to four columns:

1. **Child links**: the item's child links, under the **Child links heading**.
2. **Metals**: links to the item's collection, filtered by each finish listed in **Metals**, under the **Metal column heading**. Enter the values exactly as they appear in your products' Finish option, separated by commas, for example `Yellow Gold, Rose Gold`. The links work when the Finish option filter is turned on in the Shopify Search & Discovery app.
3. **Stones**: links filtered by each stone listed in **Stones**, under the **Stone column heading**. Only stones found in the collection are shown. This column needs a stone metafield, set in **Theme settings > Product cards and quick view > Stone**. <!-- verify after merge -->
4. **Help**: the **Help column heading**, a size guide link (**Size guide link in the Help column**) and any **Utility link** blocks.

If a child link has its own child links (a third level), each of those becomes a column with the child link's name as its heading, and the metal and stone columns are not shown. This lets you build a fully custom mega menu from **Content > Menus**.

**Featured products per panel** (0 to 4) adds product cards to the right of the columns. Use **Mega panel feature** blocks to choose them. Otherwise, the first products of the item's collection are shown.

Header blocks:

- **Mega panel feature** (up to 8): **Parent menu item title** (the exact name of the top-level menu item, such as Rings), **Product** and **Eyebrow** (a short label above the product, such as New).
- **Utility link** (up to 4): **Label**, **Link** and **Icon**, shown in the mega panel's Help column.
- **Mobile drawer promo** (1): **Image**, **Text** and **Link**, shown at the bottom of the mobile menu.
- **Custom Liquid**: **Liquid code** shown next to the header icons, for app snippets or other code. <!-- verify after merge -->
- App blocks from apps you have installed.

## Mobile menu drawer

On phones and small tablets, the menu icon opens the mobile menu drawer. Edit it in **Overlays > Mobile menu drawer**.

| Setting | What it does |
|---|---|
| **Menu** | The menu shown in the drawer. Choose the same menu as the header, usually Main menu. |
| **Account row** | Shows a link to the customer account. |
| **Country selector** | Shows the country and language selectors at the bottom of the drawer. |
| **Close label** | The accessible name of the close button, read by screen readers. |

Blocks: **Featured link** (up to 3; **Label**, **Link**, **Badge**), **Promo tile** (**Image**, **Headline**, **Link**, **Link label**) and **Utility link** (up to 4; **Label**, **Link**, **Icon**).

## Footer

| Setting | What it does |
|---|---|
| **Color scheme** | The colors of the footer. |
| **Country and language** | Shows the country and language selectors. |
| **Payment icons** | Shows icons for the payment methods enabled in your store. |
| **Social links** | Shows icons for the profiles in **Theme settings > Social media**. <!-- verify after merge: label may change to "Show social media icons" --> |
| **Show Follow on Shop** | Shows the Follow on Shop button, so customers can follow your store in the Shop app. Shop Pay must be turned on in your payment settings. |
| **Legal line** | A short line of small print, such as a financing disclaimer. |
| **Legal links menu** | Links shown after the copyright, such as Privacy policy and Terms of service. If no menu is chosen, your store policies are listed. Defaults to your Footer menu. <!-- verify after merge --> |

Blocks:

- **Link list** (up to 4): a column with a **Heading** and a **Menu**. <!-- verify after merge: Menu defaults to Footer menu -->
- **Brand note** (1): a short **Text** about your store, with **Show wordmark** to show your logo text above it.
- **Service promise** (up to 4): an **Icon**, **Title** and **Text**, such as "Free delivery" or "30-day returns." <!-- verify after merge: "Title" becomes "Heading" -->
- **Newsletter** (1): a signup form with a **Heading**, **Button label** and **Success message**. Signups are added to your customer list with email marketing consent.
- **Custom Liquid**: **Liquid code** shown as a footer column. <!-- verify after merge -->
- App blocks from apps you have installed.

## Country, currency and language selectors

The selectors appear when your store sells in more than one country or language.

1. Set up countries and currencies in **Settings > Markets**, and languages in **Settings > Languages**.
2. In the theme editor, open **Theme settings > Localization** and turn on **Country / region selector** and **Language selector**.
3. Choose where they appear: the footer (**Country and language**), the announcement bar (**Show country selector**) and the mobile menu (**Country selector**).

Each of these shows the customer's flag, country and currency. Selecting it opens a **Region and currency** panel from the right, with a search field and every country you sell to. The customer's current country is ticked. Choosing a country reloads the page in that country's currency. The currency next to each country comes from **Settings > Markets**. A country set to sell in your store's currency shows that currency here too.

**Show currency code** adds the currency code to prices, for example $1,250.00 USD. This helps when you sell in several currencies that share a symbol.
