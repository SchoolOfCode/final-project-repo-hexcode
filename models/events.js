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
    // const sqlString = `SELECT *
    //     FROM event ev
    //     WHERE ev.id = ${eventId};`; //TODO: refactor to use params and an array

    // VERSION 2: TODO: then update to proper select (with join if one was needed) and aliases to match the variable names used in the front end

    const sqlString = `SELECT
            e.id as "id", 
            e.event_title as "eventTitle",
            e.event_description as "eventDescription",
            e.event_location as "eventLocation",
            e.event_date as "eventDate",
            e.event_time as "eventTime",
            e.event_requirements as "eventRequirements",
            e.event_category as "eventCategory",
            e.create_date_time as "eventCreateDateTime",
            a.id as "organiserId",
            a.app_user_first_name as "organiserFirstName",
            a.app_user_last_name as "organiserLastName" ,
            a.app_user_email as "organiserEmail" ,
            a.app_user_profile_pic_link as "organiserProfilePicLink",
            a.create_date_time as "organiserCreateDateTime"

        FROM event e
        INNER JOIN app_user a ON e.user_id = a.id
        WHERE e.id = $1;`;

        const sqlStringParams = [eventId];

    

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}

export async function postEvent(newEvent) {
    console.log({ newEvent });

    // const sqlString = `INSERT INTO buddy_searches(
    //     user_id,
    //     session_type,
    //     why_study_buddy,
    //     approx_availability,
    //     search_status
    // )
    // VALUES(
    //      ${newBuddySearch.userId},
    //     '${newBuddySearch.sessionType}',
    //     '${newBuddySearch.whyStudyBuddy}',
    //     '${newBuddySearch.approxAvailability}',
    //     'open'
    // );`; //TODO: refactor to use params and an array

    const result = await query(sqlString);
    console.log({ result });

    return result;
}
