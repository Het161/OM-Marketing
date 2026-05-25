// frontend/src/components/ProductImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
}

export default function ProductImage({ src, alt, fill, className }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`${fill ? 'absolute inset-0' : 'w-full h-full'} bg-brand-surface border border-[rgba(196,166,107,0.18)] flex items-center justify-center ${className ?? ''}`}
        style={{ borderRadius: 2 }}
      >
        <div className="text-center px-6">
          <ImageOff strokeWidth={1} size={28} className="text-brand-dim mx-auto mb-3" />
          <p className="text-xs tracking-[0.2em] uppercase text-brand-muted">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setError(true)}
    />
  );
}
