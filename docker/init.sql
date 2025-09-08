-- ================================================
-- 🐘 Inicialización de la base de datos ARQUETIPO
-- ================================================

-- 1. Crear extensión para generación automática de UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Crear base de datos arquetipo si no existe
DO
$$
BEGIN
   IF NOT EXISTS (
       SELECT FROM pg_database WHERE datname = 'arquetipo'
   ) THEN
       EXECUTE 'CREATE DATABASE arquetipo';
   END IF;
END
$$ LANGUAGE plpgsql;

-- 3. Cambiar al contexto de la base arquetipo
\connect arquetipo;

-- 4. Crear esquema usuarios si no existe
CREATE SCHEMA IF NOT EXISTS usuarios;

-- 5. Configurar el search_path para usar usuarios por defecto
ALTER DATABASE arquetipo SET search_path TO usuarios, public;

-- 6. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- 7. Insertar usuario administrador inicial
INSERT INTO usuarios.users (name, email)
SELECT 'Administrador', 'admin@minvu.cl'
WHERE NOT EXISTS (
    SELECT 1 FROM usuarios.users WHERE email = 'admin@minvu.cl'
);
