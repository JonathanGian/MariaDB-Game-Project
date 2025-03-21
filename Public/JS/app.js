const apiUrl = "http://localhost:4000/api/games";

// Fetch all games
async function fetchGames() {
    const response = await fetch(apiUrl);
    const games = await response.json();
    const gameList = document.getElementById("gameList");
    gameList.innerHTML = "";
    
    games.forEach(game => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${game.name} (${game.genre}, ${game.year}) - ${game.rating} 
            <button onclick="deleteGame(${game.number})">Delete</button>`;
        gameList.appendChild(listItem);
    });
}

// Get a game by number
async function getGame() {
    const number = document.getElementById("gameSearchNumber").value;
    if (!number) return alert("Enter a game number!");
    
    const response = await fetch(`${apiUrl}/${number}`);
    const game = await response.json();
    
    const resultDiv = document.getElementById("singleGameResult");
    resultDiv.innerHTML = game.error ? "Game not found" : `${game.name} - ${game.genre} (${game.year}) [${game.rating}]`;
}

// Add a new game
document.getElementById("gameForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const newGame = {
        number: document.getElementById("gameNumber").value,
        name: document.getElementById("gameName").value,
        genre: document.getElementById("gameGenre").value,
        year: document.getElementById("gameYear").value,
        rating: document.getElementById("gameRating").value
    };
    
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame)
    });

    if (response.ok) {
        alert("Game added!");
        fetchGames();
    } else {
        alert("Error adding game.");
    }
});

// Delete a game
async function deleteGame(number) {
    if (!confirm("Are you sure you want to delete this game?")) return;
    
    const response = await fetch(`${apiUrl}/${number}`, { method: "DELETE" });
    
    if (response.ok) {
        alert("Game deleted!");
        fetchGames();
    } else {
        alert("Error deleting game.");
    }
}