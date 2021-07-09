// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
// const bodyParser = require('body-parser') //deprecated

//Here we are configuring express to use body-parser as middle-ware.

//requiring body-parser is deprecated and it is built in in express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server to 8080
const portNumber = 8080;

//listening to port 8080
const server = app.listen(portNumber, () => {
    console.log(`The server runs on: ${portNumber}`);
});

// Post data provided from the api and website
app.post('/updateData', (request)=> {
    userTyping = {
        date: request.body.date,
        temperature: request.body.temperature,
        howUserFeel: request.body.howUserFeel
    }
    projectData = userTyping;
});

// Initialize routes route with a callback function + Callback function to complete GET '/routes'
app.get('/routes', (request, response)=> {
    response.send(projectData);
});
