import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingPaws from "@/components/FloatingPaws";
import Reveal from "@/components/Reveal";
import { ORG, whatsappGeneralLink } from "@/lib/config";

const AYUDA_ICONS = ["🏠", "💖", "📣"];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ---------- HERO (suave, rosa empolvado) ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-100 via-pink-50 to-white">
        <FloatingPaws colorClass="text-rose-300/50" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
          <span className="enter inline-block text-7xl animate-bob">🐾</span>
          <h1
            className="enter text-4xl font-extrabold tracking-tight text-pink-700 sm:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {ORG.name}
          </h1>
          <p className="enter max-w-2xl text-lg text-stone-600 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            {ORG.tagline}
          </p>
          <p className="enter max-w-2xl text-stone-500" style={{ animationDelay: "0.3s" }}>
            {ORG.description}
          </p>
          <div
            className="enter mt-2 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/adoptar"
              className="rounded-full bg-pink-500 px-7 py-3.5 text-base font-bold text-white shadow-md shadow-pink-200 transition hover:scale-105 hover:bg-pink-600"
            >
              Ver perritos en adopción 🐶
            </Link>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-pink-200 bg-white/70 px-7 py-3.5 text-base font-semibold text-pink-600 backdrop-blur-sm transition hover:bg-white"
            >
              Contactarnos
            </a>
          </div>
        </div>

        {/* Onda suave que separa el hero del contenido */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#ffffff" d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ---------- Rastro de patitas ---------- */}
      <div className="flex justify-center gap-3 bg-white pb-2 text-2xl text-rose-300">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="animate-paw-step"
            style={{ animationDelay: `${i * 0.18}s`, transform: i % 2 ? "translateY(8px)" : "none" }}
          >
            🐾
          </span>
        ))}
      </div>

      {/* ---------- Quiénes somos ---------- */}
      <section id="nosotros" className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-pink-50 px-4 py-1 text-sm font-semibold text-pink-500 ring-1 ring-pink-100">
              Nuestra misión
            </span>
            <h2 className="text-3xl font-bold text-pink-700">Quiénes somos</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-stone-600">
              {ORG.description} Trabajamos día a día para que cada perrito rescatado de la calle
              reciba atención veterinaria, cariño y, sobre todo, una familia que lo espere. La
              adopción es responsable y gratuita: lo importante es el compromiso. 🐶
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Cómo ayudar ---------- */}
      <section id="ayudar" className="bg-pink-50/60">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-pink-700">Cómo ayudar</h2>
            <p className="mt-3 text-center text-stone-500">Hay muchas formas de sumar una patita 🐾</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {ORG.ayuda.map((item, i) => (
              <Reveal key={item.titulo} delay={i * 120}>
                <div className="group h-full rounded-3xl border border-pink-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-pink-100">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-3xl ring-1 ring-pink-100 transition group-hover:scale-110">
                    {AYUDA_ICONS[i] ?? "🐾"}
                  </div>
                  <h3 className="text-xl font-bold text-pink-600">{item.titulo}</h3>
                  <p className="mt-2 text-stone-500">{item.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Instagram (suave) ---------- */}
      {ORG.instagram && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-r from-rose-100 via-pink-100 to-fuchsia-100 p-10 text-center shadow-sm">
                <div className="animate-blob absolute -right-10 -top-10 h-40 w-40 bg-white/40" aria-hidden="true" />
                <div className="relative">
                  <p className="text-4xl">📸</p>
                  <h2 className="mt-3 text-2xl font-bold text-pink-700 sm:text-3xl">Seguinos en Instagram</h2>
                  <p className="mx-auto mt-2 max-w-xl text-stone-600">
                    Conocé a los rescatados, sus historias y enterate de cómo colaborar.
                  </p>
                  <a
                    href={ORG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-md shadow-pink-200 transition hover:scale-105 hover:bg-pink-600"
                  >
                    @orejitascallejeras_
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- CTA final (suave) ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-rose-100">
        <FloatingPaws colorClass="text-rose-300/40" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center">
          <span className="text-5xl animate-wiggle">🐾</span>
          <h2 className="text-3xl font-bold text-pink-700 sm:text-4xl">¿Listo para cambiar una vida?</h2>
          <p className="max-w-xl text-lg text-stone-600">
            Conocé a los perritos que están esperando un hogar.
          </p>
          <Link
            href="/adoptar"
            className="rounded-full bg-pink-500 px-8 py-4 text-base font-bold text-white shadow-md shadow-pink-200 transition hover:scale-105 hover:bg-pink-600"
          >
            Ver perritos en adopción 🐶
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
