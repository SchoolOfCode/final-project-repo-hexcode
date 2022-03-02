import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS contact`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropContactTable.js: Dropped table", res);
}

executeSQL();
