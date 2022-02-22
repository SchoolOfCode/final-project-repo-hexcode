// need a export getAllEvents function

import query from "../db/connection.js";

//------------------------------
// Event Record will look like:
//------------------------------
// id SERIAL PRIMARY KEY,
// user_id INT,
// event_title VARCHAR(50),
// event_description VARCHAR(255) DEFAULT NULL,
// event_location VARCHAR(255) DEFAULT NULL,
// event_date DATE DEFAULT NULL,
// event_time VARCHAR(10) DEFAULT NULL,
// event_requirements VARCHAR(255) DEFAULT NULL,
// event_category VARCHAR(50) DEFAULT NULL,
// create_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_DATE

export async function getAllEvents() {
    const sqlString = `SELECT *
        FROM event e
        ORDER BY e.id DESC;`;

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}
