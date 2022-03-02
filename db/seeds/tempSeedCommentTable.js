import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-how-data-relates.md BEFORE ADDING/CHANGING THIS DATA
// **********************************************************************
// NB - event_id can be any event SO LONG AS the author_user_id is invited (ie. there's a matching record in event_invitee table)
// NB - author_user_id can be any user, with or without accounts, so 1 to 9
//
// NB: DO NOT INSERT into main id field (comment_id) - messes up the auto-increment for subsequent inserts
// NB: DO NOT INSERT into the create data/time field (comment_create_date_time) - it auto-populates
const sqlString = `INSERT INTO comment
        (
            event_id,
            author_user_id,
            comment_text,
            comment_date_posted
        )
    VALUES
        (1, 4, 'I cannot find parking - where are you all?', '2022-12-01'),
        (1, 3, 'We parked on Coders Lane', '2022-12-01'),
        (2, 2, 'I am super excited to see everyone next week!', '2022-11-30'),
        (2, 1, 'Me too! What are you planning on wearing?', '2022-11-29'),
        (3, 5, 'Hey, I am lost where is everyone?', '2022-12-01'),
        (3, 1, 'We are down at the docks unloading the kayaks', '2022-12-01'),
        (4, 2, 'Will be great to catch up with all the fam next week!', '2022-11-30'),
        (4, 1, 'Me too! Will be lovely to see mum again', '2022-11-30'),
        (4, 3, 'Who is bringing the cake?', '2022-11-30')
        ;`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedCommentTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedCommentTable.js: about to attempt to execute seed table sql"
);
executeSQL();
