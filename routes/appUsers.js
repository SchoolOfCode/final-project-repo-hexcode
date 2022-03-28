import Router from "express-promise-router"; // Implementing Error Handling: replaced `import express from "express";`

import { debugOut, infoOut } from "../utils/logging.js";
import {
    getAllAppUsers,
    getAppUserById,
    getAppUserFromEmail,
} from "../models/appUsers.js";

import { getAllEventsByAppUserId } from "../models/events.js"; // Note: this imports from EVENTS model file, not from appUsers model file

import { getAllContactsByOwnerUserId } from "../models/contacts.js"; // Note: this imports from CONTACTS model file, not from appUsers model file

import { isNotNumeric } from "../utils/checktypes.js";

const appUserRoutes = Router(); // Implementing Error Handling: replaced standard express.Router() with Router() from express-promise-router

debugOut(`/routes/appUsers.js`, `script start`);

// ************************************************
//       GET ALL APP USERS
//           (test purposes only)
//       e.g.
//           /appusers
// ************************************************
appUserRoutes.get("/", async (req, res) => {
    debugOut(`/routes/appUsers.js`, `calling getAllAppUsers`);

    const allAppUsersArray = await getAllAppUsers();

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: allAppUsersArray,
    });
});

// ***********************************************************
//       GET  APP USER for a given APP USER EMAIL (query)
//       e.g.
//           GET to  /appusers/search?email=user@user.com
// ***********************************************************

// FYI: Express parses query string parameters by default, and puts them into the req.query property
appUserRoutes.get(`/search`, async (req, res) => {
    debugOut(`/routes/appUsers.js - search`, `calling getAppUserFromEmail`);

    const appUserEmail = req.query.email;
    if (appUserEmail === undefined) {
        res.status(400).json({
            success: false,
            message: `hexcode - email query string parameter not found`,
            payload: null,
        });
        return;
    }

    const userObject = await getAppUserFromEmail(appUserEmail);
    if (userObject === undefined) {
        res.status(404).json({
            success: false,
            message: `hexcode - user not found for this email address`,
            payload: null,
        });
        return;
    }

    res.json({
        success: true,
        message: `Retrieved app user with app user email of ${appUserEmail}`,
        payload: userObject,
    });
});

// ************************************************
//     GET ONE APP USER for a given APP USER ID
//     e.g.
//         /appusers/:3, where 3 is an app_user_id
// ************************************************
// FYI: Express also supports named route parameters and puts them in the req.params object.
//      Named route parameters are always strings, and Express automatically decodes them using decodeUriComponent().
appUserRoutes.get(`/:id`, async (req, res) => {
    const appUserId = req.params.id;

    debugOut(`/routes/appUsers.js - appusers/id`, `start`);

    if (appUserId === undefined || appUserId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter not found`,
            payload: null,
        });
        infoOut(
            `/routes/appUsers.js - appusers/id`,
            `ERROR - appUserId is undefined or null = |${appUserId}|`
        );
        return;
    }

    if (isNotNumeric(appUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter must be integer`,
            payload: null,
        });
        infoOut(
            `/routes/appUsers.js - appusers/id`,
            `appUserId is not integer = |${appUserId}| type = |${typeof appUserId}|`
        );
        return;
    }
    const userObject = await getAppUserById(appUserId);

    if (userObject === undefined) {
        res.status(404).json({
            success: false,
            message: `hexcode - user record not found for id ${appUserId}`,
            payload: null,
        });
        infoOut(
            `/routes/appUsers.js - appusers/id`,
            `ERROR - returned userObject is undefined = |${userObject}|`
        );
        return;
    }

    res.json({
        success: true,
        message: `Retrieved app user object with id of ${appUserId}`,
        payload: userObject,
    });
    debugOut(`/routes/appUsers.js - appusers/id`, `completed successfully`);
});

//********************************************************
//       GET ALL EVENTS for a given APP USER ID
//       e.g.
//       /appusers/:2/events/, where 2 is an app_user_id
//********************************************************
appUserRoutes.get("/:id/events", async (req, res) => {
    const appUserId = req.params.id;

    if (appUserId === undefined || appUserId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter not found`,
            payload: null,
        });
        return;
    }

    if (isNotNumeric(appUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter must be integer`,
            payload: null,
        });
        return;
    }

    const eventsArray = await getAllEventsByAppUserId(appUserId);
    // Note: we don't check returned array, because an empty array is acceptable here

    res.json({
        success: true,
        message: `Retrieved all events (invited and organised) for user ${appUserId}`,
        payload: eventsArray,
    });
});

// *********************************************************
//       GET ALL CONTACTS for a given APP USER ID
//       e.g.
//       /appusers/:2/contacts/, where 2 is an app_user_id
//********************************************************

appUserRoutes.get("/:id/contacts", async (req, res) => {
    const appUserId = req.params.id;

    if (appUserId === undefined || appUserId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter not found`,
            payload: null,
        });
        return;
    }

    if (isNotNumeric(appUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter must be integer`,
            payload: null,
        });
        return;
    }

    const contactsArray = await getAllContactsByOwnerUserId(appUserId);
    // Note: we don't check returned array, because an empty array is acceptable here

    res.json({
        success: true,
        message: `Retrieved all contacts for user ${appUserId}`,
        payload: contactsArray,
    });
});
//********************************************************
// INSERT ONE APP USER (POST) - Beyond MVP
//********************************************************

//********************************************************
// UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP
//********************************************************

debugOut(`/routes/appUsers.js`, `script end`);

export default appUserRoutes;
