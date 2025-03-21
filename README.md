## Jonathan Gian Game Project

A simple game database web application build using __Node.js__, __Express__, __MariaDB__, and a __Single-Page Application (SPA)__.

### 📌 Features

- View all games in structured table format
- Search for a specific game by its ID
- Add new games with a user-friendly form
- Delete games from the the interface
- RESTful API for backend operations

#

### 🛠️ Installation & Setup

1. Install dependencies

```sh
npm install
```

2. Run the SQL create statement

```sh
npm run create
```

3. Start the application

```sh
npm start
```

This will start both the __REST API (port 4000)__ and __SPA server (port 3000)__.

#

### Usage

- Open http://localhost:3000 to access the game database.
- Use the navigation buttons to add, view, or search for games.
- The REST API runs on http://localhost:4000/api/games.

<!-- Remove this comment when pasting -->

### __🖥️ API Endpoints__

| Method    | Endpoint              | Description                                     |
|-----------|-----------------------|-------------------------------------------------|
| **GET**   | `/api/games`          | Retrieve all games                              |
| **GET**   | `/api/games/:number`  | Retrieve a single game by its number            |
| **POST**  | `/api/games`          | Add a new game                                  |
| **PUT**   | `/api/games`          | Update an existing game (creates if not found)  |
| **DELETE**| `/api/games/:number`| Delete a game by its number                       |

#

## 👨‍💻 Author

__Jonathan Gian__
