import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingPaws from "@/components/FloatingPaws";
import Reveal from "@/components/Reveal";
import DonationBanner from "@/components/DonationBanner";
import { whatsappGeneralLink } from "@/lib/config";
import { getSettings } from "@/lib/settings";

const AYUDA_ICONS = ["🏠", "🛏️", "💖", "📣"];

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />

      {/* ---------- HERO (oscuro, rosa vino + letras crema) ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-rose-900 to-rose-800 text-[#f7ecdc]">
        <FloatingPaws colorClass="text-rose-200/15" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
          <span className="enter inline-block text-7xl animate-bob">🐾</span>
          <h1
            className="enter text-4xl font-extrabold tracking-tight sm:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {settings.name}
          </h1>
          <p className="enter max-w-2xl text-lg text-rose-100 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            {settings.tagline}
          </p>
          <p className="enter max-w-2xl text-rose-200/90" style={{ animationDelay: "0.3s" }}>
            {settings.description}
          </p>
          <div
            className="enter mt-2 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/adoptar"
              className="rounded-full bg-[#f7ecdc] px-7 py-3.5 text-base font-bold text-rose-900 shadow-lg transition hover:scale-105 hover:bg-white"
            >
              Adoptá 🐾
            </Link>
            {settings.whatsapp && (
              <a
                href={whatsappGeneralLink(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#f7ecdc]/40 px-7 py-3.5 text-base font-semibold text-[#f7ecdc] transition hover:bg-white/10"
              >
                Contactarnos
              </a>
            )}
          </div>
        </div>

        {/* Onda que separa el hero del contenido crema */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#fdf6ec" d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ---------- Rastro de patitas ---------- */}
      <div className="flex justify-center gap-3 bg-[#fdf6ec] pb-2 text-2xl text-rose-300">
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
      <section id="nosotros" className="bg-[#fdf6ec]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-rose-100 px-4 py-1 text-sm font-semibold text-rose-700">
              Nuestra misión
            </span>
            <h2 className="text-3xl font-bold text-rose-800">Quiénes somos</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-stone-600">
              {settings.description} Trabajamos día a día para que cada animalito rescatado de la
              calle reciba atención veterinaria, cariño y, sobre todo, una familia que lo espere. La
              adopción es responsable y gratuita: lo importante es el compromiso. 🐾
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Cómo ayudar ---------- */}
      <section id="ayudar" className="bg-[#f7ecdc]">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-rose-800">Cómo ayudar</h2>
            <p className="mt-3 text-center text-stone-500">Hay muchas formas de sumar una patita 🐾</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {settings.ayuda.map((item, i) => (
              <Reveal key={`${item.titulo}-${i}`} delay={i * 120}>
                <div className="group h-full rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-rose-100">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-3xl ring-1 ring-rose-100 transition group-hover:scale-110">
                    {AYUDA_ICONS[i] ?? "🐾"}
                  </div>
                  <h3 className="text-xl font-bold text-rose-700">{item.titulo}</h3>
                  <p className="mt-2 text-stone-500">{item.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {settings.alias && (
            <Reveal>
              <DonationBanner alias={settings.alias} />
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Instagram (cálido) ---------- */}
      {settings.instagram && (
        <section className="bg-[#fdf6ec]">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-100 to-[#f1ddcf] p-10 text-center shadow-sm">
                <div className="animate-blob absolute -right-10 -top-10 h-40 w-40 bg-white/40" aria-hidden="true" />
                <div className="relative">
                  <p className="text-4xl">📸</p>
                  <h2 className="mt-3 text-2xl font-bold text-rose-800 sm:text-3xl">Seguinos en Instagram</h2>
                  <p className="mx-auto mt-2 max-w-xl text-stone-600">
                    Conocé a los rescatados, sus historias y enterate de cómo colaborar.
                  </p>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-700 px-6 py-3 font-bold text-[#f7ecdc] shadow-md transition hover:scale-105 hover:bg-rose-800"
                  >
                    Ver Instagram
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- CTA final (oscuro) ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-900 to-rose-800 text-[#f7ecdc]">
        <FloatingPaws colorClass="text-rose-200/15" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center">
          <span className="text-5xl animate-wiggle">🐾</span>
          <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para cambiar una vida?</h2>
          <p className="max-w-xl text-lg text-rose-100">
            Conocé a los perritos y gatitos que están esperando un hogar.
          </p>
          <Link
            href="/adoptar"
            className="rounded-full bg-[#f7ecdc] px-8 py-4 text-base font-bold text-rose-900 shadow-lg transition hover:scale-105 hover:bg-white"
          >
            Adoptá 🐾
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
