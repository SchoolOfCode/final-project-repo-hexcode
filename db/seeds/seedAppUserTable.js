import query from "../connection.js";

// **********************************************************************
// NB - SEE readme-seed-data-setup.md BEFORE ADDING/CHANGING THIS DATA
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
        ('tom@tom.com', FALSE, 'Tom', 'Phelps', '6.png'),
        ('mary@mary.com', FALSE,  'Mary','Murphy', '7.png'),
        ('mike@mike.com', FALSE,  'Mike','Duffy','8.png'),
        ('katie@katie.com', FALSE,  'Katie','Smith', '9.png');`;

// TODO: the correct data is below (commented out) because contacts that have not set up an app login should NOT
//       have a name or profile pic in the app user table.
//       The name should be taken from the contacts table.
//       However, as a temporary measure, I'm adding in names etc, to make the SQL for selecting the names of invitees easier/faster, because now we can (temporarily) select all names from app_user rather than going via contacts table
// ('belinda@belinda.com', TRUE, 'Belinda','Duffy', '1.png'),
// ('maria@maria.com', TRUE, 'Maria','Rushmore', '2.png'),
// ('akiko@akiko.com', TRUE, 'Akiko','Jones', '3.png'),
// ('dave@dave.com', TRUE, 'Dave','Milton', '4.png'),
// ('luke@luke.com', TRUE, 'Luke','Stansell', '5.png'),
// ('tom@tom.com', FALSE, NULL, NULL, NULL),
// ('mary@mary.com', FALSE, NULL, NULL, NULL),
// ('mike@mike.com', FALSE, NULL, NULL, NULL),
// ('katie@katie.com', FALSE, NULL, NULL, NULL);`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedAppUserTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedAppUserTable.js: about to attempt to execute seed table sql"
);
executeSQL();
