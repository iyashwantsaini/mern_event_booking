const express = require('express');
const bodyParser=require('body-parser');

const app = express();

app.use(bodyParser.json()); // to parse incoming json bodies

app.listen(3000);