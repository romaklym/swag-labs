"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { getProduct, money } from "@/lib/swag";
import { CartButton } from "@/components/cart-button";
import { useFlags } from "@/components/user-provider";

export default function CartPage() {
  const router = useRouter();
  const { cart } = useCart();
  const { problem } = useFlags();
  const items = cart.map(getProduct).filter((p) => p !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-6 py-4">
      <h1 className="mb-4 text-lg font-medium text-brand">Your Cart</h1>

      <div className="flex border-b border-line pb-2 text-xs font-medium uppercase text-[#4a4a4a]">
        <div className="w-16">QTY</div>
        <div>Description</div>
      </div>

      <div data-test="cart-list">
        {items.map((p) => (
          <div
            key={p.id}
            className="flex items-start border-b border-line py-5"
            data-test="cart-item"
          >
            <div className="w-16 pt-1 text-brand" data-test="item-quantity">
              1
            </div>
            <div className="flex-1">
              <Link
                href={`/inventory/${problem ? p.id + 1 : p.id}`}
                className="font-mono text-xl font-medium text-action-dark hover:text-action"
                data-test="inventory-item-name"
              >
                {p.name}
              </Link>
              <p className="mt-1 text-sm text-[#4a4a4a]">{p.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className="font-mono text-lg font-medium text-brand"
                  data-test="inventory-item-price"
                >
                  {money(p.price)}
                </span>
                <CartButton id={p.id} name={p.name} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/inventory"
          data-test="continue-shopping"
          className="btn btn-outline"
        >
          Continue Shopping
        </Link>
        <button
          type="button"
          data-test="checkout"
          className="btn btn-action"
          onClick={() => router.push("/checkout-step-one")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
