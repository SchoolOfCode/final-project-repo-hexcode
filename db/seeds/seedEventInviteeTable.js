import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-how-data-relates.md BEFORE ADDING/CHANGING THIS DATA
// **********************************************************************
// NB - invitee_user_id can only any users, with or without accounts, so 1 to 9
// NB - invite_issuer_user_id can ONLY be 1 to 5 (i.e. only full users can invite and can have contact lists)
//                                               AND the person issuing invite MUST have invitee on their contact list.
//
// NB: DO NOT INSERT into main id field (event_invitee_id) - messes up the auto-increment for subsequent inserts
// NB: DO NOT INSERT into the create data/time field (event_invitee_create_date_time) - it auto-populates
const sqlString = `INSERT INTO event_invitee
        (
            event_id,
            invite_issuer_user_id,
            invitee_user_id,
            event_invitee_rsvp_status,
            event_invitee_rsvp_logged_date_time
        )
    VALUES
        (1, 5, 1, 'TBC', NULL),
        (1, 3, 1, 'TBC', NULL);`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedEventInviteeTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedEventInviteeTable.js: about to attempt to execute seed table sql"
);
executeSQL();
