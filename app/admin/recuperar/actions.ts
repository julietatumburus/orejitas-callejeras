"use server";

import { createAdminClient, generateTempPassword } from "@/lib/supabase/admin";
import { sendResetEmail } from "@/lib/email";

/**
 * Recuperación de contraseña (autoservicio).
 * Siempre responde igual para no revelar si el email existe.
 */
export async function requestPasswordReset(emailRaw: string): Promise<{ ok: boolean }> {
  const email = emailRaw.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: true };

  try {
    const admin = createAdminClient();
    const { data: prof } = await admin
      .from("profiles")
      .select("id, enabled")
      .eq("email", email)
      .maybeSingle();

    if (prof?.id && prof.enabled) {
      const temp = generateTempPassword();
      const { error } = await admin.auth.admin.updateUserById(prof.id, { password: temp });
      if (!error) {
        await admin
          .from("profiles")
          .update({
            must_change_password: true,
            temp_password_expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          })
          .eq("id", prof.id);
        await sendResetEmail(email, temp);
      }
    }
  } catch {
    // Silencioso a propósito (anti-enumeración).
  }

  return { ok: true };
}
