//TESTS
GET for /appusers/
GET for /appusers/3
GET for /events/
GET for /events/2
GET for /testrecords/

POST for /events/
    .organiserId,
    .eventTitle,
    .eventDescription,
    .eventLocation,
    .eventTime,
    .eventRequirements,
    .eventCategory,
    {
        "organiserId" : 2,
        "eventTitle" : "test another event",
        "eventDescription" : "test another description",
        "eventLocation" : "dublin",
        "eventTime" : "6pm",
        "eventRequirements" : "bring shoes",
        "eventCategory" : "guinness"
        }

// ROUTES:

// GET all users - https://hexcode-arrange-group-event.herokuapp.com/appusers/  (which i don't think we'll need)
// 2. GET a specific App User - we have records set up for App Users 1 to 5 (Belinda=1, Maria=2, Akiko=3, Dave=4,
// Luke=5) https://hexcode-arrange-group-event.herokuapp.com/appusers/3
//  3. GET all events, regardless of who the organiser is, which i don't think we'll need)  https://hexcode-arrange-group-event.herokuapp.com/events
// 4. GET a specific event - we have four Event_ID records set up - Events 1-3 belong to Belinda. Event 4 belongs to Barry
// https://hexcode-arrange-group-event.herokuapp.com/events/2
// next up is:
// 5.  expand GET Specific Event route to also return the organisers' information as well update: Done. Needs deploying
// 6. create route to POST a new Event for a specific organiser (appuser_id)  (basic create - not including polls or comments) https://hexcode-arrange-group-event.herokuapp.com/events/  ( using end point /events/ and a POST request)
// 7. create route to  GET all events for a specific user (for the dashboard' page)  https://hexcode-arrange-group-event.herokuapp.com/appusers/3/events
// update: this will be tricker - easier to do where the user is the organiser, which we can do first. Tricker to select all events where the user is an organiser or an invitee.) (edited)

//------------------------------
// Event Database Record will look like:
//------------------------------
// id SERIAL PRIMARY KEY,
// organiser_id INT,
// event_title VARCHAR(50),
// event_description VARCHAR(255) DEFAULT NULL,
// event_location VARCHAR(255) DEFAULT NULL,
// event_date DATE DEFAULT NULL,
// event_time VARCHAR(10) DEFAULT NULL,
// event_requirements VARCHAR(255) DEFAULT NULL,
// event_category VARCHAR(50) DEFAULT NULL,
// create_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_DATE

//23 Feb - changed event.user_id to event.organiserId
export const event = {
    id: 12,
    organiserId: 1,
    eventTitle: `TBC`,
    eventDescription: `TBC`,
    eventLocation: `TBC`,
    eventDate: ``,
    eventTime: ``,
    eventRequirements: ``,
    eventCategory: ``,
    createDateTime: ``,
};

//------------------------------
// AppUser Database Record will look like:
//------------------------------
// id serial PRIMARY KEY,
// app_user_first_name VARCHAR (30) DEFAULT NULL,
// app_user_last_name VARCHAR (30) DEFAULT NULL,
// app_user_email VARCHAR (30) NOT NULL,
// app_user_profile_pic_link VARCHAR (200),
// create_date_time  TIMESTAMP NOT NULL DEFAULT CURRENT_DATE

export const appUser = {
    id: 1,
    appUserFirstName: ``,
    appUserLastName: ``,
    appUserEmail: ``,
    appUserProfilePicLink: ``,
    createDateTime: ``,
};
