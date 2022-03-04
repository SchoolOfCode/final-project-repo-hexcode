import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";
import { getAllEventInvitees } from "../models/eventInvitees.js";

debugOut(`/routes/eventInvitees.js`, `script start`);
const eventInviteeRoutes = express.Router();

// *****************************************************
//       GET ALL EVENT INVITEES (regardless of event)
//             (test purposes only)
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
// TODO: add in route to redirect a POST event invitee record

debugOut(`routes/eventInvitees.js`, `script end`);
export default eventInviteeRoutes;
