//set up express, and the routes
import express from "express";

// TODO: as we write router files, add import  for each:
import testRecordRoutes from "./routes/testRecords.js"; //FYI we could call this (testRecordRoutes) anything suitable - it's an alias for router defined inside routes/testRecords.js
import appUserRoutes from "./routes/appUsers.js";
import eventRoutes from "./routes/events.js";

const app = express();

// Note: app.use middleware runs for any route, i.e. it's not specific to get or post requests etc.
// Note: if you send in a json body, you need to call app.use(express.json()) BEFORE any app.get() or app.post() calls - so that it has already been run.
app.use(express.json());
console.log(`Reporting from app.js`);

// Note: This article on cors was very useful
//       https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
import cors from "cors";
app.use(
    cors({
        origin: "*",
    })
);

// TODO: as we write router files, add app.use for each:
app.use("/testrecords", testRecordRoutes);
app.use("/events", eventRoutes);
app.use("/appusers", appUserRoutes);

export default app;
// FYI the database PORT is now covered in bin/www.js
//FYI the routes are now in the ./routes folder
