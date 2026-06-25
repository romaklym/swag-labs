// Assertify Swag — shared data + helpers for the demo store. Safe to import
// from both server and client components.
//
// NOTE: the data-test selectors, the accepted usernames + password, and the
// special-user behaviours are the "QA contract" this site exists to exercise
// (it is the practice target for the Assertify test suite). They are kept
// stable on purpose — only the branding, products, copy and imagery changed.

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

// Canonical inventory. The store renders these sorted — the default sort is
// "Name (A to Z)". Ids are stable so /inventory/[id] routes don't move.
export const PRODUCTS: Product[] = [
  {
    id: 4,
    name: "Assertify Dev Hoodie",
    desc: "Ship with confidence in the midweight Assertify Dev Hoodie. Brushed-fleece interior, ribbed cuffs, and a kangaroo pocket roomy enough for every edge case. Embroidered checkmark on the chest.",
    price: 59.99,
    image: "/images/hoodie.jpg",
  },
  {
    id: 0,
    name: "Green Check Enamel Pin",
    desc: "Wear your green build with pride. This hard-enamel \"Green Check\" pin turns any passing suite into a flex. Rubber clutch backing, 1 inch wide.",
    price: 8.99,
    image: "/images/green-check-pin.jpg",
  },
  {
    id: 1,
    name: "Assertify Logo Tee",
    desc: "The everyday Assertify tee. 100% ringspun combed cotton in deep indigo with a clean chest wordmark — soft enough to debug in all day.",
    price: 24.99,
    image: "/images/logo-tee.jpg",
  },
  {
    id: 5,
    name: "CI/CD Pipeline Fleece",
    desc: "A midweight quarter-zip that handles everything from a flaky standup to a 2am incident. Stand-up collar, zippered chest pocket, and a cyan pull tab.",
    price: 74.99,
    image: "/images/pipeline-fleece.jpg",
  },
  {
    id: 2,
    name: "Junior Tester Onesie",
    desc: "Rib-snap infant onesie for the junior tester in development. Reinforced 3-snap bottom closure and two-needle hemmed sleeves won't unravel mid-regression.",
    price: 16.99,
    image: "/images/tester-onesie.jpg",
  },
  {
    id: 3,
    name: "assert(true) T-Shirt",
    desc: "The assertion that never fails. Super-soft ringspun combed cotton tee with a monospace assert(true) chest print — perfect for cozying up to your keyboard.",
    price: 24.99,
    image: "/images/assert-true-tee.jpg",
  },
];

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// ---- asset paths ------------------------------------------------------------

// GitHub Pages serves this project under /swag-labs. Next rewrites <Link>/router
// hrefs for the basePath automatically, but NOT plain <img src="/...">, so wrap
// every static asset path in asset(). Keep in sync with next.config.ts basePath.
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/swag-labs" : "";

export const asset = (path: string): string => `${BASE_PATH}${path}`;

// The image every product collapses to for the "problem_user".
export const PROBLEM_IMAGE = "/images/not-found.jpg";

export function imageFor(product: Product, problemUser: boolean): string {
  return problemUser ? PROBLEM_IMAGE : product.image;
}

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

// ---- auth -------------------------------------------------------------------

export const PASSWORD = "secret_sauce";

export const USERNAMES = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
  "admin",
] as const;

export type Username = (typeof USERNAMES)[number];

/** Logging in as "admin" routes through an extra admin gate before /inventory. */
export const isAdminUser = (u?: string) => u === "admin";

/**
 * Returns the login error for the given username, or null when OK.
 *
 * Testing build: the password is intentionally optional and is no longer
 * checked — logging in works the same way with or without a password, and any
 * password is accepted. Only the username must be one of the known accounts.
 */
export function loginError(username: string): string | null {
  if (!username) return "Epic sadface: Username is required";
  if (!USERNAMES.includes(username as Username)) {
    return "Epic sadface: Username and password do not match any user in this service";
  }
  if (username === "locked_out_user") {
    return "Epic sadface: Sorry, this user has been locked out.";
  }
  return null;
}

export const isProblemUser = (u?: string) => u === "problem_user";
export const isPerformanceUser = (u?: string) =>
  u === "performance_glitch_user";

// ---- sorting ----------------------------------------------------------------

export type SortKey = "az" | "za" | "lohi" | "hilo";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "az", label: "Name (A to Z)" },
  { value: "za", label: "Name (Z to A)" },
  { value: "lohi", label: "Price (low to high)" },
  { value: "hilo", label: "Price (high to low)" },
];

export function sortProducts(items: Product[], key: SortKey): Product[] {
  const copy = [...items];
  switch (key) {
    case "az":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "lohi":
      return copy.sort((a, b) => a.price - b.price);
    case "hilo":
      return copy.sort((a, b) => b.price - a.price);
  }
}
