import type { MetadataRoute } from 'next';
import { getAllPrompts } from '@/lib/content';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kawas.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const prompts = getAllPrompts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reading`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/prompts`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/timeline`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const promptRoutes: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${baseUrl}/prompts/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...promptRoutes];
}
