import type { Metadata } from 'next';
import { productApi } from '@/services/api';
import ProductDetailClient from './ProductDetailClient';

const SITE_URL = 'https://ommarketing.co.in';

// Cache product detail pages for 1 hour at the edge.
// New products + spec edits surface to crawlers within the hour without
// hammering Render on every visitor.
export const revalidate = 3600;

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  specifications?: string;
}

async function fetchProduct(id: string): Promise<Product | null> {
  const numeric = parseInt(id, 10);
  if (!Number.isFinite(numeric)) return null;
  try {
    return await productApi.getById(numeric);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return {
      title: 'Product not found',
      robots: { index: false, follow: true },
    };
  }

  const priceFmt = `₹${product.price.toLocaleString('en-IN')}`;
  const title = `${product.name} — ${priceFmt} | OM Marketing Ahmedabad`;
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
  const product = await fetchProduct(id);

  return (
    <>
      {product && <ProductSchema product={product} id={id} />}
      <ProductDetailClient />
    </>
  );
}

function ProductSchema({ product, id }: { product: Product; id: string }) {
  let specifications: Record<string, string> = {};
  try {
    if (product.specifications) {
      const parsed = JSON.parse(product.specifications);
      if (parsed && typeof parsed === 'object') {
        specifications = Object.fromEntries(
          Object.entries(parsed).map(([k, v]) => [k, String(v)])
        );
      }
    }
  } catch {
    // fall through with empty specifications
  }

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
