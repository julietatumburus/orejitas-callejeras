"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { ok: boolean; error?: string };

/**
 * Marca que el usuario actual ya cambió su contraseña (saca el cambio obligatorio).
 * Se hace con el cliente admin porque un "usuario" no puede editar su propio perfil por RLS.
 */
export async function clearMustChange(): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autorizado." };

  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ must_change_password: false, temp_password_expires_at: null })
    .eq("id", user.id);

  if (error) return { ok: false, error: "No se pudo completar el cambio." };
  return { ok: true };
}
