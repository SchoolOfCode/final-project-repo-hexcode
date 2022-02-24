import query from "../db/connection.js";

export async function getAllAppUsers() {
    // VERSION 1: First, for basic test,  just do a simple select
    const sqlString = `SELECT *
        FROM app_user au
        ORDER BY au.id DESC;`;

    // VERSION 2: TODO: IF NEEDED (PROBABLY WON'T BE NEEDED)-  update to proper select (with join if one was needed) and aliases to match the variable names used in the front end

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}

// ************************************************
export async function getAppUserById(appUserId) {
    // VERSION 1: First, for basic test,  just do a simple select
    // const sqlString = `SELECT *
    //     FROM app_user au
    //     WHERE au.id = ${appUserId}
    //     ORDER BY au.id DESC;`;

    // VERSION 2: then update to proper select (with join if one was needed) and aliases to match the variable names used in the front end
    const sqlString = `SELECT au.id as "id",
                        au.app_user_first_name as "appUserFirstName",
                        au.app_user_last_name as "appUserLastName",
                        au.app_user_email as "appUserEmail",
                        au.app_user_profile_pic_link as "appUserProfilePicLink",
                        au.create_date_time  as "createDateTime"
    FROM app_user au
    WHERE au.id = $1;`;

    const sqlStringParams = [appUserId];

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}
