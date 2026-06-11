"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "cart-contents";

interface CartContextValue {
  cart: number[];
  count: number;
  hydrated: boolean;
  has: (id: number) => boolean;
  add: (id: number) => void;
  remove: (id: number) => void;
  reset: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount (matches saucedemo's localStorage cart).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never clobber storage with the initial [].
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [cart, hydrated]);

  const add = useCallback(
    (id: number) => setCart((c) => (c.includes(id) ? c : [...c, id])),
    [],
  );
  const remove = useCallback(
    (id: number) => setCart((c) => c.filter((x) => x !== id)),
    [],
  );
  const reset = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        count: cart.length,
        hydrated,
        has: (id) => cart.includes(id),
        add,
        remove,
        reset,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
