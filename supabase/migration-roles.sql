-- ============================================================================
-- Orejitas Callejeras — Roles, registro y aprobación de usuarios
-- Pegá TODO esto en Supabase → SQL Editor → New query → Run (una sola vez).
-- No borra datos. Al final hay un paso para marcarte como SUPERADMIN.
-- ============================================================================

-- 1) Tabla de perfiles (rol + habilitación por cada usuario) ------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  role       text not null default 'usuario'
             check (role in ('superadmin','admin','usuario')),
  enabled    boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 2) Funciones helper (SECURITY DEFINER para evitar recursión de RLS) ---------
create or replace function public.my_role()
returns text language sql security definer stable set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

-- ¿El usuario actual está habilitado? (cualquier rol: usuario/admin/superadmin)
create or replace function public.is_active_staff()
returns boolean language sql security definer stable set search_path = public as $$
  select coalesce((select enabled from public.profiles where id = auth.uid()), false)
$$;

-- ¿Es admin o superadmin habilitado? (puede gestionar usuarios y la info)
create or replace function public.is_manager()
returns boolean language sql security definer stable set search_path = public as $$
  select coalesce(
    (select enabled and role in ('admin','superadmin') from public.profiles where id = auth.uid()),
    false)
$$;

-- 3) Crear automáticamente el perfil cuando se registra un usuario ------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4) Regla de seguridad: solo el superadmin gestiona superadmins --------------
create or replace function public.guard_profile_update()
returns trigger language plpgsql security definer set search_path = public as $$
declare actor text;
begin
  actor := public.my_role();
  if actor not in ('admin','superadmin') then
    raise exception 'No autorizado para modificar usuarios';
  end if;
  if (new.role = 'superadmin' or old.role = 'superadmin') and actor <> 'superadmin' then
    raise exception 'Solo el superadmin puede gestionar superadmins';
  end if;
  return new;
end $$;

drop trigger if exists guard_profile_update_trg on public.profiles;
create trigger guard_profile_update_trg
  before update on public.profiles
  for each row execute function public.guard_profile_update();

-- 5) Políticas RLS de profiles -----------------------------------------------
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select
  using ( id = auth.uid() or public.is_manager() );

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles for insert
  with check ( id = auth.uid() );

drop policy if exists profiles_update_manager on public.profiles;
create policy profiles_update_manager on public.profiles for update
  using ( public.is_manager() ) with check ( public.is_manager() );

drop policy if exists profiles_delete_super on public.profiles;
create policy profiles_delete_super on public.profiles for delete
  using ( public.my_role() = 'superadmin' );

-- 6) Endurecer permisos de publicaciones: solo personal habilitado escribe ----
drop policy if exists "dogs_insert_auth" on public.dogs;
drop policy if exists "dogs_insert_staff" on public.dogs;
create policy "dogs_insert_staff" on public.dogs for insert
  to authenticated with check ( public.is_active_staff() );

drop policy if exists "dogs_update_auth" on public.dogs;
drop policy if exists "dogs_update_staff" on public.dogs;
create policy "dogs_update_staff" on public.dogs for update
  to authenticated using ( public.is_active_staff() ) with check ( public.is_active_staff() );

drop policy if exists "dogs_delete_auth" on public.dogs;
drop policy if exists "dogs_delete_staff" on public.dogs;
create policy "dogs_delete_staff" on public.dogs for delete
  to authenticated using ( public.is_active_staff() );

-- Fotos: solo personal habilitado sube/edita/borra
drop policy if exists "dogphotos_insert_auth" on storage.objects;
drop policy if exists "dogphotos_insert_staff" on storage.objects;
create policy "dogphotos_insert_staff" on storage.objects for insert
  to authenticated with check ( bucket_id = 'dog-photos' and public.is_active_staff() );

drop policy if exists "dogphotos_update_auth" on storage.objects;
drop policy if exists "dogphotos_update_staff" on storage.objects;
create policy "dogphotos_update_staff" on storage.objects for update
  to authenticated using ( bucket_id = 'dog-photos' and public.is_active_staff() );

drop policy if exists "dogphotos_delete_auth" on storage.objects;
drop policy if exists "dogphotos_delete_staff" on storage.objects;
create policy "dogphotos_delete_staff" on storage.objects for delete
  to authenticated using ( bucket_id = 'dog-photos' and public.is_active_staff() );

-- 7) Crear perfiles para los usuarios que YA existían -------------------------
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- 8) ⭐ MARCATE COMO SUPERADMIN (cambiá el email por el TUYO) -----------------
update public.profiles
   set role = 'superadmin', enabled = true
 where email = 'julitumburus@gmail.com';
