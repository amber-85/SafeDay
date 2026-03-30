// import {Pool} from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// export const pool=new Pool({
//     connectionString:process.env.DB_URL,
// });

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.DB_URL){
    throw new Error("DB_URL is not defined in environment variables");
}

export const pool = new Pool({
  connectionString: process.env.DB_URL,
});