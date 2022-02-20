import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS study_request`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log("In db/scripts/dropStudyRequestTable.js: Dropped table", res);
}

executeSQL();
