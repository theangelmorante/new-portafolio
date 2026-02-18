import type { Metadata } from 'next'
import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'Portfolio | Angel Morante',
  description: 'Personal portfolio showcasing projects, skills, and professional experience',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
