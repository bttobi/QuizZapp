import pg from 'pg';
import config from 'dotenv';

config.configDotenv();

const DATABASE_PORT = process.env.VITE_DATABASE_PORT || 5432;
const DATABASE_HOST = process.env.VITE_DATABASE_HOST || 'localhost';
const DATABASE_USER = process.env.VITE_DATABASE_USER || 'test';
const DATABASE_PASSWORD = process.env.VITE_DATABASE_PASSWORD || 'password';
const DATABASE_NAME = process.env.VITE_DATABASE_NAME || 'users';

const { Client } = pg;

const client = new Client({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  port: DATABASE_PORT,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

client.connect();

export default client;
