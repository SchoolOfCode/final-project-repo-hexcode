import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS poll_option`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropPollOptionTable.js: Dropped table", res);
}

executeSQL();
