"use client";

import { useRef } from "react";
import Link from "next/link";
import DogCard from "@/components/DogCard";
import type { Dog } from "@/lib/types";

export default function AdoptionCarousel({
  dogs,
  whatsapp,
}: {
  dogs: Dog[];
  whatsapp: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  if (dogs.length === 0) return null;

  return (
    <section className="bg-[#fdf6ec]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-pink-700">Buscan un hogar</h2>
            <p className="mt-1 text-stone-500">Conocelos y escribinos para adoptar 🩷</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/adoptar"
              className="hidden rounded-full border border-pink-300 px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-50 sm:inline"
            >
              Ver todos
            </Link>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="grid h-10 w-10 place-items-center rounded-full border border-pink-300 text-pink-700 transition hover:bg-pink-50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Siguiente"
              className="grid h-10 w-10 place-items-center rounded-full border border-pink-300 text-pink-700 transition hover:bg-pink-50"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {dogs.map((dog) => (
            <div key={dog.id} className="w-72 shrink-0 snap-start">
              <DogCard dog={dog} whatsapp={whatsapp} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/adoptar"
            className="inline-block rounded-full bg-pink-500 px-6 py-3 font-bold text-white transition hover:bg-pink-600"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </section>
  );
}
