import query from "../db/connection.js";

export async function getAllEvents() {
    const sqlString = `SELECT *
        FROM event e
        ORDER BY e.id DESC;`;

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data = ${data}`);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}

export async function getEventById(eventId) {
    // VERSION 1: First, for basic test,  just do a simple select
    // const sqlString = `SELECT *
    //     FROM event ev
    //     WHERE ev.id = ${eventId};`;

    // VERSION 2: then update to proper select (with join to app_user table) and aliases to match the variable names used in the front end
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
        INNER JOIN app_user a ON e.organiser_id = a.id
        WHERE e.id = $1;`;

    const sqlStringParams = [eventId];

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}

export async function postEvent(newEvent) {
    console.log({ newEvent });
    // TODO: temporarily have removed 'event_date' from the insert - need to figure out correct format for the data and then add it back in.
    // const sqlString = `INSERT INTO event(
    //                     organiser_id,
    //                     event_title,
    //                     event_description,
    //                     event_location,
    //                     event_date,
    //                     event_time,
    //                     event_requirements,
    //                     event_category
    //                     )
    //                     VALUES(
    //                         $1,
    //                         $2,
    //                         $3,
    //                         $4,
    //                         $5,
    //                         $6,
    //                         $7,
    //                         $8
    //                     );`;

    // const sqlStringParams = [
    //     newEvent.organiserId,
    //     newEvent.eventTitle,
    //     newEvent.eventDescription,
    //     newEvent.eventLocation,
    //     newEvent.eventDate,
    //     newEvent.eventTime,
    //     newEvent.eventRequirements,
    //     newEvent.eventCategory,
    // ];

    const sqlString = `INSERT INTO event(
        organiser_id,
        event_title,
        event_description,
        event_location,
        event_time,
        event_requirements,
        event_category
        )
        VALUES(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        );`;

    const sqlStringParams = [
        newEvent.organiserId,
        newEvent.eventTitle,
        newEvent.eventDescription,
        newEvent.eventLocation,
        newEvent.eventTime,
        newEvent.eventRequirements,
        newEvent.eventCategory,
    ];

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const result = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: `, { result });

    return result;
}
