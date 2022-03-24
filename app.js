//set up express, and the routes
import express from "express";
import { debugOut, infoOut } from "./utils/logging.js";

// Note: This article on cors was very useful. cors package is needed because front end and back end are hosted separately
//       https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
import cors from "cors";

// START TODO: as we write router files, add import for each:
//FYI we could call each import (homePageRoutes etc) anything suitable - it's an alias for router defined inside routes/testRecords.js
import homePageRoutes from "./routes/homePage.js";
//import testRecordRoutes from "./routes/testRecords.js"; //removing as no longer needed. there's enough real routes as templates
import eventRoutes from "./routes/events.js";
import appUserRoutes from "./routes/appUsers.js";
import commentRoutes from "./routes/comments.js";
import eventInviteeRoutes from "./routes/eventInvitees.js";
import contactRoutes from "./routes/contacts.js";
//END TODO:
debugOut(`/app.js`, `script start.`);

const app = express();

// see above for cors explanation
app.use(
    cors({
        origin: "*",
    })
);

// Express does not parse the request body for you by default. To opt in to parsing JSON request bodies, use the express.json() middleware. Express will then parse the HTTP request body and put the parsed body in req.body
// Note: if you send in a json body, you need to call app.use(express.json()) BEFORE any app.get() or app.post() calls - so that it has already been run.
// Note: app.use middleware runs for any route, i.e. it's not specific to get or post requests etc.
app.use(express.json());

// This ensures that we only parse query parameters into strings, not objects - needed for "GET app user id from user email" query
app.set("query parser", "simple");

// START TODO: as we write router files, add app.use for each:
app.use("/", homePageRoutes);
//app.use("/testrecords", testRecordRoutes); //removing - there's enough real routes for templates
app.use("/events", eventRoutes);
app.use("/appusers", appUserRoutes);
app.use("/comments", commentRoutes);
app.use("/eventinvitees", eventInviteeRoutes);
app.use("/contacts", contactRoutes);
//END TODO:

// In conjunction with installing the express-promise-router package,  we are adding code to capture any errors that the package now handles, and return them nicely to the front end.
app.use((err, req, res, next) => {
    console.error(err?.stack ?? err);
    //FYI - http status code 500 means some generic serverside error.
    // FYI - this will also set res.ok to false.
    res.status(500).json({
        success: false,
        message: `hexcode - generic serverside error has occured`,
    });
});

debugOut(`/app.js`, `script end.`);
export default app;
// FYI the database PORT is now covered in bin/www.js
//FYI the routes are now in the ./routes folder
