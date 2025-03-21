"use strict";

const express = require("express");
const cors = require("cors");
const { pool, closePool } = require("./database.js");
const gameData = require("./gameData.js");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Game API!" });
});

// GET 
app.get("/api/games", async (req, res) => {
    try {
        const games = await gameData.getAllGames();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch games." });
    }
});

app.get("/api/games/:number", async (req, res) => {
    try {
        const game = await gameData.getGameByNumber(req.params.number);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ error: "Game not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch game." });

    }
});

// POST

app.post("/api/games", async (req, res) => {
    try {
        const newGame = req.body;
        await gameData.insertGame(newGame);
        res.status(201).json({ message: "Game added successfully" });
    } catch (error) {
        console.error("Error in POST /api/games:", error.message);
        
        if (error.message.includes("already exists")) {
            return res.status(400).json({ error: error.message });
        }
        
        res.status(500).json({ error: "Error inserting game" });
    }
});

// PUT
app.put("/api/games", async (req, res) => {
    try {
        const updatedGame = req.body;
        const existingGame = await gameData.getGameByNumber(updatedGame.number);

        if (existingGame) {
            // If the game exists, update it
            await gameData.updateGame(updatedGame);
            res.json({ message: "Game updated successfully" });
        } else {
            // If the game does not exist, insert it
            await gameData.insertGame(updatedGame);
            res.status(201).json({ message: "Game created successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating or inserting game" });
    }
});

// DELETE

app.delete("/api/games/:number", async (req, res) => {
    try {
        await gameData.deleteGame(req.params.number);
        res.status(200).json({ message: "Game deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete game." });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
