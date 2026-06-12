"use client";

import { useRouter } from "next/navigation";
import { asset } from "@/lib/swag";

export default function CheckoutComplete() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-xl px-6 py-10 text-center">
      <h1
        className="mb-8 text-lg font-medium text-brand"
        data-test="title"
      >
        Checkout: Complete!
      </h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/pony-express.png")}
        alt="Pony Express"
        className="mx-auto mb-6 w-20"
        data-test="pony-express"
      />

      <h2
        className="text-2xl font-bold text-brand"
        data-test="complete-header"
      >
        Thank you for your order!
      </h2>
      <p className="mt-3 text-[#4a4a4a]" data-test="complete-text">
        Your order has been dispatched, and will arrive just as fast as the pony
        can get there!
      </p>

      <button
        type="button"
        data-test="back-to-products"
        className="btn btn-action mt-8"
        onClick={() => router.push("/inventory")}
      >
        Back Home
      </button>
    </div>
  );
}
