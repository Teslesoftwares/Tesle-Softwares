import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://tesle.ai';
const DEFAULT_TITLE = 'Tesle — Digital Agency | Software, Design & Marketing in Ghana';
const DEFAULT_DESC = 'Full-service digital agency in Ghana. We build software, websites, mobile apps, brands, and marketing that drives growth for African businesses.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  image,
  type = 'website',
  publishedDate,
  author,
  tags,
  noIndex,
}: SEOProps) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = title ? `${title} | Tesle` : DEFAULT_TITLE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || DEFAULT_DESC} />
      <link rel="canonical" href={url} />

      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || DEFAULT_DESC} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="og:site_name" content="Tesle" />
      <meta property="og:locale" content="en_GH" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || DEFAULT_DESC} />
      <meta name="twitter:image" content={image || DEFAULT_IMAGE} />

      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {author && <meta property="article:author" content={author} />}
      {tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
  );
}
