import query from "../connection.js";
//  TODO: ARSHI - could import query, { pool } from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS app_user 
                        (app_user_id serial PRIMARY KEY,
                         app_user_email VARCHAR (50) NOT NULL,
                         app_user_has_account BOOL NOT NULL DEFAULT FALSE,
                         app_user_first_name VARCHAR (30) DEFAULT NULL,
                         app_user_last_name VARCHAR (30) DEFAULT NULL,
                         app_user_profile_pic_link VARCHAR (200),
                         app_user_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        )`;
//BUG FIX - TIME not saving in createdatetime: Replacing TIMESTAMP NOT NULL DEFAULT CURRENT_DATE with TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

// TODO: ARSHI - could export this function - then import all of these into another main file, which would start pool  run all, then close pool.
async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createAppUserTable.js: Created table",
        res
    );
}

console.log(
    "DEBUG: db/migrations/createAppUserTable.js: about to attempt to execute create table sql"
);

executeSQL();
// TODO:  ARSHI - could add code to always shut down the pool. NEED TO THINK about how we'd open pool once for all the scripts
// executeSQL().finally(async () => {
//     await pool.end();
// });
