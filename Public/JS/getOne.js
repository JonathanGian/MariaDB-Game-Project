async function getGame() {
    const number = document.getElementById("gameSearchNumber").value;
    if (!number) {
        alert("Please enter a game number!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/games/${number}`);
        const game = await response.json();

        const resultDiv = document.getElementById("gameResult");
        resultDiv.innerHTML = "";

        if (game.error) {
            resultDiv.textContent = "Game not found.";
            resultDiv.style.color = "red";
        } else {
            resultDiv.style.color = "black";
            resultDiv.innerHTML = `
                <h2>Game Details</h2>
                <p><strong>ID:</strong> ${game.number}</p>
                <p><strong>Name:</strong> ${game.name}</p>
                <p><strong>Genre:</strong> ${game.genre}</p>
                <p><strong>Year:</strong> ${game.year}</p>
                <p><strong>Rating:</strong> ${game.rating}</p>
            `;
        }
    } catch (error) {
        console.error("Error fetching game:", error);
        document.getElementById("gameResult").textContent = "Error retrieving game.";
    }
}