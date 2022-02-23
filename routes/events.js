import express from "express";

import { getAllEvents, getEventById, postEvent } from "../models/events.js";

const eventRoutes = express.Router();

console.log(`DEBUG: routes/events.js: script start`);

// GET ALL  EVENTS (regardless of user id) - TEST ONLY - NOT NEEDED ON FRONT END
eventRoutes.get("/", async (req, res) => {
    const searchResults = await getAllEvents();

    res.json({
        success: true,
        message: `Retrieved all events`,
        payload: searchResults,
    });
});

// GET ONE EVENT, based on a specific event id /events/:12, where 12 is an event_id
eventRoutes.get(`/:id`, async (req, res) => {
    const eventId = req.params.id;
    const searchResults = await getEventById(eventId);

    res.json({
        success: true,
        message: `Retrieved event with id ${eventId}`,
        payload: searchResults,
    });
});

// INSERT (POST)  a new event, for a specific app_user_id
//TODO: should this post route go to a specific endpoint, rather than picking up any POST events sent to /events/?
eventRoutes.post("*", async function (req, res) {
    const postResults = await postEvent(req.body);

    res.json({
        success: true,
        message: `Inserted new event record`,
        payload: postResults,
    });
});

// GET ALL EVENTS FOR A SPECIFIC APP USER - /appusers/:2/events   where :2 is an app_user_id
//QUESTION - should this be in the /appusers/route instead? But then the 'event' sql is in two files?

// UPDATE an event (given an event_id) (probably a PATCH

export default eventRoutes;
