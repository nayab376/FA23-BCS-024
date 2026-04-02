create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text,
  role text not null check (role in ('client', 'moderator', 'admin', 'super_admin')),
  status text not null default 'active' check (status in ('active', 'blocked', 'pending')),
  created_at timestamptz not null default now()
);

create table if not exists public.seller_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  display_name text not null,
  business_name text,
  phone text,
  city text,
  is_verified boolean not null default false
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  duration_days integer not null check (duration_days > 0),
  weight integer not null default 1 check (weight >= 1),
  is_featured boolean not null default false,
  price numeric(10,2) not null check (price >= 0)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  is_active boolean not null default true
);

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  is_active boolean not null default true
);

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  package_id uuid references public.packages(id),
  title text not null,
  slug text unique not null,
  category_id uuid references public.categories(id),
  city_id uuid references public.cities(id),
  description text not null,
  status text not null default 'draft' check (
    status in (
      'draft',
      'submitted',
      'under_review',
      'payment_pending',
      'payment_submitted',
      'payment_verified',
      'scheduled',
      'published',
      'expired',
      'archived',
      'rejected'
    )
  ),
  featured boolean not null default false,
  admin_boost integer not null default 0,
  publish_at timestamptz,
  expire_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ad_media (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid not null references public.ads(id) on delete cascade,
  source_type text not null check (source_type in ('image_url', 'youtube_url', 'cdn_url')),
  original_url text not null,
  thumbnail_url text,
  validation_status text not null default 'pending' check (validation_status in ('pending', 'valid', 'invalid'))
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid not null unique references public.ads(id) on delete cascade,
  amount numeric(10,2) not null check (amount >= 0),
  method text not null,
  transaction_ref text unique not null,
  sender_name text not null,
  screenshot_url text,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null,
  is_read boolean not null default false,
  link text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.users(id),
  action_type text not null,
  target_type text not null,
  target_id uuid,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ad_status_history (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid not null references public.ads(id) on delete cascade,
  previous_status text,
  new_status text not null,
  changed_by uuid references public.users(id),
  note text,
  changed_at timestamptz not null default now()
);

create table if not exists public.learning_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  topic text not null,
  difficulty text default 'medium',
  is_active boolean not null default true
);

create table if not exists public.system_health_logs (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  response_ms integer,
  checked_at timestamptz not null default now(),
  status text not null
);
