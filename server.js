// Declare dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Express middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Express middleware for static pages
app.use(express.static("public"));

// Routes
// Index page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// Notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Get the DB JSON file
app.get("/api/notes", (req, res) => res.json(db));

// Post requests for adding to the DB
app.post("/api/notes", (req, res) => {

})

// Starts server listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));