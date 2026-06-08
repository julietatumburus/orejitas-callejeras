export const ESPECIES = ["perro", "gato"] as const;
export type Especie = (typeof ESPECIES)[number];

export const ESPECIE_LABEL: Record<Especie, string> = {
  perro: "Perro",
  gato: "Gato",
};

export const ESPECIE_EMOJI: Record<Especie, string> = {
  perro: "🐶",
  gato: "🐱",
};

export const SEXOS = ["macho", "hembra"] as const;
export type Sexo = (typeof SEXOS)[number];

export const TAMANOS = ["pequeño", "mediano", "grande"] as const;
export type Tamano = (typeof TAMANOS)[number];

export const ESTADOS = ["disponible", "en_proceso", "adoptado"] as const;
export type Estado = (typeof ESTADOS)[number];

export const ESTADO_LABEL: Record<Estado, string> = {
  disponible: "Disponible",
  en_proceso: "En proceso",
  adoptado: "Adoptado",
};

export const TAMANO_LABEL: Record<Tamano, string> = {
  pequeño: "Pequeño",
  mediano: "Mediano",
  grande: "Grande",
};

export const SEXO_LABEL: Record<Sexo, string> = {
  macho: "Macho",
  hembra: "Hembra",
};

export interface Dog {
  id: string;
  name: string;
  species: Especie;
  age: string | null;
  sex: Sexo;
  size: Tamano;
  description: string | null;
  status: Estado;
  photo_url: string | null;
  photo_path: string | null;
  created_at: string;
}
