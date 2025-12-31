\connect school

CREATE TABLE IF NOT EXISTS school_schema.teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL
);
