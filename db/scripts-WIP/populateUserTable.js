import query from "../connection.js";

//20Jan2022 - Need to NOT send in a value for id column, because it messes up the auto-increment for subsequent inserts.
const sqlString = `INSERT INTO user(
        first_name, 
        last_name, 
        slack_name,
        profile_pic_link)

    VALUES
        ('Mary','Duffy','MDuffy', '1.png'),
        ('Jane','Rushmore','JRushmore', '2.png'),
        ('Belinda','Jones','BelJones', '3.png'),
        ('Bill','Stansell','BillStansell', '4.png');`;

async function executeSQL() {
    const res = await query(sqlString);

    console.log("In db/scripts/populateUserTable.js: populated table", res);
}

executeSQL();
