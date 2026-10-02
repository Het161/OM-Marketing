// frontend/src/components/sections/HeroSlideshow.tsx

'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from 'react-icons/fi';

import { blurFor } from '@/lib/blur';

export interface HeroSlide {
  /** Catalogue product id, so the slide links to the real item. */
  id: number;
  src: string;
  alt: string;
  model: string;
  spec: string;
  price: string;
}

const INTERVAL = 5600;

/**
 * The hero carousel.
 *
 * Deliberately restrained: a crossfade rather than a slide, square controls,
 * a numbered counter and a progress rule — the same vocabulary as the rest of
 * the page. It pauses on hover, on keyboard focus and when the tab is hidden,
 * and does not auto-advance at all for visitors who ask for reduced motion.
 */
export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const running = !paused && !userPaused && !reduced && count > 1;

  // Auto-advance
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(timer);
  }, [running, next, index]);

  // Don't advance in a background tab
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Arrow keys when the carousel has focus
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
  };

  const slide = slides[index];

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Equipment we supply"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative h-full min-h-[24rem] overflow-hidden lg:min-h-full"
    >
      {/* Fetch the next photograph while this one is still on screen. It is
          laid out at the same size as the visible slide, so the browser picks
          the same srcset entry and the advance costs nothing. Without this a
          slide change starts from the blur placeholder every time. */}
      {count > 1 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
        >
          <Image
            src={slides[(index + 1) % count].src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Slides */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* The panel is tall and narrow; the photographs are not, and several
              are wider than they are high. Cropping them to fill would slice
              the scale in half, so the sharp copy is contained — the whole
              machine stays visible — over a blurred, darkened copy of itself
              that fills the frame. Both use the same src, so it is one
              download, and the backdrop is hidden from assistive tech. */}
          <Image
            src={slide.src}
            alt=""
            aria-hidden
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 42vw"
            placeholder={blurFor(slide.src) ? 'blur' : 'empty'}
            blurDataURL={blurFor(slide.src)}
            className="scale-110 object-cover blur-2xl saturate-50"
          />
          <span aria-hidden className="absolute inset-0 bg-ink-950/55" />
          {/* Centred in the space above the caption rather than the whole
              panel, so the photograph is not stranded in the middle with the
              model name a long way below it. */}
          <div className="absolute inset-x-0 top-0 bottom-36 lg:bottom-40">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain p-5 lg:p-8"
            />
          </div>
          {/* Unify uneven phone photography: deepen and cool each frame */}
          <span
            aria-hidden
            className="absolute inset-0 bg-ink-950/20 mix-blend-multiply"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent"
          />
        </motion.div>
      </AnimatePresence>

      {/* Register marks */}
      <span
        aria-hidden
        className="absolute left-4 top-4 h-5 w-5 border-l border-t border-white/35"
      />
      <span
        aria-hidden
        className="absolute right-4 top-4 h-5 w-5 border-r border-t border-white/35"
      />

      {/* Announce slide changes to screen readers without moving focus */}
      <p aria-live="polite" aria-atomic className="sr-only">
        Slide {index + 1} of {count}: {slide.model}, {slide.spec}
      </p>

      {/* Caption + controls */}
      {/* The fixed contact bar owns the bottom-right corner of the
          viewport, so the caption keeps clear of that column rather than
          letting the price and the progress rule run underneath it. */}
      <div className="absolute inset-x-0 bottom-0 p-5 pb-20 sm:pb-24 lg:pb-6 lg:pr-44">
        <div className="flex items-end justify-between gap-4">
          <Link
            href={`/products/${slide.id}`}
            className="group min-w-0 focus-visible:outline-offset-4"
          >
            <span className="label block text-steel-400">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(count).padStart(2, '0')}
            </span>
            <span className="mt-2 block truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-primary-300">
              {slide.model}
            </span>
            <span className="label mt-1.5 block text-steel-300">
              {slide.spec}
            </span>
          </Link>

          <div className="shrink-0 text-right">
            <span className="label block text-steel-400">From</span>
            <span className="data mt-1.5 block text-base text-white">
              {slide.price}
            </span>
          </div>
        </div>

        {/* Controls first, then the progress rule: the bottom-right corner
            is occupied by the fixed contact bar. */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center border border-white/20 text-steel-300 transition-colors hover:border-white hover:text-white"
            >
              <FiArrowLeft size={14} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Resume slideshow' : 'Pause slideshow'}
              className="-ml-px flex h-8 w-8 items-center justify-center border border-white/20 text-steel-300 transition-colors hover:border-white hover:text-white"
            >
              {userPaused ? (
                <FiPlay size={13} aria-hidden />
              ) : (
                <FiPause size={13} aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="-ml-px flex h-8 w-8 items-center justify-center border border-white/20 text-steel-300 transition-colors hover:border-white hover:text-white"
            >
              <FiArrowRight size={14} aria-hidden />
            </button>
          </div>

          <div className="flex flex-1 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${s.model}`}
                aria-current={i === index ? 'true' : undefined}
                className="group relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/25 transition-colors group-hover:bg-white/50" />
                {i === index && (
                  <motion.span
                    key={`${index}-${running}`}
                    className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-primary-300"
                    initial={{ scaleX: running ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: running ? INTERVAL / 1000 : 0,
                      ease: 'linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
