# APPLICATION DATA

## USERS, plus Contacts

### People who do not have full accounts (invitee-only) - only there because someone had added them onto a contact list:

-   can be added to contact lists (of full users)
-   can have an email address saved (in that contact list) and a name (by which the user knows that contact)
-   can be invited to events (by any user who have them in a contact list)
-   can respond to event invites, either saying they are going, or not going.
-   can comment on events to which they are invited
-   can respond to polls on events to which they are invited

```
    app_user_id 6 = 'tom@tom.com', FALSE, NULL, NULL, NULL),
    app_user_id 7 = 'mary@mary.com', FALSE, NULL, NULL, NULL),
    app_user_id 8 = 'mike@mike.com', FALSE, NULL, NULL, NULL),
    app_user_id 9 = 'katie@katie.com', FALSE, NULL, NULL, NULL);`;
```

### People with full Accounts

-   can do everything the invitee-only people who can organise,
-   and can set up their own contact list and can add people (either existing users or new people) to their contact list.
-   in the contact list, can give their contacts a name, e.g. Auntie Mary
-   can create new events (i.e. event_organiser_user_id)
-   can set up polls for an event, and given them options
-   (as well as comment and reply to polls)

```
    app_user_id 1 = 'belinda@belinda.com', TRUE, 'Belinda','Duffy', '1.png'),
    app_user_id 2 = 'maria@maria.com', TRUE, 'Maria','Rushmore', '2.png'),
    app_user_id 3 = 'akiko@akiko.com', TRUE, 'Akiko','Jones', '3.png'),
    app_user_id 4 = 'dave@dave.com', TRUE, 'Dave','Milton', '4.png'),
    app_user_id 5 = 'luke@luke.com', TRUE, 'Luke','Stansell', '5.png'),
```

### Contacts (mapping users to other users)

(remember - only FULL users can hold contact lists)

```
    Belinda (1) has contacts of:
        Maria from school (2);
        Akiko (3);
        Uncle Dave (4);
        Luke S (5);
        Tommy (6);
        Magic Mary (7)

    Maria (2) has contacts of: Bel (1);
    Akiko (3) has contacts of: Belinda (1); BFF Katie (9);
    Dave (4) has contacts of: Belinda (1);  Brother Mike (8); Katie (9);
    Luke (5) has contacts of: Belinda (1), Akiko (3), Mary Murphy (7)
```

---

## EVENTS, plus Invitees, Comments

### event_id 1 = Mary 31st Birthday Dinner

```
    'Mary 31st Birthday Dinner', 'Let us arrange dinner at Marcos restaurant for Marys birthday. I will set up a poll for dates', 'Marcos Restaurant', NULL, '8pm', 'No gifts - just bring yourselves', 'Dinner'),
```

Organised by: Belinda(1)

-   Invited: Belinda(1) (by herself, as the organiser)
-   Invited: Maria from school (2) (by Belinda (1))
-   Invited: Akiko (3) (by Belinda (1))
-   Invited: Uncle Dave (4) (by Belinda (1))
-   Invited: Magic Mary (7) (by Belinda (1))

Comments:

-   Event 1, Magic Mary 7, 'I cannot find parking - where are you all?', '2022-12-01'),
-   Event 1, Akiko 3, 'We parked on Coders Lane', '2022-12-01'),

Polls:

-   Event 1, Belinda 1, 'Available Dates?', 'Hey guys which dates are you available?', 'Birthday party', FALSE, 'OPEN'

Poll Options:

-   TBC

---

### event_id 2 = Spa Day with the girls

```
    'Spa Day', 'Hey girls! We have talked about spa day loads. Lets just do it', 'Hoar Cross Hotel Spa', '2022-04-25', NULL, 'No gifts - just bring yourselves', 'Dinner'),
    invited (and commenting) are 2(maria) 1 (belinda) plus
```

Organised by: Belinda(1)

-   Invited: Belinda(1) (by herself, as the organiser)
-   Invited: Akiko (3) (by Belinda (1))
-   Invited: Magic Mary (7) (by Belinda (1))
-   Invited: BFF Katie (9) (by Akiko (3))

Comments:

-   Event 2, Magic Mary (7), 'I am super excited to see everyone next week!', '2022-11-30'),
-   Event 2, Belinda (1), 'Me too! What are you planning on wearing?', '2022-11-29'),

Polls:

-   Event 2, Belinda (1), 'Favourite Day?', 'Girls please pick your fav day!', 'SPA & champagne', FALSE, 'OPEN'

Poll Options:

-   TBC

### event_id 3 = Sea Kayaking

```
    event_id 3 = sea kayaking', 'Let us book in the next sea kayaking evening', 'Shadwell Basin', '2022-05-16', '6pm', 'kayakys provided. Bring wetsuits', 'Exercise'),

    invited (and commenting)are 5 (luke) and 1(belinda) plus
```

Organised by: Belinda(1)

-   Invited: Belinda(1) (by herself, as the organiser)
-   Invited: Luke (5) (by Belinda(1))
-   Invited: Mary Murphy/ Magic Mary (7) (by Luke (5))

Comments:

-   Event 3, Luke (5), 'Hey, I am lost where is everyone?', '2022-12-01'), -
-   Event 3, Mary Murphy/ Magic Mary (7), 'We are down at the docks unloading the kayaks', '2022-12-01'),

Polls:

-   Event 3, Luke (5), 'Book table Y/N?', 'Hey team would you like me to book a table for some drinks afterwards?', 'Cheeky drink', FALSE, 'OPEN'

Poll Options:

-   Yes
-   No

---

### event_id 4 = Birthday Party for Mum

```
    event_id 4 = 'birthday party for Mum', 'Let us book in a date for gathering at mums house for her birthday', 'Mums House', '2022-06-15', '6pm', 'Bring food', 'Family Gathering');`;
    invited (and commenting)are 2 (maria) 1(belinda) 3(akiko), plus \

```

Organised by: Dave / Uncle Dave (4)

-   Invited: Dave / Uncle Dave (4) (by himself, as the organiser)
-   Invited: Belinda (1) (by Dave (4))
-   Invited: Brother Mike (8) (by Dave (4))
-   Invited: Katie (9) (by Dave (4))

Comments:

-   Event 4, Dave / Uncle Dave (4), 'Will be great to catch up with all the fam next week!', '2022-11-30'),
-   Event 4, Belinda (1), 'Me too! Will be lovely to see mum again', '2022-11-30'),
-   Event 4, Brother Mike (8), 'Who is bringing the cake?', '2022-11-30')

Polls:

-   Event 4, Dave 4, 'Lets pick a location', 'Where would people like best of these options?', 'Location', FALSE, 'OPEN'

Poll Options:

-   TBC
