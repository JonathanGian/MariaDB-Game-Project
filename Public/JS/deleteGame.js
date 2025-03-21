document.addEventListener("DOMContentLoaded", init());

function init() {
    let resultArea = document.getElementById("resultArea");
    document.getElementById("deleteButton").addEventListener("click", deleteGame);
}

async function deleteGame(e) {
    e.preventDefault();
    const numberInput = document.getElementById("deleteGameNumber");
    const number = numberInput.value;
    if (!number) return  resultArea.innerHTML = "Enter a game number!";

    try {
        const response = await fetch(`http://localhost:4000/api/games/${number}`, { method: "DELETE" });

        if (response.ok) {

          resultArea.innerHTML = "Game deleted successfully!";
          resultArea.style.color = "green";
        } else {
            resultArea.innerHTML = "Error deleting game.";
            resultArea.style.color = "red";
        }
    } catch (error) {
        console.error("Error deleting game:", error);
    }
}