-- Create app_settings table for pause toggle
CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  is_paused BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial row (if it doesn't exist)
INSERT INTO app_settings (id, is_paused)
VALUES (1, false)
ON CONFLICT (id) DO NOTHING;

