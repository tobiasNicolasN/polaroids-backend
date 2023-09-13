import mysql from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from "./config";

export const dataBase = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});
