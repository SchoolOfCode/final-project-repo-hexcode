import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";
import { getAllComments, postComment } from "../models/comments.js";

const commentRoutes = express.Router();

debugOut(`routes/comments.js`, `script start`);

// *****************************************************
//       GET ALL COMMENTS (regardless of event, author)
//             (test purposes only)
// *****************************************************
commentRoutes.get("/", async (req, res) => {
    const searchResults = await getAllComments();

    res.json({
        success: true,
        message: `Retrieved all comments regardless of event or author - TEST PURPOSES ONLY`,
        payload: searchResults,
    });
});

// ************************************************
//       GET ALL COMMENTS for a given EVENT ID
// ************************************************
// N/A - see event routes file instead.
//

// ************************************************************
//       POST NEW COMMENT for a given EVENT ID (and AUTHOR ID)
// ************************************************************
commentRoutes.post("*", async function (req, res) {
    //TODO: put try/catch error code here

    //insert the comment, and reeive back the new comment object, including new comment id.
    const postResults = await postComment(req.body); //have updated postResults to contain newCommentObject or new comment_id

    debugOut(
        `routes/comments.js/POST`,
        // `NEW COMMENT_ID is: ${postResults.commentId}`
        `NEW COMMENT_ID is: ${postResults}`
    );

    res.json({
        success: true,
        message: `Inserted new comment record`,
        //TODO: decide what we are returning - just comment id, or the whole body?
        // commentId: postResults.rows[0].comment_id,
        commentId: postResults,
        payload: postResults, //currently postResults is just comment id
    });
});

debugOut(`routes/comments.js`, `script end`);

export default commentRoutes;
