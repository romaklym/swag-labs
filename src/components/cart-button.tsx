"use client";

import { useCart } from "@/components/cart-provider";
import { useFlags } from "@/components/user-provider";

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[().]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CartButton({
  id,
  name,
  className = "",
}: {
  id: number;
  name: string;
  className?: string;
}) {
  const { has, add, remove } = useCart();
  const { problem, error } = useFlags();
  const inCart = has(id);
  const s = slug(name);

  function onAdd() {
    // problem_user silently fails on odd ids; error_user throws on odd ids.
    if (problem && id % 2 === 1) return;
    if (error && id % 2 === 1) throw new Error("Failed to add item to the cart.");
    add(id);
  }

  function onRemove() {
    // problem_user silently fails on even ids; error_user throws on even ids.
    if (problem && id % 2 === 0) return;
    if (error && id % 2 === 0)
      throw new Error("Failed to remove item from cart.");
    remove(id);
  }

  if (inCart) {
    return (
      <button
        type="button"
        data-test={`remove-${s}`}
        className={`btn btn-danger ${className}`}
        onClick={onRemove}
      >
        Remove
      </button>
    );
  }
  return (
    <button
      type="button"
      data-test={`add-to-cart-${s}`}
      className={`btn btn-outline ${className}`}
      onClick={onAdd}
    >
      Add to cart
    </button>
  );
}
