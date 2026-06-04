import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllProducts,
  getProductById,
  parseSpecifications,
  type Product,
} from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

const SITE_URL = 'https://ommarketing.co.in';

// Fully static — every product page is pre-rendered at build time.
// Refresh by running `node scripts/sync-products.mjs` then redeploying.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(parseInt(id, 10));

  if (!product) {
    return {
      title: 'Product not found',
      robots: { index: false, follow: true },
    };
  }

  const priceFmt = `₹${product.price.toLocaleString('en-IN')}`;
  // Layout template appends "| OM Marketing", so keep the per-page title compact.
  const title = `${product.name} — ${priceFmt} · Ahmedabad`;
  const desc = (
    product.description ||
    `${product.name} from OM Marketing, Naroda Ahmedabad. Stamping certificate included, free installation.`
  ).slice(0, 155);

  return {
    title,
    description: desc,
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      url: `/products/${id}`,
      type: 'website',
      title: `${product.name} — ${priceFmt}`,
      description: desc,
      images: product.image_url
        ? [{ url: product.image_url, alt: product.name }]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(parseInt(id, 10));

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductSchema product={product} id={id} />
      <ProductDetailClient product={product} />
    </>
  );
}

function ProductSchema({ product, id }: { product: Product; id: string }) {
  const specifications = parseSpecifications(product.specifications);

  const brand =
    specifications.brand || specifications.Brand || 'OM Marketing';
  const imageUrl = product.image_url?.startsWith('http')
    ? product.image_url
    : `${SITE_URL}${product.image_url || '/images/placeholder.jpg'}`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Collection',
            item: `${SITE_URL}/products`,
          },
          { '@type': 'ListItem', position: 3, name: product.name },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${SITE_URL}/products/${id}#product`,
        name: product.name,
        description: product.description,
        image: imageUrl,
        sku: String(product.id),
        category: product.category.replace(/_/g, ' '),
        brand: { '@type': 'Brand', name: brand },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/products/${id}`,
          priceCurrency: 'INR',
          price: product.price,
          availability:
            product.stock_quantity > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'OM Marketing',
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
