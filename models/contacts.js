import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// *****************************************************
//       GET ALL CONTACTS (regardless of user)
//             (test purposes only)
// *****************************************************
export async function getAllContacts() {
    const sqlString = `SELECT
        c.contact_id as "contactId",
        c.contact_user_id as "contactUserId",
        c.contact_name as "contactName",
        to_char(c.contact_create_date_time,'DD-MM-YYYY HH:MM:SS') as "contactCreateDateTime",
        a.app_user_email as "contactEmail",
        a.app_user_has_account as "contactHasAccount",
        a.app_user_first_name as "contactUserFirstName",
        a.app_user_last_name as "contactUserLastName",
        concat(a.app_user_first_name, ' ', a.app_user_last_name) as "contactUserName",
        a.app_user_profile_pic_link as "contactUserProfilePicLink",
        c.contact_owner_user_id as "contactOwnerUserId",
        o.app_user_first_name as "contactOwnerUserFirstName",
        o.app_user_last_name as "contactOwnerUserLastName",
        concat(o.app_user_first_name, ' ', o.app_user_last_name) as "contactOwnerUserName"

    FROM contact c
    INNER JOIN app_user a ON c.contact_user_id = a.app_user_id
    INNER JOIN app_user o ON c.contact_owner_user_id = o.app_user_id
    ORDER BY c.contact_owner_user_id, c.contact_user_id;`;

    debugOut(
        `/models/contacts.js - getAllEventInvitees`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString);
    debugOut(
        `/models/contacts.js - getAllEventInvitees`,
        `data.rows = ${data.rows}`
    );
    debugOut(`/models/contacts.js - getAllEventInvitees`, data.rows, true);

    return data.rows;
}

// *********************************************************
//       GET ALL CONTACTS for a given APP USER ID
//       e.g.
//       /appusers/:2/contacts/, where 2 is an app_user_id
//********************************************************
// FYI - called from appUser routes, not contact routes
export async function getAllContactsByOwnerUserId(contactListOwnerUserId) {
    const sqlString = `SELECT
            c.contact_id as "contactId",
            c.contact_user_id as "contactUserId",
            c.contact_name as "contactName",
            to_char(c.contact_create_date_time,'DD-MM-YYYY HH:MM:SS') as "contactCreateDateTime",
            a.app_user_email as "contactEmail",
            a.app_user_has_account as "contactHasAccount",
            a.app_user_first_name as "contactUserFirstName",
            a.app_user_last_name as "contactUserLastName",
            concat(a.app_user_first_name, ' ', a.app_user_last_name) as "contactUserName",
            a.app_user_profile_pic_link as "contactUserProfilePicLink",
            c.contact_owner_user_id as "contactOwnerUserId",
            o.app_user_first_name as "contactOwnerUserFirstName",
            o.app_user_last_name as "contactOwnerUserLastName",
            concat(o.app_user_first_name, ' ', o.app_user_last_name) as "contactOwnerUserName"

        FROM contact c
        INNER JOIN app_user a ON c.contact_user_id = a.app_user_id
        INNER JOIN app_user o ON c.contact_owner_user_id = o.app_user_id
        where o.app_user_id = $1
        ORDER BY c.contact_owner_user_id, c.contact_user_id;`;

    const sqlStringParams = [contactListOwnerUserId];
    debugOut(
        `/models/contacts.js - getAllContactsByOwnerUserId`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString, sqlStringParams);
    debugOut(
        `/models/contacts.js - getAllContactsByOwnerUserId`,
        `data.rows = ${data.rows}`
    );
    debugOut(
        `/models/contacts.js - getAllContactsByOwnerUserId`,
        data.rows,
        true
    );

    return data.rows;
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
