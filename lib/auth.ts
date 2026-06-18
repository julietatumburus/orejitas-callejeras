import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Role } from "@/lib/types";

/** Devuelve el perfil del usuario logueado, o null si no hay sesión. */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return (data as Profile) ?? null;
}

const MANAGER_ROLES: Role[] = ["admin", "superadmin"];

/**
 * Exige un usuario habilitado (cualquier rol). Si no, redirige:
 * - sin sesión -> login
 * - sin habilitar -> pantalla de "pendiente"
 */
export async function requireStaff(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect("/admin/login");
  if (!profile.enabled) redirect("/admin/pendiente");
  if (profile.must_change_password) redirect("/admin/cambiar-clave");
  return profile;
}

/** Exige admin o superadmin habilitado (para gestionar usuarios y la info). */
export async function requireManager(): Promise<Profile> {
  const profile = await requireStaff();
  if (!MANAGER_ROLES.includes(profile.role)) redirect("/admin");
  return profile;
}

export function isManager(role: Role): boolean {
  return MANAGER_ROLES.includes(role);
}
