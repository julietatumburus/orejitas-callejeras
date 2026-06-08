import { redirect } from "next/navigation";
import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { signOut } from "../actions";
import { ORG } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function PendientePage() {
  const profile = await getProfile();
  if (!profile) redirect("/admin/login");
  if (profile.enabled) redirect("/admin");

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-pink-200 bg-white p-8 text-center shadow-sm">
        <Link href="/" className="mb-4 block text-lg font-bold text-pink-600">
          🐾 {ORG.name}
        </Link>
        <p className="text-5xl">⏳</p>
        <h1 className="mt-3 text-xl font-bold text-stone-800">Tu cuenta está pendiente</h1>
        <p className="mt-2 text-stone-600">
          Un administrador tiene que habilitar tu cuenta (<strong>{profile.email}</strong>) antes de
          que puedas usar el panel. Te avisaremos cuando esté lista. 🐾
        </p>
        <form action={signOut} className="mt-6">
          <button className="rounded-full border border-stone-300 px-5 py-2.5 font-medium text-stone-600 transition hover:bg-stone-100">
            Cerrar sesión
          </button>
        </form>
      </div>
    </main>
  );
}
