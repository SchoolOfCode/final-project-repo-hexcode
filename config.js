//Adding in a switch to allow us to more easily switch the database models between relational database (PostgreSQL) and No SQL like Couchbase - use in the model/ files
export const DATABASE_SYSTEM_POSTGRESQL = "POSTGRESQL";
export const DATABASE_SYSTEM_COUCHBASE = "COUCHBASE";

export const ENV_TYPE_IS_DEVELOPMENT = "DEVELOPMENT"; // do not changed - set up  in .env, and in Heroku  twice (one on staging app; once on prod app)
export const ENV_TYPE_IS_STAGING = "STAGING"; //do not change - set in Heroku staging App
export const ENV_TYPE_IS_PRODUCTION = "PRODUCTION"; //do not change - set in Heroku Live App
export const DATABASE_URL = process.env.DATABASE_URL;
export const ENV_TYPE = process.env.ENV_TYPE;
