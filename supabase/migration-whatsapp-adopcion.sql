-- ============================================================================
-- Migración: WhatsApp de contacto por adopción (cada rescate puede tener su número).
-- Pegá esto en Supabase → SQL Editor → New query → Run. No borra datos.
-- Si una adopción no tiene número propio, la web usa el WhatsApp general.
-- ============================================================================

alter table public.dogs
  add column if not exists whatsapp text;

notify pgrst, 'reload schema';
