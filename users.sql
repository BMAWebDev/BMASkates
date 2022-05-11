CREATE TYPE roles AS ENUM('admin', 'moderator', 'default');

CREATE TABLE IF NOT EXISTS users (
   id serial PRIMARY KEY,
   email VARCHAR(100) NOT NULL,
   parola VARCHAR(500) NOT NULL,
   username VARCHAR(100) UNIQUE NOT NULL,
   rol roles NOT NULL DEFAULT 'default',
   nume VARCHAR(100) NOT NULL,
   prenume VARCHAR(100) NOT NULL,
   cod_confirmare character varying(500),
   confirmat_mail boolean DEFAULT false,
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

-- CREATE TABLE IF NOT EXISTS accesari (
--    id serial PRIMARY KEY,
--    ip VARCHAR(100) NOT NULL,
--    user_id INT NULL REFERENCES users(id),
--    pagina VARCHAR(500) NOT NULL,
--    data_accesare TIMESTAMP DEFAULT current_timestamp
-- );