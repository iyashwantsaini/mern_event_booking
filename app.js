const express = require('express');
const bodyParser = require('body-parser');
// exports a valid middleware fn for parsing graphql queries
const graphqlHttp = require("express-graphql");
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

// const events = [];

app.use(bodyParser.json()); // to parse incoming json bodies

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
   // browser automatically send options req so allow it
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

// OUR GRAPHQL API
// all req are sent to /graphql
app.use(
  '/graphql',
  graphqlHttp({
    // point to schema
    schema: graphQLSchema,
    // root value key -- points to object having all resolvers
    rootValue: graphQLResolvers,
    // only for development -- GUI
    graphiql: true,
  })
);

// connect to mongo via mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mmohl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3001, () => {
      console.log("http://localhost:3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });