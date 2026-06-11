"use client";

import { createContext, useContext } from "react";

const UserContext = createContext<string | undefined>(undefined);

export function UserProvider({
  user,
  children,
}: {
  user: string | undefined;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

/** The special-user flags saucedemo branches on. */
export function useFlags() {
  const user = useContext(UserContext);
  return {
    user,
    problem: user === "problem_user",
    error: user === "error_user",
    visual: user === "visual_user",
  };
}
