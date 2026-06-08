import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ORG, whatsappGeneralLink } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero — banda rosa estilo marca */}
      <section className="bg-pink-500 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
          <span className="text-6xl">🐾</span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{ORG.name}</h1>
          <p className="max-w-2xl text-lg text-pink-50">{ORG.tagline}</p>
          <p className="max-w-2xl text-pink-100">{ORG.description}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/adoptar"
              className="rounded-full bg-white px-6 py-3 text-base font-semibold text-pink-600 shadow-sm transition hover:bg-pink-50"
            >
              Ver perritos en adopción 🐶
            </Link>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/70 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Contactarnos
            </a>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-pink-600">Quiénes somos</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-stone-600">
            {ORG.description} Trabajamos día a día para que cada perrito rescatado de la
            calle reciba atención veterinaria, cariño y, sobre todo, una familia que lo
            espere. La adopción es responsable y gratuita: lo importante es el compromiso.
          </p>
        </div>
      </section>

      {/* Cómo ayudar */}
      <section id="ayudar" className="bg-pink-50">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-pink-600">Cómo ayudar</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {ORG.ayuda.map((item) => (
              <div
                key={item.titulo}
                className="rounded-2xl border border-pink-200 bg-white p-6 text-center shadow-sm"
              >
                <h3 className="text-lg font-bold text-pink-600">{item.titulo}</h3>
                <p className="mt-2 text-sm text-stone-600">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-pink-500">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-14 text-center text-white">
          <h2 className="text-2xl font-bold">¿Listo para cambiar una vida?</h2>
          <p className="max-w-xl text-pink-50">
            Conocé a los perritos que están esperando un hogar.
          </p>
          <Link
            href="/adoptar"
            className="rounded-full bg-white px-6 py-3 text-base font-semibold text-pink-600 shadow-sm transition hover:bg-pink-50"
          >
            Ver perritos en adopción
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
