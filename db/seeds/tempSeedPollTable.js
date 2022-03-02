import query from "../connection.js";

const sqlString = `INSERT INTO poll
        (
            event_id,
            poll_creator_user_id,
            poll_title,
            poll_category,
            poll_multiple_votes_allowed,
            poll_status
        )
    VALUES
        (1, 1, 'Hey guys which dates are you available?', 'Birthday party', FALSE, 'OPEN'),
        (2, 1, 'Girls please pick your fav day!', 'SPA & champagne', FALSE, 'OPEN'),
        (3, 2, 'Hey team would you like me to book a table for some drinks afterwards?', 'Cheeky drink', FALSE, 'OPEN'),
        (4, 4, 'Which date is everyone available?', 'Mums Birthday', TRUE, 'OPEN');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedPollTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedPollTable.js: about to attempt to insert rows"
);
executeSQL();
