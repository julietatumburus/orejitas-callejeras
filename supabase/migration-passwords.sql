-- ============================================================================
-- Migración: alta de usuarios con clave temporal y cambio obligatorio.
-- Requiere haber corrido antes migration-roles.sql.
-- Pegá esto en Supabase → SQL Editor → New query → Run. No borra datos.
-- ============================================================================

-- 1) Columnas en profiles
alter table public.profiles
  add column if not exists must_change_password boolean not null default false;

alter table public.profiles
  add column if not exists temp_password_expires_at timestamptz;

-- 2) El backend (service role) puede gestionar perfiles aunque no haya sesión.
--    Cuando actúa el service role, auth.uid() es null -> dejamos pasar.
create or replace function public.guard_profile_update()
returns trigger language plpgsql security definer set search_path = public as $$
declare actor text;
begin
  actor := public.my_role();
  if actor is null then
    return new;  -- backend / service role
  end if;
  if actor not in ('admin','superadmin') then
    raise exception 'No autorizado para modificar usuarios';
  end if;
  if (new.role = 'superadmin' or old.role = 'superadmin') and actor <> 'superadmin' then
    raise exception 'Solo el superadmin puede gestionar superadmins';
  end if;
  return new;
end $$;

notify pgrst, 'reload schema';
