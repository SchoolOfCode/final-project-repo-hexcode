import express from "express";

import { getAllEvents } from "../models/events.js";

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

    return;
});

// LIST THE EVENT ROUTES WE'LL NEED HERE
// GET ONE EVENT, based on a specific event id /events/:12, where 12 is an event_id

// GET ALL EVENTS FOR A SPECIFIC APP USER - /appusers/:2/events   where :2 is an app_user_id

// INSERT  a new event, for a specific app_user_id (POST)

// UPDATE an event (given an event_id) (probably a PATCH

export default eventRoutes;
