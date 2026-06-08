-- ============================================================================
-- Orejitas Callejeras — Configuración editable desde el panel
-- Requiere haber corrido ANTES migration-roles.sql (usa la función is_manager()).
-- Pegá esto en Supabase → SQL Editor → New query → Run.
-- ============================================================================

create table if not exists public.settings (
  id          int primary key default 1,
  name        text,
  tagline     text,
  description text,
  whatsapp    text,
  email       text,
  instagram   text,
  facebook    text,
  ayuda       jsonb not null default '[]'::jsonb,  -- [{ "titulo": "...", "texto": "..." }]
  updated_at  timestamptz not null default now(),
  constraint settings_single_row check (id = 1)
);

-- Fila única de configuración
insert into public.settings (id) values (1) on conflict (id) do nothing;

alter table public.settings enable row level security;

-- Cualquiera puede LEER la configuración (la web pública la usa)
drop policy if exists settings_select_public on public.settings;
create policy settings_select_public on public.settings for select using (true);

-- Solo admin/superadmin habilitados pueden EDITAR
drop policy if exists settings_update_manager on public.settings;
create policy settings_update_manager on public.settings for update
  using ( public.is_manager() ) with check ( public.is_manager() );
