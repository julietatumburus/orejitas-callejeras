import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DogsGrid from "./DogsGrid";
import { createClient } from "@/lib/supabase/server";
import type { Dog } from "@/lib/types";

// Siempre datos frescos (poco tráfico, no hace falta cachear).
export const dynamic = "force-dynamic";

export default async function AdoptarPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dogs")
    .select("*")
    .order("created_at", { ascending: false });

  const dogs = (data ?? []) as Dog[];

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-pink-600">Perritos en adopción</h1>
          <p className="mt-2 text-stone-600">
            Filtrá por tamaño y sexo. Tocá <span className="font-semibold">Quiero saber más</span>{" "}
            para escribirnos por WhatsApp 🐾
          </p>
        </header>

        {error ? (
          <p className="rounded-xl bg-red-50 p-6 text-center text-red-700">
            No pudimos cargar los perritos. Intentá de nuevo en un rato.
          </p>
        ) : (
          <DogsGrid dogs={dogs} />
        )}
      </main>
      <Footer />
    </>
  );
}
