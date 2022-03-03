import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// *****************************************************
//       GET ALL CONTACTS (regardless of user)
//             (test purposes only)
// *****************************************************
export async function getAllContacts() {
    return;
}

// *********************************************************
//       GET ALL CONTACTS for a given APP USER ID
//       e.g.
//       /appusers/:2/contacts/, where 2 is an app_user_id
//********************************************************
// FYI - called from appUser routes, not contact routes
export async function getAllContactsForOneUser() {
    return;
}

//*****************************************************************
//       POST ONE CONTACT and return new CONTACT_ID
//
//       (will need the app user id of the logged-in-user
//       who 'owns' the contact being added
// *****************************************************************
export async function postContact(newContact) {
    // to post a new contact
    // needs contactOwnerUserId
    // (1) BEYOND MVP:
    //     check to see if the contact is already in the app_user table
    //     if it IS, then retrieve its app_user_id
    //     if it is NOT, then insert it, and get back the new app_user_id

    return;

    // contact:
    // contact_id SERIAL PRIMARY KEY,
    // contact_owner_user_id INT,
    // contact_user_id INT,
    // contact_name VARCHAR(50) DEFAULT NULL,
    // contact_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
}
