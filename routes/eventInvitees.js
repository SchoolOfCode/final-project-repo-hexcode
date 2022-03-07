import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";
import {
    getAllEventInvitees,
    postEventInvitee,
} from "../models/eventInvitees.js";

debugOut(`/routes/eventInvitees.js`, `script start`);
const eventInviteeRoutes = express.Router();

// *****************************************************
//       GET ALL EVENT INVITEES (regardless of event)
//             (test purposes only)
//       e.g.
//           /eventinvitees
// *****************************************************
eventInviteeRoutes.get("/", async (req, res) => {
    const searchResults = await getAllEventInvitees();

    res.json({
        success: true,
        message: `Retrieved all event invitees regardless of event - TEST PURPOSES ONLY`,
        payload: searchResults,
    });

    return;
});

// ************************************************
//       GET ALL EVENT INVITEES for a given EVENT ID
//       e.g.
//       /events/:12/eventinvitees/  where 12 is an event_id
// ************************************************
// n/a - see events routes file instead

//*****************************************************************
//       POST ONE EVENT_INVITEE and return new EVENT_INVITEE_ID
//
//       (will need the eventInvitee's event_id and user id of
//        the person who issued the invite)
// *****************************************************************
// TODO: add in route to redirect a POST event invitee record - THE MODEL EXISTS
eventInviteeRoutes.post("*", async function (req, res) {
    //TODO: put try/catch error code here

    const postResults = await postEventInvitee(req.body);
    debugOut(
        `routes/eventinvitees.js/POST new Event Invitee`,
        `NEW EVENT_INVITE ID is: ${postResults}`
    );

    res.json({
        success: true,
        message: `Inserted new event invitee record`,
        //TODO: decide what we are returning - just event invitee id, or the whole body?
        eventInviteeId: postResults,
        payload: postResults, //currently postResults is just id
    });
});

debugOut(`routes/eventInvitees.js`, `script end`);
export default eventInviteeRoutes;
