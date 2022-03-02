import query from "../connection.js";

//NB: Need to NOT send in a value for id column, because it messes up the auto-increment for subsequent inserts.
//NB: Also no need to manually insert into any auto-populated columns, like CREATE_DATE_TIME
const sqlString = `INSERT INTO comment
        (
            event_id,
            author_user_id,
            comment_text,
            comment_date_posted
        )
    VALUES
        (3, 1, 'Hey, I am lost where is everyone?', '2022-12-01'),
        (1, 3, 'We parked on Coders Lane', '2022-12-01'),
        (4, 2, 'I am super excited to see everyone next week!', '2022-11-30'),
        (2, 5, 'Me too! What are you planning on wearing?', '2022-11-29'),
        (3, 4, 'Hey, I am lost where is everyone?', '2022-12-01');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedCommentTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedCommentTable.js: about to attempt to execute seed table sql"
);
executeSQL();
