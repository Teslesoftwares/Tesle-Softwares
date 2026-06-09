import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://tesle.ai';
const DIST_DIR = resolve(__dirname, '..', 'dist');

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

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services', priority: '0.9', changefreq: 'monthly' },
  { loc: '/portfolio', priority: '0.9', changefreq: 'monthly' },
  { loc: '/media', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
  { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
  { loc: '/careers', priority: '0.8', changefreq: 'weekly' },
  ...serviceSlugs.map((slug) => ({ loc: `/services/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...portfolioSlugs.map((slug) => ({ loc: `/portfolio/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...blogSlugs.map((slug) => ({ loc: `/blog/${slug}`, priority: '0.7', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
console.log(`✓ sitemap.xml generated with ${urls.length} URLs`);
