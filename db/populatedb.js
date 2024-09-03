const { Client } = require('pg');
require('dotenv').config();

const SQL = ``;

async function main() {
  const client = new Client({
    connectionString: process.env.LOCAL_DB,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
