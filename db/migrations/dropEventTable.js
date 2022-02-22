import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS event`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropEventTable.js: Dropped table", res);
}

executeSQL();
