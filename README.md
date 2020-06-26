# MongoDB+Express.js+React.js+Node.js+GraphQL

### Rest API
* Stateless ,client independent API for data exchange.
* We always send all data back to the client from an endpoint.
* If we want some less data we'll need to create a new endpoint in backend or we'll send parameters for the data we need.
* GET/POST/PUT/... requests.

### GraphQL API
* Stateless ,client independent API for data exchange with higher query flexibility.
* No problem here regarding queries (very flexible).
* Only POST requests for every type of request to one single endpoint.
* EG. 
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
* Query -- "for GET"
* Mutation -- "for POST/PUT/PATCH/DELETE"
* Subscription -- "Setup realtime connection with sockets"








