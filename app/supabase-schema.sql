-- Parker Street Trump Account Tracker — Supabase Schema
-- Run this in the Supabase SQL Editor to set up the database

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Families table
create table families (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  contact_email text,
  phone text,
  address text,
  pin text unique not null,
  created_at timestamptz default now()
);

-- Children table
create table children (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid references families(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  dob date not null,
  ssn_last4 text,
  cohort_year integer not null,
  enrollment_status text not null default 'identified'
    check (enrollment_status in (
      'identified', 'invited', 'application_started',
      'form_4547_filed', 'account_opened', 'contributions_active'
    )),
  form_4547_filed_at timestamptz,
  account_opened_at timestamptz,
  created_at timestamptz default now()
);

-- Contributions table
create table contributions (
  id uuid primary key default uuid_generate_v4(),
  child_id uuid references children(id) on delete cascade not null,
  amount numeric(10,2) not null,
  date date not null,
  source text not null,
  notes text,
  created_at timestamptz default now()
);

-- Funds received table
create table funds (
  id uuid primary key default uuid_generate_v4(),
  source text not null,
  amount numeric(12,2) not null,
  date_received date not null,
  notes text,
  created_at timestamptz default now()
);

-- Fund allocations (which fund paid for which contribution)
create table fund_allocations (
  id uuid primary key default uuid_generate_v4(),
  fund_id uuid references funds(id) on delete cascade not null,
  child_id uuid references children(id) on delete cascade not null,
  amount numeric(10,2) not null,
  date date not null,
  created_at timestamptz default now()
);

-- Regulatory tracker
create table regulatory_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  due_date date,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'resolved', 'action_required')),
  created_at timestamptz default now()
);

-- Documents
create table documents (
  id uuid primary key default uuid_generate_v4(),
  child_id uuid references children(id) on delete set null,
  family_id uuid references families(id) on delete set null,
  file_name text not null,
  file_url text not null,
  category text,
  uploaded_by text,
  created_at timestamptz default now()
);

-- Projections
create table projections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  cohort_year integer not null,
  cohort_size integer not null,
  contribution_per_child numeric(10,2) not null,
  notes text,
  created_at timestamptz default now()
);

-- Indexes
create index idx_children_family on children(family_id);
create index idx_children_cohort on children(cohort_year);
create index idx_children_status on children(enrollment_status);
create index idx_contributions_child on contributions(child_id);
create index idx_contributions_date on contributions(date);
create index idx_fund_allocations_fund on fund_allocations(fund_id);
create index idx_fund_allocations_child on fund_allocations(child_id);
create index idx_documents_child on documents(child_id);
create index idx_documents_family on documents(family_id);
create index idx_families_pin on families(pin);

-- Row Level Security (RLS)
alter table families enable row level security;
alter table children enable row level security;
alter table contributions enable row level security;
alter table funds enable row level security;
alter table fund_allocations enable row level security;
alter table regulatory_items enable row level security;
alter table documents enable row level security;
alter table projections enable row level security;

-- Admin policy: authenticated users can do everything
-- (Supabase Auth users = admin staff)
create policy "Admin full access" on families
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on children
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on contributions
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on funds
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on fund_allocations
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on regulatory_items
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on documents
  for all using (auth.role() = 'authenticated');
create policy "Admin full access" on projections
  for all using (auth.role() = 'authenticated');

-- Applicant access is handled via API routes that verify PIN
-- and return only that family's data (no direct Supabase access for applicants)
