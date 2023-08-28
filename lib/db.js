import { Client } from 'pg';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export function connect() { return client.connect(); }
export function query(text, params) { return client.query(text, params); }
export function end() { return client.end(); }