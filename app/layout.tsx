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

const SITE_URL = 'https://kohinoordecorations.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Kohinoor Decorations',
  description:
    'Leading wedding decoration company in Mauritius. Expert floral decor for Haldi, Mehendi, Reception & Indian & Muslim weddings. Silver, Gold & Platinum packages from Rs 15k. La Rosa Link Road, MdAlbert. Call 5833 1197.',
  keywords: [
    'wedding decoration Mauritius',
    'haldi decoration Mauritius',
    'mehendi decoration Mauritius',
    'reception decoration Mauritius',
    'Indian wedding decoration Mauritius',
    'Muslim wedding decoration Mauritius',
    'wedding florist Mauritius',
    'event decoration Mauritius',
    'Kohinoor Decorations',
  ],
  authors: [{ name: 'Kohinoor Decorations', url: SITE_URL }],
  creator: 'Kohinoor Decorations',
  publisher: 'Kohinoor Decorations',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Kohinoor Decorations',
    title: 'Wedding Decoration Mauritius | Kohinoor Decorations',
    description:
      'Leading wedding decoration in Mauritius. Haldi, Mehendi, Reception & wedding packages. Silver from Rs 15k, Gold from Rs 45k, Platinum from Rs 75k. Contact 5833 1197.',
    locale: 'en_MU',
    images: [
      {
        url: '/assets/hero3.jpeg',
        width: 1200,
        height: 630,
        alt: 'Kohinoor Decorations – Wedding Decoration Mauritius',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Decoration Mauritius | Kohinoor Decorations',
    description:
      'Leading wedding decoration in Mauritius. Haldi, Mehendi, Reception packages. Contact +230 5833 1197.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'Kohinoor Decorations',
        description:
          'Leading wedding decoration company in Mauritius. Expert floral decor for Haldi, Mehendi, Reception & Indian & Muslim weddings. Silver, Gold & Platinum packages.',
        url: SITE_URL,
        telephone: '+23058331197',
        email: 'usahadut@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'La rosa link road mdalbert',
          addressLocality: 'MdAlbert',
          addressCountry: 'MU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -20.424073553805545,
          longitude: 57.61624551111114,
        },
        image: [`${SITE_URL}/assets/hero3.jpeg`, `${SITE_URL}/logo/logo1.png`],
        priceRange: 'Rs 15,000 - Rs 75,000+',
        areaServed: { '@type': 'Country', name: 'Mauritius' },
        openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '18:00' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Kohinoor Decorations – Wedding Decoration Mauritius',
        description: 'Wedding decoration, Haldi, Mehendi, Reception decor packages in Mauritius.',
        publisher: { '@id': `${SITE_URL}/#business` },
      },
    ],
  }

  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
