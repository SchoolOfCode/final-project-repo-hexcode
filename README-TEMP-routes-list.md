# IGNORE? I THINK THIS CAN BE REPLACED BY SUMMARY TABLE IN README.md PLUS THE 'MAP WIREFRAMES-ROUTES' DIAGRAM

# Routes for the Front End (MVP)

## Event

-   POST (INSERT) New Event - (USER_ID has to be passed in)- and returns new Event ID - needed by the Confirm Event Button in Frame 3 - Get Event for User

-   FETCH ALL Events for a given user (users/12/events) - UPDATE: ASSUME THIS NEEDS BOTH EVENTS THE PERSON HAS ORGANISED and ONES THEY ARE INVITED TO.

-   FETCH (SELECT) specific Event (based on EVENT_ID) - + organiser user info + invited contacts + any polls + discussions

-   PATCH (UPDATE) Event: - to update Event attributes for a specific EVENT_ID

---

## Event_invitee

will need

-   a POST (to add),
-   a PATCH (to update when they RSVP to say attending/not attending)),
-   a DELETE (if someone is dis-invited- NOT the same as saying they're not attending)
-   a GET ALL RSVPs for a specific parent EVENT_ID
-   a GET ALL RSVPs for a specific parent APP_USER_ID

---

## (Event) Comments

POST a new comment (for a specific parent EVENT_ID)
FETCH ALL comments for a given Event

(don't need, i think, to retrieve a single comment)

---

## (Event) Replies (NOT MVP)

POST a new REPLY (for a specific parent COMMENT_ID, and need to include the author's USER_ID)
FETCH ALL comments for a given EVENT_ID

---

## User

---

## (User) Contacts

FETCH - all contacats for the logged in user (for the Add Person function - question - would we show/mark those not invited? That would be front-end?

---

## (Event) Polls

PUSH new poll + options - associated with an event. - return the IDs of the Poll Options
FETCH poll

PUSH Poll VOTE
FETCH all votes (and calc retulsts per option)
