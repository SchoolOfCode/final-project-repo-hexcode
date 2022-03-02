import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// ************************************************
//       GET ALL EVENTS
// ************************************************
export async function getAllEvents() {
    const sqlString = `SELECT
        e.event_id as "eventId", 
        e.organiser_user_id as "organiserUserId",
        e.event_title as "eventTitle",
        e.event_description as "eventDescription",
        e.event_location as "eventLocation",
        e.event_date as "eventDate",
        e.event_time as "eventTime",
        e.event_requirements as "eventRequirements",
        e.event_category as "eventCategory",
        e.event_create_date_time as "eventCreateDateTime",
        a.app_user_email as "organiserEmail",
        a.app_user_first_name as "organiserFirstName",
        a.app_user_last_name as "organiserLastName",
        a.app_user_profile_pic_link as "organiserProfilePicLink",
        a.app_user_create_date_time as "organiserCreateDateTime"
    FROM event e
    INNER JOIN app_user a ON e.organiser_user_id = a.app_user_id
    ORDER BY e.event_id DESC;`;
    // order descending so any event just added will be at the top

    // console.log(`DEBUG: sqlString = ${sqlString}`);
    debugOut(`/models/events.js - getAllEvents`, `sqlString = ${sqlString}`);

    const data = await query(sqlString);

    // console.log(`DEBUG: data = ${data}`);
    debugOut(`/models/events.js - getAllEvents`, `data = ${data}`);

    // console.log(`DEBUG: data.rows = ${data.rows}`);
    debugOut(`/models/events.js - getAllEvents`, `data.rows = ${data.rows}`);

    return data.rows;
}

// *********************************************************
//       GET ALL EVENTS for a given APP USER ID
//       e.g.
//       /appusers/:2/events/, where 2 is an app_user_id
//********************************************************
export async function getAllEventsForOneUser(appUserId) {
    //TODO: replace this hardcoded object with a SQL SELECT(S) and code to map the results from the select, into a user object containing an array of event objects
    const tempUserWithEventsObject = [
        {
            appUserId: appUserId,
            appUserEmail: "maria@maria.com",
            appUserFirstName: "Maria",
            appUserLastName: "Rushmore",
            appUserProfilePicLink: "2.png",
            appUserCreateDateTime: "2022-02-23T00:00:00.000Z",
            appUserArrayOfEvents: [
                {
                    eventId: 17,
                    eventTitle: "THIS EVENT IS HARDCODED",
                    eventDescription:
                        "Let us arrange dinner at Bella Vista restaurant",
                    eventLocation: "Derby",
                    eventDate: "2022-03-29",
                    eventTime: "6pm",
                    eventRequirements: "smart casual attire only",
                    eventCategory: "Dinner",
                    eventCreateDateTime: "2022-02-23T00:00:00.000Z",
                },
                {
                    eventId: 12,
                    eventTitle: "SO IS THIS ONE (HARDCODED)",
                    eventDescription:
                        "Let us arrange dinner at Marcos restaurant for Marys birthday. I will set up a poll for dates",
                    eventLocation: "Marcos Restaurant",
                    eventDate: "2022-03-28",
                    eventTime: "8pm",
                    eventRequirements: "No gifts - just bring yourselves",
                    eventCategory: "Dinner",
                    eventCreateDateTime: "2022-02-23T00:00:00.000Z",
                },
            ],
        },
    ];

    return tempUserWithEventsObject;
}

// ************************************************
//       GET ONE EVENT for a given EVENT ID
//       e.g.
//       /events/:12, where 12 is an event_id
// ************************************************
export async function getEventById(eventId) {
    const sqlString = `SELECT
            e.event_id as "eventId", 
            e.organiser_user_id as "organiserUserId",
            e.event_title as "eventTitle",
            e.event_description as "eventDescription",
            e.event_location as "eventLocation",
            e.event_date as "eventDate",
            e.event_time as "eventTime",
            e.event_requirements as "eventRequirements",
            e.event_category as "eventCategory",
            e.event_create_date_time as "eventCreateDateTime",
            a.app_user_email as "organiserEmail",
            a.app_user_first_name as "organiserFirstName",
            a.app_user_last_name as "organiserLastName",
            a.app_user_profile_pic_link as "organiserProfilePicLink",
            a.app_user_create_date_time as "organiserCreateDateTime"

        FROM event e
        INNER JOIN app_user a ON e.organiser_user_id = a.app_user_id
        WHERE e.event_id = $1;`;

    const sqlStringParams = [eventId];

    // console.log(`sqlString = ${sqlString}`);
    debugOut(`/models/events.js - getEventById`, `sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    // console.log(`data.rows = ${data.rows}`);
    debugOut(`/models/events.js - getEventById`, `data.rows = ${data.rows}`);
    // console.log(data.rows);
    debugOut(`/models/events.js - getEventById`, data.rows, true);

    return data.rows;
}

// ************************************************
//       POST NEW EVENT for a given APP USER ID
//       i.e.
//       insert a new event, just to the event table
//       (none of the extra sub records, comments, polls etc)
//       TODO: MIGHT ADD THE USER AS AN INVITEE?
// ************************************************
export async function postEvent(newEvent) {
    // console.log(`models/event.js/postEvent: `);
    // console.log({ newEvent });
    debugOut(`/models/events.js - postEvent`, newEvent, true);

    // TODO: test if it works if some of the incoming attributes are MISSING.
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
        VALUES(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
        ) RETURNING *;`;

    const sqlStringParams = [
        newEvent.organiserUserId,
        newEvent.eventTitle,
        newEvent.eventDescription,
        newEvent.eventLocation,
        newEvent.eventDate,
        newEvent.eventTime,
        newEvent.eventRequirements,
        newEvent.eventCategory,
    ];

    // console.log(`models/event.js/postEvent: sqlString = ${sqlString}`);
    debugOut(`/models/events.js - postEvent`, `sqlString = ${sqlString}`);

    const result = await query(sqlString, sqlStringParams);
    const newEventId = result.rows[0].event_id;

    // console.log(`models/event.js/postEvent: `);
    // console.log(result);
    debugOut(`/models/events.js - postEvent`, result, true);

    // console.log(
    //     `models/event.js/postEvent: NEW EVENT_ID is: ${newEventId}`
    // );
    debugOut(`/models/events.js - postEvent`, `NEW EVENT_ID is: ${newEventId}`);

    //TODO: maybe change what's returned. Ony returning new event id for now
    return newEventId;
    //we could return result, or could specifically just return the new event object (result.rows[0]) - BUT WOULD FIRST NEED TO MAP from TABLE_NAMES TO frontEndNames
}

// ************************************************
// UPDATE an event (given an event_id) (probably a PATCH
// ************************************************
