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
            comment_text
        )
    VALUES
        (1, 7, 'I cannot find parking - where are you all?'),
        (1, 3, 'We parked on Coders Lane'),
        (2, 7, 'I am super excited to see everyone next week!'),
        (2, 1, 'Me too! What are you planning on wearing?'),
        (3, 5, 'Hey, I am lost where is everyone?'),
        (3, 7, 'We are down at the docks unloading the kayaks'),
        (4, 4, 'Will be great to catch up with all the fam next week!'),
        (4, 1, 'Me too! Will be lovely to see mum again'),
        (4, 8, 'Who is bringing the cake?')
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
