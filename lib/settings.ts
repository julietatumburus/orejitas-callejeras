import { createClient } from "@/lib/supabase/server";
import { ORG } from "@/lib/config";
import type { Settings, AyudaItem } from "@/lib/types";

/** Valores por defecto (de config.ts) usados como respaldo. */
export function defaultSettings(): Settings {
  return {
    name: ORG.name,
    tagline: ORG.tagline,
    description: ORG.description,
    whatsapp: ORG.whatsapp,
    email: ORG.email,
    instagram: ORG.instagram,
    facebook: ORG.facebook,
    ayuda: ORG.ayuda.map((a) => ({ titulo: a.titulo, texto: a.texto })),
  };
}

/**
 * Configuración efectiva: lo guardado en la base, con respaldo en los valores
 * por defecto. Si la tabla no existe todavía, devuelve los defaults.
 */
export async function getSettings(): Promise<Settings> {
  const d = defaultSettings();
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
    if (!data) return d;

    const ayuda = Array.isArray(data.ayuda) && data.ayuda.length
      ? (data.ayuda as AyudaItem[])
      : d.ayuda;

    return {
      name: data.name || d.name,
      tagline: data.tagline || d.tagline,
      description: data.description || d.description,
      whatsapp: data.whatsapp || d.whatsapp,
      // contacto: puede quedar vacío a propósito para ocultarlo
      email: data.email ?? d.email,
      instagram: data.instagram ?? d.instagram,
      facebook: data.facebook ?? d.facebook,
      ayuda,
    };
  } catch {
    return d;
  }
}
