insert into public.packages (name, duration_days, weight, is_featured, price)
values
  ('Basic', 7, 1, false, 1999),
  ('Standard', 15, 2, false, 3999),
  ('Premium', 30, 3, true, 7499)
on conflict (name) do nothing;

insert into public.categories (name, slug)
values
  ('Electronics', 'electronics'),
  ('Vehicles', 'vehicles'),
  ('Real Estate', 'real-estate'),
  ('Services', 'services'),
  ('Events', 'events')
on conflict (slug) do nothing;

insert into public.cities (name, slug)
values
  ('Karachi', 'karachi'),
  ('Lahore', 'lahore'),
  ('Islamabad', 'islamabad'),
  ('Rawalpindi', 'rawalpindi'),
  ('Multan', 'multan')
on conflict (slug) do nothing;

insert into public.learning_questions (question, answer, topic, difficulty)
values
  (
    'Why did we choose Supabase Postgres instead of local file storage?',
    'Because the project needs relational data, deployment readiness, and traceable workflow transitions.',
    'database',
    'easy'
  ),
  (
    'How does the ad lifecycle protect business logic better than a simple approved or rejected model?',
    'Because moderation, payment verification, scheduling, publish timing, and expiry are all handled as separate states.',
    'workflow',
    'medium'
  )
on conflict do nothing;
