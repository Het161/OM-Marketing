// frontend/src/components/products/ProductCardSkeleton.tsx

/**
 * Placeholder shown while products load — same shape and height as a real
 * card, so the grid never jumps when data arrives (no layout shift).
 */
export default function ProductCardSkeleton() {
  return (
    <div className="card flex h-full flex-col" aria-hidden>
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <div className="skeleton mb-2 h-5 w-[85%]" />
        <div className="skeleton mb-4 h-5 w-[60%]" />
        <div className="skeleton mb-2 h-3.5 w-full" />
        <div className="skeleton mb-6 h-3.5 w-[70%]" />
        <div className="mt-auto">
          <div className="skeleton mb-4 h-8 w-28" />
          <div className="flex gap-2">
            <div className="skeleton h-11 flex-1" />
            <div className="skeleton h-11 w-11" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading products…</span>
    </div>
  );
}
