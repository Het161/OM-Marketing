// Site-wide JSON-LD @graph injected once in the root layout.
// Includes Organization (Store), LocalBusiness, and WebSite (with SearchAction).
// Page-specific schemas (BreadcrumbList, Product) are injected by individual pages.

const SITE_URL = 'https://ommarketing.co.in';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'Store'],
      '@id': `${SITE_URL}/#organization`,
      name: 'OM Marketing',
      alternateName: 'OM Marketing Weighing Solutions',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/om-logo.jpg`,
      },
      description:
        'Authorised dealer of weighing scales, note counters, and mobile accessories in Naroda, Ahmedabad. ISO 9001:2008 certified, serving 2,400+ retailers across India since 2010.',
      telephone: '+91-98252-47312',
      email: 'ommarketing.weighingscale1@gmail.com',
      foundingDate: '2010',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop 15, JB Plaza',
        addressLocality: 'Naroda',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
        postalCode: '382330',
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Ahmedabad' },
        { '@type': 'AdministrativeArea', name: 'Gujarat' },
        { '@type': 'Country', name: 'India' },
      ],
      sameAs: [
        'https://instagram.com/om_marketing',
        'https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b',
        'https://ommarketingsolutions.in',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Weighing Solutions',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Weighing Scales',
            url: `${SITE_URL}/products?category=weighing_scale`,
          },
          {
            '@type': 'OfferCatalog',
            name: 'Note Counters',
            url: `${SITE_URL}/products?category=note_counter`,
          },
          {
            '@type': 'OfferCatalog',
            name: 'Mobile Accessories',
            url: `${SITE_URL}/products?category=mobile_accessory`,
          },
        ],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'OM Marketing',
      image: `${SITE_URL}/om-logo.jpg`,
      url: SITE_URL,
      telephone: '+91-98252-47312',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop 15, JB Plaza',
        addressLocality: 'Naroda',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
        postalCode: '382330',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '10:00',
          closes: '16:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'OM Marketing',
      description:
        'Weighing scales, note counters, and mobile accessories in Naroda, Ahmedabad.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
