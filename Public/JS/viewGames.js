document.addEventListener("DOMContentLoaded", fetchGames);

async function fetchGames() {
    try {
        const response = await fetch("http://localhost:4000/api/games");
        const games = await response.json();
        const tableBody = document.querySelector("#gameTable tbody");
        tableBody.innerHTML = "";

        if (games.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6' class='no-games'>No games found.</td></tr>";
            return;
        }

        games.forEach(game => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${game.number}</td>
                <td>${game.name}</td>
                <td>${game.genre}</td>
                <td>${game.year}</td>
                <td>${game.rating}</td>
                <td><button class="delete-btn" onclick="deleteGame(${game.number})">Delete</button></td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

async function deleteGame(number) {
    if (!confirm("Are you sure you want to delete this game?")) return;

    try {
        const response = await fetch(`http://localhost:4000/api/games/${number}`, { method: "DELETE" });

        if (response.ok) {
            fetchGames();  // Refresh table after deletion
        } else {
            alert("Error deleting game.");
        }
    } catch (error) {
        console.error("Error deleting game:", error);
    }
}