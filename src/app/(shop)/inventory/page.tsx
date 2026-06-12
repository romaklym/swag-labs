import { PRODUCTS } from "@/lib/swag";
import { InventoryList } from "./inventory-list";

export default function InventoryPage() {
  return <InventoryList products={PRODUCTS} />;
}
