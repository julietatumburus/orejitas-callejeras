import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FloatingPaws from "@/components/FloatingPaws";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Ser tránsito — Orejitas Callejeras",
  description:
    "Qué es ser tránsito: darle un hogar temporal a un rescatado hasta que encuentre su familia. La fundación cubre todos los gastos.",
};

export const dynamic = "force-dynamic";

const GALERIA = ["feliz-0", "feliz-1", "feliz-2", "feliz-3", "feliz-4", "feliz-5"];

export default async function TransitoPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#b23c75] via-[#e0518f] to-[#f56fa3] text-[#fdf3e8]">
        <FloatingPaws colorClass="text-[#fdf3e8]/22" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fdf3e8]/80">
            Sumate
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">¿Qué es ser tránsito?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#fdf3e8]/90">
            Es recibir en tu hogar a un rescatado: <strong>el que vos decidas</strong> y por{" "}
            <strong>el tiempo que puedas</strong>.
          </p>
        </div>
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#fdf6ec" d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      <main className="bg-[#fdf6ec]">
        <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16">
          {/* Pero ser tránsito también es */}
          <Reveal>
            <article className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-pink-700">Pero ser tránsito también es…</h2>
              <ul className="mt-4 flex flex-col gap-3 text-stone-600">
                {[
                  "Ser un puente para una futura familia.",
                  "Ser el espacio seguro que los separa de la calle, la indiferencia y el maltrato.",
                  "Ser el lugar donde vuelven a recuperar la confianza y el amor, y dejan atrás el dolor.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 text-pink-500">🤍</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Qué tener en cuenta */}
          <Reveal>
            <article>
              <h2 className="text-2xl font-bold text-pink-700">¿Qué tener en cuenta al transitar?</h2>
              <ol className="mt-4 flex flex-col gap-3 text-stone-600">
                {[
                  "La fundación se hace cargo de todos los gastos: comida, veterinario, traslados, emergencias, etc.",
                  "Las decisiones sobre la veterinaria donde se atiende y su posterior tránsito o adopción las toma la fundación.",
                  "Un rescatado no siempre sabe enseguida hacer sus necesidades, pasear o no romper cosas. Hace falta mucha PACIENCIA, amor y dedicación: es normal que necesite un tiempo de adaptación.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pink-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>

          {/* Si ya no puedo */}
          <Reveal>
            <article className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-100 to-[#f1ddcf] p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-pink-700">
                ¿Y si ya no puedo tenerlo en tránsito?
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-stone-700">
                {[
                  "Informá a la agrupación sobre la situación.",
                  "Si no se puede resolver el problema, avisanos.",
                  "Danos tiempo para encontrar otro tránsito: nos comprometemos a hacerlo lo más rápido posible.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 text-pink-500">●</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Frase */}
          <Reveal>
            <blockquote className="rounded-3xl bg-pink-50 p-8 text-center text-lg font-semibold italic text-pink-700 ring-1 ring-pink-100">
              “Transitar es ver el dolor convertirse en alegría. Decir adiós duele un momento, pero
              saber que salvaste una vida te acompaña para siempre 🤍”
            </blockquote>
          </Reveal>

          {/* Galería */}
          <Reveal>
            <article>
              <h2 className="text-2xl font-bold text-pink-700">Finales felices</h2>
              <p className="mt-2 text-stone-600">Gracias a los tránsitos, esto es posible.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {GALERIA.map((name) => (
                  <div key={name} className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                    <Image
                      src={`/transito/${name}.png`}
                      alt="Rescatado feliz"
                      fill
                      sizes="(max-width: 640px) 45vw, 220px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-[#e0518f] to-[#b23c75] p-8 text-center text-[#fdf3e8]">
              <h2 className="text-2xl font-bold">¿Te animás a ser tránsito?</h2>
              <p className="mx-auto mt-2 max-w-xl text-[#fdf3e8]/90">
                Escribinos y te contamos cómo empezar. ¡Cada hogar temporal salva una vida!
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#fdf3e8] px-6 py-3 font-bold text-pink-800 transition hover:scale-105"
                  >
                    Quiero ser tránsito
                  </a>
                )}
                <Link
                  href="/adoptar"
                  className="rounded-full border border-[#fdf3e8]/50 px-6 py-3 font-semibold text-[#fdf3e8] transition hover:bg-white/10"
                >
                  Ver en adopción
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
