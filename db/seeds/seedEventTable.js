import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-seed-data-setup.md BEFORE ADDING/CHANGING THIS DATA
// **********************************************************************
// NB - organiser_user_id can ONLY be 1 to 5 (i.e. only full users can organise events)
//
// NB: DO NOT INSERT into main id field (event_id) - messes up the auto-increment for subsequent inserts
// NB: DO NOT INSERT into the create data/time field (event_create_date_time) - it auto-populates
const sqlString = `INSERT INTO event
                    (
                        organiser_user_id, 
                        event_title, 
                        event_description,
                        event_location,
                        event_date,
                        event_time,
                        event_requirements,
                        event_category
                    )

                    VALUES
                        (1, 'Mary 31st Birthday Dinner', 'Let us arrange dinner at Marcos restaurant for Marys birthday. I will set up a poll for dates', 'Lemon Restaurant', NULL, '8pm', 'No gifts - just bring yourselves', 'Dinner'),

                        (1, 'Spa Day', 'Hey girls! We have talked about spa day loads. Lets just do it', 'Hoar Cross Hotel Spa', NULL, NULL, 'No gifts - just bring yourselves', 'Dinner'),

                        (1, 'Sea Kayaking', 'Let us book in the next sea kayaking evening', 'Shadwell Basin', NULL, '6pm', 'Kayaks provided. Bring wetsuits', 'Exercise'),
                        
                        (4, 'Birthday Party for Mum', 'Let us book in a date for gathering at mums house for her birthday', 'Mums House', NULL, '6pm', 'Bring food', 'Family Gathering');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedEventTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedEventTable.js: about to attempt to insert rows"
);
executeSQL();
