# Customer accounts

Customer accounts let customers sign in to see their orders and saved addresses. Turn them on in your Shopify admin under **Settings > Customer accounts**.

## The account icon

When customer accounts are turned on, the header shows an account icon on desktop and mobile. It uses Shopify's account component: signed-out customers can sign in from a small sheet, often with a one-time code or Shop, and signed-in customers see their name and a menu of account links.

| Setting | Where | What it does |
|---|---|---|
| **Account link** | Header section | Shows the account icon. |
| **Customer account menu** | Theme settings > Customer accounts | The links in the account sheet, such as Orders and Profile. Defaults to the Customer account main menu, which Shopify creates for you. |
| **Account row** | Overlays > Mobile menu drawer | Shows an account link in the mobile menu. |

To change the links, edit the Customer account main menu in **Content > Menus**.

## Which account pages the theme controls

Shopify offers two versions of customer accounts:

- **Customer accounts** (recommended): Shopify hosts the sign-in, order and profile pages. You can change their colors and logo in **Settings > Customer accounts > Customize**. The theme's own account templates aren't used.
- **Legacy customer accounts**: the sign-in, registration and account pages use the theme templates described below.

## Legacy account pages

Each page has an **Eyebrow**, **Headline**, **Supporting line** and **Color scheme**, plus the settings below. To edit them in the theme editor, choose **Customer accounts** pages in the page selector. <!-- verify after merge -->

### Sign in

- **Button label**, **Recover label** (the forgot password link) and **Register label** (the create account link).
- Blocks: **Field** (**Label**, **Error**, **Autofocus**), **Recover form** (the password reset form: **Heading**, **Button**, **Success**) and **Guest note** (a note that customers can check out without an account, with a **Label** and **Link**). <!-- verify after merge: "Title" becomes "Heading" -->

### Create account

- **Button label**, **Marketing checkbox** (lets customers sign up for email marketing) and **Sign-in link**.
- Blocks: **Field** (up to 6), **Consent** (terms text, with **Required checkbox** and **Terms link**) and **Benefit** (up to 3 short reasons to create an account).

### Account

- **Orders per page** and **Empty orders text**.
- Blocks: **Orders** (**Status**, **Tracking link**, **Reorder link**), **Account details** (**Email**, **Addresses link**, **Marketing consent**) and **Help link** (up to 3). The default help link label is "Ask a jeweler." <!-- verify after merge: "jeweller" becomes "jeweler" -->

### Order

- **Tracking**, **Addresses** and **Reorder**.
- Blocks: **Line options** (**Material**, **Engraving**, **SKU**), **Status** (**Style**, **Timeline**, **Label**) and **Support** (up to 2).

Orders show each item's price, discounts, shipping, taxes and the total.

### Addresses

- **Add label**, **Empty text** and **Country/province selects**.
- Blocks: **Address row** (**Default badge**, **Phone**, **Delete link**), **Form field** (up to 10, each with a **Label**, **Error** and **Required**) and **Note**.

### Activate account and Reset password

These pages appear from Shopify's account emails. Each has a **Headline**, **Supporting line** and **Color scheme**.
