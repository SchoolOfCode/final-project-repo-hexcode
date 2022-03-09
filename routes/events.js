// import express from "express";
import Router from "express-promise-router";

import { debugOut, infoOut } from "../utils/logging.js";
import { getAllEvents, getEventById, postEvent } from "../models/events.js";
import { getAllCommentsByEvent } from "../models/comments.js";
import {
    getAllEventInviteesByEvent,
    postEventInvitee,
} from "../models/eventInvitees.js";

import { isNotNumeric } from "../utils/checktypes.js";

debugOut(`routes/events.js`, `script start`);
// const eventRoutes = express.Router();
const eventRoutes = Router();

// ***************************************************************
//       GET ALL EVENTS (regardless of user(
//              (test purposes only)
// ***************************************************************
eventRoutes.get("/", async (req, res) => {
    const allEventsArray = await getAllEvents();

    res.json({
        success: true,
        message: `Retrieved all events regardless of user - TEST PURPOSES ONLY`,
        payload: allEventsArray,
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
// FYI: Express also supports named route parameters and puts them in the req.params object. Named route parameters are always strings, and Express automatically decodes them using decodeUriComponent().
eventRoutes.get(`/:id`, async (req, res) => {
    const eventId = req.params.id;

    //check that the 'id' key value pair has been sent - otherwise return without attempting the search
    if (eventId === undefined || eventId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - id parameter (for event id) not found`,
            payload: null,
        });
        return;
    }
    // if (!(typeof eventId === "number")) {
    if (isNotNumeric(eventId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - event id parameter must be integer`,
            payload: null,
        });
        return;
    }
    // it's safe to go ahead and attempt to retrive the event object:
    const eventObject = await getEventById(eventId);

    //check eventObject returned - NOW will either be undefined (if no event was retrieved) or will be a complete event object (NO ARRAY ANY MORE)
    if (eventObject === undefined) {
        res.status(404).json({
            success: false,
            message: `hexcode - event object record not found for event id ${eventId}`,
            payload: null,
        });
        return;
    }
    res.json({
        success: true,
        message: `Retrieved event object with id of ${eventId}`,
        payload: eventObject,
    });
});
// ************************************************
//       GET ALL COMMENTS for a given EVENT ID
//       e.g.
//       /events/:12/comments/  where 12 is an event_id
// ************************************************
eventRoutes.get("/:id/comments", async (req, res) => {
    const eventId = req.params.id;

    //check that the 'id' key value pair has been sent - otherwise return without attempting the search
    if (eventId === undefined || eventId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - id parameter (for event id) not found`,
            payload: null,
        });
        return;
    }
    // if (!(typeof eventId === "number")) {
    if (isNotNumeric(eventId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - event id parameter must be integer`,
            payload: null,
        });
        return;
    }

    const commentsArray = await getAllCommentsByEvent(eventId);

    res.json({
        success: true,
        message: `Retrieved all comments, plus authors for event id ${eventId}`,
        payload: commentsArray,
    });
});

// ************************************************
//       GET ALL EVENT INVITEES for a given EVENT ID
//       e.g.
//       /events/:12/eventinvitees/  where 12 is an event_id
// ************************************************
eventRoutes.get(`/:id/eventinvitees`, async (req, res) => {
    const eventId = req.params.id;

    //check that the 'id' key value pair has been sent - otherwise return without attempting the search
    if (eventId === undefined || eventId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - id parameter (for event id) not found`,
            payload: null,
        });
        return;
    }
    // if (!(typeof eventId === "number")) {
    if (isNotNumeric(eventId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - event id parameter must be integer`,
            payload: null,
        });
        return;
    }

    const eventInviteesArray = await getAllEventInviteesByEvent(eventId);
    res.json({
        success: true,
        message: `Retrieved all event invitees for event ${eventId}`,
        payload: eventInviteesArray,
    });
});

// ************************************************
//       POST NEW EVENT for a given APP USER ID
// ************************************************
eventRoutes.post("*", async function (req, res) {
    // To insert a new event record, must have an Organiser User ID, which must be an integer - organiserUserId is needed for inserting organiser-as-event invitee on create of new event
    const organiserUserId = req.body.organiserUserId;

    if (organiserUserId === undefined) {
        res.status(400).json({
            success: false,
            message: `hexcode - id parameter (organiserUserId) not found`,
            payload: null,
        });
        debugOut(
            `/routes/events.js - post`,
            `organiserUserId is undefined = |${organiserUserId}|`
        );
        return;
    }
    // if (!(typeof organiserUserId === "number")) {
    if (isNotNumeric(organiserUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - organiser user id  must be integer`,
            payload: null,
        });
        debugOut(
            `/routes/events.js - post`,
            `organiserUserId is not numeric = |${organiserUserId}|`
        );
        return;
    }
    // must have an event title as well to insert. Rest is optional
    const eventTitle = req.body.eventTitle;
    if (eventTitle === undefined) {
        res.status(400).json({
            success: false,
            message: `hexcode - new event title (eventTitle) not found`,
            payload: null,
        });

        debugOut(
            `/routes/events.js - post`,
            `eventTitle is undefined = |${eventTitle}|`
        );
        return;
    }

    //insert a new event, just to the event table (none of the extra stuff)
    //insert the event, and reeive bact the new event object, including new event id.
    const newEventId = await postEvent(req.body); //have updated postResults to contain newEventObject

    debugOut(`/routes/events.js - post`, `NEW EVENT ID is: ${newEventId}`);

    //here - i can use the new event_id (postResults.rows[0].event_id) OR JUST postResults, to then post related records (invitees, comments etc) to other tables.
    //DONE - add function call to post the organiser to the event_invitee table
    // *****************************************************************
    //       POST ONE EVENT_INVITEE and return new EVENT_INVITEE_ID
    //
    //       (will need the eventInvitee's event_id and user id of
    //        the person who issued the invite)
    // *****************************************************************
    let newEventInvitee = {};
    newEventInvitee.eventId = newEventId; //or, if i return whole object, postResults.rows[0].event_id;
    // on create event, we post the organiser as an invitee, setting themselves as the person who invited them.
    // TODO: currently getting organiserUserId from req.body because the POST Event currently only returns newEventId.  Would Need to update the event model post to (a) mapp the database event object attributles from snake case to camel case, and then to return the full object, not just the eventId
    newEventInvitee.inviteIssuerUserId = organiserUserId;
    newEventInvitee.inviteeUserId = organiserUserId;
    const newEventInviteeId = await postEventInvitee(newEventInvitee);
    debugOut(
        `routes/events.js/POST new Event Invitee`,
        `NEW EVENT INVITEE ID (for Organiser) is: ${newEventInviteeId}`
    );

    //TODO: add function call to post the list of invitees to the event_invitee table (and firstly, to the app_users table if necessary, and to the contacts table if necessary)

    res.json({
        success: true,
        message: `Inserted new event record + (organiser as) event invitee record`,
        //TODO: decide what we are returning - just event id, or the whole body?
        // eventId: postResults.rows[0].event_id,
        eventId: newEventId,
        eventInviteeId: newEventInviteeId,
    });
});

// ************************************************
// UPDATE an event (given an event_id) (probably a PATCH
// ************************************************

debugOut(`routes/events.js`, `script end`);
export default eventRoutes;
