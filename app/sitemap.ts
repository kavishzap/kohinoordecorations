import { MetadataRoute } from 'next'

const SITE_URL = 'https://kohinoordecorations.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#decorations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#packages`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
  ]
}
