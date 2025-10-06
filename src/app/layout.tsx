import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/providers/QueryProvider'
import AuthProvider from "@/providers/SessionProvider"
import ProtectedLayout from "@/components/ProtectedLayout"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Klickbee CMS',
  description: 'A modern CMS built with Next.js',
  icons: {
    icon: '/icons/Logo.svg',
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <ProtectedLayout>{children}</ProtectedLayout>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}