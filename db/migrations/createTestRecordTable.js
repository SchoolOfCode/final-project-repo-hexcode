import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS test_record 
                         (id SERIAL PRIMARY KEY, 
                          user_id INT, 
                          test_some_string VARCHAR (25),
                          test_some_int INT,
                          test_some_status VARCHAR(10),
                          test_date_posted DATE NOT NULL DEFAULT CURRENT_DATE,
                          create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                          )`;
//BUG FIX - trying to get timestamp to save time as well as date. Replaced
// create_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
// with
// create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//UPDATE - tested the above and it worked.

// NOTE: in a real table, user_id column would be a foreign key to the id in the user table, and the create statement would include something like:
// CONSTRAINT fk_user
// FOREIGN KEY(user_id)
//    REFERENCES user(id)

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log(
        "DEBUG: db/migrations/createTestRecordTable.js: Created table",
        res
    );
}
console.log(
    "DEBUG: db/migrations/createTestRecordTable.js: about to attempt to execute create table sql"
);

executeSQL();
