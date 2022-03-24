// ***********************************
// CONSTANTS that vary by environment
// ***********************************
export const DATABASE_URL = process.env.DATABASE_URL;
export const ENV_TYPE = process.env.ENV_TYPE;

// ***************************
//     CONSTANT CONSTANTS
// ***************************
export const ENV_TYPE_IS_DEVELOPMENT = "DEVELOPMENT"; // do not changed - set up  in .env, and in Heroku  twice (one on staging app; once on prod app)
export const ENV_TYPE_IS_STAGING = "STAGING"; //do not change - set in Heroku staging App
export const ENV_TYPE_IS_PRODUCTION = "PRODUCTION"; //do not change - set in Heroku Live App

//Adding in constants to support a switch statement to allow us to more easily switch the database models between relational database (PostgreSQL) and No SQL like Couchbase - use in the model/ files
export const DATABASE_SYSTEM_POSTGRESQL = "POSTGRESQL";
export const DATABASE_SYSTEM_COUCHBASE = "COUCHBASE";

// TODO: Think more about how i'd implement (and test) this to replace the 'magic numbers' in the error-checking code.
//        see https://stackoverflow.com/questions/18311924/express-js-how-can-i-set-response-status-by-name-rather-than-number
//        and https://stackoverflow.com/questions/25146687/list-of-node-js-http-status-codes
//        => There is already a http.STATUS_CODES
// constants to reprenst the HTTP Status Codes we're using
// using values from here (https://www.npmjs.com/package/http-status-codes)
// export const HTTP_STATUS_OK = 200;
// export const HTTP_STATUS_CREATED = 201;
// export const HTTP_STATUS_BAD_REQUEST = 400;
// export const HTTP_STATUS_UNAUTHORIZED = 401;
// export const HTTP_STATUS_NOT_FOUND = 404;
// export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
