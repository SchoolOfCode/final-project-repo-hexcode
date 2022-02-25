import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";

const homePageRoutes = express.Router();

debugOut(`/routes/homepage.js`, `script start`);

// GET ALL  EVENTS (regardless of user id) - TEST ONLY - NOT NEEDED ON FRONT END
homePageRoutes.get("/", async (req, res) => {
    res.json({
        Hello: `Hexcode Project Team | API homepage | Work In Progress`,
    });
});

debugOut(`/routes/homepage.js`, `script end`);

export default homePageRoutes;
