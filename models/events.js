import query from "../db/connection.js";

export async function getAllEvents() {
    const sqlString = `SELECT *
        FROM event e
        ORDER BY e.id DESC;`;

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}

export async function getEventById(eventId) {
    // VERSION 1: First, for basic test,  just do a simple select
    const sqlString = `SELECT *
        FROM event ev
        WHERE ev.id = ${eventId};`; //TODO: refactor to use params and an array

    // VERSION 2: TODO: then update to proper select (with join if one was needed) and aliases to match the variable names used in the front end

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}

export async function postEvent(newEvent) {
    console.log({ newEvent });

    //20Jan2022 - don't forget that any of the values that are strings ALSO need single quotes around them - see below
    const sqlString = `INSERT INTO buddy_searches(
        user_id,
        session_type,
        why_study_buddy,
        approx_availability,
        search_status
    )
    VALUES(
         ${newBuddySearch.userId},
        '${newBuddySearch.sessionType}',
        '${newBuddySearch.whyStudyBuddy}',
        '${newBuddySearch.approxAvailability}',
        'open'
    );`; //TODO: refactor to use params and an array

    const result = await query(sqlString);
    console.log({ result });

    return result;
}
