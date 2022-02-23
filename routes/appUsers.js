import express from "express";
import { getAllAppUsers, getAppUserById } from "../models/appUsers.js";
const appUserRoutes = express.Router();
// console.log(`DEBUG: routes/appUsers.js: script start`);

// GET ONE APP USER, FOR A SPECIFIC APP USER ID
appUserRoutes.get(`/:id`, async (req, res) => {
    const appUserId = req.params.id;
    const searchResults = await getAppUserById(appUserId);

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: searchResults,
    });
});

// GET ALL APP USERS - Test only - Almost definitely won't actually need on front end.
appUserRoutes.get("/", async (req, res) => {
    const searchResults = await getAllAppUsers();

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: searchResults,
    });

    return;
});

// INSERT ONE APP USER (POST) - Beyond MVP

// UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP

export default appUserRoutes;
