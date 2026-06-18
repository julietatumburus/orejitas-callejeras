-- ============================================================================
-- Orejitas Callejeras — Esquema de base de datos
-- Pegá TODO esto en Supabase → SQL Editor → New query → Run (una sola vez).
-- ============================================================================

-- 1) Tabla de perritos -------------------------------------------------------
create table if not exists public.dogs (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  species     text not null default 'perro' check (species in ('perro','gato')),
  age         text,                       -- ej: "Cachorro", "2 años"
  sex         text not null check (sex in ('macho','hembra')),
  size        text not null check (size in ('pequeño','mediano','grande')),
  neutered    boolean not null default false,   -- ¿está castrado/a?
  whatsapp    text,                              -- WhatsApp de contacto de este rescate (opcional)
  description text,
  status      text not null default 'disponible'
              check (status in ('disponible','en_proceso','adoptado')),
  photo_url   text,                        -- URL pública de la foto
  photo_path  text,                        -- ruta dentro del bucket (para poder borrarla)
  created_at  timestamptz not null default now()
);

create index if not exists dogs_created_at_idx on public.dogs (created_at desc);

-- 2) Seguridad a nivel de fila (RLS) -----------------------------------------
alter table public.dogs enable row level security;

-- Cualquiera (sin login) puede VER los perritos
drop policy if exists "dogs_select_public" on public.dogs;
create policy "dogs_select_public"
  on public.dogs for select
  using (true);

-- Solo usuarios autenticados (las admins) pueden crear/editar/borrar
drop policy if exists "dogs_insert_auth" on public.dogs;
create policy "dogs_insert_auth"
  on public.dogs for insert
  to authenticated with check (true);

drop policy if exists "dogs_update_auth" on public.dogs;
create policy "dogs_update_auth"
  on public.dogs for update
  to authenticated using (true) with check (true);

drop policy if exists "dogs_delete_auth" on public.dogs;
create policy "dogs_delete_auth"
  on public.dogs for delete
  to authenticated using (true);

-- 3) Bucket de fotos ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('dog-photos', 'dog-photos', true)
on conflict (id) do nothing;

-- Cualquiera puede VER las fotos (lectura pública)
drop policy if exists "dogphotos_select_public" on storage.objects;
create policy "dogphotos_select_public"
  on storage.objects for select
  using (bucket_id = 'dog-photos');

-- Solo admins autenticadas pueden subir / actualizar / borrar fotos
drop policy if exists "dogphotos_insert_auth" on storage.objects;
create policy "dogphotos_insert_auth"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'dog-photos');

drop policy if exists "dogphotos_update_auth" on storage.objects;
create policy "dogphotos_update_auth"
  on storage.objects for update
  to authenticated using (bucket_id = 'dog-photos');

drop policy if exists "dogphotos_delete_auth" on storage.objects;
create policy "dogphotos_delete_auth"
  on storage.objects for delete
  to authenticated using (bucket_id = 'dog-photos');
