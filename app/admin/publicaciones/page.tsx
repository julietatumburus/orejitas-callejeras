import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/settings";
import type { Dog } from "@/lib/types";
import { requireStaff } from "@/lib/auth";
import AdminNav from "../AdminNav";
import AdminBoard from "../AdminBoard";

export const dynamic = "force-dynamic";

export default async function PublicacionesPage() {
  const me = await requireStaff();

  const supabase = await createClient();
  const [{ data }, settings] = await Promise.all([
    supabase.from("dogs").select("*").order("created_at", { ascending: false }),
    getSettings(),
  ]);

  const dogs = (data ?? []) as Dog[];

  return (
    <div className="flex min-h-full flex-col">
      <AdminNav role={me.role} email={me.email} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <AdminBoard dogs={dogs} whatsapp={settings.whatsapp} />
      </main>
    </div>
  );
}
