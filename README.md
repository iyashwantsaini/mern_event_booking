<h1 align="center">
  <br>
  <a href=""><img src="https://raw.githubusercontent.com/iyashwantsaini/mern_graphql_master/master/merng.jpg" alt="logo" width="400"></a>
  <br>
    MongoDB+Express+React+Node+GraphQL
  <br>
</h1>

<h4 align="center">A complete Event Booking Application using MERNG</h4>

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
<!-- to generate web token for login -->
- npm install --save jsonwebtoken

### Run

- prod -- node app.js
- dev -- npm start(uses nodemon)

### To kill all node ports

- killall node

### Error Fixes

- if graphiql not working try on "http" instead of "https"

### Remember 
 
- Dates are passed via "new Date().toISOString()"

### CORS

 - remember to set CORS policy to server

## License

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

By [Yashwant](https://github.com/iyashwantsaini)

## Contributors

<img src="https://avatars3.githubusercontent.com/u/21121279?s=460&u=f0450278b2b569c4443ab8ee03f9dff7015da5bf&v=4" width="100px;" alt="toofff"/><br />

<a href="https://meyash.xyz/" style="margin-right:30px;"><img src="https://meyash.xyz/assets/icons/siteicon.png" width="25"></a>
<a href="https://meyash.xyz/resume.pdf" style="margin-right:30px;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/libreoffice.svg" width="25"></a> 
<a href="https://www.linkedin.com/in/iyashwantsaini/" style="margin-right:30px;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" width="25"></a>
<a href="https://twitter.com/iyashwantsaini" style="margin-right:30px;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg" width="25"></a>
<a href="https://www.instagram.com/iyashwantsaini/" style="margin-right:30px;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/instagram.svg" width="25"></a>
