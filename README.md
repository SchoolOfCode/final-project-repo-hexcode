# SERVER REPO for Group Activity Arranging Application by Team HexCode

(Node.js -Express - REST API - PostgreSQL DB - Deployed on Heroku)

TODO: add summary here for what the application does, in business terms.

This repo contains the APIs etc for saving and fetching the data. It is written without using express-generator.

The data model shows the tables for the MVP in green and the initial thoughts for tables for future functionality, in white: <br><br>
![organise-a-group-activity-data-model](data-model.png)

TODO: include a png version of the data model

<br>The RESTful API currently contains basic routes to get all the event and user requests, and to post new events and related data.

This readme file contains the setup steps followed from start to finish to get this server up and working with a couple of database tables, and a simple route.

# PACKAGE INSTALLATIONS + package.json file edits

-   clone the empty repo from github down into a local folder, e.g.

    ```
    /server/
    ```

-   initalise folder as git one (already done by cloning down repo)

-   go into that folder and, at the command prompt, initialise as an "npm" folder npm one, creating package.json

    ```
    $ cd server
    $ npm init
    (for anyone cloning:  you can cover all this with an 'npm i' after cloning down)

        package name: hexcode-server-a
        version : <<i left this as default, 1.0.0>>
        description : fetches and posts data related to organising group events
        entry point: <<i left this as default, index.js >>
        test command: <<i left this as default - update manually below>>
        git repository : <<i left this as default >>
        keywords:
        author: Sinead Akwei Ashlie Dan Ivan and James
        licence:
    ```

-   install dependencies - express , pg for prod, nodemon, dotenv just for dev (-D or --save-dev), plus testing packages:

    ```
    (Again, for anyone cloning, this is covered if you 'npm i' after cloning down since the dependencies will already be in the package.json)

    $ npm i express        [Fast, unopinionated, minimalist web framework for node.]

    $ npm i pg             [Non-blocking PostgreSQL client for Node.js.]

    $ npm i -D nodemon     [helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected]

    $ npm i -D dotenv      [loads environment variables from a .env file into process.env variable]

    $ npm i -D jest
    $ npm i -D supertest

    $ npm install env-var  [will alert you immediately if your environment is misconfigured e.g. some required database-related environment variable]
    ```

_Note: The additional packages that are installed in the School of Code example include cookie-parser, debug and morgan._

---

(if we want) to cover CORS issues:

-   install cors package:

```
    $ npm install cors
```

-   and in the code, add a route:

```
   app.use(cors);
```

---

-   -   Edit package.json (the dependencies should have now been added)

    -   add type/module line
        ```
            "type" : "module",
        ```
    -   Set up the script shortcuts _(remember to include "-r dotenv/config " for anything using db connection - need to be mindful of the different in running these in dev and prod however.)_

        ```
        "start": "node ./bin/www.js",

        "dev" : "nodemon -r dotenv/config  ./bin/www.js",

        "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"

        ```

        _Note: above, in package.json, if required, can later add script shortcuts for any db scripts to create, populate and drop tables._

        _Note: previously we used to set "start" to use app.js, not bin/www.js. That was because, when we started, we had the app.listen() code inside app.js along with the router code all in one file. Now we've progressed, we've separated the app.listen code out into the www.js file_

---

# PROJECT FOLDER + FILE STRUCTURE SETUP

create folders, and EMPTY files:

```
server/ - this is what i've called my root folder for this node.js app

server/.env

server/.env.example

server/.gitignore

server/app.js      (NB: NOT auto-created)

[Note: server/config.js NOT ALWAYS NEEDED - create later if required]


server/bin/        (NB: NOT auto-created)

server/bin/www.js  (NB: NOT auto-created)


server/db/

server/db/index.js   - [with the pool setup (and importing pg), and using the env variables, via the db constant(s)]

server/db/scripts

server/db/scripts/dropXYZTable.js
server/db/scripts/createXYZTable.js
server/db/scripts/populateXYZTable.js

[Note: there will be a set of these for each table we need to set up]

server/models/
server/models/XYZ.js    [for the SQL for 'getAllXYZ etc']

server/routes/
server/routes/XYZ.js   [for the ROUTER for getAllXYZ, postXYZ etc]

```

---

# FILE CONFIG (the rest of it)

## app.js config

Set up express, and the routes. Type the following into your app.js file:

```
    import express from "express";

    // will also import our custom router aliases here

    const app = express();

    app.use(express.json());

    //FYI potentially add CORS import and middleware here

    // will also app.use our custom router aliases here

    export default app;
    // FYI the database PORT is now covered in bin/www.js
    //FYI the routes are now in the ./routes folder
```

---

## bin/www.js config

Set up the database PORT and the listener. Type the following into your app.js file:

