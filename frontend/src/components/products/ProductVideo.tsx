// frontend/src/components/products/ProductVideo.tsx

'use client';

import { useRef, useState } from 'react';
import { FiPlay } from 'react-icons/fi';

/**
 * A demonstration clip on a product page.
 *
 * Nothing is downloaded until someone asks for it: the player shows a poster
 * frame and only sets `preload` once play is pressed. These are shop-floor
 * videos of a few megabytes, and most visitors are on a phone connection — a
 * clip that autoplays would cost them more than the rest of the page put
 * together.
 */
export default function ProductVideo({
  src,
  poster,
  label,
  aspect,
}: {
  src: string;
  poster?: string;
  label: string;
  /** Tailwind aspect class, e.g. "aspect-[9/16]". Set it for a clip whose
      shape is known, so the frame matches the film instead of leaving bars
      down the sides. */
  aspect?: string;
}) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    // The element exists already; play on the next tick, once `controls` and
    // the real preload are in place.
    requestAnimationFrame(() => void videoRef.current?.play().catch(() => {}));
  };

  return (
    <div
      className={`relative overflow-hidden border border-line bg-ink-950 ${aspect ?? ''}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        preload="none"
        playsInline
        aria-label={label}
        className={
          aspect
            ? 'absolute inset-0 h-full w-full object-cover'
            : 'mx-auto block max-h-[26rem] w-full object-contain'
        }
      />

      {!started && (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 flex items-center justify-center bg-ink-950/35 transition-colors hover:bg-ink-950/20"
        >
          <span className="flex h-14 w-14 items-center justify-center border border-white/30 bg-ink-950/80 text-white transition-colors group-hover:border-white group-hover:bg-ink-950">
            <FiPlay size={20} aria-hidden />
          </span>
          <span className="sr-only">Play {label}</span>
        </button>
      )}
    </div>
  );
}
