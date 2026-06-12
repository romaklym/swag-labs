"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserContextValue {
  user: string | undefined;
  /** True once we've read the login cookie in the browser. */
  hydrated: boolean;
}

const UserContext = createContext<UserContextValue>({
  user: undefined,
  hydrated: false,
});

/** Read the username from the cookie the login page set (client-side only). */
function readUserCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)swag_user=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * On a static export there is no server to read the session cookie, so the
 * logged-in user is resolved in the browser after hydration (mirrors how the
 * cart is loaded from localStorage in CartProvider).
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readUserCookie());
    setHydrated(true);
  }, []);

  return (
    <UserContext.Provider value={{ user, hydrated }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext).user;
}

export function useUserHydrated() {
  return useContext(UserContext).hydrated;
}

/** The special-user flags saucedemo branches on. */
export function useFlags() {
  const { user } = useContext(UserContext);
  return {
    user,
    problem: user === "problem_user",
    error: user === "error_user",
    visual: user === "visual_user",
  };
}
