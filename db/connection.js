//Set up the PostgreSQL connection object - see Wed 15 Dec (day 23, W5.D3) for detailed explanation

//Note the DATABASE_URL can be taken from Heroku, after the database has been created, and pasted into the .env file. The dotenv npm package copies anything from there into the equivalent process.env variable(s)
import pg from "pg"; ///FYI the pg imported is an object
import { DATABASE_URL } from "../config.js";

//version before i set up DATABASE_URL in config.js.  Keep code until i've tested it
// const pool = new pg.Pool({
//     //set up connection string object
//     connectionString: process.env.DATABASE_URL,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });
const pool = new pg.Pool({
    //set up connection string object
    connectionString: DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false,
    },
});

//Note:
// - This will be used for all queries to the database.
// - the sql command string will pass as an argument into the 'text' parameter
// - the params object is needed to create paramaterised sql statements
// - (and there's sometimes an optional callback function as 3rd param, but because we are using async/await instead of callback functions,  we have removed that 3rd param, and since the pool.query() method is overloaded, it will instead return a promise.)
export default function query(text, params) {
    return pool.query(text, params);
}
