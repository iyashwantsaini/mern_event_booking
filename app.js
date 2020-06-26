const express = require('express');
const bodyParser=require('body-parser');
// exports a valid middleware fn for parsing graphql queries
const graphqlHttp=require('express-graphql');
// getting data using object destructuring
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use(bodyParser.json()); // to parse incoming json bodies

// all req are sent to /graphql
app.use('/graphql',
    graphqlHttp({
    // point to schema
    // pass props in schema
    // String! means type is string but can't be null
    // every event must have an ID
    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }
    
        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
        }
        
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // root value key -- points to object having all resolvers
    rootValue: {
        // names of queries and resolvers are same
        events: () => {
            return events;
        },
        createEvent:(args)=>{
            const event={
                _id:Math.random().toString(),
                title:args.eventInput.title,
                description:args.eventInput.description,
                price:+args.eventInput.price,
                date:args.eventInput.date
            };
            events.push(event);
            return event;
        }
    },
    graphiql:true
}));

app.listen(3000,()=>{
    console.log('listening on port 3000');
});