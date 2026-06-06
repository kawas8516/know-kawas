import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kawas.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reading`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/timeline`, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
