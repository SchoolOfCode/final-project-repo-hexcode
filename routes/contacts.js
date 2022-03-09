// import express from "express";
import Router from "express-promise-router";
import { debugOut, infoOut } from "../utils/logging.js";
import { getAllContacts } from "../models/contacts.js";

debugOut(`/routes/contacts.js`, `script start`);
// const contactRoutes = express.Router();
const contactRoutes = Router();

// *****************************************************
//       GET ALL CONTACTS (regardless of user)
//             (test purposes only)
// *****************************************************
contactRoutes.get("/", async (req, res) => {
    const searchResults = await getAllContacts();

    res.json({
        success: true,
        message: `Retrieved all contacts regardless of logged-in user - TEST PURPOSES ONLY`,
        payload: searchResults,
    });

    return;
});

// *********************************************************
//       GET ALL CONTACTS for a given APP USER ID
//       e.g.
//       /appusers/:2/contacts/, where 2 is an app_user_id
//********************************************************
// N/A - see appUsers routes file instead.

//*****************************************************************
//       POST ONE CONTACT and return new CONTACT_ID
//
//       (will need the app user id of the logged-in-user
//       who 'owns' the contacat list to which this contact
//        is being added
// *****************************************************************
// TODO: add in route to redirect a POST contact record

debugOut(`routes/contacts.js`, `script end`);
export default contactRoutes;
