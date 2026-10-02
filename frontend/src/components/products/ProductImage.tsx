// frontend/src/components/products/ProductImage.tsx

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TbScale } from 'react-icons/tb';

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
        className={`flex items-center justify-center bg-surface-2 ${
          fill ? 'absolute inset-0' : 'h-full w-full'
        } ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="p-4 text-center">
          <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-line text-subtle">
            <TbScale size={18} aria-hidden />
          </span>
          <p className="label">Photo on request</p>
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
