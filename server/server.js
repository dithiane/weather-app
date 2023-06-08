// Load environment variables from .env file
require('dotenv').config()
// Retrieve the SERVER_PORT variable from environment variables
const { SERVER_PORT } = process.env
// Import required dependencies
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
// Create an instance of the Express application
const app = express();
// Enable CORS for all routes
app.use(cors());
// Parse request bodies as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the public folder
app.use(express.static('public'));
// Import the controllers module
const controller = require('./controllers');
// Extract the getAll and addToJournal methods from the controllers module
const { getAll, addToJournal } = controller;
// Define the route to get all weather data
app.get(`/api/all`, getAll)
// Define the route to add weather data to the journal
app.post(`/api/weather/add`, addToJournal)
// Start the server and listen on the specified port
app.listen(SERVER_PORT, () => console.log("Server running on 4000"));