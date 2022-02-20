import query from "../connection.js";

//20Jan2022 - Need to NOT send in a value for id column, because it messes up the auto-increment for subsequent inserts.
const sqlString = `INSERT INTO test_record(
    user_id , 
    test_some_string, 
    test_some_int,
    test_some_status)

    VALUES
        (1,'test saving string', 12345, 'open'),
        (1,'test another string', 665, 'open'),
        (2,'test 3', 32, 'open'),
        (2,'test 4', 345, 'completed'),
        (3,'5 test', 2, 'deleted'),
        (2,'final test record', 76, 'open');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log(
        "DEBUG: db/scripts/populateTestRecordTable.js: populated table",
        res
    );
}

console.log(
    "DEBUG: db/scripts/populateTestRecordTable.js: about to attempt to execute populate table sql"
);
executeSQL();
