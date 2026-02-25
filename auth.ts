import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
      const isPublicRoute = nextUrl.pathname.startsWith('/auth/signin')

      if (isApiAuthRoute || isPublicRoute) return true
      
      return isLoggedIn
    },
  },
})