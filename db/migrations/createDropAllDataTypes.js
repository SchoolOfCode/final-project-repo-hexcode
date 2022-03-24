// WORKING, BUT NOT YET IN USE
// TODO: add this to the package.json so it's part of the db-deploy-all-tables, and test
import query from "../db/connection.js";

async function executeSQL(sqlString) {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createAllDataTypes.js: Created data types"
    );
}

const sqlStringDropRSVPStatusType = `DROP TYPE IF EXISTS RSVP_STATUS_TYPE`;
const sqlStringCreateRSVPStatusType = `CREATE TYPE "RSVP_STATUS_TYPE" AS ENUM ('ATTENDING', 'NOT_ATTENDING')`;

console.log("DEBUG: db/migrations/createAllDataTypes.js: calling executeSQL");

executeSQL(sqlStringDropRSVPStatusType);
executeSQL(sqlStringCreateRSVPStatusType);
