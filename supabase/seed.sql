-- filepath: c:\Users\lucas\Projets\pomodoro\supabase\seed.sql

-- Insérer des pays dans la table Countries
INSERT INTO public."Countries" (id, created_at, countries) VALUES
(1, NOW(), 'France'),
(2, NOW(), 'Germany'),
(3, NOW(), 'Spain');

