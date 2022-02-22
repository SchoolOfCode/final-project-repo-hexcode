import express from "express";

import { getAllAppUsers } from "../models/appUsersX.js";

const appUserRoutes = express.Router();

console.log(`DEBUG: routes/appUsers.js: script start`);

// GET ALL APP USERS - Really just to test. Probably won't need this on front end.
appUserRoutes.get("/", async (req, res) => {
    const searchResults = await getAllAppUsers();

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: searchResults,
    });

    return;
});

// GET ONE APP USER, FOR A SPECIFIC APP USER ID

// INSERT ONE APP USER (POST) - Beyond MVP

// UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP

export default appUserRoutes;
