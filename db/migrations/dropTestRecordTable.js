import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS test_record`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/migrations/dropTestRecordTable.js: Dropped table", res);
}

executeSQL();
