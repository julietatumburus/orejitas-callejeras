"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile, Role } from "@/lib/types";
import { ROLE_LABEL } from "@/lib/types";
import { setUserEnabled, createUser, resetUserPassword, deleteUser } from "./actions";

const roleBadge: Record<Role, string> = {
  superadmin: "bg-fuchsia-100 text-fuchsia-700",
  admin: "bg-pink-100 text-pink-700",
  usuario: "bg-stone-100 text-stone-600",
};

export default function UsersBoard({ users, me }: { users: Profile[]; me: Profile }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const pendientes = users.filter((u) => !u.enabled);
  const activos = users.filter((u) => u.enabled);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setCreating(true);
    const res = await createUser(newEmail, "admin"); // por ahora todos admin
    setCreating(false);
    if (!res.ok) return setMsg({ ok: false, text: res.error ?? "Error" });
    setMsg({ ok: true, text: `¡Listo! Le mandamos la clave temporal a ${newEmail.trim()}.` });
    setNewEmail("");
    router.refresh();
  }

  async function toggleEnabled(u: Profile) {
    setBusyId(u.id);
    const res = await setUserEnabled(u.id, !u.enabled);
    setBusyId(null);
    if (!res.ok) return alert(res.error);
    router.refresh();
  }

  async function handleReset(u: Profile) {
    if (!confirm(`¿Resetear la clave de ${u.email}? Le llega una clave temporal nueva por mail.`)) return;
    setBusyId(u.id);
    const res = await resetUserPassword(u.id);
    setBusyId(null);
    if (!res.ok) return alert(res.error);
    alert("Listo, le enviamos una clave temporal nueva por mail.");
  }

  async function handleDelete(u: Profile) {
    if (!confirm(`¿Eliminar a ${u.email}? Se borra de la base de forma permanente y no se puede deshacer.`))
      return;
    setBusyId(u.id);
    const res = await deleteUser(u.id);
    setBusyId(null);
    if (!res.ok) return alert(res.error);
    router.refresh();
  }

  function Row({ u }: { u: Profile }) {
    const isSelf = u.id === me.id;

    return (
      <li className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate font-medium text-stone-800">{u.email}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${roleBadge[u.role]}`}>
              {ROLE_LABEL[u.role]}
            </span>
            {isSelf && <span className="text-xs text-stone-400">(vos)</span>}
          </div>
        </div>

        {/* Toggle activo / inactivo */}
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <button
            type="button"
            role="switch"
            aria-checked={u.enabled}
            aria-label={u.enabled ? "Desactivar" : "Activar"}
            disabled={isSelf || busyId === u.id}
            onClick={() => toggleEnabled(u)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition disabled:opacity-50 ${
              u.enabled ? "bg-pink-500" : "bg-stone-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                u.enabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          {u.enabled ? "Activo" : "Inactivo"}
        </div>

        {!isSelf && (
          <>
            <button
              onClick={() => handleReset(u)}
              disabled={busyId === u.id}
              className="rounded-full border border-pink-300 px-3 py-1.5 text-sm font-medium text-pink-700 transition hover:bg-pink-50 disabled:opacity-50"
            >
              Resetear clave
            </button>
            <button
              onClick={() => handleDelete(u)}
              disabled={busyId === u.id}
              className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              Eliminar
            </button>
          </>
        )}
      </li>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-pink-600">Usuarios</h1>

      {/* Alta de usuario */}
      <section className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
        <h2 className="mb-1 text-lg font-bold text-stone-800">Crear usuario</h2>
        <p className="mb-4 text-sm text-stone-500">
          Se crea la cuenta y le llega un mail con una clave temporal (vence en 15 min) que deberá
          cambiar al ingresar.
        </p>
        <form onSubmit={handleCreate} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-sm font-medium text-stone-700">Email</span>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="persona@email.com"
              className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </label>
          <button
            type="submit"
            disabled={creating}
            className="rounded-full bg-pink-500 px-5 py-2.5 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
          >
            {creating ? "Creando…" : "Crear usuario"}
          </button>
        </form>
        {msg && (
          <p className={`mt-3 text-sm ${msg.ok ? "text-green-600" : "text-red-600"}`}>{msg.text}</p>
        )}
      </section>

      {pendientes.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-stone-800">
            Pendientes de aprobación
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
              {pendientes.length}
            </span>
          </h2>
          <ul className="flex flex-col gap-3">
            {pendientes.map((u) => (
              <Row key={u.id} u={u} />
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-lg font-bold text-stone-800">Habilitados ({activos.length})</h2>
        {activos.length === 0 ? (
          <p className="rounded-xl bg-pink-50 p-6 text-center text-stone-500">
            Todavía no hay usuarios habilitados.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {activos.map((u) => (
              <Row key={u.id} u={u} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
