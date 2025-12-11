// frontend/src/components/ProductImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
}

export default function ProductImage({ src, alt, fill, className }: ProductImageProps) {
  const [error, setError] = useState(false);
  
  // If image fails to load, show a placeholder
  if (error) {
    return (
      <div className={`${fill ? 'absolute inset-0' : 'w-full h-full'} bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-6xl mb-2">⚖️</div>
          <p className="text-sm text-gray-600 font-medium">{alt}</p>
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
