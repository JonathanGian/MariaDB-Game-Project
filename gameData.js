"use strict";

const {pool,closePool} = require("./database.js");

module.exports = {
    /**
     * Get all games from the database
     * @returns {Promise<Array>} - A promise that resolves to an array of game objects
     */
    async getAllGames() {
     
        try {
            const conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM game");
            conn.release();
            return rows;
        } catch (error) {
            console.error("Error fetching games:", error);
            throw error;
        } finally {
            if(conn) conn.release();
           
        }
    },

    /**
     * Get a single game by its primary key(number)
     * @param {number} number - Game's unique identifier
     * @returns {Promise<Object>} - A promise that resolves to a game object
     */
    async getGameByNumber(number) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM game WHERE number = ?", [number]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching game:", error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    },

    /**
     * Insert a new game into the database
     * @param {Object} game - The game object to insert
     * @returns {Promise<void>} 
     */
    async insertGame(game) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(
                "INSERT INTO game (number, name, genre, year, rating) VALUES (?, ?, ?, ?, ?)",
                [game.number, game.name, game.genre, game.year, game.rating]
            );
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {  
                throw new Error(`A game with number ${game.number} already exists.`);
            }
            console.error("Error inserting game:", error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    },

    /**
     * Update an existing game in the database
     * @param {Object} game - The game object to update
     * @returns {Promise<void>} 
     */
    async updateGame(game) {
        let conn;
        try {
            let conn = await pool.getConnection();
            const result = await conn.query(
                "UPDATE game SET name=?,genre=?,year=?,rating=? WHERE number=?",
                [game.name, game.genre, game.year, game.rating, game.number]
            );
            if(result.affectedRows === 0) {
                throw new Error(`Game with number ${game.number} not found`);
            }
        } catch (error) {
            console.error(`Error updating game ${game.number}`, error);
            throw error;
        }finally{
            if (conn) conn.release();
        }
    },

    /**
     * Delete a game from the database by it primary key(number)
     * @param {number} number - Game's unique identifier
     * @returns {Promise<void>} 
     */
    async deleteGame(number) {
        let conn;
        try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM game WHERE number = ?", [number]);
        if(result.affectedRows === 0) {
            throw new Error(`Game with number ${number} not found`);
        }    
        } catch (error) {
            console.error(`Error deleting game ${number}`, error);
            throw error;
        }finally {
            if (conn) conn.release();
        }
    }
}