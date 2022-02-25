import query from "../connection.js";

//NB: Need to NOT send in a value for id column, because it messes up the auto-increment for subsequent inserts.
//NB: Also no need to manually insert into any columns that hav a DEFAULT listed in the 'create table statement', like CREATE_DATE_TIME
const sqlString = `INSERT INTO event(
                        organiser_id, 
                        event_title, 
                        event_description,
                        event_location,
                        event_date,
                        event_time,
                        event_requirements,
                        event_category)

                    VALUES
                        (1, 'Mary 31st Birthday Dinner', 'Let us arrange dinner at Marcos restaurant for Marys birthday. I will set up a poll for dates', 'Marcos Restaurant', NULL, '8pm', 'No gifts - just bring yourselves', 'Dinner'),
                        (1, 'Spa Day', 'Hey girls! We have talked about spa day loads. Lets just do it', 'Hoar Cross Hotel Spa', NULL, NULL, 'No gifts - just bring yourselves', 'Dinner'),
                        (1, 'sea kayaking', 'Let us book in the next sea kayaking evening', 'Shadwell Basin', NULL, '6pm', 'kayakys provided. Bring wetsuits', 'Exercise'),
                        (4, 'birthday party for Mum', 'Let us book in a date for gathering at mums house for her birthday', 'Mums House', NULL, '6pm', 'Bring food', 'Family Gathering');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedEventTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedEventTable.js: about to attempt to insert rows"
);
executeSQL();

//FYI - the test user records  that we've set up are:
// 1 = Belinda
// 2 = Maria
// 3 = Akiko
// 4 = Dave
// 5 = Luke
