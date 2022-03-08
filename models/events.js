import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// ***************************************************************
//       GET ALL EVENTS (regardless of user - test purposes only)
// ***************************************************************
export async function getAllEvents() {
    const sqlString = `SELECT
        e.event_id as "eventId", 
        e.organiser_user_id as "organiserUserId",
        e.event_title as "eventTitle",
        e.event_description as "eventDescription",
        e.event_location as "eventLocation",
        to_char(e.event_date,'DD-MM-YYYY') as "eventDate",
        e.event_time as "eventTime",
        e.event_requirements as "eventRequirements",
        e.event_category as "eventCategory",
        e.event_create_date_time as "eventCreateDateTime",
        a.app_user_email as "organiserEmail",
        a.app_user_first_name as "organiserFirstName",
        a.app_user_last_name as "organiserLastName",
        concat(a.app_user_first_name, ' ', a.app_user_last_name) as "organiserName",
        a.app_user_profile_pic_link as "organiserProfilePicLink",
        a.app_user_create_date_time as "organiserCreateDateTime"
    FROM event e
    LEFT OUTER JOIN app_user a ON e.organiser_user_id = a.app_user_id
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
export async function getAllEventsByAppUserId(requestedUserId) {
    // 02Mar2022 - REFACTORING to get all events where appUserId = organiser OR an invitee.
    // can just select off invitee list BECAUSE we've edited the 'post event' to ALSO insert the logged in user into the invitee table.
    // OLD join:
    //     FROM event e
    //     INNER JOIN app_user a ON e.organiser_user_id = a.app_user_id
    //     WHERE a.app_user_id = $1
    //     ORDER BY e.event_id DESC;`;

    // TODO: this more complicated select, where i try and get the invitees' names
    //        from the loggedin users's contact list, rather than the app users's table isn't working.
    //       going to park it and go back to simpler select for now.

    // const sqlString = `SELECT DISTINCT
    //         e.event_id as "eventId",
    //         e.event_title as "eventTitle",
    //         e.event_description as "eventDescription",
    //         e.event_location as "eventLocation",
    //         to_char(e.event_date,'DD-MM-YYYY') as "eventDate",
    //         e.event_time as "eventTime",
    //         e.event_requirements as "eventRequirements",
    //         e.event_category as "eventCategory",
    //         e.event_create_date_time as "eventCreateDateTime",

    //         e.organiser_user_id as "organiserUserId",
    //         a.app_user_first_name as "organiserFirstName",
    //         a.app_user_last_name as "organiserLastName",
    //         a.app_user_email as "organiserEmail",
    //         a.app_user_profile_pic_link as "organiserProfilePicLink",
    //         a.app_user_create_date_time as "organiserCreateDateTime",

    //         i.invitee_user_id as "inviteeUserId",
    //         c.contact_name as "inviteeContactName",
    //         b.app_user_first_name as "inviteeAppUserFirstName",
    //         b.app_user_last_name as "inviteeAppUserLastName",
    //         b.app_user_email as "inviteeEmail",
    //         i.event_invitee_rsvp_status as "inviteeRsvpStatus",
    //         i.invite_issuer_user_id as "inviteIssuerUserId",
    //         to_char(i.event_invitee_rsvp_logged_date_time,'DD-MM-YYYY HH:MM:SS') as "eventInviteeRsvpLoggedDateTime",
    //         i.event_invitee_create_date_time as "eventInviteeCreateDateTime",
    //         i.event_invitee_id as "eventInviteeId"

    //     FROM event e
    //     INNER JOIN app_user a ON e.organiser_user_id = a.app_user_id
    //     INNER JOIN event_invitee i ON i.event_id = e.event_id
    //     INNER JOIN app_user b ON i.invitee_user_id = b.app_user_id
    //     INNER JOIN contact c ON  i.invitee_user_id = c.contact_user_id
    //                          AND i.invite_issuer_user_id = c.contact_owner_user_id
    //     WHERE i.invitee_user_id = $1
    //     ORDER BY e.event_id DESC;`;

    // TEMP: simpler select to get all events for the loggedin user where they are the organiser or invitee.
    const sqlString = `SELECT DISTINCT
            e.event_id as "eventId", 
            e.event_title as "eventTitle",
            e.event_description as "eventDescription",
            e.event_location as "eventLocation",
            to_char(e.event_date,'DD-MM-YYYY') as "eventDate",
            e.event_time as "eventTime",
            e.event_requirements as "eventRequirements",
            e.event_category as "eventCategory",
            e.event_create_date_time as "eventCreateDateTime",
            e.organiser_user_id as "organiserUserId",

            a.app_user_first_name as "organiserFirstName",
            a.app_user_last_name as "organiserLastName",
            concat(a.app_user_first_name, ' ', a.app_user_last_name) as "organiserName",
            a.app_user_email as "organiserEmail",
            a.app_user_profile_pic_link as "organiserProfilePicLink",
            a.app_user_create_date_time as "organiserCreateDateTime",

            i.invitee_user_id as "inviteeUserId",
            b.app_user_email as "inviteeEmail",
            i.event_invitee_rsvp_status as "inviteeRsvpStatus"

        FROM event e
        INNER JOIN app_user a ON e.organiser_user_id = a.app_user_id
        INNER JOIN event_invitee i ON i.event_id = e.event_id
        INNER JOIN app_user b ON i.invitee_user_id = b.app_user_id
        
        WHERE i.invitee_user_id = $1
        ORDER BY e.event_id DESC;`;

    const sqlStringParams = [requestedUserId];

    debugOut(
        `/models/events.js - getAllEventsForOneUser`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString, sqlStringParams);

    debugOut(
        `/models/events.js - getAllEventsForOneUser`,
        `data.rows = ${data.rows}`
    );
    debugOut(`/models/events.js - getAllEventsForOneUser`, data.rows, true);

    return data.rows;
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
            to_char(e.event_date,'DD-MM-YYYY') as "eventDate",
            e.event_time as "eventTime",
            e.event_requirements as "eventRequirements",
            e.event_category as "eventCategory",
            e.event_create_date_time as "eventCreateDateTime",
            a.app_user_email as "organiserEmail",
            a.app_user_first_name as "organiserFirstName",
            a.app_user_last_name as "organiserLastName",
            concat(a.app_user_first_name, ' ', a.app_user_last_name) as "organiserName",
            a.app_user_profile_pic_link as "organiserProfilePicLink",
            a.app_user_create_date_time as "organiserCreateDateTime"

        FROM event e
        INNER JOIN app_user a ON e.organiser_user_id = a.app_user_id
        WHERE e.event_id = $1;`;

    const sqlStringParams = [eventId];

    debugOut(`/models/events.js - getEventById`, `sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    debugOut(`/models/events.js - getEventById`, `data.rows = ${data.rows}`);
    debugOut(`/models/events.js - getEventById`, data.rows, true);

    // ---- NB: TODO: Now just return object not array of 1 object - more RESTful says ARshi  ----
    return data.rows;
    // return data.rows[0];
}

// ************************************************
//       POST NEW EVENT for a given APP USER ID
//       i.e.
//       insert a new event, just to the event table
//       (none of the extra sub records, comments, polls etc)
//       TODO: MIGHT ADD THE USER AS AN INVITEE?
// ************************************************
export async function postEvent(newEvent) {
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

    debugOut(`/models/events.js - postEvent`, `sqlString = ${sqlString}`);

    const result = await query(sqlString, sqlStringParams);

    const newEventId = result.rows[0].event_id;

    debugOut(`/models/events.js - postEvent`, result, true);

    debugOut(`/models/events.js - postEvent`, `NEW EVENT_ID is: ${newEventId}`);

    //TODO: maybe change what's returned. Ony returning new event id for now
    return newEventId;
    //we could return result, or could specifically just return the new event object (result.rows[0]) - BUT WOULD FIRST NEED TO MAP from TABLE_NAMES TO frontEndNames
}

// ************************************************
// UPDATE an event (given an event_id) (probably a PATCH
// ************************************************
