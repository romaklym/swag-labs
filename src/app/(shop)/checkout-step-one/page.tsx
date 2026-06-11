"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlags } from "@/components/user-provider";

export default function CheckoutStepOne() {
  const router = useRouter();
  const { problem, error: errorUser } = useFlags();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onLastName(e: React.ChangeEvent<HTMLInputElement>) {
    // problem_user: last name text lands in the first name field.
    if (problem) return setFirstName(e.target.value);
    // error_user: typing the last name throws.
    if (errorUser)
      throw new TypeError("Cannot read properties of undefined (reading 'value')");
    setLastName(e.target.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName) return setError("Error: First Name is required");
    if (!lastName) return setError("Error: Last Name is required");
    if (!postalCode) return setError("Error: Postal Code is required");
    setError(null);
    router.push("/checkout-step-two");
  }

  return (
    <div className="mx-auto max-w-md px-6 py-4">
      <h1 className="mb-6 text-lg font-medium text-brand">
        Checkout: Your Information
      </h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          data-test="firstName"
          className="form-input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          data-test="lastName"
          className="form-input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={onLastName}
        />
        <input
          data-test="postalCode"
          className="form-input"
          type="text"
          placeholder="Zip/Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
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

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            data-test="cancel"
            className="btn btn-outline"
            onClick={() => router.push("/cart")}
          >
            Cancel
          </button>
          <input
            type="submit"
            data-test="continue"
            className="btn btn-action cursor-pointer"
            value="Continue"
          />
        </div>
      </form>
    </div>
  );
}
