// import express from "express";
import Router from "express-promise-router";

import { debugOut, infoOut } from "../utils/logging.js";

import { getAllTestRecords, postTestRecord } from "../models/testRecords.js";

// const testRecordRoutes = express.Router();
const testRecordRoutes = Router();

// Remember- the main difference (between express() vs.  express.router()) is that express() is a top level function, which means it performs core functionality for the library and it contains its own methods where, as a matter of fact, Router is one, and that is why when we create a specific router we chain the Router() method on express , kind of like how we use app.

//START DEBUG
console.log(`DEBUG: routes/testRecords.js: script start`);
// Note: router.use will be middleware that is specific to this router
// router.use(() => {
//     console.log(
//         `inside our Router.use() function which triggers for all paths`
//     );
// });
//END DEBUG

testRecordRoutes.get("/", async (req, res) => {
    console.log(`DEBUG: routes/testRecords.js - router.get for / - start`);

    const searchResults = await getAllTestRecords();

    console.log(
        `DEBUG: routes/testRecords.js - router.get for / - searchResults retrieved`
    );

    console.log(`DEBUG: searchResults = `, { searchResults });

    res.json({
        success: true,
        message: `Retrieved all test records`,
        payload: searchResults,
    }); //TODO: Add in 'status' to select sql etc. and update this to Open-only select query

    console.log(
        `DEBUG: routes/testRecords.js - router.get for / - RESULTS retrieved`
    );

    console.log(`DEBUG: res = `, { res });

    return;
});

//TODO: should this post route go to a specific endpoint rather than picking up any POST events sent to /testrecords/?
testRecordRoutes.post("*", async function (req, res) {
    const postResults = await postTestRecord(req.body);

    res.json({
        success: true,
        message: `Inserted new test record`,
        payload: postResults,
    });
});

console.log(`DEBUG: routes/testRecords.js: script end`);

export default testRecordRoutes;
