const express = require('express');
const bodyParser=require('body-parser');
// exports a valid middleware fn for parsing graphql queries
const graphqlHttp=require('express-graphql');
// getting data using object destructuring
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json()); // to parse incoming json bodies

// all req are sent to /graphql
app.use('/graphql',
    graphqlHttp({
    // point to schema
    // pass props in schema
    // String! means type is string but can't be null
    schema: buildSchema(`
        type RootQuery{
            events: [String!]!
        }

        type RootMutation{
            createEvent(name: String): String
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
            return ['Romantic', 'Cooking', 'Swimming', 'Dancing'];
        },
        createEvent:(args)=>{
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql:true
}));

app.listen(3000,()=>{
    console.log('listening on port 3000');
});