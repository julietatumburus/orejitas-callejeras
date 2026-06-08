-- ============================================================================
-- Migración: agregar "especie" (perro / gato) a una base que YA existe.
-- Solo hace falta si ya corriste schema.sql ANTES de sumar gatitos.
-- Pegá esto en Supabase → SQL Editor → New query → Run. No borra datos.
-- Los perritos que ya tenías cargados quedan como 'perro' por defecto.
-- ============================================================================

alter table public.dogs
  add column if not exists species text not null default 'perro';

-- Restringe los valores posibles a 'perro' o 'gato'
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'dogs_species_check'
  ) then
    alter table public.dogs
      add constraint dogs_species_check check (species in ('perro','gato'));
  end if;
end $$;
