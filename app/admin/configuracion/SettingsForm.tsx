"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings, AyudaItem } from "@/lib/types";
import { saveSettings } from "./actions";

const inputClass =
  "rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200";

export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [ayuda, setAyuda] = useState<AyudaItem[]>(settings.ayuda);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    formData.set("ayuda", JSON.stringify(ayuda));
    const res = await saveSettings(formData);
    setSaving(false);
    if (!res.ok) {
      setMsg({ ok: false, text: res.error ?? "Ocurrió un error." });
      return;
    }
    setMsg({ ok: true, text: "¡Guardado! Los cambios ya están en la web." });
    router.refresh();
  }

  function updateAyuda(i: number, field: keyof AyudaItem, value: string) {
    setAyuda((prev) => prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a)));
  }
  function addAyuda() {
    setAyuda((prev) => [...prev, { titulo: "", texto: "" }]);
  }
  function removeAyuda(i: number) {
    setAyuda((prev) => prev.filter((_, idx) => idx !== i));
  }

  function Field({
    label,
    name,
    defaultValue,
    placeholder,
    textarea,
  }: {
    label: string;
    name: string;
    defaultValue: string;
    placeholder?: string;
    textarea?: boolean;
  }) {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-stone-700">{label}</span>
        {textarea ? (
          <textarea name={name} rows={3} defaultValue={defaultValue} placeholder={placeholder} className={inputClass} />
        ) : (
          <input name={name} defaultValue={defaultValue} placeholder={placeholder} className={inputClass} />
        )}
      </label>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Textos de la landing */}
      <section className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-stone-800">Textos del inicio</h2>
        <div className="flex flex-col gap-4">
          <Field label="Nombre de la organización *" name="name" defaultValue={settings.name} />
          <Field label="Eslogan" name="tagline" defaultValue={settings.tagline} />
          <Field label="Descripción" name="description" defaultValue={settings.description} textarea />
        </div>
      </section>

      {/* Contacto */}
      <section className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-bold text-stone-800">Contacto (footer)</h2>
        <p className="mb-4 text-xs text-stone-400">Dejá un campo vacío para ocultar ese botón.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="WhatsApp (solo números, con país)"
            name="whatsapp"
            defaultValue={settings.whatsapp}
            placeholder="5491122334455"
          />
          <Field label="Email" name="email" defaultValue={settings.email} placeholder="contacto@..." />
          <Field label="Instagram (URL)" name="instagram" defaultValue={settings.instagram} placeholder="https://instagram.com/..." />
          <Field label="Facebook (URL)" name="facebook" defaultValue={settings.facebook} placeholder="https://facebook.com/..." />
        </div>
      </section>

      {/* Tarjetas Cómo ayudar */}
      <section className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-800">Tarjetas “Cómo ayudar”</h2>
          <button
            type="button"
            onClick={addAyuda}
            className="rounded-full bg-pink-100 px-3 py-1.5 text-sm font-semibold text-pink-700 transition hover:bg-pink-200"
          >
            + Agregar
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {ayuda.length === 0 && <p className="text-sm text-stone-400">No hay tarjetas.</p>}
          {ayuda.map((a, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-stone-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  value={a.titulo}
                  onChange={(e) => updateAyuda(i, "titulo", e.target.value)}
                  placeholder="Título (ej: Adoptá)"
                  className={`${inputClass} flex-1 font-semibold`}
                />
                <button
                  type="button"
                  onClick={() => removeAyuda(i)}
                  className="rounded-full border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                >
                  Quitar
                </button>
              </div>
              <textarea
                value={a.texto}
                onChange={(e) => updateAyuda(i, "texto", e.target.value)}
                rows={2}
                placeholder="Descripción de la tarjeta"
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      {msg && (
        <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-600"}`}>{msg.text}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-pink-500 px-6 py-2.5 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
