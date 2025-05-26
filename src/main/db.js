import { Client } from 'pg';
const dbconfig = {
  "user": "postgres",
  "password": "password",
  "host": "localhost",
  "port": "5432",
  "database": "demo_2025"
}

export default async () => {
  const client = new Client(dbconfig);

  await client.connect();
  return client;
};