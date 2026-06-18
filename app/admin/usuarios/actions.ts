"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, generateTempPassword } from "@/lib/supabase/admin";
import { sendNewUserEmail, sendResetEmail } from "@/lib/email";
import { getProfile, isManager } from "@/lib/auth";
import { ROLES } from "@/lib/types";
import type { Role } from "@/lib/types";

export type ActionResult = { ok: boolean; error?: string };

const TEMP_MINUTES = 15;
function tempExpiry() {
  return new Date(Date.now() + TEMP_MINUTES * 60 * 1000).toISOString();
}

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

/** Elimina un usuario por completo (auth + perfil). */
export async function deleteUser(id: string): Promise<ActionResult> {
  const me = await getProfile();
  if (!me || !me.enabled || !isManager(me.role)) return { ok: false, error: "No autorizado." };
  if (me.id === id) return { ok: false, error: "No podés eliminar tu propia cuenta." };

  const admin = createAdminClient();
  const { data: prof } = await admin.from("profiles").select("role").eq("id", id).maybeSingle();
  if (prof?.role === "superadmin") return { ok: false, error: "No se puede eliminar al superadmin." };

  // Borra el usuario de Auth; el perfil se elimina solo (on delete cascade).
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return { ok: false, error: "No se pudo eliminar el usuario." };

  revalidatePath("/admin/usuarios");
  return { ok: true };
}

/** Crea un usuario con clave temporal y le manda el mail de bienvenida. */
export async function createUser(emailRaw: string, role: Role): Promise<ActionResult> {
  const me = await getProfile();
  if (!me || !me.enabled || !isManager(me.role)) return { ok: false, error: "No autorizado." };

  const email = emailRaw.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Email inválido." };
  if (!ROLES.includes(role)) return { ok: false, error: "Rol inválido." };
  if (role === "superadmin" && me.role !== "superadmin") {
    return { ok: false, error: "Solo el superadmin puede crear superadmins." };
  }

  const admin = createAdminClient();
  const tempPassword = generateTempPassword();

  // 1) Crear el usuario en Auth (ya confirmado)
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });
  if (createErr || !created?.user) {
    return { ok: false, error: "No se pudo crear (¿ya existe ese email?)." };
  }

  // 2) Configurar el perfil (habilitado, con cambio de clave obligatorio)
  const { error: profErr } = await admin
    .from("profiles")
    .update({
      role,
      enabled: true,
      must_change_password: true,
      temp_password_expires_at: null, // alta nueva: la clave temporal NO expira
      email,
    })
    .eq("id", created.user.id);
  if (profErr) {
    await admin.auth.admin.deleteUser(created.user.id);
    return { ok: false, error: "No se pudo configurar el perfil." };
  }

  // 3) Enviar el mail con la clave temporal
  try {
    await sendNewUserEmail(email, tempPassword);
  } catch (e) {
    return {
      ok: false,
      error: `Usuario creado, pero falló el envío del mail: ${(e as Error).message}`,
    };
  }

  revalidatePath("/admin/usuarios");
  return { ok: true };
}

/** Resetea la contraseña de un usuario: genera una temporal y la manda por mail. */
export async function resetUserPassword(id: string): Promise<ActionResult> {
  const me = await getProfile();
  if (!me || !me.enabled || !isManager(me.role)) return { ok: false, error: "No autorizado." };

  const admin = createAdminClient();

  const { data: prof } = await admin.from("profiles").select("email, role").eq("id", id).maybeSingle();
  if (!prof?.email) return { ok: false, error: "No se encontró el usuario." };
  if (prof.role === "superadmin" && me.role !== "superadmin") {
    return { ok: false, error: "No podés resetear a un superadmin." };
  }

  const tempPassword = generateTempPassword();
  const { error: updErr } = await admin.auth.admin.updateUserById(id, { password: tempPassword });
  if (updErr) return { ok: false, error: "No se pudo resetear la clave." };

  await admin
    .from("profiles")
    .update({ must_change_password: true, temp_password_expires_at: tempExpiry() })
    .eq("id", id);

  try {
    await sendResetEmail(prof.email, tempPassword);
  } catch (e) {
    return { ok: false, error: `Clave reseteada, pero falló el envío del mail: ${(e as Error).message}` };
  }

  revalidatePath("/admin/usuarios");
  return { ok: true };
}
