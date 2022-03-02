import query from "../connection.js";

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
