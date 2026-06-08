"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ORG } from "@/lib/config";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-pink-200 bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 block text-center text-lg font-bold text-pink-600">
          🐾 {ORG.name}
        </Link>
        <h1 className="mb-1 text-center text-xl font-bold text-stone-800">Panel de administración</h1>
        <p className="mb-6 text-center text-sm text-stone-500">Ingresá con tu cuenta</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-pink-500 px-4 py-2.5 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          ¿No tenés cuenta?{" "}
          <Link href="/admin/signup" className="font-semibold text-pink-600 hover:underline">
            Registrate
          </Link>
        </p>
        <Link href="/" className="mt-3 block text-center text-sm text-stone-400 hover:text-pink-600">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
