import { PRODUCTS } from "@/lib/swag";
import { currentUser, applyPerformanceDelay } from "@/lib/session";
import { InventoryList } from "./inventory-list";

export default async function InventoryPage() {
  const user = await currentUser();
  await applyPerformanceDelay(user);

  return <InventoryList products={PRODUCTS} />;
}
