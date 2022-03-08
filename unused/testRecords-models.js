import query from "../db/connection.js";

//------------------------------
// Test Record will look like:
//------------------------------
// testRecordId
// testUserId
// testRecordSomeString
// testRecordSomeIn,
// testSomeStatus    - TODO: change this (in database and throughout) to testRecordSomeStatus
// testRecordDatePosted
// testRecordCreateDateTime

export async function getAllTestRecords() {
    // VERSION 1: First, for basic test,  just do a simple select
    // const data = await query(`SELECT * FROM test_record;`);

    // VERSION 2: then update to proper select (with join if one was needed) and aliases to match the variable names used in the front end
    const sqlString = `SELECT 
            t.id as "testRecordId",
            t.user_id as "testUserId",
            t.test_some_string as "testRecordSomeString",
            t.test_some_int as "testRecordSomeInt",
            t.test_some_status as "testSomeStatus",
            to_char(t.test_date_posted, 'dd-mm-yyyy') as "testRecordDatePosted",
            t.create_date_time as "testRecordCreateDateTime"
        FROM test_record t
        ORDER BY t.id DESC;`;

    console.log(`DEBUG: sqlString = ${sqlString}`);
    const data = await query(sqlString);

    return data.rows;
}

export async function postTestRecord(newTestRecord) {
    console.log({ newTestRecord });

    // NOTE: do not insert into (i) id (auto-incremented and created), (ii) create_date_time (auto-created), nor possiblly (iii) test_date_posted (if you want to capture as default today always)
    const sqlString = `INSERT INTO test_record(
                            user_id,
                            test_some_string,
                            test_some_int,
                            test_some_status
                        )
                        VALUES(
                            $1,
                            $2,
                            $3,
                            'new'
                        ) RETURNING *;`; //TODO: replace 'new' with a CONST, ideally defined in config.js and imported

    const sqlStringParams = [
        newTestRecord.testUserId,
        newTestRecord.testRecordSomeString,
        newTestRecord.testRecordSomeInt,
    ];

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const result = await query(sqlString, sqlStringParams);

    console.log(`DEBUG: `, { result });

    return result;
}
