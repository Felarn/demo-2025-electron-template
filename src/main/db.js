import { Client } from 'pg';
import fs from 'fs'
const dbconfig = JSON.parse(fs.readFileSync('./dbconfig.json'))
console.log(dbconfig)

export default async () => {
  const client = new Client(dbconfig);

  await client.connect();
  return client;
};