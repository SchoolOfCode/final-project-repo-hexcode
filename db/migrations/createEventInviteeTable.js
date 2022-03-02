import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS event_invitee 
                         (event_invitee_id SERIAL PRIMARY KEY, 
                          event_id INT,
                          invite_issuer_user_id INT, 
                          invitee_user_id INT, 
                          event_invitee_rsvp_status VARCHAR(15),
                          event_invitee_rsvp_logged_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                          event_invitee_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                          )`;
// TODO: refactor to include relevant foreign key constraints

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createEventInviteeTable.js: Created table",
        res
    );
}
console.log(
    "DEBUG: db/migrations/createEventInviteeTable.js: about to attempt to execute create table sql"
);

executeSQL();
