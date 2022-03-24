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
