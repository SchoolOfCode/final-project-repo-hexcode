import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS comment 
                        (comment_id serial PRIMARY KEY,
                        event_id INT,
                        author_user_id INT,
                        comment_text VARCHAR (255) NOT NULL,
                        comment_date_posted DATE NOT NULL DEFAULT CURRENT_DATE,
                        comment_create_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        )`;
//BUG FIX - TIME not saving in createdatetime: Replacing TIMESTAMP NOT NULL DEFAULT CURRENT_DATE with TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

async function executeSQL() {
    console.log(`DEBUG: sqlString = ${sqlString}`);

    const res = await query(sqlString);

    console.log(
        "DEBUG: db/migrations/createCommentTable.js: Created table",
        res
    );
}

console.log(
    "DEBUG: db/migrations/createCommentTable.js: about to attempt to execute create table sql"
);

executeSQL();
