import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-how-data-relates.md BEFORE ADDING/CHANGING THIS DATA
// **********************************************************************
// NB - records 1 - 5 are FULL users (app_user_has_account = TRUE)
// NB - records 6 - 9 are for invitee-only users (app_user_has_account = FALSE)
//
// NB: DO NOT INSERT into main id field (app_user_id) - messes up the auto-increment for subsequent inserts
// NB: DO NOT INSERT into the create data/time field (app_user_create_date_time) - it auto-populates
const sqlString = `INSERT INTO app_user
    (
        app_user_email,
        app_user_has_account,
        app_user_first_name , 
        app_user_last_name, 
        app_user_profile_pic_link
    )
    VALUES
        ('belinda@belinda.com', TRUE, 'Belinda','Duffy', '1.png'),
        ('maria@maria.com', TRUE, 'Maria','Rushmore', '2.png'),
        ('akiko@akiko.com', TRUE, 'Akiko','Jones', '3.png'),
        ('dave@dave.com', TRUE, 'Dave','Milton', '4.png'),
        ('luke@luke.com', TRUE, 'Luke','Stansell', '5.png'),
        ('tom@tom.com', FALSE, NULL, NULL, NULL),
        ('mary@mary.com', FALSE, NULL, NULL, NULL),
        ('mike@mike.com', FALSE, NULL, NULL, NULL),
        ('katie@katie.com', FALSE, NULL, NULL, NULL);`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedAppUserTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedAppUserTable.js: about to attempt to execute seed table sql"
);
executeSQL();
