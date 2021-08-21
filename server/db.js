import { config } from 'dotenv';
config();

import knex from 'knex';

const development = {
  client: 'mysql2',
  connection: {
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
  },
};

const production = {
  client: 'pg',
  connection: process.env.DB_STRING_PG,
};

export default knex(
  process.env.ENV === 'development' ? development : production
);
