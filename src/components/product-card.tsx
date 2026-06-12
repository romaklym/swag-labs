"use client";

import Link from "next/link";
import { type Product, PROBLEM_IMAGE, money, asset } from "@/lib/swag";
import { CartButton } from "@/components/cart-button";
import { useFlags } from "@/components/user-provider";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { problem, visual } = useFlags();

  // problem_user: every image broken. visual_user: only the first image broken.
  const brokenImage = problem || (visual && index === 0);
  const image = brokenImage ? PROBLEM_IMAGE : product.image;

  // visual_user: prices are randomized garbage.
  const price = visual ? Math.round(1e4 * Math.random()) / 100 : product.price;

  // problem_user: item links are off-by-one (you reach the wrong item).
  const linkId = problem ? product.id + 1 : product.id;
  const href = `/inventory/${linkId}`;

  return (
    <div
      className="flex flex-col border-b border-line pb-6"
      data-test="inventory-item"
    >
      <Link href={href} className="mx-auto block w-44" data-test="inventory-item-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(image)}
          alt={product.name}
          className="h-56 w-full object-contain"
        />
      </Link>

      <Link
        href={href}
        className="mt-4 font-mono text-xl font-medium text-action-dark hover:text-action"
        data-test="inventory-item-name"
      >
        {product.name}
      </Link>

      <div
        className="mt-2 flex-1 text-sm text-[#4a4a4a]"
        data-test="inventory-item-desc"
      >
        {product.desc}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className="font-mono text-xl font-medium text-brand"
          data-test="inventory-item-price"
          suppressHydrationWarning
        >
          {money(price)}
        </span>
        <CartButton id={product.id} name={product.name} />
      </div>
    </div>
  );
}
