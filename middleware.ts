import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  console.log("[Middleware] Incoming request:", {
    url: request.url,
    method: request.method,
    cookies: Object.keys(request.cookies.getAll() ?? {}),
    headers: {
      origin: request.headers.get("origin"),
      host: request.headers.get("host"),
    },
  });

  const response = NextResponse.next();

  // Refresh session cookie if it exists
  const token = request.cookies.get("session")?.value ?? null;
  if (token !== null) {
    console.log("[Middleware] Found session cookie, refreshing...");
    response.cookies.set("session", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
      secure: true, // always secure on Vercel
    });
  } else {
    console.log("[Middleware] No session cookie found.");
  }

  // CSRF Protection (only for non-GET requests)
  if (request.method && request.method !== "GET") {
    console.log("[Middleware] Running CSRF protection...");

    const originHeader = request.headers.get("origin");
    const hostHeader = request.headers.get("host");

    if (!originHeader || !hostHeader) {
      console.error("[Middleware] Missing Origin or Host header → blocking.");
      return new NextResponse(null, { status: 403 });
    }

    let origin: URL;
    try {
      origin = new URL(originHeader);
    } catch {
      console.error("[Middleware] Invalid Origin header → blocking.");
      return new NextResponse(null, { status: 403 });
    }

    if (origin.host !== hostHeader) {
      console.error(
        `[Middleware] Host mismatch: origin=${origin.host}, host=${hostHeader} → blocking.`
      );
      return new NextResponse(null, { status: 403 });
    }

    console.log("[Middleware] CSRF check passed.");
  }

  return response;
}

// Removed matcher so middleware runs on all routes
