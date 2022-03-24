import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// ************************************************
//       GET ALL APP USERS
//           (test purposes only)
//       e.g.
//           /appusers
// ************************************************
export async function getAllAppUsers() {
    const sqlString = `SELECT a.app_user_id as "appUserId",
                a.app_user_email as "appUserEmail",
                a.app_user_has_account as "appUserHasAccount",
                a.app_user_first_name as "appUserFirstName",
                a.app_user_last_name as "appUserLastName",
                concat(a.app_user_first_name, ' ', a.app_user_last_name) as "appUserName",
                a.app_user_profile_pic_link as "appUserProfilePicLink",
                a.app_user_create_date_time as "appUserCreateDateTime"
        FROM app_user a
        ORDER BY a.app_user_id DESC;`;

    debugOut(
        `/models/appUsers.js - getAllAppUsers`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString);

    debugOut(`/models/appUsers.js - getAllAppUsers`, data.rows, true);

    return data.rows;
}

// ***********************************************************
//       GET  APP USER for a given APP USER EMAIL (query)
//       e.g.
//           GET to  /appusers/search?email=user@user.com
// ***********************************************************
export async function getAppUserFromEmail(appUserEmail) {
    const sqlString = `SELECT a.app_user_id as "appUserId",
                        a.app_user_email as "appUserEmail",
                        a.app_user_has_account as "appUserHasAccount",
                        a.app_user_first_name as "appUserFirstName",
                        a.app_user_last_name as "appUserLastName",
                        concat(a.app_user_first_name, ' ', a.app_user_last_name) as "appUserName",
                        a.app_user_profile_pic_link as "appUserProfilePicLink",
                        a.app_user_create_date_time as "appUserCreateDateTime"
                    FROM app_user a
                    WHERE a.app_user_email = $1;`;

    const sqlStringParams = [appUserEmail];

    debugOut(
        `/models/appUsers.js - getAppUserFromEmail`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString, sqlStringParams);

    debugOut(`/models/appUsers.js - getAppUserFromEmail`, data.rows, true);

    // ---- NB: Now we just return the object itself, NOT an array of 1 object - more RESTful says Arshi  ----
    const appUserObject = data.rows[0];
    return appUserObject;
}

// ************************************************
//     GET ONE APP USER for a given APP USER ID
//     e.g.
//         /appusers/:3, where 3 is an app_user_id
// ************************************************
export async function getAppUserById(appUserId) {
    const sqlString = `SELECT a.app_user_id as "appUserId",
                        a.app_user_email as "appUserEmail",
                        a.app_user_has_account as "appUserHasAccount",
                        a.app_user_first_name as "appUserFirstName",
                        a.app_user_last_name as "appUserLastName",
                        concat(a.app_user_first_name, ' ', a.app_user_last_name) as "appUserName",
                        a.app_user_profile_pic_link as "appUserProfilePicLink",
                        a.app_user_create_date_time as "appUserCreateDateTime"
    FROM app_user a
    WHERE a.app_user_id = $1;`;

    const sqlStringParams = [appUserId];

    debugOut(
        `/models/appUsers.js - getAppUserById`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString, sqlStringParams);

    debugOut(`/models/appUsers.js - getAppUserById`, data.rows, true);

    // ---- NB: Now we just return the object itself, NOT an array of 1 object - more RESTful says Arshi  ----
    const appUserObject = data.rows[0];
    return appUserObject;
}

// ************************************************
// TODO: INSERT ONE APP USER (POST) - Beyond MVP
// ************************************************

// ************************************************
// TODO: UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP
// ************************************************
