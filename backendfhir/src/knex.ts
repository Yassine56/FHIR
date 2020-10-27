import pg from "pg";
import knex from "knex";
const dotenv = require("dotenv");
dotenv.config();

pg.types.setTypeParser(20, "text", parseInt); // to return bigInts as number type instead of string
const config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    connectTimeout: 1000
  },
  pool: {
    min: 2,
    max: 10
  }
};
export default knex(config);
