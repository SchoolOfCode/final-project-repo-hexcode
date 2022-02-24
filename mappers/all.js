// For each object type we return via the API to the front end, put in a mapping here, to map database column names (in snakecase) to the front end variable names (in camelcase)
export const DB_TO_API_DIRECTION = "DB_TO_API_DIRECTION";
export const API_TO_DB_DIRECTION = "API_TO_DB_DIRECTION";

// ***************************************************
//                   APP_USER
// ***************************************************
export function mapAppUser(whichDirection, entity) {
    // TODO: add error handling in case some of the values  are not defined on the incoming object, dbEntity?
    if (whichDirection === DB_TO_API_DIRECTION) {
        return {
            appUserId: entity.app_user_id,
            appUserFirstName: entity.app_user_first_name,
            appUserLastName: entity.app_user_last_name,
            appUserEmail: entity.app_user_email,
            appUserProfilePicLink: entity.app_user_profile_pic_link,
            appUserCreateDateTime: entity.app_user_create_date_time,
        };
    }
    if (whichDirection === API_TO_DB_DIRECTION) {
        return {
            app_user_id: entity.appUserId,
            app_user_first_name: entity.appUserFirstName,
            app_user_last_name: entity.appUserLastName,
            app_user_email: entity.appUserEmail,
            app_user_profile_pic_link: entity.appUserProfilePicLink,
            app_user_create_date_time: entity.appUserCreateDateTime,
        };
    }

    //error case - unknown value for whichDirection
    console.log(
        `DEBUG: mappers/all.js - mapAppUser: invalid mapping direction, ${whichDirection}`
    );
    return {};
}

// ***************************************************
//                   EVENT
// ***************************************************
export function mapEvent(whichDirection, entity) {
    // TODO: add error handling in case some of the values are not defined on the incoming object, dbEntity?

    // for a get request:
    // transform database column names into front end app names:
    if (whichDirection === DB_TO_API_DIRECTION) {
        return {
            id: entity.event_id,
            organiserId: entity.organiser_id,
            eventTitle: entity.event_title,
            eventDescription: entity.event_description,
            eventLocation: entity.event_location,
            eventDate: entity.event_date,
            eventTime: entity.event_time,
            eventRequirements: entity.event_requirements,
            eventCategory: entity.event_category,
            eventCreateDateTime: entity.event_create_date_time,
        };
    }

    // for a post, put or patch request
    // transform front end app names into database column names
    if (whichDirection === API_TO_DB_DIRECTION) {
        return {
            event_id: entity.id, //TODO: Don't need this for a post - should i make a post special?
            organiser_id: entity.organiserId,
            event_title: entity.eventTitle,
            event_description: entity.eventDescription,
            event_location: entity.eventLocation,
            event_date: entity.eventDate,
            event_time: entity.eventTime,
            event_requirements: entity.eventRequirements,
            event_category: entity.eventCategory,
            event_create_date_time: entity.eventCreateDateTime, //TODO: Don't need this for a post - should i make a post special?
        };
    }

    //error case - unknown value for whichDirection
    console.log(
        `DEBUG: mappers/all.js - mapEvent: invalid mapping direction, ${whichDirection}`
    );
    return {};
}

// ***************************************************
//                   EVENT + (PARENT) ORGANISER
// ***************************************************
export function mapEventJoinOrganiserUser(whichDirection, entity) {
    // TODO: add error handling in case some of the values  are not defined on the incoming object, dbEntity?
    if (whichDirection === DB_TO_API_DIRECTION) {
        return {
            eventId: entity.event_id,
            eventTitle: entity.event_title,
            eventDescription: entity.event_description,
            eventLocation: entity.event_location,
            eventDate: entity.event_date,
            eventTime: entity.event_time,
            eventRequirements: entity.event_requirements,
            eventCategory: entity.event_category,
            eventCreateDateTime: entity.event_create_date_time,
            organiserId: entity.app_user_id,
            organiserFirstName: entity.app_user_first_name,
            organiserLastName: entity.app_user_last_name,
            organiserEmail: entity.app_user_email,
            organiserProfilePicLink: entity.app_user_profile_pic_link,
            organiserCreateDateTime: entity.app_user_create_date_time,
        };
    }

    if (whichDirection === API_TO_DB_DIRECTION) {
        return {
            event_id: entity.eventId,
            event_title: entity.eventTitle,
            event_description: entity.eventDescription,
            event_location: entity.eventLocation,
            event_date: entity.eventDate,
            event_time: entity.eventTime,
            event_requirements: entity.eventRequirements,
            event_category: entity.eventCategory,
            event_create_date_time: entity.eventCreateDateTime,
            app_user_id: entity.organiserId,
            app_user_first_name: entity.organiserFirstName,
            app_user_last_name: entity.organiserLastName,
            app_user_email: entity.organiserEmail,
            app_user_profile_pic_link: entity.organiserProfilePicLink,
            app_user_create_date_time: entity.organiserCreateDateTime,
        };
    }
    //error case - unknown value for whichDirection
    console.log(
        `DEBUG: mappers/all.js - mapEventJoinOrganiserUser: invalid mapping direction, ${whichDirection}`
    );
    return {};
}

// EXAMPLE FROM JASIEN:

// export function mapDbEntityToEntity(dbEntity) {
//     return {
//       firstName: dbEntity.first_name,
//       lastName: dbEntity.last_name,
//     };
//   }

//   const dbEntity = {
//     first_name: 'John',
//     last_name: 'Smith',
//   };

//   const entity = mapDbEntityToEntity(dbEntity);
