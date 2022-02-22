import query from "../connection.js";

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
