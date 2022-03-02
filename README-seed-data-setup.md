# APPLICATION DATA

//02Mar2022 13:58 - force change

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
    Belinda (1) has contacts of: Maria from school(2); Akiko (3); Uncle Dave (4); Luke S (5); Tommy (6); Magic Mary (7)

    Maria (2) has contacts of: Bel (1);
    Akiko (3) has contacts of: Belinda (1);
    Dave (4) has contacts of: Belinda (1);  Brother Mike (8); Katie (9);
    Luke (5) has contacts of: TBC
```

---

## EVENTS, plus Invitees, Comments

### event_id 1 = Mary 31st Birthday Dinner

```
    'Mary 31st Birthday Dinner', 'Let us arrange dinner at Marcos restaurant for Marys birthday. I will set up a poll for dates', 'Marcos Restaurant', NULL, '8pm', 'No gifts - just bring yourselves', 'Dinner'),
```

Organised by: Belinda(1) \
Invited: X (by Y) \
Invited: X (by Y)

Comments:

invited (and commenting) are 4 (dave) 3 (akiko) plus

---

### event_id 2 = Spa Day with the girls

```
    'Spa Day', 'Hey girls! We have talked about spa day loads. Lets just do it', 'Hoar Cross Hotel Spa', '2022-04-25', NULL, 'No gifts - just bring yourselves', 'Dinner'),
    invited (and commenting) are 2(maria) 1 (belinda) plus
```

Organised by: Belinda(1) \
Invited: X (by Y) \
Invited: X (by Y)

Comments:

---

### event_id 3 = Sea Kayaking

````
    event_id 3 = sea kayaking', 'Let us book in the next sea kayaking evening', 'Shadwell Basin', '2022-05-16', '6pm', 'kayakys provided. Bring wetsuits', 'Exercise'),
    invited (and commenting)are 5 (luke) and 1(belinda) plus
    ```
Organised by: Belinda(1) \
Invited: X (by Y) \
Invited: X (by Y)

Comments:

---

### event_id 4 = Birthday Party for Mum
````

    event_id 4 = 'birthday party for Mum', 'Let us book in a date for gathering at mums house for her birthday', 'Mums House', '2022-06-15', '6pm', 'Bring food', 'Family Gathering');`;
    invited (and commenting)are 2 (maria) 1(belinda) 3(akiko), plus

```
Organised by: Dave / Uncle Dave (4) \
Invited: X (by Y) \
Invited: X (by Y)
```
