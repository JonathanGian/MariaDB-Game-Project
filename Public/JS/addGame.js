document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addGameForm").addEventListener("submit", addGame);
});

async function addGame(event) {
    event.preventDefault();

    const game = {
        number: document.getElementById("gameNumber").value,
        name: document.getElementById("gameName").value,
        genre: document.getElementById("gameGenre").value,
        year: document.getElementById("gameYear").value,
        rating: document.getElementById("gameRating").value
    };

    try {
        const response = await fetch("http://localhost:4000/api/games", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(game)
        });

        const resultMessage = document.getElementById("resultMessage");

        if (response.ok) {
            resultMessage.textContent = "Game added successfully!";
            resultMessage.style.color = "green";
            document.getElementById("addGameForm").reset();
        } else {
            const errorData = await response.json();
            resultMessage.textContent = errorData.error || "Error adding game.";
            resultMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error adding game:", error);
        document.getElementById("resultMessage").textContent = "Failed to connect to the server.";
        document.getElementById("resultMessage").style.color = "red";
    }
}