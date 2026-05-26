-- Public website reads packages with the anon key (no login required).
-- Run in Supabase → SQL Editor.

alter table public.decoration_packages enable row level security;

-- Remove restrictive policies that only allow auth.uid() = user_id (blocks the public site).
drop policy if exists "Public read decoration packages" on public.decoration_packages;
drop policy if exists "Users can read own packages" on public.decoration_packages;
drop policy if exists "Users can view own packages" on public.decoration_packages;

create policy "Public read decoration packages"
  on public.decoration_packages
  for select
  to anon, authenticated
  using (true);

-- Quick check (should return your 6 rows when run as anon in SQL editor is not possible,
-- but you can verify in Table Editor → decoration_packages after saving policies).
