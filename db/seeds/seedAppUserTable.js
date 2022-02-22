import query from "../connection.js";

//NB: Need to NOT send in a value for id column, because it messes up the auto-increment for subsequent inserts.
//NB: Also no need to manually insert into any auto-populated columns, like CREATE_DATE_TIME
const sqlString = `INSERT INTO app_user(
    app_user_first_name , 
    app_user_last_name, 
    app_user_email,
    app_user_profile_pic_link)

    VALUES
        ('Belinda','Duffy','luke@gmailtest.com', '1.png'),
        ('Maria','Rushmore','luke@gmailtest.com', '2.png'),
        ('Akiko','Jones','luke@gmailtest.com', '3.png'),
        ('Dave','Milton','dave@gmailtest.com', '4.png'),
        ('Luke','Stansell','luke@gmailtest.com', '5.png');`;

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);
    console.log("DEBUG: db/seeds/seedAppUserTable.js: seeded table", res);
}

console.log(
    "DEBUG: db/seeds/seedAppUserTable.js: about to attempt to execute seed table sql"
);
executeSQL();
