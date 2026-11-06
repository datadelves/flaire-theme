# Search

Flaire has two kinds of search: predictive search, which shows results while the customer types, and the search results page.

## Predictive search

The search icon in the header opens a search panel. As the customer types, it shows matching products, collections, articles and pages.

Turn it on or off in **Theme settings > Search**:

| Setting | What it does |
|---|---|
| **Predictive search** | Shows results while the customer types. When off, the search field takes the customer straight to the search results page. |
| **Predictive results** | How many products to show, from 2 to 10. |
| **Popular searches menu** | A menu of suggested searches, shown before the customer types. |

Edit the panel in **Overlays > Predictive search**:

| Setting | What it does |
|---|---|
| **Product results** | How many products to show, from 2 to 10. |
| **Collections**, **Articles**, **Pages** | Shows each type of result. |
| **Prices** | Shows product prices. |
| **No results text** | Shown when nothing matches. `{terms}` is replaced with what the customer typed. |

Blocks:

- **Popular searches** (1): suggestions shown before the customer types. Choose a **Menu**, or enter **Search terms (used when no menu is chosen)**, one per line as `label | search query`, for example `Rose gold | rose gold`. **Max links** limits how many appear.
- **Featured product** (1): one product shown before the customer types, with an **Eyebrow** and **Price**.
- **Help link** (up to 3): a **Label**, **Link** and **Icon**. **Opens the size guide on** turns the link into a size guide shortcut for **Rings**, **Bracelets** or **Necklaces**. Choose **Nothing (plain link)** to use the **Link** instead.

## Search results page

The search results page uses the **Search** template.

### Search results section

| Setting | What it does |
|---|---|
| **Headline** | The page heading. |
| **Per page** | Products per page, from 8 to 48. |
| **Type tabs** | Shows tabs to switch between products, articles and pages. |
| **No-results headline** and **No-results text** | Shown when nothing matches. |

Blocks:

- **Popular searches** (1): a **Menu**, or comma-separated **Search terms** when no menu is chosen. **Show on no-results** shows them when nothing matches.
- **Filters** (1): **Enable filters**, **Enable sort** and the button **Label**. Search uses the same filters as collection pages, set up in the Shopify Search & Discovery app. See [Set up product filters](collection-pages.md#set-up-product-filters).
- **Suggestion tile** (up to 3): collections suggested when nothing matches, each with a **Collection**, **Image** and **Line**.

### Journal and page results section

Shows matching blog articles and pages below the products.

- **Rows**: how many results, from 3 to 12.
- Blocks: **Row options** (**Excerpt**, **Date**, **Thumbnail**), **Help link** (up to 2) and **Note**.

## Improve search results

- Search looks at product titles, descriptions, product types, tags, vendors and variant options. Use the words your customers use, such as "engagement ring" or "hoops," in product titles and descriptions.
- In the Shopify Search & Discovery app, add **Synonyms** (for example, "band" and "ring") and **Boosts** to promote products for specific searches.
