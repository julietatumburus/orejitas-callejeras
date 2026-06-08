"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Dog } from "@/lib/types";
import {
  ESPECIES,
  SEXOS,
  TAMANOS,
  ESTADOS,
  ESPECIE_LABEL,
  SEXO_LABEL,
  TAMANO_LABEL,
  ESTADO_LABEL,
} from "@/lib/types";
import { createDog, updateDog } from "./actions";

export default function DogForm({
  dog,
  onDone,
}: {
  dog?: Dog;
  onDone: () => void;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(dog);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const result = isEdit
      ? await updateDog(dog!.id, formData)
      : await createDog(formData);

    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Ocurrió un error.");
      return;
    }

    formRef.current?.reset();
    router.refresh();
    onDone();
  }

  const inputClass =
    "rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {isEdit && <input type="hidden" name="old_photo_path" value={dog!.photo_path ?? ""} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">Tipo *</span>
          <select name="species" defaultValue={dog?.species ?? "perro"} className={inputClass}>
            {ESPECIES.map((e) => (
              <option key={e} value={e}>
                {ESPECIE_LABEL[e]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">Nombre *</span>
          <input name="name" required defaultValue={dog?.name} className={inputClass} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">Edad</span>
          <input
            name="age"
            placeholder="Cachorro, 2 años…"
            defaultValue={dog?.age ?? ""}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">Sexo *</span>
          <select name="sex" defaultValue={dog?.sex ?? "macho"} className={inputClass}>
            {SEXOS.map((s) => (
              <option key={s} value={s}>
                {SEXO_LABEL[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">Tamaño *</span>
          <select name="size" defaultValue={dog?.size ?? "mediano"} className={inputClass}>
            {TAMANOS.map((t) => (
              <option key={t} value={t}>
                {TAMANO_LABEL[t]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">Estado *</span>
          <select name="status" defaultValue={dog?.status ?? "disponible"} className={inputClass}>
            {ESTADOS.map((s) => (
              <option key={s} value={s}>
                {ESTADO_LABEL[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-700">
            Foto {isEdit && <span className="text-stone-400">(dejá vacío para mantener la actual)</span>}
          </span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="text-sm file:mr-3 file:rounded-full file:border-0 file:bg-pink-100 file:px-3 file:py-1.5 file:text-pink-700"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-stone-700">Descripción / historia</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={dog?.description ?? ""}
          placeholder="Personalidad, historia, si se lleva con otros perros/gatos/niños…"
          className={inputClass}
        />
      </label>

      {isEdit && dog?.photo_url && (
        <div className="flex items-center gap-3 text-sm text-stone-500">
          <Image
            src={dog.photo_url}
            alt={dog.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-lg object-cover"
          />
          Foto actual
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-600 transition hover:bg-stone-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-pink-500 px-5 py-2 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
        >
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Agregar perrito"}
        </button>
      </div>
    </form>
  );
}
