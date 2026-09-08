// frontend/src/components/products/ProductImage.tsx

'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Product image with a branded fallback, so a missing file never leaves a
 * broken-image icon on the page.
 */
export default function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className = '',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 ${
          fill ? 'absolute inset-0' : 'h-full w-full'
        } ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="p-4 text-center">
          <div className="mb-1 text-5xl" aria-hidden>
            ⚖️
          </div>
          <p className="text-xs font-medium text-primary-700">Image coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : (width ?? 600)}
      height={fill ? undefined : (height ?? 450)}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
