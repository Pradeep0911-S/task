CREATE TABLE IF NOT EXISTS users(
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hash_password TEXT NOT NULL,
    role TEXT NOT NULL
);