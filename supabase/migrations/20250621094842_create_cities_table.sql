-- Migration file: create_cities_table.sql
CREATE TABLE cities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) - optionnel
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Politique d'accès en lecture pour tous
CREATE POLICY "Cities are viewable by everyone" 
ON cities FOR SELECT 
USING (true);