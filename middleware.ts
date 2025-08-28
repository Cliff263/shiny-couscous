import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const url = request.nextUrl;

  // Skip static files, API routes, and _next internals
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/static") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg")
  ) {
    return NextResponse.next();
  }

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
    response.cookies.set("session", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
      secure: true, // always secure on Vercel
    });
  }

  // CSRF Protection (only for non-GET requests)
  if (request.method && request.method !== "GET") {
    const originHeader = request.headers.get("origin");
    const hostHeader = request.headers.get("host");

    if (!originHeader || !hostHeader) {
      return new NextResponse(null, { status: 403 });
    }

    let origin: URL;
    try {
      origin = new URL(originHeader);
    } catch {
      return new NextResponse(null, { status: 403 });
    }

    if (origin.host !== hostHeader) {
      return new NextResponse(null, { status: 403 });
    }
  }

  return response;
}
