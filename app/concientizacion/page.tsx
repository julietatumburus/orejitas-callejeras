import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FloatingPaws from "@/components/FloatingPaws";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Concientización y Bienestar Animal — Orejitas Callejeras",
  description:
    "Educar con empatía: concientización sobre el cuidado, el respeto y los derechos de los animales. Qué hacer ante un caso de maltrato (Ley 14.346).",
};

export const dynamic = "force-dynamic";

export default async function ConcientizacionPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#b23c75] via-[#e0518f] to-[#f56fa3] text-[#fdf3e8]">
        <FloatingPaws colorClass="text-[#fdf3e8]/22" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fdf3e8]/80">
            Educar con empatía
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            Concientización y Bienestar Animal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#fdf3e8]/90">
            Pequeñas acciones cambian vidas. Conocé por qué los animales merecen respeto y cómo
            podés ayudar a protegerlos.
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
          {/* Qué es la empatía */}
          <Reveal>
            <article>
              <h2 className="text-2xl font-bold text-pink-700">¿Qué es la empatía?</h2>
              <p className="mt-3 text-stone-600">
                Es la capacidad de identificarse con alguien y compartir sus sentimientos. Es uno de
                los pilares de la inteligencia emocional y está relacionada con la comprensión, el
                apoyo y la escucha activa. Sus beneficios son enormes: desde sentirnos mejor con
                nosotros mismos hasta mejorar nuestras habilidades sociales.
              </p>
              <p className="mt-3 text-stone-600">
                La empatía debemos tenerla todos, pero suele relacionarse con el más “débil”: los
                animales, los niños y los adultos mayores. Los jóvenes, como agentes de cambio,
                pueden impulsar acciones que despierten la sensibilidad hacia el otro.
              </p>
            </article>
          </Reveal>

          {/* Seres sintientes */}
          <Reveal>
            <article className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-pink-700">Los animales son seres sintientes</h2>
              <p className="mt-3 text-stone-600">
                Tienen pensamientos, sentimientos y personalidades propias. Algunos incluso
                experimentan emociones como el duelo o la empatía. Son <strong>individuos, no
                objetos ni recursos</strong>.
              </p>
              <p className="mt-3 text-stone-600">
                Si los animales sienten, entonces nuestro trato hacia ellos importa: tenemos la
                responsabilidad de protegerlos del sufrimiento y garantizarles una vida digna,
                acorde a sus necesidades físicas y emocionales.
              </p>
            </article>
          </Reveal>

          {/* Cuidado y respeto */}
          <Reveal>
            <article>
              <h2 className="text-2xl font-bold text-pink-700">Importancia del cuidado y el respeto</h2>
              <ul className="mt-4 flex flex-col gap-3 text-stone-600">
                {[
                  "Cuidar y respetar a los animales contribuye a su bienestar y a una convivencia más armoniosa entre todos los seres vivos.",
                  "El maltrato y el abandono causan sufrimiento físico y emocional. Son conductas que deben prevenirse.",
                  "Tener una mascota implica brindarle alimento, agua, atención veterinaria, afecto y un entorno seguro durante toda su vida.",
                  "El respeto, la solidaridad y la responsabilidad construyen relaciones más sanas con las personas y los animales.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 text-pink-500">●</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Cómo ayudar */}
          <Reveal>
            <article className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-100 to-[#f1ddcf] p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-pink-700">¿Cómo podemos ayudar?</h2>
              <ul className="mt-4 grid gap-3 text-stone-700 sm:grid-cols-2">
                {[
                  "💧 Dejar un recipiente con agua, sobre todo los días de calor.",
                  "🌙 Resguardarlos en las noches de frío.",
                  "🦴 Darles alimento.",
                  "🏠 Ofrecerte como hogar de tránsito.",
                  "💗 Promover valores como la empatía y la solidaridad.",
                  "📦 Armar un refugio simple con una caja de cartón y una manta.",
                ].map((t) => (
                  <li key={t} className="rounded-xl bg-white/70 px-4 py-3">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-center font-semibold text-pink-700">
                Todo gran cambio empieza con una pequeña acción. ¿Qué esperás para hacer la tuya?
              </p>
            </article>
          </Reveal>

          {/* Ley 14.346 */}
          <Reveal>
            <article className="rounded-3xl border-2 border-pink-300 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h2 className="text-2xl font-bold text-pink-700">
                    ¿Qué hacer ante un caso de maltrato?
                  </h2>
                  <p className="text-sm font-semibold text-stone-500">
                    Ley 14.346 — ley penal contra el maltrato y la crueldad animal
                  </p>
                </div>
              </div>
              <ol className="mt-5 flex flex-col gap-3 text-stone-600">
                {[
                  "Imprimí la ley y dirigite a la comisaría de tu zona (o de la zona donde ocurre el hecho).",
                  "Llevá PRUEBAS: fotos, videos, testigos y parte médico veterinario.",
                  "La policía DEBE tomar tu denuncia. Si no lo hace, está incumpliendo sus obligaciones como funcionario público.",
                  "Pedí una copia de tu denuncia y preguntá a qué fiscalía pasa y en cuánto tiempo.",
                  "Dirigite a la fiscalía que recibió la denuncia (Av. Sarmiento 431, Tucumán) para ratificarla.",
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

          {/* Antes y después */}
          <Reveal>
            <article>
              <h2 className="text-2xl font-bold text-pink-700">Antes y después de nuestros rescatados</h2>
              <p className="mt-2 text-stone-600">
                Con atención veterinaria, cuidado y mucho amor, esta transformación es posible. Vos
                podés marcar la diferencia.
              </p>
              <div className="mt-6 flex flex-col gap-6">
                {[
                  { antes: "/antes-despues/antes-1.jpeg", despues: "/antes-despues/despues-1.jpeg" },
                  { antes: "/antes-despues/antes-2.jpeg", despues: "/antes-despues/despues-2.jpeg" },
                ].map((par, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3 sm:gap-5">
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                      <Image
                        src={par.antes}
                        alt="Rescatado antes"
                        fill
                        sizes="(max-width: 640px) 45vw, 340px"
                        className="object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-stone-900/70 px-2.5 py-1 text-xs font-semibold text-white">
                        Antes
                      </span>
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                      <Image
                        src={par.despues}
                        alt="Rescatado después"
                        fill
                        sizes="(max-width: 640px) 45vw, 340px"
                        className="object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-pink-500 px-2.5 py-1 text-xs font-semibold text-white">
                        Después
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-[#e0518f] to-[#b23c75] p-8 text-center text-[#fdf3e8]">
              <h2 className="text-2xl font-bold">Vos podés marcar la diferencia</h2>
              <p className="mx-auto mt-2 max-w-xl text-[#fdf3e8]/90">
                Adoptá, transitá o difundí. Cada gesto ayuda a salvar vidas.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/adoptar"
                  className="rounded-full bg-[#fdf3e8] px-6 py-3 font-bold text-pink-800 transition hover:scale-105"
                >
                  Ver en adopción
                </Link>
                <Link
                  href="/#ayudar"
                  className="rounded-full border border-[#fdf3e8]/50 px-6 py-3 font-semibold text-[#fdf3e8] transition hover:bg-white/10"
                >
                  Cómo ayudar
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
