import Link from "next/link";
import { ORG } from "@/lib/config";
import { ROLE_LABEL, type Role } from "@/lib/types";
import { isManager } from "@/lib/auth";
import { signOut } from "./actions";

const roleBadge: Record<Role, string> = {
  superadmin: "bg-fuchsia-100 text-fuchsia-700",
  admin: "bg-pink-100 text-pink-700",
  usuario: "bg-stone-100 text-stone-600",
};

export default function AdminNav({ role, email }: { role: Role; email: string | null }) {
  const manager = isManager(role);
  return (
    <header className="border-b border-pink-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link href="/admin" className="text-lg font-bold text-pink-600">
            🐾 {ORG.name} <span className="text-sm font-normal text-stone-400">/ admin</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/admin" className="text-stone-600 hover:text-pink-600">
              Publicaciones
            </Link>
            {manager && (
              <>
                <Link href="/admin/usuarios" className="text-stone-600 hover:text-pink-600">
                  Usuarios
                </Link>
                <Link href="/admin/configuracion" className="text-stone-600 hover:text-pink-600">
                  Configuración
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${roleBadge[role]}`}>
            {ROLE_LABEL[role]}
          </span>
          <span className="hidden text-stone-400 sm:inline">{email}</span>
          <Link href="/adoptar" className="text-stone-600 hover:text-pink-600">
            Ver web
          </Link>
          <form action={signOut}>
            <button className="rounded-full border border-stone-300 px-3 py-1.5 font-medium text-stone-600 transition hover:bg-stone-100">
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
