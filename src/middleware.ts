import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protecedRoutes = ["/"]

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const sessionCookie = getSessionCookie(req);

    const res = NextResponse.next();

    const isLoggedIn = !!sessionCookie; 

    const isOnProtecedRoute = protecedRoutes.includes(nextUrl.pathname);

    const isOnAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

    if (!isLoggedIn && isOnProtecedRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLoggedIn && isOnAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return res
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ]
}