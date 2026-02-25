import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css" 

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'Vigil K12 | Compliance Engine',
  description: 'District Privacy Vetting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}