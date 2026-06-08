import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Dog } from "@/lib/types";
import { ORG } from "@/lib/config";
import { signOut } from "./actions";
import AdminBoard from "./AdminBoard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("dogs")
    .select("*")
    .order("created_at", { ascending: false });

  const dogs = (data ?? []) as Dog[];

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-pink-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-lg font-bold text-pink-600">
            🐾 {ORG.name} <span className="text-sm font-normal text-stone-400">/ admin</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/adoptar" className="text-stone-600 hover:text-pink-600">
              Ver web pública
            </Link>
            <span className="hidden text-stone-400 sm:inline">{user?.email}</span>
            <form action={signOut}>
              <button className="rounded-full border border-stone-300 px-3 py-1.5 font-medium text-stone-600 transition hover:bg-stone-100">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <AdminBoard dogs={dogs} />
      </main>
    </div>
  );
}
