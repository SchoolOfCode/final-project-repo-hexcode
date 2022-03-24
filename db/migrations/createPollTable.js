import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS poll
                        (poll_id serial PRIMARY KEY,
                        event_id INT,
                        poll_creator_user_id INT,
                        poll_title VARCHAR(30),
                        poll_comment VARCHAR(255),
                        poll_category VARCHAR(50),
                        poll_multiple_votes_allowed BOOL DEFAULT FALSE,
                        poll_status VARCHAR(10) DEFAULT 'OPEN',
                        poll_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        )`;
// TODO: refactor to include relevant foreign key constraints

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log("DEBUG: db/migrations/createPollTable.js: Created table", res);
}
console.log(
    "DEBUG: db/migrations/createPollTable.js: about to attempt to execute create table sql"
);

executeSQL();
