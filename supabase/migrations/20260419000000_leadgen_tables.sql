-- Lead capture tables. Public can INSERT only; reads are blocked (admin via Cloud UI).

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project_type text not null,
  size text,
  quantity text,
  paper text,
  finish text,
  timeline text,
  name text not null,
  email text not null,
  company text,
  phone text,
  message text,
  file_url text
);

create table public.sample_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  industry text,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'US'
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  subject text not null,
  message text not null,
  file_url text
);

create table public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

alter table public.quote_requests enable row level security;
alter table public.sample_requests enable row level security;
alter table public.contacts enable row level security;
alter table public.newsletter_signups enable row level security;

create policy "anyone can submit quote" on public.quote_requests for insert to anon, authenticated with check (true);
create policy "anyone can submit sample" on public.sample_requests for insert to anon, authenticated with check (true);
create policy "anyone can submit contact" on public.contacts for insert to anon, authenticated with check (true);
create policy "anyone can subscribe" on public.newsletter_signups for insert to anon, authenticated with check (true);

-- Storage bucket for artwork uploads
insert into storage.buckets (id, name, public) values ('artwork', 'artwork', false);

create policy "anyone can upload artwork"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'artwork');
