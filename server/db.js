import { createPool } from "mysql2/promise";

export const pool = createPool({
  
  host: "localhost",
  port: 3307,
  user: "root",
  password: "Pichinch1",
  database: "taskdb",
});
