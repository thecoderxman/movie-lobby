## README for Movie Lobby API Project

This document outlines the Movie Lobby API, a Node.js application designed to manage movies for OTT application lobbies. It offers functionalities to list, search, add, update, and delete movies.

### Technologies Used

* Programming Language: Node.js
* Type System: TypeScript
* Database: MongoDB
* Web Framework : Nest.js

### Getting Started

**Prerequisites:**

* Node.js ([URLnodejs org])
* NPM (included with Node.js installation)
* MongoDB ([https://www.mongodb.com/](https://www.mongodb.com/))

**Installation:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/movie-lobby-api.git
   ```

2. **Navigate to Project Directory:**

   ```bash
   cd movie-lobby-api
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

**Configuration:**

1. Create a file named `.env` in the project root directory.
2. Add the following environment variables to the `.env` file, replacing placeholders with your details:

   ```
    DB_URI = mongodb+srv://abhishekm:mydbpass@cluster0.f3b3opl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=secret
    JWT_EXPIRE=3d
   ```

   * `MONGODB_URI`: The connection string for your MongoDB database.
   * `JWT_SECRET`: A secret key used for authentication (replace with a strong secret).

**Running the API:**

```bash
npm run start
```

This will start the API server, accessible at http://localhost:3000 in your web browser.

## Authentication

### Sign Up

Create a new user account.

#### Request

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "secure_password",
    "role": "user/admin"
  }

Login user account.

#### Request

- **URL:** `/auth/lgin`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "secure_password",
  }  

Response will be jwt

Need to pass this jwt token with key "Authorization" and value as "Bearer generated_jwt_token" in headers

### API Endpoints

** verbo  Path          Description**
-------  ------------  -----------------------------------------
 GET      /movies       Lists all movies in the lobby.
 GET      /search?q={query}  Searches for movies by title or genre (query parameter).
 POST     /movies        Adds a new movie to the lobby (requires "admin" role).
 PUT      /movies/:id   Updates an existing movie's information (requires "admin" role).
 DELETE   /movies/:id   Deletes a movie from the lobby (requires "admin" role).
 

### Testing

Run the automated tests using the following command:

```bash
npm test
```

This will execute the test suite to ensure the API's functionality.