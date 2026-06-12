import { getProduct, PRODUCTS } from "@/lib/swag";
import { ProductDetail } from "@/components/product-detail";
import { ItemNotFound } from "@/components/item-not-found";

// Static export: only the params produced below get an HTML page; anything
// else 404s rather than rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  // Real product ids, plus each id + 1 — problem_user's links are off-by-one,
  // so those targets must still resolve to a built page (which shows the
  // saucedemo "ITEM NOT FOUND" screen when no product matches).
  const ids = new Set<number>();
  for (const p of PRODUCTS) {
    ids.add(p.id);
    ids.add(p.id + 1);
  }
  return [...ids].map((id) => ({ id: String(id) }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(Number(id));
  if (!product) return <ItemNotFound />;

  return <ProductDetail product={product} />;
}
