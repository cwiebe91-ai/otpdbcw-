-- In Supabase: SQL Editor -> New query -> alles einfügen -> Run
create table if not exists public.saves (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  key text not null,
  updated_at bigint not null,
  payload jsonb not null,
  primary key (user_id, key)
);
alter table public.saves enable row level security;
drop policy if exists "eigene Zeilen" on public.saves;
create policy "eigene Zeilen" on public.saves for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
