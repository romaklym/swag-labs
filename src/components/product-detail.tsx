"use client";

import { useRouter } from "next/navigation";
import { type Product, money } from "@/lib/swag";
import { CartButton } from "@/components/cart-button";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-5xl px-6 py-4">
      <button
        type="button"
        data-test="back-to-products"
        className="btn btn-action mb-6"
        onClick={() => router.push("/inventory")}
      >
        ← Back to products
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded border border-line object-contain"
          data-test="item-image"
        />

        <div className="flex flex-col">
          <h1
            className="font-mono text-3xl font-medium text-brand"
            data-test="inventory-item-name"
          >
            {product.name}
          </h1>
          <p
            className="mt-4 text-base text-[#4a4a4a]"
            data-test="inventory-item-desc"
          >
            {product.desc}
          </p>
          <div className="mt-6 flex items-center gap-6">
            <span
              className="font-mono text-2xl font-medium text-brand"
              data-test="inventory-item-price"
            >
              {money(product.price)}
            </span>
            <CartButton id={product.id} name={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
