import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-how-data-relates.md BEFORE ADDING/CHANGING THIS DATA
// **********************************************************************
// NB - event_id can be any event SO LONG AS the poll_creator_user_id is invited
// NB - poll_creator_user_id must have an account and must  be invited to the event
//                           so can only  be users 1 to 5
//                           and must have a matching record in event_invitee table for that event
//
// NB: DO NOT INSERT into main id field (poll_id) - messes up the auto-increment for subsequent inserts
// NB: DO NOT INSERT into the create data/time field (poll_create_date_time) - it auto-populates
const sqlString = `INSERT INTO poll
        (
            event_id,
            poll_creator_user_id,
            poll_title,
            poll_comment,
            poll_category,
            poll_multiple_votes_allowed,
            poll_status
        )
    VALUES
        (1, 1, 'Available Dates?', 'Hey guys which dates are you available?', 'Birthday party', FALSE, 'OPEN'),
        (2, 1, 'Favourite Day?', 'Girls please pick your fav day!', 'SPA & champagne', FALSE, 'OPEN'),
        (3, 5, 'Book table Y/N?', 'Hey team would you like me to book a table for some drinks afterwards?', 'Cheeky drink', FALSE, 'OPEN'),
        (4, 4, 'Lets pick a location', 'Where would people like best of these options?', 'Location', FALSE, 'OPEN');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedPollTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedPollTable.js: about to attempt to insert rows"
);
executeSQL();
