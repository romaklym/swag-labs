# Assertify Swag

A deliberately-buggy demo storefront — the practice target for the Assertify
test suite. It sells Assertify-branded QA merch and ships the same intentional
defects, special users, and stable `data-test` selectors a real test run needs
to exercise. Built with **Next.js 16 (App Router) · React 19 · Tailwind CSS v4**.

## Run it

```bash
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Accepted logins

Password for **all** users: `secret_sauce`

| Username                  | Behavior                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `standard_user`           | Normal experience                                                                                                 |
| `locked_out_user`         | Login blocked with a lock-out error                                                                               |
| `problem_user`            | All images break to `not-found`; item links are off-by-one; sort dead; some add/remove fail; doubled checkout total; Last Name fills First Name; Finish doesn't clear the cart |
| `performance_glitch_user` | Pages load with artificial latency                                                                               |
| `error_user`              | Add/remove throw by id parity; sorting, the Last Name field and Finish all throw                                  |
| `visual_user`             | Randomized (wrong) prices, the first image is broken, and the cart icon is misaligned                            |

A bad item id (including the off-by-one links) shows the **ITEM NOT FOUND** page.

## Flow

`/` (login) → `/inventory` → `/inventory/[id]` → `/cart` →
`/checkout-step-one` → `/checkout-step-two` → `/checkout-complete`

- The cart lives in `localStorage` (`cart-contents`). **Reset App State** and
  **Logout** in the hamburger menu clear it.
- Store routes are gated by a login cookie in [`src/proxy.ts`](src/proxy.ts);
  visiting them logged-out bounces to the login page.
- Inventory, prices, descriptions, sorting and the 8% tax drive the cart math.
  Product photos in [`public/images/`](public/images/) are AI-generated
  Assertify merch shots.

## Project layout

```
src/
  app/
    page.tsx            login page
    (shop)/             authenticated store: layout (header + footer),
                        inventory, inventory/[id], cart, checkout-step-one/two,
                        checkout-complete
    not-found.tsx       404 page
  components/           header (menu + cart badge), footer, cart-provider,
                        product-card, product-detail, cart-button
  lib/
    swag.ts             inventory, users, login rules, sorting, formatting
    session.ts          cookie/session + performance-glitch delay
  proxy.ts              login gate (Next.js 16 proxy)
```
