"use client";

import { useState } from "react";
import Link from "next/link";
import { ORG } from "@/lib/config";
import { requestPasswordReset } from "./actions";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setDone(true);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-pink-200 bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 block text-center text-lg font-bold text-pink-600">
          🐾 {ORG.name}
        </Link>

        {done ? (
          <div className="text-center">
            <p className="text-4xl">📩</p>
            <h1 className="mt-3 text-xl font-bold text-stone-800">Revisá tu correo</h1>
            <p className="mt-2 text-sm text-stone-600">
              Si ese email tiene una cuenta, te enviamos una <strong>clave temporal</strong> (vence
              en 15 minutos). Al ingresar te pedirá crear una nueva.
            </p>
            <Link
              href="/admin/login"
              className="mt-6 inline-block rounded-full bg-pink-500 px-5 py-2.5 font-semibold text-white transition hover:bg-pink-600"
            >
              Ir al login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-1 text-center text-xl font-bold text-stone-800">Recuperar contraseña</h1>
            <p className="mb-6 text-center text-sm text-stone-500">
              Ingresá tu email y te mandamos una clave temporal.
            </p>
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
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-pink-500 px-4 py-2.5 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
              >
                {loading ? "Enviando…" : "Enviarme la clave temporal"}
              </button>
            </form>
            <Link
              href="/admin/login"
              className="mt-6 block text-center text-sm text-stone-400 hover:text-pink-600"
            >
              ← Volver al login
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
