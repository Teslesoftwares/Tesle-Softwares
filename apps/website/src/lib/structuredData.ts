const SITE_URL = 'https://tesle.ai';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tesle',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'AI-native enterprise software company building the operating system for African businesses  ERP, CRM, HRM, Financials, and Analytics.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '23 Independence Avenue, Ridge',
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+233-50-123-4567',
        contactType: 'sales',
        email: 'hello@teslesoftwares.com',
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      'https://x.com/tesleai',
      'https://linkedin.com/company/tesle',
      'https://instagram.com/tesle',
      'https://youtube.com/@tesle',
      'https://github.com/tesle',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tesle',
    url: SITE_URL,
    alternateName: 'Tesle Enterprise Software',
    description: 'AI-native enterprise software platform for African businesses.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function serviceSchema(services: { title: string; description: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        url: `${SITE_URL}/services/${s.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'Tesle',
        },
      },
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    url: `${SITE_URL}${article.url}`,
    datePublished: article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tesle',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Tesle',
    image: `${SITE_URL}/og-image.jpg`,
    telephone: '+233-50-123-4567',
    email: 'hello@teslesoftwares.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '23 Independence Avenue, Ridge',
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
    ],
  };
}
