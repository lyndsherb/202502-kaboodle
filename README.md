# Kaboodle 2025 Tech Test

Implementation of my tech test for a role at Kaboodle.

## Prerequisites

- Docker
- Make (optional; you can run the commands by copying them from the Makefile)

## But First, A Caveat

Despite my best efforts, I had a right fight with CORS between the two Docker containers - whilst you can easily `GET` the information, nothing I tried was letting me `POST` anything.

If you want to at least see for yourself, feel free to un-comment the `events` section in `docker-compose.yml` (and make sure you remove the `npm run dev` in the Makefile!).

## Project setup

| Task           | Description                                   |
| -------------- | --------------------------------------------- |
| `make up`      | Boot project up and run it in the background. |
| `make down`    | Stop project and remove containers.           |
| `make rebuild` | Re-build and restart project.                 |
| `make remove`  | Remove volumes and images from your machine.  |

## Output URLs

API: `http://localhost:3001`
Events FE: `http://localhost:3000`

## API endpoints

```
GET '/events' - Get a full list of events
POST '/events' - Create an event
GET '/events/:id' - Get event by ID
PUT '/events/:id' - Update event by ID
DELETE '/events/:id' - Delete event by ID
```

## API flow

![A flow chart showing how the API is expected to flow](assets/api_flow.jpg)

- Events - include event Name, Date and Description. User input. ID automagically generated.
- Tickets - include ticket Name, Type, Price and Booking Fee. ID automagically generated.
- EventTickets - include event ID, ticket ID and ticket Quantity. Event and ticket IDs refer to their specific tables.

## Design decisions

### Setup

Wanted to keep this relatively simple. Had originally attempted setup with [Nx](https://nx.dev/) for that true monorepo experience but it was more opinionated than I'd liked, so I removed it. (Something to look into for a later date)!

In the very early stages I reviewed using AWS as well, especially for the database, but due to time constraints this was eventually scrapped. Something for me to try for a personal project for sure.

### API

Uses ExpressJS with JSON files as a 'database'. I'd use mySQL for this in the future, for sure. As above, I wanted to keep this simple, so set this up myself rather than boilerplate for a better view of my actual work.

Most API endpoints were pretty straightforward; only the Update endpoint wound up causing me problems, but I was trying to update three files at once in one function. It would be much better to separate `events`, `tickets` and `eventstickets` (as per my files/structure) into their own endpoints. As it stands, core event data can be updated with the `put` endpoint, but nothing else can be.

### Frontend

Uses NextJS with [Informed](https://teslamotors.github.io/informed/). Informed was an easy choice to make due to the ease of being able to add array fields, so a user could add multiple tickets to their event. It does cause some issues with server-side rendering which was an unexpected side effect - good to know for next time though!

### Improvements to make

- Testing and and TDD would be the first major improvement to make - this will really help get some of the missing functionality out of the door.
- Set up some sort of actual database, such as MySQL, instead of the JSON files. The files are fine for testing but a database will be superior - this would make pagination etc. a lot easier.
- As mentioned above, add more endpoints to add/update/delete tickets and eventtickets specifically.
- Allow users to update tickets from the ticket page. Probably re-use the form and populate with the Informed API.
- Investigate the hydration error on the form page.
