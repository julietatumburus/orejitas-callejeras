/**
 * Configuración de la organización.
 * Editá estos valores con los datos reales de Orejitas Callejeras.
 * (Esto NO incluye claves secretas: esas van en .env.local)
 */

export const ORG = {
  // Nombre que aparece en la web y en el título de la pestaña
  name: "Orejitas Callejeras",
  tagline: "Cada perrito merece una segunda oportunidad",
  description:
    "Somos una organización sin fines de lucro dedicada al rescate, cuidado y adopción responsable de perritos en situación de calle.",

  // Número de WhatsApp en formato internacional SIN '+', espacios ni guiones.
  // Ejemplo Argentina: 5491122334455 (54 país, 9 celular, 11 área, número)
  whatsapp: "5491122334455",

  // Email y redes (opcionales: dejá "" para ocultarlos)
  email: "contacto@orejitascallejeras.org",
  instagram: "", // ej: "https://instagram.com/orejitascallejeras"
  facebook: "",

  // Texto del bloque "Cómo ayudar" de la landing
  ayuda: [
    {
      titulo: "Adoptá",
      texto: "Dale un hogar a un perrito rescatado. Mirá los que están en adopción.",
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

/** Arma el link de WhatsApp con un mensaje pre-cargado sobre un perrito. */
export function whatsappLink(dogName: string): string {
  const msg = `¡Hola ${ORG.name}! 🐶 Quiero saber más sobre *${dogName}* que vi en la web para adoptar.`;
  return `https://wa.me/${ORG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/** Link de WhatsApp genérico (contacto general). */
export function whatsappGeneralLink(): string {
  const msg = `¡Hola ${ORG.name}! Quiero hacer una consulta.`;
  return `https://wa.me/${ORG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
