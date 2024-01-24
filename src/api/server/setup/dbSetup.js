import pg from 'pg';
import config from 'dotenv';

config.configDotenv();

const DATABASE_PORT = process.env.VITE_DATABASE_PORT || 5432;
const DATABASE_HOST = process.env.VITE_DATABASE_HOST || 'localhost';
const DATABASE_USER = process.env.VITE_DATABASE_USER || 'test';
const DATABASE_PASSWORD = process.env.VITE_DATABASE_PASSWORD || 'password';
const DATABASE_NAME = process.env.VITE_DATABASE_NAME || 'users';

const { Pool } = pg;

const client = new Pool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  port: DATABASE_PORT,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  ssl: true,
  connectionTimeoutMillis: 0,
  acquireConnectionTimeout: 5000,
  pool: {
    min: 0,
    max: 10,
    createTimeoutMillis: 8000,
    acquireTimeoutMillis: 8000,
    idleTimeoutMillis: 8000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  },
});

client.connect();

export default client;
