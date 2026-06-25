"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useUserHydrated } from "@/components/user-provider";
import { PRODUCTS, SORT_OPTIONS, type SortKey } from "@/lib/swag";

/**
 * Admin gate. Logging in as `admin` lands here first (see the login page); this
 * is the extra step the admin clears before reaching the catalog. The settings
 * are cosmetic — "Save and Proceed" just advances to /inventory.
 */
export default function AdminPage() {
  const router = useRouter();
  const user = useUser();
  const hydrated = useUserHydrated();

  const [storeName, setStoreName] = useState("Assertify Swag");
  const [defaultSort, setDefaultSort] = useState<SortKey>("az");
  const [featured, setFeatured] = useState<number>(PRODUCTS[0].id);
  const [maintenance, setMaintenance] = useState(false);

  // This gate is for the admin account only — send anyone else to the catalog.
  useEffect(() => {
    if (hydrated && user && user !== "admin") router.replace("/inventory");
  }, [hydrated, user, router]);

  // Don't flash the console before we know who's signed in (or for non-admins).
  if (!hydrated || user !== "admin") return null;

  function saveAndProceed() {
    router.replace("/inventory");
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-4" data-test="admin">
      <h1 className="text-lg font-medium text-brand">Admin Console</h1>
      <p className="mb-6 mt-1 text-sm text-[#4a4a4a]">
        Review the store settings, then continue to the catalog.
      </p>

      <div className="space-y-5 rounded-lg border border-line bg-white p-6">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brand">
            Store display name
          </span>
          <input
            data-test="admin-store-name"
            className="form-input"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brand">
            Default catalog sort
          </span>
          <select
            data-test="admin-default-sort"
            className="form-input cursor-pointer"
            value={defaultSort}
            onChange={(e) => setDefaultSort(e.target.value as SortKey)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brand">
            Featured product
          </span>
          <select
            data-test="admin-featured-product"
            className="form-input cursor-pointer"
            value={featured}
            onChange={(e) => setFeatured(Number(e.target.value))}
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            data-test="admin-maintenance-mode"
            type="checkbox"
            className="h-4 w-4 accent-action"
            checked={maintenance}
            onChange={(e) => setMaintenance(e.target.checked)}
          />
          <span className="text-sm font-medium text-brand">
            Maintenance mode
          </span>
        </label>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <button
          type="button"
          data-test="admin-save-and-proceed"
          className="btn btn-action"
          onClick={saveAndProceed}
        >
          Save and Proceed
        </button>
      </div>
    </div>
  );
}
