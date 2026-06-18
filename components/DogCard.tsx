import Image from "next/image";
import type { Dog } from "@/lib/types";
import { SEXO_LABEL, TAMANO_LABEL, ESTADO_LABEL, ESPECIE_LABEL, ESPECIE_EMOJI } from "@/lib/types";
import WhatsAppButton from "./WhatsAppButton";

const estadoStyle: Record<string, string> = {
  disponible: "bg-green-100 text-green-800",
  en_proceso: "bg-amber-100 text-amber-800",
  adoptado: "bg-stone-200 text-stone-600",
};

export default function DogCard({ dog, whatsapp }: { dog: Dog; whatsapp: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-pink-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full bg-pink-100">
        {dog.photo_url ? (
          <Image
            src={dog.photo_url}
            alt={dog.name}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            {ESPECIE_EMOJI[dog.species]}
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
            estadoStyle[dog.status] ?? estadoStyle.disponible
          }`}
        >
          {ESTADO_LABEL[dog.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-bold text-pink-700">{dog.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
            <span className="rounded-full bg-pink-50 px-2 py-0.5 text-pink-700 ring-1 ring-pink-200">
              {ESPECIE_EMOJI[dog.species]} {ESPECIE_LABEL[dog.species]}
            </span>
            <span className="rounded-full bg-pink-50 px-2 py-0.5 text-pink-700 ring-1 ring-pink-200">
              {SEXO_LABEL[dog.sex]}
            </span>
            <span className="rounded-full bg-pink-50 px-2 py-0.5 text-pink-700 ring-1 ring-pink-200">
              {TAMANO_LABEL[dog.size]}
            </span>
            {dog.age && (
              <span className="rounded-full bg-pink-50 px-2 py-0.5 text-pink-700 ring-1 ring-pink-200">
                {dog.age}
              </span>
            )}
            {dog.neutered && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700 ring-1 ring-green-200">
                ✓ {dog.sex === "hembra" ? "Castrada" : "Castrado"}
              </span>
            )}
          </div>
        </div>

        {dog.description && (
          <p className="line-clamp-3 text-sm text-stone-600">{dog.description}</p>
        )}

        <div className="mt-auto pt-2">
          {dog.status === "adoptado" ? (
            <p className="text-center text-sm font-medium text-stone-500">
              ¡Ya encontró su hogar! 🏡
            </p>
          ) : dog.whatsapp || whatsapp ? (
            <WhatsAppButton
              whatsapp={dog.whatsapp || whatsapp}
              dogName={dog.name}
              emoji={ESPECIE_EMOJI[dog.species]}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
