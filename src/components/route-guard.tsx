"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useUserHydrated } from "@/components/user-provider";

/**
 * Client-side replacement for the old `proxy.ts` middleware (middleware is not
 * supported in a static export). Visiting a store route without a login cookie
 * bounces you back to the login page, like saucedemo.
 */
export function RouteGuard() {
  const router = useRouter();
  const user = useUser();
  const hydrated = useUserHydrated();

  useEffect(() => {
    if (hydrated && !user) router.replace("/");
  }, [hydrated, user, router]);

  return null;
}
