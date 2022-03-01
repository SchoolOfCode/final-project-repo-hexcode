import query from "../connection.js";

const sqlString = `DROP TABLE IF EXISTS event_invitee`;

async function executeSQL() {
    const res = await query(sqlString);
    console.log(
        "In db/migrations/dropEventInviteeTable.js: Dropped table",
        res
    );
}

executeSQL();
