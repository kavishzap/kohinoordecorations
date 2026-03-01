import type { Metadata, Viewport } from 'next'
import { Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import CookieConsent from '@/components/CookieConsent'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'Kohinoor Decorations',
  description:
    'Exquisite floral decor setups for Haldi, Mehendi, Reception & Special Events. Browse our decoration themes, gallery, and packages.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo/logo1.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo/logo1.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo/logo1.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/logo/logo1.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FDF8F4',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
