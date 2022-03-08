// import express from "express";
import Router from "express-promise-router";

import { debugOut, infoOut } from "../utils/logging.js";
import { getAllEvents, getEventById, postEvent } from "../models/events.js";
import { getAllCommentsByEvent } from "../models/comments.js";
import {
    getAllEventInviteesByEvent,
    postEventInvitee,
} from "../models/eventInvitees.js";

debugOut(`routes/events.js`, `script start`);
// const eventRoutes = express.Router();
const eventRoutes = Router();

// ***************************************************************
//       GET ALL EVENTS (regardless of user(
//              (test purposes only)
// ***************************************************************
eventRoutes.get("/", async (req, res) => {
    const searchResults = await getAllEvents();

    res.json({
        success: true,
        message: `Retrieved all events regardless of user - TEST PURPOSES ONLY`,
        payload: searchResults,
    });
});

// ************************************************
//       GET ALL EVENTS for a given APP USER ID
// ************************************************
// N/A - see appUsers routes file instead.

// ************************************************
//       GET ONE EVENT for a given EVENT ID
//       e.g.
//       /events/:12, where 12 is an event_id
// ************************************************
eventRoutes.get(`/:id`, async (req, res) => {
    const eventId = req.params.id;
    const searchResults = await getEventById(eventId);

    //TODO: add in try/catch code, and change success value depending on this.
    res.json({
        success: true,
        message: `Retrieved event with event id ${eventId}`,
        payload: searchResults,
    });
});

// ************************************************
//       GET ALL COMMENTS for a given EVENT ID
//       e.g.
//       /events/:12/comments/  where 12 is an event_id
// ************************************************
eventRoutes.get("/:id/comments", async (req, res) => {
    const eventId = req.params.id;

    const searchResults = await getAllCommentsByEvent(eventId);

    res.json({
        success: true,
        message: `Retrieved all comments, plus authors for event id ${eventId}`,
        payload: searchResults,
    });
});

// ************************************************
//       GET ALL EVENT INVITEES for a given EVENT ID
//       e.g.
//       /events/:12/eventinvitees/  where 12 is an event_id
// ************************************************
eventRoutes.get(`/:id/eventinvitees`, async (req, res) => {
    const eventId = req.params.id;
    const searchResults = await getAllEventInviteesByEvent(eventId);

    res.json({
        success: true,
        message: `Retrieved all event invitees for event ${eventId}`,
        payload: searchResults,
    });

    return;
});

// ************************************************
//       POST NEW EVENT for a given APP USER ID
// ************************************************
eventRoutes.post("*", async function (req, res) {
    //TODO: put try/catch error code here
    const organiserUserId = req.body.organiserUserId; //needed for inserting event invitee

    //insert a new event, just to the event table (none of the extra stuff)
    //insert the event, and reeive bact the new event object, including new event id.
    const postResults = await postEvent(req.body); //have updated postResults to contain newEventObject

    debugOut(
        `routes/events.js/POST new Event`,
        // `NEW EVENT_ID is: ${postResults.eventId}`
        `NEW EVENT_ID is: ${postResults}`
    );

    //here - i can use the new event_id (postResults.rows[0].event_id) OR JUST postResults, to then post related records (invitees, comments etc) to other tables.
    //DONE - add function call to post the organiser to the event_invitee table
    // *****************************************************************
    //       POST ONE EVENT_INVITEE and return new EVENT_INVITEE_ID
    //
    //       (will need the eventInvitee's event_id and user id of
    //        the person who issued the invite)
    // *****************************************************************
    let newEventInvitee = {};
    newEventInvitee.eventId = postResults; //or, if i return whole object, postResults.rows[0].event_id;
    // on create event, we post the organiser as an invitee, setting themselves as the person who invited them.
    // TODO: currently getting organiserUserId from req.body because the POST Event currently only returns newEventId.  Would Need to update the event model post to (a) mapp the database event object attributles from snake case to camel case, and then to return the full object, not just the eventId
    newEventInvitee.inviteIssuerUserId = organiserUserId;
    newEventInvitee.inviteeUserId = organiserUserId;
    const postInviteeResults = await postEventInvitee(newEventInvitee);
    debugOut(
        `routes/events.js/POST new Event Invitee`,
        `NEW EVENT_INVITE ID is: ${postInviteeResults}`
    );

    //TODO: add function call to post the list of invitees to the event_invitee table (and firstly, to the app_users table if necessary, and to the contacts table if necessary)

    res.json({
        success: true,
        message: `Inserted new event record + (organiser as) event invitee record`,
        //TODO: decide what we are returning - just event id, or the whole body?
        // eventId: postResults.rows[0].event_id,
        eventId: postResults,
        eventInviteeId: postInviteeResults,
        payload: postResults, //currently postResults is just event id
    });
});

// ************************************************
// UPDATE an event (given an event_id) (probably a PATCH
// ************************************************

debugOut(`routes/events.js`, `script end`);
export default eventRoutes;
