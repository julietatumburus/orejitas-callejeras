"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { clearMustChange } from "./actions";
import { signOut } from "../actions";

const RULES = [
  { label: "Al menos 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una mayúscula (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Un número (0-9)", test: (p: string) => /[0-9]/.test(p) },
  { label: "Un símbolo (!@#$…)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function ChangePasswordForm({ expired }: { expired: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (expired) {
    return (
      <div className="text-center">
        <p className="text-5xl">⌛</p>
        <h1 className="mt-3 text-xl font-bold text-stone-800">Tu clave temporal venció</h1>
        <p className="mt-2 text-stone-600">
          Las contraseñas temporales duran 15 minutos. Pedile a un administrador que te reenvíe el
          acceso.
        </p>
        <form action={signOut} className="mt-6">
          <button className="rounded-full border border-stone-300 px-5 py-2.5 font-medium text-stone-600 transition hover:bg-stone-100">
            Cerrar sesión
          </button>
        </form>
      </div>
    );
  }

  const checks = RULES.map((r) => ({ label: r.label, ok: r.test(password) }));
  const allOk = checks.every((c) => c.ok);
  const matches = password.length > 0 && password === confirm;
  const canSubmit = allOk && matches && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!allOk) return setError("La contraseña no cumple todos los requisitos.");
    if (!matches) return setError("Las contraseñas no coinciden.");

    setLoading(true);
    const supabase = createClient();
    const { error: updErr } = await supabase.auth.updateUser({ password });
    if (updErr) {
      setLoading(false);
      return setError("No se pudo actualizar la contraseña. Probá con otra.");
    }
    const res = await clearMustChange();
    setLoading(false);
    if (!res.ok) return setError(res.error ?? "Ocurrió un error.");

    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <h1 className="mb-1 text-center text-xl font-bold text-stone-800">Creá tu contraseña</h1>
      <p className="mb-6 text-center text-sm text-stone-500">
        Por seguridad, definí una contraseña nueva para tu cuenta.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700">Nueva contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        {/* Requisitos en vivo */}
        <ul className="flex flex-col gap-1 rounded-lg bg-pink-50 p-3 text-sm">
          {checks.map((c) => (
            <li
              key={c.label}
              className={`flex items-center gap-2 ${c.ok ? "text-green-600" : "text-stone-500"}`}
            >
              <span>{c.ok ? "✓" : "○"}</span>
              {c.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700">Repetir contraseña</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
          {confirm.length > 0 && !matches && (
            <span className="text-xs text-red-600">Las contraseñas no coinciden.</span>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-full bg-pink-500 px-4 py-2.5 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? "Guardando…" : "Guardar y entrar"}
        </button>
      </form>
    </>
  );
}
