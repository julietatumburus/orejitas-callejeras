"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile, Role } from "@/lib/types";
import { ROLES, ROLE_LABEL } from "@/lib/types";
import { setUserEnabled, setUserRole } from "./actions";

const roleBadge: Record<Role, string> = {
  superadmin: "bg-fuchsia-100 text-fuchsia-700",
  admin: "bg-pink-100 text-pink-700",
  usuario: "bg-stone-100 text-stone-600",
};

export default function UsersBoard({ users, me }: { users: Profile[]; me: Profile }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  const pendientes = users.filter((u) => !u.enabled);
  const activos = users.filter((u) => u.enabled);

  async function toggleEnabled(u: Profile) {
    setBusyId(u.id);
    const res = await setUserEnabled(u.id, !u.enabled);
    setBusyId(null);
    if (!res.ok) return alert(res.error);
    router.refresh();
  }

  async function changeRole(u: Profile, role: Role) {
    if (role === u.role) return;
    setBusyId(u.id);
    const res = await setUserRole(u.id, role);
    setBusyId(null);
    if (!res.ok) return alert(res.error);
    router.refresh();
  }

  // Solo el superadmin puede ofrecer el rol superadmin
  const roleOptions = ROLES.filter((r) => r !== "superadmin" || me.role === "superadmin");

  function Row({ u }: { u: Profile }) {
    const isSelf = u.id === me.id;
    const isSuper = u.role === "superadmin";
    // Un admin no puede tocar a un superadmin
    const locked = isSelf || (isSuper && me.role !== "superadmin");

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

        <select
          value={u.role}
          disabled={locked || busyId === u.id}
          onChange={(e) => changeRole(u, e.target.value as Role)}
          className="rounded-lg border border-stone-300 px-2 py-1.5 text-sm disabled:opacity-50"
        >
          {roleOptions.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL[r]}
            </option>
          ))}
          {/* si es superadmin y yo no, lo muestro pero deshabilitado */}
          {isSuper && me.role !== "superadmin" && <option value="superadmin">Superadmin</option>}
        </select>

        <button
          onClick={() => toggleEnabled(u)}
          disabled={locked || busyId === u.id}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
            u.enabled
              ? "border border-stone-300 text-stone-600 hover:bg-stone-100"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          {busyId === u.id ? "…" : u.enabled ? "Deshabilitar" : "Habilitar"}
        </button>
      </li>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-pink-600">Usuarios</h1>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-stone-800">
          Pendientes de aprobación
          {pendientes.length > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
              {pendientes.length}
            </span>
          )}
        </h2>
        {pendientes.length === 0 ? (
          <p className="rounded-xl bg-pink-50 p-6 text-center text-stone-500">
            No hay usuarios pendientes. 🐾
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {pendientes.map((u) => (
              <Row key={u.id} u={u} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-stone-800">Habilitados ({activos.length})</h2>
        <ul className="flex flex-col gap-3">
          {activos.map((u) => (
            <Row key={u.id} u={u} />
          ))}
        </ul>
      </section>
    </div>
  );
}
