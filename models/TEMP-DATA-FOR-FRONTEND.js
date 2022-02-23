//------------------------------
// Event Database Record will look like:
//------------------------------
// id SERIAL PRIMARY KEY,
// user_id INT,
// event_title VARCHAR(50),
// event_description VARCHAR(255) DEFAULT NULL,
// event_location VARCHAR(255) DEFAULT NULL,
// event_date DATE DEFAULT NULL,
// event_time VARCHAR(10) DEFAULT NULL,
// event_requirements VARCHAR(255) DEFAULT NULL,
// event_category VARCHAR(50) DEFAULT NULL,
// create_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_DATE

export const event = {
    id: 12,
    userId: 1,
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
