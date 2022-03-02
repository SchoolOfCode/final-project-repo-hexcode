import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-how-data-relates.md BEFORE ADDING/CHANGING THIS DATA
// **********************************************************************
// NB - contact_owner_user_id can only be 1 to 5 (i.e. only full users can have contact lists
// NB - contact_user_id can only any users, with or without accounts, so 1 to 9
//
// NB: DO NOT INSERT into main id field (contact_id) - messes up the auto-increment for subsequent inserts
// NB: DO NOT INSERT into the create data/time field (contact_create_date_time) - it auto-populates
const sqlString = `INSERT INTO contact
        (
            contact_owner_user_id,
            contact_user_id,
            contact_name
        )
    VALUES
        (1, 2, 'Maria from school'),
        (1, 3, 'Akiko'),
        (1, 4, 'Uncle Dave'),
        (1, 5, 'Luke S'),
        (1, 6, 'Tommy'),
        (1, 7, 'Magic Mary'),
        (2, 1, 'Bel'),
        (2, 0, 'zzz'),
        (2, 0, 'zzz'),
        (3, 0, 'zzz'),
        (3, 0, 'zzz'),
        (3, 0, 'zzz'),
        (3, 0, 'zzz'),
        (4, 0, 'zzz'),
        (4, 0, 'zzz'),
        (4, 0, 'zzz'),
        (5, 0, 'zzz'),
        (5, 0, 'zzz'),
        (5, 0, 'zzz'),
        (5, 0, 'zzz'),
        (5, 8, 'Uncle Mike');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedContactTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedContactTable.js: about to attempt to execute seed table sql"
);
executeSQL();
