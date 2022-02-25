import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";
import { getAllAppUsers, getAppUserById } from "../models/appUsers.js";
import { getAllEventsForOneUser } from "../models/events.js"; //NB - note this imports from events not from AppUsers, which is  slightly unusual for the AppUsers routes script

const appUserRoutes = express.Router();
// console.log(`DEBUG: routes/appUsers.js: script start`);
debugOut(`/routes/appUsers.js`, `script start`);

// ************************************************
//       GET ALL APP USERS
// ************************************************
appUserRoutes.get("/", async (req, res) => {
    const searchResults = await getAllAppUsers();

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: searchResults,
    });

    return;
});

// ************************************************
//     GET ONE APP USER for a given APP USER ID
// ************************************************
appUserRoutes.get(`/:id`, async (req, res) => {
    const appUserId = req.params.id;
    const searchResults = await getAppUserById(appUserId);

    res.json({
        success: true,
        message: `Retrieved app user with app user id ${appUserId}`,
        payload: searchResults,
    });
});

//********************************************************
//       GET ALL EVENTS for a given APP USER ID
//       e.g.
//       /appusers/:2/events/, where 2 is an app_user_id
//********************************************************
appUserRoutes.get("/:id/events", async (req, res) => {
    const appUserId = req.params.id;

    const searchResults = await getAllEventsForOneUser(appUserId);
    //TODO: getAllEventsForOneUser currently returns hardcoded object for user 2, Maria

    res.json({
        success: true,
        message: `Retrieved user ${appUserId}, plus all events for that user`,
        payload: searchResults,
    });
});

// INSERT ONE APP USER (POST) - Beyond MVP

// UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP

debugOut(`/routes/appUsers.js`, `script end`);

export default appUserRoutes;
