-- Public website reads decoration_groups with the anon key.
alter table public.decoration_groups enable row level security;

drop policy if exists "Public read decoration groups" on public.decoration_groups;

create policy "Public read decoration groups"
  on public.decoration_groups
  for select
  to anon, authenticated
  using (true);
