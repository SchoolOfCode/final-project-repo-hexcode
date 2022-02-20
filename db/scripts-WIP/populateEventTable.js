import query from "../connection.js";

// note: deliberately not inserting into date_posted or create_date_time as they have default of current date
//20Jan2022 - Also Need to NOT send in a value for id column, because it messes up the auto-increment for subsequent inserts.
const sqlString = `INSERT INTO study_request(
                        user_id,  
                        session_type,
                        why_study_request_needed,
                        approx_availability,
                        search_status
                    )

                    VALUES
                        (1, 'Pair programming', 'Help! :) I missed how to create a restful API on week 5, day 21. I would like to do a small bit of research, but mainly to practice by coding something.', 'Any time at weekends', 'open'),

                        (2, 'Someone to explain something', 'Hi bootcampers! I have really struggled in week 8 getting to grip with React Hooks and could do with a bit of help to understand that topic. I would really love someone to spend an hour with me going through cerain hooks ... ', 'Any evening after 5pm. Flexible', 'open'),
                        
                        (3, 'Research buddy', 'Would like to find a buddy to throw ideas around with and to research big topics together, and to work through documentation together to try and understand it', 'All evenings and weekends, except next Tuesday', 'open'),
                        
                        (4, 'Library partner', 'I found the move from office working to online a bit of a challenge. I would like to study with someone else online to increase accountability, and I would like to work away googling stuff and trying stuff out, with someone else in the zoom session, but not necessarily working on the same thing.', 'Sundays are good for me', 'open'),
                        
                        (2, 'Pair programming','Hi, me again - as well as my one-off react hooks request earlier, I would love to find someone for regular pair programming', 'Same as always - any evening after 5pm.', 'open');`;

async function executeSQL() {
    const res = await query(sqlString);

    console.log(
        "In db/scripts/populateStudyRequestTable.js: populated table",
        res
    );
}

executeSQL();
