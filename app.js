//set up express, and the routes
import express from "express";
import { debugOut, infoOut } from "./utils/logging.js";

// START TODO: as we write router files, add import for each:
import homePageRoutes from "./routes/homePage.js";
import testRecordRoutes from "./routes/testRecords.js";
import eventRoutes from "./routes/events.js";
import appUserRoutes from "./routes/appUsers.js";
//FYI we could call each import (testRecordRoutes etc) anything suitable - it's an alias for router defined inside routes/testRecords.js
//END TODO:

const app = express();

// Note: app.use middleware runs for any route, i.e. it's not specific to get or post requests etc.
// Note: if you send in a json body, you need to call app.use(express.json()) BEFORE any app.get() or app.post() calls - so that it has already been run.
app.use(express.json());
// console.log(`Reporting from app.js`);
debugOut(`/app.js`, `script start.`);

// Note: This article on cors was very useful
//       https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
import cors from "cors";
app.use(
    cors({
        origin: "*",
    })
);

// START TODO: as we write router files, add app.use for each:
app.use("/", homePageRoutes);
app.use("/testrecords", testRecordRoutes);
app.use("/events", eventRoutes);
app.use("/appusers", appUserRoutes);
//END TODO:

debugOut(`/app.js`, `script end.`);

export default app;
// FYI the database PORT is now covered in bin/www.js
//FYI the routes are now in the ./routes folder
