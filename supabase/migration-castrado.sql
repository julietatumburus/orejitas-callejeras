-- ============================================================================
-- Migración: agregar "castrado/a" a las publicaciones de adopción.
-- Pegá esto en Supabase → SQL Editor → New query → Run. No borra datos.
-- Los que ya tengas quedan como "no castrado" por defecto (lo podés editar).
-- ============================================================================

alter table public.dogs
  add column if not exists neutered boolean not null default false;

notify pgrst, 'reload schema';
