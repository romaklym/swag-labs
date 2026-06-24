"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { useFlags } from "@/components/user-provider";

export function Header() {
  const { count, hydrated, reset } = useCart();
  const { problem, visual } = useFlags();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function closeMenu() {
    setMenuOpen(false);
  }

  function logout() {
    reset();
    document.cookie = "swag_user=; path=/; max-age=0; samesite=lax";
    closeMenu();
    router.push("/");
  }

  function resetAppState() {
    reset();
    closeMenu();
  }

  return (
    <header className="relative flex h-14 items-center justify-center border-b border-line bg-white">
      {/* Hamburger */}
      <button
        type="button"
        id="react-burger-menu-btn"
        aria-label="Open Menu"
        className="absolute left-5 flex flex-col gap-[5px]"
        onClick={() => setMenuOpen(true)}
      >
        <span className="block h-[2px] w-5 bg-action" />
        <span className="block h-[2px] w-5 bg-action" />
        <span className="block h-[2px] w-5 bg-action" />
      </button>

      {/* Brand */}
      <div className="font-mono text-2xl font-bold text-brand">Assertify</div>

      {/* Cart */}
      <Link
        href="/cart"
        data-test="shopping-cart-link"
        aria-label="Cart"
        className={`absolute flex h-10 w-10 items-center justify-center ${
          visual ? "" : "right-5"
        }`}
        style={visual ? { right: 205, top: 40 } : undefined}
      >
        <CartIcon />
        {hydrated && count > 0 && (
          <span
            data-test="shopping-cart-badge"
            className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white"
          >
            {count}
          </span>
        )}
      </Link>

      {/* Slide-out menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeMenu}
            aria-hidden
          />
          <nav className="fixed left-0 top-0 z-50 h-full w-[300px] max-w-[80vw] bg-white p-8 pt-12 shadow-xl">
            <button
              type="button"
              id="react-burger-cross-btn"
              aria-label="Close Menu"
              className="absolute right-5 top-4 text-2xl text-brand"
              onClick={closeMenu}
            >
              ✕
            </button>
            <ul className="mt-2 flex flex-col">
              <li>
                <Link
                  href="/inventory"
                  id="inventory_sidebar_link"
                  data-test="inventory-sidebar-link"
                  className="menu-link"
                  onClick={closeMenu}
                >
                  All Items
                </Link>
              </li>
              <li>
                <a
                  href={
                    problem
                      ? "https://assertify.ai/error/404"
                      : "https://assertify.ai/"
                  }
                  id="about_sidebar_link"
                  data-test="about-sidebar-link"
                  className="menu-link"
                  onClick={closeMenu}
                >
                  About
                </a>
              </li>
              <li>
                <button
                  type="button"
                  id="logout_sidebar_link"
                  data-test="logout-sidebar-link"
                  className="menu-link w-full text-left"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="reset_sidebar_link"
                  data-test="reset-sidebar-link"
                  className="menu-link w-full text-left"
                  onClick={resetAppState}
                >
                  Reset App State
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#132322"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
