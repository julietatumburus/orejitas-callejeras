/**
 * Configuración de la organización.
 * Editá estos valores con los datos reales de Orejitas Callejeras.
 * (Esto NO incluye claves secretas: esas van en .env.local)
 */

export const ORG = {
  // Nombre que aparece en la web y en el título de la pestaña
  name: "Orejitas Callejeras",
  tagline: "Cada rescatado merece una segunda oportunidad",
  description:
    "Somos una organización sin fines de lucro dedicada al rescate, cuidado y adopción responsable de perritos y gatitos en situación de calle.",

  // Número de WhatsApp en formato internacional SIN '+', espacios ni guiones.
  // Ejemplo Argentina: 5491122334455 (54 país, 9 celular, 11 área, número)
  whatsapp: "5491122334455",

  // Email y redes (opcionales: dejá "" para ocultarlos)
  email: "contacto@orejitascallejeras.org",
  instagram: "https://www.instagram.com/orejitascallejeras_/",
  facebook: "",

  // Alias para donaciones (transferencias). Vacío = no se muestra.
  alias: "orejitascallejerasok",

  // Texto del bloque "Cómo ayudar" de la landing
  ayuda: [
    {
      titulo: "Adoptá",
      texto: "Dale un hogar a un rescatado y cambiá su vida para siempre.",
    },
    {
      titulo: "Transitá",
      texto: "Dale un hogar temporal a un perrito o gatito por el tiempo que puedas, hasta que encuentre su familia definitiva.",
    },
    {
      titulo: "Apadriná",
      texto: "Colaborá con el alimento y la atención veterinaria de los rescatados.",
    },
    {
      titulo: "Difundí",
      texto: "Compartí nuestras publicaciones. Un compartir puede salvar una vida.",
    },
  ],
} as const;

/** Arma el link de WhatsApp con un mensaje pre-cargado sobre un animalito. */
export function whatsappLink(whatsapp: string, name: string, emoji = "🐾"): string {
  const msg = `¡Hola ${ORG.name}! ${emoji} Quiero saber más sobre *${name}* que vi en la web para adoptar.`;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
}

/** Link de WhatsApp genérico (contacto general). */
export function whatsappGeneralLink(whatsapp: string): string {
  const msg = `¡Hola ${ORG.name}! Quiero hacer una consulta.`;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
}
