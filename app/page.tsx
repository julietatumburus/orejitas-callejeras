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

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-400 to-rose-400 text-white">
        <FloatingPaws />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
          <span className="enter inline-block text-7xl animate-bob" style={{ animationDelay: "0s" }}>
            🐾
          </span>
          <h1
            className="enter text-4xl font-extrabold tracking-tight drop-shadow-sm sm:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {ORG.name}
          </h1>
          <p className="enter max-w-2xl text-lg text-pink-50 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            {ORG.tagline}
          </p>
          <p className="enter max-w-2xl text-pink-100" style={{ animationDelay: "0.3s" }}>
            {ORG.description}
          </p>
          <div
            className="enter mt-2 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/adoptar"
              className="rounded-full bg-white px-7 py-3.5 text-base font-bold text-pink-600 shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              Ver perritos en adopción 🐶
            </Link>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/80 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Contactarnos
            </a>
          </div>
        </div>

        {/* Onda decorativa que separa el hero del contenido */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#fdf2f8" d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ---------- Rastro de patitas ---------- */}
      <div className="flex justify-center gap-3 bg-pink-50 pb-2 text-2xl">
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
      <section id="nosotros" className="bg-pink-50">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-600">
              Nuestra misión
            </span>
            <h2 className="text-3xl font-bold text-pink-600">Quiénes somos</h2>
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
      <section id="ayudar" className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-pink-600">Cómo ayudar</h2>
            <p className="mt-3 text-center text-stone-500">Hay muchas formas de sumar una patita 🐾</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {ORG.ayuda.map((item, i) => (
              <Reveal key={item.titulo} delay={i * 120}>
                <div className="group h-full rounded-3xl border border-pink-100 bg-gradient-to-b from-white to-pink-50 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-xl">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl transition group-hover:scale-110">
                    {AYUDA_ICONS[i] ?? "🐾"}
                  </div>
                  <h3 className="text-xl font-bold text-pink-600">{item.titulo}</h3>
                  <p className="mt-2 text-stone-600">{item.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Instagram ---------- */}
      {ORG.instagram && (
        <section className="bg-pink-50">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400 p-10 text-center text-white shadow-lg">
                <div className="animate-blob absolute -right-10 -top-10 h-40 w-40 bg-white/15" aria-hidden="true" />
                <div className="relative">
                  <p className="text-4xl">📸</p>
                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Seguinos en Instagram</h2>
                  <p className="mx-auto mt-2 max-w-xl text-pink-50">
                    Conocé a los rescatados, sus historias y enterate de cómo colaborar.
                  </p>
                  <a
                    href={ORG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-pink-600 shadow-md transition hover:scale-105"
                  >
                    @orejitascallejeras_
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- CTA final ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-400 text-white">
        <FloatingPaws />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center">
          <span className="text-5xl animate-wiggle">🐾</span>
          <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para cambiar una vida?</h2>
          <p className="max-w-xl text-lg text-pink-50">
            Conocé a los perritos que están esperando un hogar.
          </p>
          <Link
            href="/adoptar"
            className="rounded-full bg-white px-8 py-4 text-base font-bold text-pink-600 shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            Ver perritos en adopción 🐶
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
