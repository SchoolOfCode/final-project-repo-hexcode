import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// ************************************************
//       GET ALL APP USERS
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

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data = `);
    console.log(data);

    return data.rows;
}

// ***********************************************************
//       GET  APP USER for a given APP USER EMAIL (query)
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

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: data = `);
    console.log(data);

    // ---- NB: Now just return object not array of 1 object - more RESTful says ARshi  ----
    // return data.rows;
    const appUserObject = data.rows[0];
    return appUserObject;
}

// ************************************************
//     GET ONE APP USER for a given APP USER ID
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

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: data = `);
    console.log(data);

    // ---- TODO: return object not array of 1 object - more RESTful says ARshi  ----
    // const appUserObject = data.rows;
    const appUserObject = data.rows[0];
    return appUserObject;
}

// INSERT ONE APP USER (POST) - Beyond MVP

// UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP
