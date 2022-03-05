import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS poll_option
                                        (poll_option_id serial PRIMARY KEY,
                                         poll_id INT,
                                         poll_option_description VARCHAR(50),
                                         poll_option_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                                          )`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createPollOptionTable.js: Created table",
        res
    );
}
console.log(
    "DEBUG: db/migrations/createPollOptionTable.js: about to attempt to execute create table sql"
);

executeSQL();
