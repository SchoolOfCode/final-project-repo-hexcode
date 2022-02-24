import query from "../connection.js";

// TODO: QUESTION - how long should event fields be?  Currently have set defaults in create table script
// TODO: What exactly will location store?  Address? Google Maps URL?
//TODO:  QUESTION - what format will we save EVENT_TIME in?  Currently have set to a simple varchar, not a real time,
// TODO: QUESTION - should it be EVENT_ACTIVITY or EVENT_CATEGORY?  Currently we've gone with category.
// TODO: revisit the 'default null' column settings - some might be manadatory eg category?
const sqlString = `CREATE TABLE IF NOT EXISTS event 
                         (id SERIAL PRIMARY KEY, 
                          organiser_id INT, 
                          event_title VARCHAR(50),
                          event_description VARCHAR(255) DEFAULT NULL,
                          event_location VARCHAR(255) DEFAULT NULL,
                          event_date DATE DEFAULT NULL,
                          event_time VARCHAR(10) DEFAULT NULL,
                          event_requirements VARCHAR(255) DEFAULT NULL,
                          event_category VARCHAR(50) DEFAULT NULL,
                          create_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
                          )`;
// TODO: refactor to include a foreign key constraint to the id in the user table:
// CONSTRAINT fk_user
// FOREIGN KEY(user_id)
//    REFERENCES user(id)

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log("DEBUG: db/migrations/createEventTable.js: Created table", res);
}
console.log(
    "DEBUG: db/migrations/createEventTable.js: about to attempt to execute create table sql"
);

executeSQL();
