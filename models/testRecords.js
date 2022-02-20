import query from "../db/connection.js";

import {
    DATABASE_SYSTEM_POSTGRESQL,
    DATABASE_SYSTEM_COUCHBASE,
} from "../config.js";

export async function getAllTestRecords() {
    // VERSION 1: First, for basic test,  just do a simple select
    // const data = await query(`SELECT * FROM test_record;`);

    // VERSION 2: then update to proper select (with join if one was needed) and aliases to match the variable names used in the front end
    //TODO: add back in the if-statmenet for postgresql
    // if (process.env.DATABASE_SYSTEM === DATABASE_SYSTEM_POSTGRESQL) {
    const selectString = `SELECT t.id as "TestRecordId",
            to_char(t.date_posted, 'dd-mm-yyyy') as "datePosted",
            t.session_type as "sessionType",
            t.why_study_request_needed as "whyStudyRequestNeeded",
            t.approx_availability as "approxAvailability",
            t.search_status as "searchStatus",
            t.create_date_time as "studyRequestCreateDateTime",
        FROM test_record t
        ORDER BY t.id DESC;`;
    // } else {
    //     console.log(
    //         `models/testRecords.js: ERROR - enironment variable value for DATABASE_SYSTEM, ${process.env.DATABASE_SYSTEM}, not recognised. Accepted values are ${DATABASE_SYSTEM_POSTGRESQL} and ${DATABASE_SYSTEM_COUCHBASE}`
    //     ); //TODO: replace with proper try-catch code
    // }
    //TODO: add in couchbase sql once we've got a db up and running

    const data = await query(selectString);

    return data.rows;
}

export async function postTestRecord(newTestRecord) {
    console.log({ newTestRecord });

    //NOTE: don't forget that any of the values that are strings ALSO need single quotes around them - see below
    // NOTE: do not insert into (i) id (auto-incremented and created), (ii) create_date_time (auto-created), nor possiblly (iii) test_date_posted (if you want to capture as default today always)
    const sqlString = `INSERT INTO test_record(
        user_id,
        test_some_string,
        test_some_int,
        test_some_status
    )
    VALUES(
        ${newTestRecord.user_id},
        '${newTestRecord.test_some_string}',
        ${newTestRecord.test_some_int},
        'new'
    );`; //TODO: replace 'new' with a CONST, ideally defined in config.js and imported

    const result = await query(sqlString);
    console.log({ result });

    return result;
}
