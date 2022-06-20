# Raduno! Catch up without the fuss

Raduno! is the application that helps you arrange all your group activities swiftly, fairly and democratically.

## What does the app do?

Our app removes the friction and hassle from arranging those large group social events with your friends or family.
It does this by making it easy to set up polls to vote on potentially divisive subjects such as where to go, what to do, and what date to pick. The voting is done in a fair and transparent manner that keeps everyone happy.
There is also a social element to the app, with a comments section for each event, where people can share thoughts and feelings, and work out the minutia of where to park, what to wear etc.
It is solving the problems around organising activities for a group of people, and the friction that is usually involved in getting group decisions quickly and democratically.

the application that helps you swiftly organise your group activities, by rounding up your friends or family by event, and enabling them to have their say on what to do or where to go fairly and democratically

## What does this repo contain?

Node.js - Express - RESTful APIs - PostgreSQL Database - Heroku deployment for staging and production environments

This repo contains the APIs for saving and fetching the data. It is written without using express-generator.

This repo holds the code for the REST APIs and Node.js server, and the scripts to create, and seed the required database tables in PostgrSQL.
The database is hosted on Heroku.

As well as the local dev environment, there is a staging and production environment, both hosted as Heroku apps.

## Available Documentation

---

### Installation and Configuration

The installation and configuration steps that were used to create this server are documented in the following markdown file:

![server-installation-and-setup](./README-server-installation-and-setup.md)

---

### Data and Data Modelling

We have created three different levels of data model to capture the intriciacies of the business domain, and then to track how the business objects link to the logical and the physical data

#### Data Models

-   domain model
-   logical data model
-   physical data model.
-   TODO: include a png version of the three data models

See ![design-data-model](./README-data-models-domain-logical-physical.drawio) for the source drawio file containing the three data models.

#### Seed Data

For each of the tables created from the model, we have seeded them with data in order to demo the application effectively.

This data is detailed in the following markdown document:

![how-seed-data-relates](./README-seed-data-setup.md)

---

### Error Codes + error messages

| Code | route                  | Messsage Examples                                |
| ---- | ---------------------- | ------------------------------------------------ |
| 200  | all                    | success                                          |
| 400  | appusers/:id           | hexcode - id parameter (for user id) not found   |
| 400  | appusers/:id           | hexcode - id parameter must be integer           |
| 404  | appusers/:id           | hexcode - user record not found for id           |
| 400  | appusers/search?email= | hexcode - email query string parameter not found |
| 404  | appusers/search?email= | hexcode - user not found for this email address  |
| 500  | all                    | hexcode - generic serverside error has occured   |

### API Routes

The APIs aim to adhere to RESTful best practice.

The back end application currently contains basic routes to fetch all the event and users, and to post new events and related data.

(TODO: expand this to include the new routes - OR link to the document that lists all the routes)

TODO: include link to the readme that documents the API for developers creating more routes - list how the table-columns etc map to fields sent in API to front end.

| Method | Path                          | Extra Info | Result                                    | Response                                      |
| ------ | ----------------------------- | ---------- | ----------------------------------------- | --------------------------------------------- |
| GET    | /appusers                     |            | all appusers (test purposes only)         | { success: Boolean, payload: appusers array } |
| GET    | /appusers/<appuser_id>        |            | appuser with given id, if it exists       | { success: Boolean, payload: appuser }        |
| GET    | /appusers/<appuser_id>/events |            | recipes with given id, if it exists       | { success: Boolean, payload: events array }   |
| GET    | /events                       |            | all events (test purposes only)           | { success: Boolean, payload: events array }   |
| POST   | /events                       | { body }   | create a new event                        | { success: Boolean, payload: event_id? }      |
| GET    | /events/<event_id>            |            | event with given id, if it exists         | { success: Boolean, payload: event }          |
| GET    | /events/<event_id>/comments   |            | updated recipe                            | { success: Boolean, payload: comments array } |
| GET    | /comments/<comment_id>        |            | recipe deleted                            | { success: Boolean, payload: comment }        |
| POST   | /comments/                    | { body }   | create new event (for given event/author) | { success: Boolean, payload: comment }        |

### EXAMPLE

| Method | Path                 | Additional Info | Result                                    | Response                                    |
| ------ | -------------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | /recipes             |                 | all recipes                               | { success: Boolean, payload: recipe array } |
| GET    | /recipes/<recipe_id> |                 | recipes with a particular id if it exists | { success: Boolean, payload: recipe }       |
| POST   | /recipes             | { body }        | create a new recipe                       | { success: Boolean, payload: recipe }       |
| PUT    | /recipes/<recipe_id> | { body }        | updated recipe                            | { success: Boolean, payload: recipe }       |
| DELETE | /recipes/<recipe_id> |                 | recipe deleted                            | { success: Boolean, payload: recipe }       |

---
