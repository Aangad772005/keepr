-- Run this in your Supabase project's SQL editor (Database → SQL Editor → New query).

-- 1. Create the tasks table
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  category text not null default 'none' check (category in ('work', 'personal', 'urgent', 'ideas', 'none')),
  done boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. Index for fast per-user lookups, sorted by newest first
create index if not exists tasks_user_id_created_at_idx
  on public.tasks (user_id, created_at desc);

-- 3. Enable Row Level Security — required so users can only see their own tasks
alter table public.tasks enable row level security;

-- 4. Policies: users can only read/write their own rows
create policy "Users can view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- 5. Enable realtime updates for this table (so multi-device sync works)
alter publication supabase_realtime add table public.tasks;
