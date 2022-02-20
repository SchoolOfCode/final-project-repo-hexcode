import query from "../connection.js";

const sqlString = `CREATE TABLE IF NOT EXISTS event 
                         (id serial PRIMARY KEY, 
                          user_id INT,
                          date_posted DATE NOT NULL DEFAULT CURRENT_DATE,
                          session_type VARCHAR (50),
                          why_study_request_needed VARCHAR (500),
                          approx_availability VARCHAR (100),
                          search_status VARCHAR (10),
                          create_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
                          CONSTRAINT fk_user
                              FOREIGN KEY(user_id)
                                 REFERENCES user(id)
                          )`;

async function executeSQL() {
    const res = await query(sqlString);

    console.log("In db/scripts/createStudyRequestTable.js: Created table", res);
}

executeSQL();
