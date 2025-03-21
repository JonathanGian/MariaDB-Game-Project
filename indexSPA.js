"use strict";

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/Pages/index.html")));
app.get("/addGame", (req, res) => res.sendFile(path.join(__dirname, "public/Pages/addGame.html")));
app.get("/viewGames", (req, res) => res.sendFile(path.join(__dirname, "public/Pages/viewGames.html")));
app.get("/deleteGame", (req, res) => res.sendFile(path.join(__dirname, "public/Pages/deleteGame.html")));
app.get("/viewGames", (req, res) => res.sendFile(path.join(__dirname, "public/Pages/viewGames.html")));
app.get("/getOne", (req, res) => res.sendFile(path.join(__dirname, "public/Pages/getOne.html")));

// Start the SPA server
app.listen(PORT, () => {
    console.log(`SPA is running on http://localhost:${PORT}`);
});