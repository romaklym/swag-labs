import Link from "next/link";
import { asset } from "@/lib/swag";

export function ItemNotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-4" data-test="inventory-item">
      <Link href="/inventory" data-test="back-to-products" className="btn btn-action mb-6">
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/not-found.jpg")}
          alt="Item not found"
          className="w-full rounded border border-line object-contain"
        />
        <div>
          <h1 className="font-mono text-3xl font-medium text-brand">
            ITEM NOT FOUND
          </h1>
          <p className="mt-4 whitespace-pre-line text-base text-[#4a4a4a]">
            {
              "We're sorry, but your call could not be completed as dialled.\nPlease check your number, and try your call again.\nIf you are in need of assistance, please dial 0 to be connected with an operator.\nThis is a recording.\n4 T 1."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
