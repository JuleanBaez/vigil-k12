import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/api/auth")

  if (!isLoggedIn && !isAuthPage) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    return Response.redirect(signInUrl)
  }
})

export const config = {

  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)"],
}