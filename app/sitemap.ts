import type { MetadataRoute } from 'next';
import { getAllReading } from '@/lib/content';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kawas.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reading`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/timeline`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const readingRoutes: MetadataRoute.Sitemap = getAllReading()
    .filter((item) => item.hasContent)
    .map((item) => ({
      url: `${baseUrl}/reading/${item.slug}`,
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

  return [...staticRoutes, ...readingRoutes];
}
