import { writeFileSync } from 'fs';
import { resolve } from 'path';

const SITE_URL = 'https://tesle.ai';
const DIST_DIR = resolve(import.meta.dirname, '..', 'dist');

interface PageEntry {
  loc: string;
  changefreq?: string;
  priority?: string;
  lastmod?: string;
}

const pages: PageEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/portfolio', changefreq: 'monthly', priority: '0.9' },
  { loc: '/media', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: '/careers', changefreq: 'weekly', priority: '0.8' },
];

const serviceSlugs = [
  'software-development', 'website-development', 'mobile-applications',
  'graphics-and-branding', 'photography', 'videography',
  'content-creation', 'digital-marketing', 'seo', 'business-automation',
];

const blogSlugs = [
  'the-future-of-ai-in-africa', 'building-scalable-web-apps', 'mobile-first-design-approach',
  'branding-in-digital-age', 'power-of-video-marketing', 'seo-strategies-2024',
  'digital-transformation-guide', 'ux-design-principles', 'content-marketing-tips',
  'social-media-strategy', 'cloud-computing-benefits', 'cybersecurity-best-practices',
];

const portfolioSlugs = [
  'ecobank-digital-platform', 'm-pharma-healthtech-app', 'flutterwave-payments-dashboard',
  'zoomlion-waste-mgmt', 'tonaton-redesign', 'jumia-logistics-platform',
  'meltwater-content-hub', 'gov-digital-services-ghana', 'cocobod-traceability',
  'solar-taxi-fleet-app', 'chango-brand-identity', 'ghana-tourism-campaign',
  'acra-hotel-virtual-tour', 'social-media-impact-report',
];

const jobSlugs = [
  'senior-software-engineer', 'ui-ux-designer', 'digital-marketing-manager',
  'content-strategist', 'photographer', 'project-manager',
];

const allPages = [
  ...pages,
  ...serviceSlugs.map((slug) => ({ loc: `/services/${slug}`, changefreq: 'monthly' as const, priority: '0.7' })),
  ...portfolioSlugs.map((slug) => ({ loc: `/portfolio/${slug}`, changefreq: 'monthly' as const, priority: '0.7' })),
  ...blogSlugs.map((slug) => ({ loc: `/blog/${slug}`, changefreq: 'monthly' as const, priority: '0.7' })),
  ...jobSlugs.map((slug) => ({ loc: `/careers#${slug}`, changefreq: 'monthly' as const, priority: '0.5' })),
];

function generateSitemapXml(pages: PageEntry[]): string {
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <changefreq>${p.changefreq || 'monthly'}</changefreq>
    <priority>${p.priority || '0.5'}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

const sitemap = generateSitemapXml(allPages);
writeFileSync(resolve(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`✓ sitemap.xml generated with ${allPages.length} URLs`);
