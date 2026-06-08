"use client";

import { useMemo, useState } from "react";
import DogCard from "@/components/DogCard";
import type { Dog, Especie, Sexo, Tamano } from "@/lib/types";
import { ESPECIES, SEXOS, TAMANOS, ESPECIE_LABEL, SEXO_LABEL, TAMANO_LABEL } from "@/lib/types";

export default function DogsGrid({ dogs, whatsapp }: { dogs: Dog[]; whatsapp: string }) {
  const [especie, setEspecie] = useState<Especie | "todos">("todos");
  const [sexo, setSexo] = useState<Sexo | "todos">("todos");
  const [tamano, setTamano] = useState<Tamano | "todos">("todos");
  const [mostrarAdoptados, setMostrarAdoptados] = useState(false);

  const filtrados = useMemo(() => {
    return dogs.filter((d) => {
      if (especie !== "todos" && d.species !== especie) return false;
      if (sexo !== "todos" && d.sex !== sexo) return false;
      if (tamano !== "todos" && d.size !== tamano) return false;
      if (!mostrarAdoptados && d.status === "adoptado") return false;
      return true;
    });
  }, [dogs, especie, sexo, tamano, mostrarAdoptados]);

  return (
    <div>
      {/* Filtros */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-pink-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
        <Filtro
          label="Tipo"
          value={especie}
          onChange={(v) => setEspecie(v as Especie | "todos")}
          options={[
            { value: "todos", label: "Todos" },
            ...ESPECIES.map((e) => ({ value: e, label: ESPECIE_LABEL[e] })),
          ]}
        />
        <Filtro
          label="Sexo"
          value={sexo}
          onChange={(v) => setSexo(v as Sexo | "todos")}
          options={[
            { value: "todos", label: "Todos" },
            ...SEXOS.map((s) => ({ value: s, label: SEXO_LABEL[s] })),
          ]}
        />
        <Filtro
          label="Tamaño"
          value={tamano}
          onChange={(v) => setTamano(v as Tamano | "todos")}
          options={[
            { value: "todos", label: "Todos" },
            ...TAMANOS.map((t) => ({ value: t, label: TAMANO_LABEL[t] })),
          ]}
        />
        <label className="flex items-center gap-2 text-sm text-stone-600 sm:ml-auto">
          <input
            type="checkbox"
            checked={mostrarAdoptados}
            onChange={(e) => setMostrarAdoptados(e.target.checked)}
            className="h-4 w-4 rounded border-pink-300 text-pink-500 focus:ring-pink-400"
          />
          Mostrar adoptados
        </label>
      </div>

      {/* Resultados */}
      {filtrados.length === 0 ? (
        <p className="rounded-xl bg-pink-100 p-8 text-center text-stone-600">
          No hay rescatados que coincidan con el filtro. Probá cambiar las opciones 🐾
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((dog) => (
            <DogCard key={dog.id} dog={dog} whatsapp={whatsapp} />
          ))}
        </div>
      )}
    </div>
  );
}

function Filtro({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              value === opt.value
                ? "bg-pink-500 text-white"
                : "bg-pink-50 text-pink-700 ring-1 ring-pink-200 hover:bg-pink-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
