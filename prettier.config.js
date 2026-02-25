import { auth } from "./auth"

export default auth((req) => {

})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|public|.*\\..*).*)"],
}