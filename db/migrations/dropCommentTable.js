import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS comment`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropCommentTable.js: Dropped table", res);
}

executeSQL();
