import { NextResponse, type NextRequest } from "next/server";

// Gate the store routes behind the login cookie. Visiting any of these without
// a session sends you back to the login page (like saucedemo).
export function proxy(request: NextRequest) {
  const loggedIn = Boolean(request.cookies.get("swag_user")?.value);
  if (!loggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/inventory",
    "/inventory/:path*",
    "/cart",
    "/checkout-step-one",
    "/checkout-step-two",
    "/checkout-complete",
  ],
};
