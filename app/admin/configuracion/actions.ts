"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile, isManager } from "@/lib/auth";
import type { AyudaItem } from "@/lib/types";

export type ActionResult = { ok: boolean; error?: string };

export async function saveSettings(formData: FormData): Promise<ActionResult> {
  const me = await getProfile();
  if (!me || !me.enabled || !isManager(me.role)) return { ok: false, error: "No autorizado." };

  const str = (k: string) => String(formData.get(k) ?? "").trim();

  let ayuda: AyudaItem[] = [];
  try {
    const raw = JSON.parse(String(formData.get("ayuda") ?? "[]"));
    if (Array.isArray(raw)) {
      ayuda = raw
        .map((a) => ({ titulo: String(a?.titulo ?? "").trim(), texto: String(a?.texto ?? "").trim() }))
        .filter((a) => a.titulo || a.texto);
    }
  } catch {
    return { ok: false, error: "Error en las tarjetas de ayuda." };
  }

  const name = str("name");
  if (!name) return { ok: false, error: "El nombre es obligatorio." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("settings")
    .update({
      name,
      tagline: str("tagline"),
      description: str("description"),
      whatsapp: str("whatsapp").replace(/[^0-9]/g, ""),
      email: str("email"),
      instagram: str("instagram"),
      facebook: str("facebook"),
      ayuda,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { ok: false, error: "No se pudo guardar la configuración." };

  // Refresca todo lo que muestra estos datos
  revalidatePath("/", "layout");
  return { ok: true };
}
