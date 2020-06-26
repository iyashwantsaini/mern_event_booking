const express = require('express');
const bodyParser=require('body-parser');
// exports a valid middleware fn for parsing graphql queries
const graphqlHttp=require('express-graphql');
// getting data using object destructuring
const { buildSchema } = require('graphql');
const mongoose= require('mongoose');
const bcrypt=require('bcryptjs');

// Models
const Event=require('./models/event');
const User=require('./models/user');


const app = express();

// const events = [];

app.use(bodyParser.json()); // to parse incoming json bodies

// all req are sent to /graphql
app.use('/graphql',
    graphqlHttp({
    
    // point to schema
    // pass props in schema
    // String! means type is string but can't be null
    // every event must have an ID
    // ! means not nullable

    // createEvent(...): Event == means when you call create event you must return an event
    //  password should be nullable in type as we don't want to send it to any user

    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        type User{
            _id:ID!
            email: String!
            password: String
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        input UserInput{
            email: String!
            password: String!
        }

        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput) : User
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
            return Event.find()
            .then(events=>{
                return events.map(
                    event=>{
                        // convert mongoDB _id to a string so that it can be viewed & understood by graphQL
                        // return {...event._doc,_id:event._doc._id.toString()};
                        // or
                        return {...event._doc,_id:event.id};
                    }
                );
            })
            .catch(err=>{
                throw err;
            })
        },
        createEvent: args =>{
            
            // simple static method
            // const event={
            //     _id:Math.random().toString(),
            //     title:args.eventInput.title,
            //     description:args.eventInput.description,
            //     price:+args.eventInput.price,
            //     date:args.eventInput.date
            // };
            // events.push(event);
            // return event;

            // using mongoDB to make event on ATLAS
            const event=new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            });
            // return here will show graphql to wait while Operation is completed
            return event
            .save()
            .then(result => {
                console.log(result);
                // spread operator._doc : gives all core props of our object
                // return { ...result._doc };
                // return {...result._doc,_id:result._doc._id.toString()};
                // or
                return {...result._doc,_id:result.id};
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
        },
        createUser: args => {
            return User.findOne({email:args.userInput.email})
            .then(user=>{
                if(user){
                    throw new Error('User with same email exists already!');
                }
                // if no valid user with same email is found
                return bcrypt.hash(args.userInput.password, 12);
            })
            // result of bcrypt.hash(..)
            .then(hashedPass=>{
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPass
                });
                // return promise like object
                return user.save();
            })
            // result of user.save()
            .then(result=>{
                // password:null so that hashed pass will not even show up 
                return {...result._doc,password:null,_id:result.id};
            })
            .catch(err=>{
                throw err;
            });
        }
    },
    graphiql: true
}));

// connect to mongo via mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mmohl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000,()=>{
        console.log('http://localhost:3000');
    });
})
.catch(err=>{
    console.log(err);
})

// merng ,merng
// test1@gmail.com,test1