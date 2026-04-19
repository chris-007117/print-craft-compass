-- Blog posts table
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  hero_image_url text,
  hero_image_alt text,
  meta_title text,
  meta_description text not null,
  focus_keyword text,
  category text,
  tags text[] default '{}',
  author_name text default 'Veridia Press',
  author_avatar_url text,
  reading_time_minutes integer default 5,
  status text default 'draft' check (status in ('draft','scheduled','published','archived')),
  published_at timestamptz,
  scheduled_for timestamptz,
  featured boolean default false,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_blog_posts_status on public.blog_posts(status);
create index idx_blog_posts_published_at on public.blog_posts(published_at desc);
create index idx_blog_posts_category on public.blog_posts(category);
create index idx_blog_posts_featured on public.blog_posts(featured) where featured = true;

-- updated_at trigger
create or replace function public.update_blog_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.update_blog_updated_at();

-- RLS
alter table public.blog_posts enable row level security;

create policy "public_read_published"
on public.blog_posts for select
to anon, authenticated
using (status = 'published' and published_at <= now());

create policy "service_role_all"
on public.blog_posts for all
to service_role
using (true)
with check (true);

-- Public view
create or replace view public.published_blog_posts
with (security_invoker = true)
as
select *
from public.blog_posts
where status = 'published' and published_at <= now()
order by published_at desc;

-- Atomic view increment
create or replace function public.increment_post_view(post_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.blog_posts
  set view_count = view_count + 1
  where slug = post_slug and status = 'published';
end;
$$;