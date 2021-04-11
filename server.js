// Declare dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Express middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Express middleware for static pages
app.use(express.static(path.join(__dirname, "public")));

// Routes
// Index page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

// Notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// Get the DB JSON file
app.get("/api/notes", (req, res) => res.json(db));

// Post requests for adding to the DB
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    console.log(`Writing note: "${newNote.title}" with content: "${newNote.text}" and id: ${newNote.id}to db...`);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if (err) throw err;
        console.log("Saved notes updated!");
    })
    res.json(newNote);
});

// Delete requests for the db
app.delete("/api/notes/:id", (req, res) => {
    // For of loop to iterate through the db array, which then checks the array's .id property checks it against the req.params.id property (which appears to come from the )
    for (index of db){
        if (index.id == req.params.id){
            const removedIndex = db.indexOf(index);
            db.splice(removedIndex, 1);
            fs.writeFile("./db/db.json", JSON.stringify(db), err => {
                if (err) throw err;
            })
            console.log("Note deleted and saved notes updated!");
        }
    }
    res.json();
})

// Starts server listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));