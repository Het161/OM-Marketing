// frontend/src/components/sections/StoryFilms.tsx

'use client';

import { useState } from 'react';

import ProductVideo from '@/components/products/ProductVideo';

export interface StoryFilm {
  src: string;
  poster: string;
  /** Shown on the button — the language is the thing a viewer is choosing. */
  language: string;
  duration: string;
  label: string;
}

/**
 * The same argument, told twice, in two languages.
 *
 * Both films are portrait and make the same case, so showing them side by side
 * would halve each one and ask the viewer to watch the same story twice. A
 * language switch is the honest control: pick one, watch it full size. The
 * player is keyed on the source so switching resets it to the poster rather
 * than leaving the previous film's frame behind.
 */
export default function StoryFilms({ films }: { films: StoryFilm[] }) {
  const [index, setIndex] = useState(0);
  const film = films[index];

  return (
    <div className="mx-auto w-full max-w-[20rem]">
      {films.length > 1 && (
        <div
          role="group"
          aria-label="Choose a language"
          className="mb-3 flex border border-ink-800"
        >
          {films.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={`label -ml-px flex-1 px-3 py-2.5 transition-colors first:ml-0 ${
                i === index
                  ? 'bg-steel-50 text-ink-950'
                  : 'text-steel-400 hover:bg-ink-900 hover:text-white'
              }`}
            >
              {f.language}
            </button>
          ))}
        </div>
      )}

      <ProductVideo
        key={film.src}
        src={film.src}
        poster={film.poster}
        aspect="aspect-[9/16]"
        label={film.label}
      />

      <p className="label mt-3 text-steel-500">
        {film.duration} · {film.language}
      </p>
    </div>
  );
}
