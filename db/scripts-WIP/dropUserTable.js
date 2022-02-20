import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS user`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/scripts/dropUserTable.js: Dropped table", res);
}

executeSQL();
