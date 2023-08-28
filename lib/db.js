import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Userbase',
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});

export function query(text, params) { return pool.query(text, params); }
