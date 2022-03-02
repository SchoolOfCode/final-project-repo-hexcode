//set up express, and the routes
import express from "express";
import { debugOut, infoOut } from "./utils/logging.js";

// START TODO: as we write router files, add import for each:
import homePageRoutes from "./routes/homePage.js";
import testRecordRoutes from "./routes/testRecords.js";
import eventRoutes from "./routes/events.js";
import appUserRoutes from "./routes/appUsers.js";
import commentRoutes from "./routes/comments.js";

//FYI we could call each import (testRecordRoutes etc) anything suitable - it's an alias for router defined inside routes/testRecords.js
//END TODO:

const app = express();

// Express does not parse the request body for you by default. To opt in to parsing JSON request bodies, use the express.json() middleware. Express will then parse the HTTP request body and put the parsed body in req.body
// Note: if you send in a json body, you need to call app.use(express.json()) BEFORE any app.get() or app.post() calls - so that it has already been run.
// Note: app.use middleware runs for any route, i.e. it's not specific to get or post requests etc.
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

// Only parse query parameters into strings, not objects - needed for email to app user id query
app.set("query parser", "simple");

// START TODO: as we write router files, add app.use for each:
app.use("/", homePageRoutes);
app.use("/testrecords", testRecordRoutes);
app.use("/events", eventRoutes);
app.use("/appusers", appUserRoutes);
app.use("/comments", commentRoutes);

//END TODO:

debugOut(`/app.js`, `script end.`);

export default app;
// FYI the database PORT is now covered in bin/www.js
//FYI the routes are now in the ./routes folder
