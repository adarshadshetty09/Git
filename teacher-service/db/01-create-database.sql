-- Create database if not exists
SELECT 'CREATE DATABASE school'
WHERE NOT EXISTS (
  SELECT FROM pg_database WHERE datname = 'school'
)\gexec
