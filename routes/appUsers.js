// import express from "express";
import Router from "express-promise-router";

import { debugOut, infoOut } from "../utils/logging.js";
import {
    getAllAppUsers,
    getAppUserById,
    getAppUserFromEmail,
} from "../models/appUsers.js";
import { getAllEventsByAppUserId } from "../models/events.js"; //NB - note this imports from events not from AppUsers, which is  slightly unusual for the AppUsers routes script
import { getAllContactsByOwnerUserId } from "../models/contacts.js"; //NB - note this imports from events not from AppUsers, which is  slightly unusual for the AppUsers routes script

import { isNotNumeric } from "../utils/checktypes.js";

// const appUserRoutes = express.Router();
const appUserRoutes = Router();

debugOut(`/routes/appUsers.js`, `script start`);

// ************************************************
//       GET ALL APP USERS
// ************************************************
appUserRoutes.get("/", async (req, res) => {
    // the following is use to test the error-handling.
    // comment out when not in dev!
    // throw new Error(`routes/Appusers.js: Get all  users - testing error`);
    debugOut(`/routes/appUsers.js`, `calling getAllAppUsers`);

    const allAppUsersArray = await getAllAppUsers();

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: allAppUsersArray,
    });

    return;
});

// ***********************************************************
//       GET  APP USER for a given APP USER EMAIL (query)
// ***********************************************************
// FRONT END SENDs:   GET to  /appusers/search?email=user@user.com
// eg http://localhost:5000/appusers/search?email=belinda@belinda.com
//
// FYI: Express parses query string parameters by default, and puts them into the req.query property
appUserRoutes.get(`/search`, async (req, res) => {
    debugOut(`/routes/appUsers.js - search`, `calling getAppUserFromEmail`);

    const appUserEmail = req.query.email;
    //check that the 'email' key value pair has been sent - otherwise return without attempting the search
    if (appUserEmail === undefined) {
        res.status(400).json({
            success: false,
            message: `hexcode - email query string parameter not found`,
            payload: null,
        });
        return;
    }

    const userObject = await getAppUserFromEmail(appUserEmail);

    //check userObject - will either be undefined or will be a user object (NO ARRAY ANY MORE)
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
// ************************************************
// FYI: Express also supports named route parameters and puts them in the req.params object. Named route parameters are always strings, and Express automatically decodes them using decodeUriComponent().
appUserRoutes.get(`/:id`, async (req, res) => {
    const appUserId = req.params.id;

    debugOut(`/routes/appUsers.js - appusers/id`, `start`);

    //check that the 'id' key value pair has been sent - otherwise return without attempting the search
    if (appUserId === undefined || appUserId === null) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter not found`,
            payload: null,
        });
        debugOut(
            `/routes/appUsers.js - appusers/id`,
            `appUserId is undefined or null = |${appUserId}|`
        );
        return;
    }

    // if (!(typeof appUserId === "number")) {
    if (isNotNumeric(appUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter must be integer`,
            payload: null,
        });
        debugOut(
            `/routes/appUsers.js - appusers/id`,
            `appUserId is not integer = |${appUserId}| type = |${typeof appUserId}|`
        );
        return;
    }
    debugOut(`/routes/appUsers.js - appusers/id`, `calling getAppUserById`);
    const userObject = await getAppUserById(appUserId);

    //check userObject - will either be undefined (if no user was retrieved) or will be a user object (NO ARRAY ANY MORE)
    if (userObject === undefined) {
        res.status(404).json({
            success: false,
            message: `hexcode - user record not found for id ${appUserId}`,
            payload: null,
        });
        debugOut(
            `/routes/appUsers.js - appusers/id`,
            `returned userObject is undefined = |${userObject}|`
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

    // if (!(typeof appUserId === "number")) {
    if (isNotNumeric(appUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter must be integer`,
            payload: null,
        });
        return;
    }

    const eventsArray = await getAllEventsByAppUserId(appUserId);

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

    // if (!(typeof appUserId === "number")) {
    if (isNotNumeric(appUserId)) {
        res.status(400).json({
            success: false,
            message: `hexcode - (app user) id parameter must be integer`,
            payload: null,
        });
        return;
    }

    const contactsArray = await getAllContactsByOwnerUserId(appUserId);

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
