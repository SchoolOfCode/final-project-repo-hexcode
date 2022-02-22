import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS app_user`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropAppUserTable.js: Dropped table", res);
}

executeSQL();
