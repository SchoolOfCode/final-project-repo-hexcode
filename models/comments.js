import query from "../db/connection.js";
import { debugOut, infoOut } from "../utils/logging.js";

// *****************************************************
//       GET ALL COMMENTS (regardless of event, author)
//             (test purposes only)
// *****************************************************
export async function getAllComments() {
    const sqlString = `SELECT
            c.comment_id as "commentId", 
            c.comment_text as "commentText",
            to_char(c.comment_date_posted,'DD-MM-YYYY') as "commentDatePosted",
            to_char(c.comment_create_date_time,'DD-MM-YYYY HH:MM:SS') as "commentDateTimePosted",
            AGE(c.comment_create_date_time) as "commentAge",
            c.comment_create_date_time as "commentCreateDateTime",
            c.author_user_id as "authorUserId",
            a.app_user_email as "authorEmail",
            a.app_user_has_account as "authorHasAccount",
            a.app_user_first_name as "authorFirstName",
            a.app_user_last_name as "authorLastName",
            a.app_user_profile_pic_link as "authorProfilePicLink",
            a.app_user_create_date_time as "authorCreateDateTime",
            e.organiser_user_id as "organiserUserId",
            e.event_id as "eventId",
            e.event_title as "eventTitle",
            e.event_description as "eventDescription",
            e.event_location as "eventLocation",
            e.event_date as "eventDate",
            e.event_time as "eventTime",
            e.event_requirements as "eventRequirements",
            e.event_category as "eventCategory",
            e.event_create_date_time as "eventCreateDateTime"

        FROM comment c
        LEFT OUTER JOIN app_user a ON c.author_user_id = a.app_user_id
        LEFT OUTER JOIN event e ON c.event_id = e.event_id
        ORDER BY c.comment_id DESC;`;

    debugOut(
        `/models/comments.js - getAllComments`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString);
    debugOut(
        `/models/comments.js - getAllComments`,
        `data.rows = ${data.rows}`
    );
    debugOut(`/models/comments.js - getAllComments`, data.rows, true);

    return data.rows;
}

// ************************************************
//       GET ALL COMMENTS for a given EVENT ID
//       e.g.
//       /events/:12/comments/  where 12 is an event_id
// ************************************************
export async function getAllCommentsByEvent(eventId) {
    const sqlString = `SELECT
            c.comment_id as "commentId", 
            c.comment_text as "commentText",
            to_char(c.comment_date_posted,'DD-MM-YYYY') as "commentDatePosted",
            to_char(c.comment_create_date_time,'DD-MM-YYYY HH:MM:SS') as "commentDateTimePosted",
            AGE(c.comment_create_date_time) as "commentAge",
            c.comment_create_date_time as "commentCreateDateTime",
            c.author_user_id as "authorUserId",
            a.app_user_email as "authorEmail",
            a.app_user_has_account as "authorHasAccount",
            a.app_user_first_name as "authorFirstName",
            a.app_user_last_name as "authorLastName",
            a.app_user_profile_pic_link as "authorProfilePicLink",
            a.app_user_create_date_time as "authorCreateDateTime",
            e.organiser_user_id as "organiserUserId",
            e.event_id as "eventId",
            e.event_title as "eventTitle",
            e.event_description as "eventDescription",
            e.event_location as "eventLocation",
            e.event_date as "eventDate",
            e.event_time as "eventTime",
            e.event_requirements as "eventRequirements",
            e.event_category as "eventCategory",
            e.event_create_date_time as "eventCreateDateTime"

        FROM comment c
        INNER JOIN app_user a ON c.author_user_id = a.app_user_id
        INNER JOIN event e ON c.event_id = e.event_id
        WHERE e.event_id = $1;`;

    const sqlStringParams = [eventId];
    debugOut(
        `/models/comments.js - getAllCommentsByEvent`,
        `sqlString = ${sqlString}`
    );

    const data = await query(sqlString, sqlStringParams);
    debugOut(
        `/models/comments.js - getAllCommentsByEvent`,
        `data.rows = ${data.rows}`
    );
    debugOut(`/models/comments.js - getAllCommentsByEvent`, data.rows, true);

    return data.rows;
}

// *********************************************************************
//       POST ONE COMMENT and return new COMMENT_ID
//
//       (will need the comments event_id and the author's app_user_id)
// **********************************************************************
export async function postComment(newComment) {
    debugOut(`/models/comments.js - postComment`, newComment, true);

    // TODO: test if it works if some of the incoming attributes are MISSING.
    const sqlString = `INSERT INTO comment(
            event_id,
            author_user_id,
            comment_text
        )
        VALUES(
            $1,
            $2,
            $3
        ) RETURNING *;`;

    const sqlStringParams = [
        newComment.eventId,
        newComment.authorUserId,
        newComment.commentText,
    ];

    debugOut(`/models/comments.js - postComment`, `sqlString = ${sqlString}`);

    const result = await query(sqlString, sqlStringParams);
    const newCommentId = result.rows[0].comment_id;

    debugOut(`/models/comments.js - postComment`, result, true);

    debugOut(
        `/models/comments.js - postComment`,
        `NEW COMMENT_ID is: ${newCommentId}`
    );

    //TODO: maybe change what's returned. Ony returning  newCommentId for now
    return newCommentId;
}
