"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Dog } from "@/lib/types";
import { SEXO_LABEL, TAMANO_LABEL, ESTADO_LABEL, ESPECIE_LABEL, ESPECIE_EMOJI } from "@/lib/types";
import DogForm from "./DogForm";
import { deleteDog } from "./actions";

const estadoStyle: Record<string, string> = {
  disponible: "bg-green-100 text-green-800",
  en_proceso: "bg-amber-100 text-amber-800",
  adoptado: "bg-stone-200 text-stone-600",
};

export default function AdminBoard({ dogs }: { dogs: Dog[] }) {
  const router = useRouter();
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<Dog | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(dog: Dog) {
    if (!confirm(`¿Borrar a "${dog.name}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(dog.id);
    const result = await deleteDog(dog.id, dog.photo_path);
    setDeletingId(null);
    if (!result.ok) {
      alert(result.error ?? "No se pudo borrar.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-600">
          Adopciones <span className="text-base font-normal text-stone-400">({dogs.length})</span>
        </h1>
        {!showNew && !editing && (
          <button
            onClick={() => setShowNew(true)}
            className="rounded-full bg-pink-500 px-4 py-2 font-semibold text-white transition hover:bg-pink-600"
          >
            + Cargar adopción
          </button>
        )}
      </div>

      {/* Form de nuevo */}
      {showNew && (
        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-stone-800">Nueva adopción</h2>
          <DogForm onDone={() => setShowNew(false)} />
        </div>
      )}

      {/* Form de edición */}
      {editing && (
        <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-stone-800">Editar: {editing.name}</h2>
          <DogForm dog={editing} onDone={() => setEditing(null)} />
        </div>
      )}

      {/* Lista */}
      {dogs.length === 0 ? (
        <p className="rounded-xl bg-pink-100 p-8 text-center text-stone-600">
          Todavía no hay adopciones cargadas. Cargá la primera 🐾
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {dogs.map((dog) => (
            <li
              key={dog.id}
              className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-3 shadow-sm"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-pink-100">
                {dog.photo_url ? (
                  <Image src={dog.photo_url} alt={dog.name} fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">
                    {ESPECIE_EMOJI[dog.species]}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-stone-800">{dog.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${estadoStyle[dog.status]}`}>
                    {ESTADO_LABEL[dog.status]}
                  </span>
                </div>
                <p className="truncate text-sm text-stone-500">
                  {ESPECIE_LABEL[dog.species]} · {SEXO_LABEL[dog.sex]} · {TAMANO_LABEL[dog.size]}
                  {dog.age ? ` · ${dog.age}` : ""}
                  {dog.neutered ? " · Castrado/a ✓" : ""}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => {
                    setShowNew(false);
                    setEditing(dog);
                  }}
                  className="rounded-full border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(dog)}
                  disabled={deletingId === dog.id}
                  className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === dog.id ? "…" : "Borrar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
