import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS contact 
                         (contact_id SERIAL PRIMARY KEY, 
                          contact_owner_user_id INT, 
                          contact_user_id INT,
                          contact_name VARCHAR(50) DEFAULT NULL,
                          contact_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                          )`;
// TODO: refactor to include relevant foreign key constraints

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createContactTable.js: Created table",
        res
    );
}
console.log(
    "DEBUG: db/migrations/createContactTable.js: about to attempt to execute create table sql"
);

executeSQL();
