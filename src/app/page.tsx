"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginError, USERNAMES, PASSWORD, isAdminUser } from "@/lib/swag";
import { useCart } from "@/components/cart-provider";

export default function LoginPage() {
  const router = useRouter();
  const { reset } = useCart();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = username.trim();
    // Password is optional in this testing build — only the username matters.
    const err = loginError(name);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    // Fresh session starts with an empty cart.
    reset();
    document.cookie = `swag_user=${encodeURIComponent(
      name,
    )}; path=/; max-age=86400; samesite=lax`;
    // admin has an extra gate (the admin console) before reaching the catalog.
    router.push(isAdminUser(name) ? "/admin" : "/inventory");
  }

  return (
    <div className="flex min-h-dvh flex-col items-center bg-login px-4 py-16">
      <div className="login_logo mb-8 select-none font-mono text-[42px] font-bold leading-tight text-brand">
        Assertify
      </div>

      <div className="w-full max-w-[400px]">
        {/* Login form */}
        <div className="rounded-t-lg border border-line bg-white px-8 py-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              id="user-name"
              name="user-name"
              data-test="username"
              className="form-input"
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="password"
              name="password"
              data-test="password"
              className="form-input"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div
                className="error-message-container relative flex items-center justify-center bg-danger px-3 py-3"
                data-test="error"
              >
                <span aria-hidden className="mr-2 font-bold text-white">
                  ✕
                </span>
                <h3 className="text-center text-sm text-white">{error}</h3>
                <button
                  type="button"
                  aria-label="Dismiss error"
                  data-test="error-button"
                  className="absolute right-2 top-2 text-white"
                  onClick={() => setError(null)}
                >
                  ✕
                </button>
              </div>
            )}

            <input
              type="submit"
              id="login-button"
              data-test="login-button"
              className="btn btn-action w-full cursor-pointer"
              value="Login"
            />
          </form>
        </div>

        {/* Accepted credentials panel */}
        <div className="login_credentials_wrap rounded-b-lg bg-brand px-8 py-6 font-mono text-sm leading-6 text-white">
          <div className="login_credentials">
            <h4 className="mb-1 font-bold">Accepted usernames are:</h4>
            {USERNAMES.map((u) => (
              <div key={u}>{u}</div>
            ))}
          </div>
          <div className="login_password mt-4">
            <h4 className="mb-1 font-bold">Password for all users:</h4>
            <div>{PASSWORD}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
