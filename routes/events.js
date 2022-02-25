import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";
import { getAllEvents, getEventById, postEvent } from "../models/events.js";

const eventRoutes = express.Router();

debugOut(`routes/events.js`, `script start`);

// ************************************************
//       GET ALL EVENTS
// ************************************************
eventRoutes.get("/", async (req, res) => {
    const searchResults = await getAllEvents();

    res.json({
        success: true,
        message: `Retrieved all events`,
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
//       POST NEW EVENT for a given APP USER ID
// ************************************************
eventRoutes.post("*", async function (req, res) {
    //TODO: put try/catch error code here

    //insert a new event, just to the event table (none of the extra stuff)
    //insert the event, and reeive bact the new event object, including new event id.
    const postResults = await postEvent(req.body); //have updated postResults to contain newEventObject

    debugOut(
        `routes/events.js/POST`,
        // `NEW EVENT_ID is: ${postResults.eventId}`
        `NEW EVENT_ID is: ${postResults}`
    );

    //here - i can use the new event id (postResults.rows[0].id), to then post related records (invitees, comments etc) to other tables.
    //TODO: add function call to post the organiser to the event_invitee table
    //TODO: add function call to post the list of invitees to the event_invitee table (and firstly, to the app_users table if necessary, and to the contacts table if necessary)

    res.json({
        success: true,
        message: `Inserted new event record`,
        //TODO: decide what we are returning - just event id, or the whole body?
        // eventId: postResults.rows[0].event_id,
        eventId: postResults,
        payload: postResults, //currently postResults is just event id
    });
});

// ************************************************
// UPDATE an event (given an event_id) (probably a PATCH
// ************************************************

debugOut(`routes/events.js`, `script end`);

export default eventRoutes;
