import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS poll`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropPollTable.js: Dropped table", res);
}

executeSQL();