```
    import app from "../app.js";

    const LOCAL_PORT = 5000; //or wherever you wish to use
    const PORT = process.env.PORT || LOCAL_PORT;

    app.listen(PORT, () => {
        console.log(`listening on PORT ${PORT}`);
    });

```

---

## db/index.js config

Set up the PostgreSQL connection object. Type the following into your app.js file:

```
    import pg from "pg";

    const pool = new pg.Pool({
        connectionString : process.env.DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: {
            rejectUnauthorized: false
        }
    });

    export default function query(text, params) {
        return pool.query(text, params);
    }
```

_Note the DATABASE_URL has been taken from Heroku, where the database has been created, and pasted into the .env file. The dotenv npm package copies anything from there into the equivalent process.env variable(s)_

---

# DATABASE - PART 1 SETUP

## Database creation - Heroku

-   DONE - on heroku.com, log in, set up a new database, and take a copy of the DATABASE*URL value for it *(for anyone cloning: you will need to do this also, and then paste the credentials into .env - see later)\_

    ```
    -> CLICK "new" button
    -> SELECT "Create New App"
    -> ENTER an app name:
            study-buddy-gcps
    -> CLICK "Create App" button
    -> CLICK "Resources" menu item
    -> CLICK Add-Ons
    -> SELECT "Heroku PostgreSQL" from the dropdown

    <you'll get a pop-up asking about what tier you want to use>
    -> select "Hobby Dev - Free"
    -> CLICK Submit
    -> CLICK on "Settings"
    -> CLICK on "Reveal Config"

    Then select the value for DATABASE_URL and copy it (you will be pasting it into the .env file)
    ```

---

## Environment Variables (for database connection)

Set up environment variables for the scripts to use to connect to the database _(Note: we did it with six different vriables in December. NOW, you can just use one)_

-   DONE - edit .env file - add following environment variable

    ```
        DATABASE_URL="paste in connection string from heroku website"
    ```

-   DONE - edit .env.example file - add following environment variable

    ```
        DATABASE_URL=
    ```

## Database config.js Script - TODO: NOT NEEDED?

Previously we needed a config.js file. It seemed to be used for two things:

-   assigning all the process.end.ENV_VARIABLES to a shroter onstant, like dbUser, dbHost etc (or to an object) - this is no longer as importnat since we now only need one environment variable to conect to Heroku, DATABAE_URL.

-   It also contained four lines commented _"Don't change anything in this file! This helps serve the front end."_. However we are now deploying the front and back end as different repos, not as a single full stack application, so this is currently not required either.

---

# TEST THE SET UP

---

So now we should try and start the server and make sure it's listening.

In the terminal, change to the /server/ folder and try to start

```
    $ cd server/
    $ npm start
```

Note: We can do further tests as we create the database files (see DATABASE - PART 2 - CODE) - for example, we can confirm that the application is talking to the postgre database on heroku and able to send and execute sql statements

---

# DATABASE - PART 2 - CODE

## Database Batch Scripts (run once for setup)

WRITE the db scripts to

-   DONE - DROP IF EXISTS the buddy_requests table (server/db/scripts/dropBuddySearchesTable.js)

-   DONE - CREATE buddy_requests table script (server/db/scripts/createBuddySearchesTable.js)

-   TODO: FILL (with test data) buddy_requests table (server/db/scripts/populateBuddySearchesTable.js)

-   TODO: DROP IF EXISTS the users table (server/db/scripts/dropUsersTable)

-   TODO: CREATE users table script (server/db/scripts/createUsersTable)

-   TODO: FILL (with test data) users table (server/db/scripts/populateUsersTable.js)

and add shortcuts into the package.json to run these:

```
        "dbdropbuddysearchestable": "node -r dotenv/config ./db/scripts/dropBuddySearchesTable.js",
        "dbcreatebuddysearchestable": "node -r dotenv/config ./db/scripts/createBuddySearchesTable.js",
        "dbpopulatebuddysearchestable": "node -r dotenv/config ./db/scripts/populateBuddySearchesTable.js",

        "dbdropuserstable": "node -r dotenv/config ./db/scripts/dropUsersTable.js",
        "dbcreateuserstable": "node -r dotenv/config ./db/scripts/createUsersTable.js",
        "dbpopulateuserstable": "node -r dotenv/config ./db/scripts/populateUsersTable.js",

        "dbcreatetesttable": "node -r dotenv/config ./db/scripts/createTestTable.js",
        "dbdroptesttable": "node -r dotenv/config ./db/scripts/dropTestTable.js"
```

---

## Database CRUD Scripts (run regularily from the API)

---

# ROUTES + RESTful API

-   Add express into app.js
    ```
      import express from "express";
      const app = express();
      app.use(express.json());
      export default app;
    ```
-   set up a route to GET ALL the study requests
    ```
    localhost/3000/studyrequests
    ```
-   set up a route to POST one new study request (and to return the new ID)
    ```
    localhost/3000/ ?????  - [TODO: confirm the route for this]
    ```
