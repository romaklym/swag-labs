// Swag Labs — shared data + helpers. Mirrors the real saucedemo.com inventory,
// users and copy. Safe to import from both server and client components.

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

// Canonical inventory (ids match saucedemo). The store renders these sorted —
// the default sort is "Name (A to Z)".
export const PRODUCTS: Product[] = [
  {
    id: 4,
    name: "Sauce Labs Backpack",
    desc: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    price: 29.99,
    image: "/images/sauce-backpack.jpg",
  },
  {
    id: 0,
    name: "Sauce Labs Bike Light",
    desc: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: 9.99,
    image: "/images/bike-light.jpg",
  },
  {
    id: 1,
    name: "Sauce Labs Bolt T-Shirt",
    desc: "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    price: 15.99,
    image: "/images/bolt-shirt.jpg",
  },
  {
    id: 5,
    name: "Sauce Labs Fleece Jacket",
    desc: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    price: 49.99,
    image: "/images/sauce-pullover.jpg",
  },
  {
    id: 2,
    name: "Sauce Labs Onesie",
    desc: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    price: 7.99,
    image: "/images/red-onesie.jpg",
  },
  {
    id: 3,
    name: "Test.allTheThings() T-Shirt (Red)",
    desc: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    price: 15.99,
    image: "/images/red-tatt.jpg",
  },
];

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// The image every product collapses to for the "problem_user".
export const PROBLEM_IMAGE = "/images/sl-404.jpg";

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
] as const;

export type Username = (typeof USERNAMES)[number];

/** Returns the saucedemo login error for the given credentials, or null when OK. */
export function loginError(username: string, password: string): string | null {
  if (!username) return "Epic sadface: Username is required";
  if (!password) return "Epic sadface: Password is required";
  if (password !== PASSWORD || !USERNAMES.includes(username as Username)) {
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
