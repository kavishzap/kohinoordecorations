import { MetadataRoute } from 'next'

const SITE_URL = 'https://kohinoordecorations.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
