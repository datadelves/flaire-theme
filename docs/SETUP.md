# Flaire: connect a dev store and load the demo content

## 1. Log in and preview the theme

```
shopify auth logout
shopify theme dev --store YOUR-STORE.myshopify.com
```

`theme dev` uploads a development copy of this folder and prints a preview URL that live-reloads on save.
To upload it as a normal (unpublished) theme instead: `shopify theme push --unpublished --store YOUR-STORE.myshopify.com`.

## 2. Load the prototype's demo content

The store needs the same products, photos, collections, pages, journal, reviews and menus as the prototype.
`docs/tools/seed/seed.mjs` creates them through the Admin API.

1. In the store admin: **Settings > Apps and sales channels > Develop apps > Create an app** (name it "Flaire seed").
2. **Configure Admin API scopes**: `write_products`, `write_inventory`, `write_publications`, `write_content`,
   `write_online_store_pages`, `write_online_store_navigation`, `write_metaobject_definitions`,
   `write_metaobjects`, `write_files`, `read_locations`, `write_locations`. Save, then **Install app** and copy the
   **Admin API access token** (`shpat_...`).
3. Run, from the theme folder:

```
node docs/tools/seed/seed.mjs --store YOUR-STORE.myshopify.com --token shpat_xxx
```

It is safe to run again (everything is matched by handle). `--only products,collections` runs single steps;
`--dry` prints the plan without touching the store. Delete the custom app afterwards if you like.

## 3. Manual steps in the admin (no API for these)

- **Search & Discovery app > Filters**: add *Finish* (variant option), *Stone* (product metafield `custom.stone`),
  *Price*, *Availability* and *Engravable* (`custom.engravable`), in that order.
- **Settings > General > Store currency > Change formatting**: the prototype shows whole-dollar prices; set
  "HTML with currency" and "HTML without currency" to `${{amount_no_decimals}}` to match, or keep cents.
- **Online Store > Themes > Customize > Theme settings**: pick the *Flaire* preset.
- **Settings > Markets**: add United States, Canada, United Kingdom, Australia and Germany so the country
  selector lists the same regions as the prototype.
- Optional: **Settings > Shipping and delivery > Local pickup** is enabled by the seed for the first location;
  rename that location to "Portland studio" to match the prototype copy.
