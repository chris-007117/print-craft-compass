import { Helmet } from "react-helmet-async";

const SITE_URL = "https://veridiapress.com";
const SITE_NAME = "Veridia Press";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  path = "/",
  image = "/og-image.jpg",
  type = "website",
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
};

// Reusable JSON-LD builders
export const orgJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [
    "https://www.linkedin.com/company/veridia-press",
    "https://www.instagram.com/veridiapress",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-602-555-1987",
    contactType: "sales",
    areaServed: "US",
    availableLanguage: ["English"],
  },
});

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: "+1-602-555-1987",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8410 N Scottsdale Rd",
    addressLocality: "Scottsdale",
    addressRegion: "AZ",
    postalCode: "85253",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 33.5378, longitude: -111.9258 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    opens: "07:00", closes: "19:00",
  }],
  areaServed: ["Phoenix","Scottsdale","Tempe","Mesa","Chandler","Glendale","Arizona"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "287" },
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbJsonLd = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path}`,
  })),
});

export const serviceJsonLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "United States",
});

export const articleJsonLd = (title: string, description: string, path: string, datePublished: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: `${SITE_URL}${path}`,
  datePublished,
  dateModified: datePublished,
  publisher: { "@id": `${SITE_URL}/#organization` },
  author: { "@type": "Organization", name: SITE_NAME },
});
