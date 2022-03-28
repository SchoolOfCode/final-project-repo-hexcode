import Router from "express-promise-router"; // Implementing Error Handling: replaced `import express from "express";`

import { debugOut, infoOut } from "../utils/logging.js";

const homePageRoutes = Router(); // Implementing Error Handling: replaced standard express.Router() with Router() from express-promise-router

debugOut(`/routes/homepage.js`, `script start`);

homePageRoutes.get("/", async (req, res) => {
    res.json({
        Hello: `Hexcode Project Team | API homepage | Work In Progress`,
    });
});

debugOut(`/routes/homepage.js`, `script end`);

export default homePageRoutes;
