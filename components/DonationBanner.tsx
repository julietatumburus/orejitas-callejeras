"use client";

import { useState } from "react";

/** Banner de donación con el alias y un botón para copiarlo. */
export default function DonationBanner({ alias }: { alias: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* algunos navegadores bloquean el portapapeles: no pasa nada */
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-100 to-[#f1ddcf] p-8 text-center shadow-sm">
      <p className="text-3xl">💗</p>
      <h3 className="mt-2 text-xl font-bold text-rose-800">Hacé tu donación</h3>
      <p className="mt-1 text-stone-600">Tu aporte nos ayuda a seguir rescatando 🐾</p>

      <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-rose-200">
        <span className="text-sm text-stone-400">Alias</span>
        <span className="font-mono text-base font-semibold text-rose-800">{alias}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-rose-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-800"
        >
          {copied ? "¡Copiado! ✓" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
