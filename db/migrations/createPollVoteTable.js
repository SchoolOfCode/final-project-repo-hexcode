import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS poll_vote 
                    (poll_vote_id serial PRIMARY KEY,
                    poll_id INT,
                    poll_option_id INT,
                    voter_user_id INT,
                    poll_vote_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createPollVoteTable.js: Created table",
        res
    );
}
console.log(
    "DEBUG: db/migrations/createPollVoteTable.js: about to attempt to execute create table sql"
);

executeSQL();
