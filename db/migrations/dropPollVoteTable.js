import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS poll_vote`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropPollVoteTable.js: Dropped table", res);
}

executeSQL();