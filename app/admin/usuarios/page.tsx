import { requireManager } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import AdminNav from "../AdminNav";
import UsersBoard from "./UsersBoard";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const me = await requireManager();

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .neq("role", "superadmin") // el/los superadmin quedan "en las sombras"
    .order("created_at", { ascending: true });

  const users = (data ?? []) as Profile[];

  return (
    <div className="flex min-h-full flex-col">
      <AdminNav role={me.role} email={me.email} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <UsersBoard users={users} me={me} />
      </main>
    </div>
  );
}
