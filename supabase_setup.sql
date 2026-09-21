-- Paste this into Supabase → SQL Editor → Run. One-time setup.
create table kv (
  k text primary key,
  value text,
  updated_at timestamptz default now()
);
alter table kv enable row level security;
create policy "public access" on kv for all using (true) with check (true);
