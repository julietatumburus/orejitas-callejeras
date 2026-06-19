import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireStaff, isManager } from "@/lib/auth";
import AdminNav from "./AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const me = await requireStaff();
  const supabase = await createClient();

  const { data: dogsData } = await supabase.from("dogs").select("species,status");
  const dogs = dogsData ?? [];

  let userCount: number | null = null;
  if (isManager(me.role)) {
    const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true });
    userCount = count ?? null;
  }

  const total = dogs.length;
  const disponibles = dogs.filter((d) => d.status === "disponible").length;
  const enProceso = dogs.filter((d) => d.status === "en_proceso").length;
  const adoptados = dogs.filter((d) => d.status === "adoptado").length;
  const perros = dogs.filter((d) => d.species === "perro").length;
  const gatos = dogs.filter((d) => d.species === "gato").length;

  const stats = [
    { label: "Publicaciones", value: total, icon: "🐾", color: "text-pink-600" },
    { label: "Disponibles", value: disponibles, icon: "🟢", color: "text-green-600" },
    { label: "En proceso", value: enProceso, icon: "⏳", color: "text-amber-600" },
    { label: "Adoptados", value: adoptados, icon: "🏡", color: "text-stone-600" },
    { label: "Perritos", value: perros, icon: "🐶", color: "text-pink-600" },
    { label: "Gatitos", value: gatos, icon: "🐱", color: "text-pink-600" },
  ];
  if (userCount !== null) {
    stats.push({ label: "Usuarios", value: userCount, icon: "👭", color: "text-fuchsia-600" });
  }

  const manager = isManager(me.role);

  return (
    <div className="flex min-h-full flex-col">
      <AdminNav role={me.role} email={me.email} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {/* Bienvenida */}
        <div className="enter mb-8 rounded-3xl bg-gradient-to-br from-[#b23c75] to-[#f56fa3] p-7 text-[#fdf3e8] shadow-sm">
          <h1 className="text-2xl font-bold">¡Hola! 🐾</h1>
          <p className="mt-1 text-pink-50">Este es el resumen de Orejitas Callejeras.</p>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="enter rounded-2xl border border-pink-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="text-3xl">{s.icon}</div>
              <div className={`mt-2 text-3xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-sm text-stone-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Accesos rápidos */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-stone-800">Accesos rápidos</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/publicaciones"
            className="rounded-2xl bg-pink-500 p-5 font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-pink-600"
          >
            <div className="text-2xl">➕</div>
            <div className="mt-2">Cargar / ver adopciones</div>
          </Link>

          {manager && (
            <Link
              href="/admin/usuarios"
              className="rounded-2xl border border-pink-200 bg-white p-5 font-semibold text-pink-700 shadow-sm transition hover:-translate-y-1 hover:bg-pink-50"
            >
              <div className="text-2xl">👭</div>
              <div className="mt-2">Gestionar usuarios</div>
            </Link>
          )}

          {manager && (
            <Link
              href="/admin/configuracion"
              className="rounded-2xl border border-pink-200 bg-white p-5 font-semibold text-pink-700 shadow-sm transition hover:-translate-y-1 hover:bg-pink-50"
            >
              <div className="text-2xl">⚙️</div>
              <div className="mt-2">Configuración</div>
            </Link>
          )}

          <Link
            href="/adoptar"
            className="rounded-2xl border border-pink-200 bg-white p-5 font-semibold text-pink-700 shadow-sm transition hover:-translate-y-1 hover:bg-pink-50"
          >
            <div className="text-2xl">🌐</div>
            <div className="mt-2">Ver la web pública</div>
          </Link>
        </div>
      </main>
    </div>
  );
}
