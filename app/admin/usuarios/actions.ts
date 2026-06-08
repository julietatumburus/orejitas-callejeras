"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile, isManager } from "@/lib/auth";
import { ROLES } from "@/lib/types";
import type { Role } from "@/lib/types";

export type ActionResult = { ok: boolean; error?: string };

/** Habilita o deshabilita el acceso de un usuario. */
export async function setUserEnabled(id: string, enabled: boolean): Promise<ActionResult> {
  const me = await getProfile();
  if (!me || !me.enabled || !isManager(me.role)) return { ok: false, error: "No autorizado." };
  if (me.id === id) return { ok: false, error: "No podés cambiar tu propio acceso." };

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ enabled }).eq("id", id);
  if (error) return { ok: false, error: "No se pudo actualizar (¿es un superadmin?)." };

  revalidatePath("/admin/usuarios");
  return { ok: true };
}

/** Cambia el rol de un usuario. */
export async function setUserRole(id: string, role: Role): Promise<ActionResult> {
  const me = await getProfile();
  if (!me || !me.enabled || !isManager(me.role)) return { ok: false, error: "No autorizado." };
  if (!ROLES.includes(role)) return { ok: false, error: "Rol inválido." };
  if (me.id === id) return { ok: false, error: "No podés cambiar tu propio rol." };
  if (role === "superadmin" && me.role !== "superadmin") {
    return { ok: false, error: "Solo el superadmin puede asignar el rol superadmin." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return { ok: false, error: "No se pudo cambiar el rol (¿es un superadmin?)." };

  revalidatePath("/admin/usuarios");
  return { ok: true };
}
