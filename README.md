# MongoDB+Express.js+React.js+Node.js+GraphQL

### Rest API

- Stateless ,client independent API for data exchange.
- We always send all data back to the client from an endpoint.
- If we want some less data we'll need to create a new endpoint in backend or we'll send parameters for the data we need.
- GET/POST/PUT/... requests.
- Routes & Controllers.

### GraphQL API

- Stateless ,client independent API for data exchange with higher query flexibility.
- No problem here regarding queries (very flexible).
- Only POST requests for every type of request to one single endpoint.
- Operation definitions and Resolvers.
- graphQL is a typed language.
- Eg. Query Language

```
{
    query { //operation : type
        user{ //operation : endpoint
            name //requested fields
            age
        }
    }
}
```

### Operation types in GraphQL

- Query -- "for GET"
- Mutation -- "for POST/PUT/PATCH/DELETE"
- Subscription -- "setup realtime connection with sockets"

### Design

- Event booking API

1. Event - Create, Update, Delete, View(Read)
2. Users - Connected to events
   || Filters -- CreatedBy, Booked
   || BooksEvents, Cancel Booking

### Packages

- npm install --save express body-parser
<!-- autostart -->
- npm install --save-dev nodemon
<!-- graph for express -->
- npm install --save express-graphql graphql
- npm install --save mongoose
<!--for hashing password  -->
- npm install --save bcryptjs

### Run

- prod -- node app.js
- dev -- npm start(uses nodemon)

### To kill all node ports

- killall node

### Error Fixes

- if graphiql not working try on "http" instead of "https"
