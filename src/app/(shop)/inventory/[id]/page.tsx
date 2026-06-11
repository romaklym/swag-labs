import { getProduct } from "@/lib/swag";
import { currentUser, applyPerformanceDelay } from "@/lib/session";
import { ProductDetail } from "@/components/product-detail";
import { ItemNotFound } from "@/components/item-not-found";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  await applyPerformanceDelay(user);

  const product = getProduct(Number(id));
  if (!product) return <ItemNotFound />;

  return <ProductDetail product={product} />;
}
