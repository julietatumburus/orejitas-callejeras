"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SEXOS, TAMANOS, ESTADOS } from "@/lib/types";
import type { Sexo, Tamano, Estado } from "@/lib/types";

const BUCKET = "dog-photos";

export type ActionResult = { ok: boolean; error?: string };

function parseFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const age = String(formData.get("age") ?? "").trim();
  const sex = String(formData.get("sex") ?? "");
  const size = String(formData.get("size") ?? "");
  const status = String(formData.get("status") ?? "disponible");
  const description = String(formData.get("description") ?? "").trim();

  if (!name) return { error: "El nombre es obligatorio." as const };
  if (!SEXOS.includes(sex as Sexo)) return { error: "Sexo inválido." as const };
  if (!TAMANOS.includes(size as Tamano)) return { error: "Tamaño inválido." as const };
  if (!ESTADOS.includes(status as Estado)) return { error: "Estado inválido." as const };

  return {
    fields: {
      name,
      age: age || null,
      sex: sex as Sexo,
      size: size as Tamano,
      status: status as Estado,
      description: description || null,
    },
  };
}

/** Sube la foto al bucket y devuelve { url, path }. */
async function uploadPhoto(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
): Promise<{ url: string; path: string }> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error("No se pudo subir la foto.");

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

async function removePhoto(
  supabase: Awaited<ReturnType<typeof createClient>>,
  path: string | null | undefined,
) {
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}

export async function createDog(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autorizado." };

  const parsed = parseFields(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  let photo: { url: string; path: string } | null = null;
  const file = formData.get("photo") as File | null;
  if (file && file.size > 0) {
    try {
      photo = await uploadPhoto(supabase, file);
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }

  const { error } = await supabase.from("dogs").insert({
    ...parsed.fields,
    photo_url: photo?.url ?? null,
    photo_path: photo?.path ?? null,
  });

  if (error) {
    await removePhoto(supabase, photo?.path);
    return { ok: false, error: "No se pudo guardar el perrito." };
  }

  revalidatePath("/admin");
  revalidatePath("/adoptar");
  return { ok: true };
}

export async function updateDog(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autorizado." };

  const parsed = parseFields(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const update: Record<string, unknown> = { ...parsed.fields };

  // ¿Reemplazan la foto?
  const file = formData.get("photo") as File | null;
  const oldPath = String(formData.get("old_photo_path") ?? "") || null;

  if (file && file.size > 0) {
    let photo: { url: string; path: string };
    try {
      photo = await uploadPhoto(supabase, file);
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
    update.photo_url = photo.url;
    update.photo_path = photo.path;
  }

  const { error } = await supabase.from("dogs").update(update).eq("id", id);

  if (error) return { ok: false, error: "No se pudo actualizar el perrito." };

  // Borramos la foto vieja solo si subieron una nueva
  if (file && file.size > 0 && oldPath) await removePhoto(supabase, oldPath);

  revalidatePath("/admin");
  revalidatePath("/adoptar");
  return { ok: true };
}

export async function deleteDog(id: string, photoPath: string | null): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autorizado." };

  const { error } = await supabase.from("dogs").delete().eq("id", id);
  if (error) return { ok: false, error: "No se pudo borrar el perrito." };

  await removePhoto(supabase, photoPath);

  revalidatePath("/admin");
  revalidatePath("/adoptar");
  return { ok: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
