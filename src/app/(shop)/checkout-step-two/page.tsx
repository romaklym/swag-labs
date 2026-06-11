"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { getProduct, money } from "@/lib/swag";
import { useFlags } from "@/components/user-provider";

const TAX_RATE = 0.08;

export default function CheckoutStepTwo() {
  const router = useRouter();
  const { cart, reset } = useCart();
  const { problem, error } = useFlags();
  const items = cart.map(getProduct).filter((p) => p !== undefined);

  // problem_user: every line item is counted twice in the total.
  const itemTotal =
    items.reduce((sum, p) => sum + p.price, 0) * (problem ? 2 : 1);
  const tax = Math.round(itemTotal * TAX_RATE * 100) / 100;
  const total = itemTotal + tax;

  function finish() {
    if (!problem) {
      // error_user: Finish throws (a typo'd resetCart in the real app).
      if (error) throw new TypeError("Ye.cesetRart is not a function");
      reset();
    }
    // problem_user reaches here without clearing the cart.
    router.push("/checkout-complete");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-4">
      <h1 className="mb-4 text-lg font-medium text-brand">Checkout: Overview</h1>

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
              <span
                className="mt-3 block font-mono text-lg font-medium text-brand"
                data-test="inventory-item-price"
              >
                {money(p.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 text-sm text-brand">
        <div>
          <div className="font-bold">Payment Information:</div>
          <div data-test="payment-info-value">SauceCard #31337</div>
        </div>
        <div>
          <div className="font-bold">Shipping Information:</div>
          <div data-test="shipping-info-value">Free Pony Express Delivery!</div>
        </div>
        <div>
          <div className="font-bold">Price Total</div>
          <div data-test="subtotal-label">Item total: {money(itemTotal)}</div>
          <div data-test="tax-label">Tax: {money(tax)}</div>
          <div data-test="total-label" className="text-lg font-bold">
            Total: {money(total)}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          data-test="cancel"
          className="btn btn-outline"
          onClick={() => router.push("/inventory")}
        >
          Cancel
        </button>
        <button
          type="button"
          data-test="finish"
          className="btn btn-action"
          onClick={finish}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
