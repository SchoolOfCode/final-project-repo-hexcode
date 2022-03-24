// -----------------------------------------------------------
// This file sets up the PostgreSQL database connection object
//
// The DATABASE_URL can be taken from Heroku, after the database has been created, and pasted into the .env file.
//  The dotenv npm package copies anything from there into the equivalent process.env variable(s)
// -----------------------------------------------------------

import pg from "pg"; // Note: the pg imported is an object
import { DATABASE_URL } from "../config.js";

// Note: exporting the pool so it can be used for Jest etc.
export const pool = new pg.Pool({
    //set up the database connection string object
    connectionString: DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Note:
// - This query() function will be used for all queries to the database.
// - the sql command will pass as a string argument into the 'text' parameter
// - the params object is needed to create paramaterised sql statements
// - there's sometimes an optional callback function as 3rd param, but because we are using async/await instead of callback functions,
//    we have removed that 3rd param, and since the pool.query() method is overloaded, it will instead return a promise.)
export default function query(text, params) {
    return pool.query(text, params);
}
