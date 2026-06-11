"use client";

import { useState } from "react";
import {
  type Product,
  type SortKey,
  SORT_OPTIONS,
  sortProducts,
} from "@/lib/swag";
import { ProductCard } from "@/components/product-card";
import { useFlags } from "@/components/user-provider";

export function InventoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("az");
  const { problem, error } = useFlags();

  function onSort(value: SortKey) {
    // problem_user / error_user: the sort control is broken and never reorders.
    if (problem) return;
    if (error) {
      console.error("Sorting is broken!");
      return;
    }
    setSort(value);
  }

  const view = sortProducts(products, sort);

  return (
    <div className="mx-auto max-w-6xl px-6 py-4">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="text-lg font-medium text-brand">Products</span>
        <select
          data-test="product-sort-container"
          aria-label="Sort products"
          className="rounded border border-brand bg-white px-3 py-1.5 text-sm text-brand"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3"
        data-test="inventory-container"
      >
        {view.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
