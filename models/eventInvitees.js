import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// *****************************************************
//       GET ALL EVENT INVITEES (regardless of event)
//             (test purposes only)
//       e.g.
//           /eventinvitees
// *****************************************************
export async function getAllEventInvitees() {
    const sqlString = `SELECT
            i.event_id as "eventId",
            i.event_invitee_id as "eventInviteeId", 
            i.invite_issuer_user_id as "inviteIssuerUserId", 
            i.event_invitee_rsvp_status as "eventInviteeRsvpStatus",
            to_char(i.event_invitee_rsvp_logged_date_time,'DD-MM-YYYY HH:MM:SS') as "eventInviteeRsvpLoggedDateTime",
            to_char(i.event_invitee_create_date_time,'DD-MM-YYYY HH:MM:SS') as "eventInviteeCreateDateTime",
            i.invitee_user_id as "inviteeUserId",  
            a.app_user_email as "inviteeEmail",
            a.app_user_has_account as "inviteeHasAccount",
            a.app_user_first_name as "inviteeFirstName",
            a.app_user_last_name as "inviteeLastName",
            concat(a.app_user_first_name, ' ', a.app_user_last_name) as "inviteeName",
            a.app_user_profile_pic_link as "inviteeProfilePicLink",
            e.event_title as "eventTitle"

        FROM event_invitee i
        LEFT OUTER JOIN app_user a ON i.invitee_user_id = a.app_user_id
        LEFT OUTER JOIN event e ON i.event_id = e.event_id
        ORDER BY i.event_id, i.event_invitee_id;`;

    debugOut(
        `/models/eventInvitees.js - getAllEventInvitees`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString);
    debugOut(
        `/models/eventInvitees.js - getAllEventInvitees`,
        `data.rows = ${data.rows}`
    );
    debugOut(`/models/eventInvitees.js - getAllEventInvitees`, data.rows, true);

    return data.rows;
}

// ************************************************
//       GET ALL EVENT INVITEES for a given EVENT ID
//       e.g.
//       /events/:12/eventinvitees/  where 12 is an event_id
// ************************************************
// FYI - called from events routes, not eventInvitees routes
export async function getAllEventInviteesByEvent(eventId) {
    const sqlString = `SELECT
        i.event_id as "eventId",
        i.event_invitee_id as "eventInviteeId", 
        i.invite_issuer_user_id as "inviteIssuerUserId", 
        i.event_invitee_rsvp_status as "eventInviteeRsvpStatus",
        to_char(i.event_invitee_rsvp_logged_date_time,'DD-MM-YYYY HH:MM:SS') as "eventInviteeRsvpLoggedDateTime",
        to_char(i.event_invitee_create_date_time,'DD-MM-YYYY HH:MM:SS') as "eventInviteeCreateDateTime",
        i.invitee_user_id as "inviteeUserId",  
        a.app_user_email as "inviteeEmail",
        a.app_user_has_account as "inviteeHasAccount",
        a.app_user_first_name as "inviteeFirstName",
        a.app_user_last_name as "inviteeLastName",
        concat(a.app_user_first_name, ' ', a.app_user_last_name) as "inviteeName",
        a.app_user_profile_pic_link as "inviteeProfilePicLink",
        e.event_title as "eventTitle",
        e.event_description as "eventDescription",
        e.event_location as "eventLocation",
        e.event_date as "eventDate",
        e.event_time as "eventTime",
        e.event_requirements as "eventRequirements",
        e.event_category as "eventCategory",
        e.event_create_date_time as "eventCreateDateTime"

    FROM event_invitee i
    INNER JOIN app_user a ON i.invitee_user_id = a.app_user_id
    INNER JOIN event e ON i.event_id = e.event_id
    WHERE i.event_id = $1 
    ORDER BY i.event_id, i.event_invitee_id;`;

    const sqlStringParams = [eventId];
    debugOut(
        `/models/eventInvitees.js - getAllEventInviteesByEvent`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString, sqlStringParams);
    debugOut(
        `/models/eventInvitees.js - getAllEventInviteesByEvent`,
        `data.rows = ${data.rows}`
    );
    debugOut(
        `/models/eventInvitees.js - getAllEventInviteesByEvent`,
        data.rows,
        true
    );

    return data.rows;
}

// *****************************************************************
//       POST ONE EVENT_INVITEE and return new EVENT_INVITEE_ID
//
//       (will need the eventInvitee's event_id and user id of
//        the person who issued the invite)
// *****************************************************************
// will be called from eventInvitee route AND from events route (when adding an event, need to also add the organiser/logged-in-user as a invitee)
export async function postEventInvitee(newEventInvitee) {
    // need eventId
    // need inviteIssuerUserId

    debugOut(
        `/models/eventInvitees.js - postEventInvitee`,
        newEventInvitee,
        true
    );

    // TODO: test if it works if some of the incoming attributes are MISSING.
    // event_invitee_id, event_invitee_rsvp_logged_date_time, and  event_invitee_create_date_time will auto-populate
    const sqlString = `INSERT INTO event_invitee
        (
            event_id,
            invite_issuer_user_id,
            invitee_user_id,
            event_invitee_rsvp_status
        )
        VALUES(
            $1,
            $2,
            $3,
            'TBC'
        ) RETURNING *;`;

    const sqlStringParams = [
        newEventInvitee.eventId,
        newEventInvitee.inviteIssuerUserId,
        newEventInvitee.inviteeUserId,
    ];

    debugOut(
        `/models/eventInvitees.js - postEventInvitee`,
        `sqlString = ${sqlString}`
    );

    const result = await query(sqlString, sqlStringParams);

    const newEventInviteeId = result.rows[0].event_invitee_id;

    debugOut(`/models/eventInvitees.js - postEventInvitee`, result, true);

    debugOut(
        `/models/eventInvitees.js - postEventInvitee`,
        `NEW EVENT_INVITEE_ID is: ${newEventInviteeId}`
    );

    //TODO: maybe change what's returned. Only returning new event invitee id for now
    return newEventInviteeId;
    //we could return result, or could specifically just return the new event object (result.rows[0]) - BUT WOULD FIRST NEED TO MAP from TABLE_NAMES TO frontEndNames
}
