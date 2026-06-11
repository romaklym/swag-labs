import { cookies } from "next/headers";
import { isPerformanceUser } from "@/lib/swag";

/** The logged-in username, read from the cookie set at login (server-side). */
export async function currentUser(): Promise<string | undefined> {
  const store = await cookies();
  return store.get("swag_user")?.value;
}

/**
 * The "performance_glitch_user" experiences artificial latency on page loads,
 * just like saucedemo. Call this from server components that should be slow.
 */
export async function applyPerformanceDelay(user?: string) {
  if (isPerformanceUser(user)) {
    await new Promise((r) => setTimeout(r, 2000));
  }
}
