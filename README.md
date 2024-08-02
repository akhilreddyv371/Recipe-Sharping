# Recipe Sharing API Backend Project
## Project Overview
The Recipe Sharing API Backend Project provides a robust backend solution for managing recipes and user authentication. Built using Node.js with Express, this project enables users to register, log in, view their profiles, and perform CRUD operations on recipes. The backend leverages several libraries for session management, data handling, and authentication.
## Features
User Management: Register, log in, and manage user profiles.

Recipe Management: Add, modify, delete, and view recipes.

Session Management: Maintain user sessions for secure access.

Authentication: Secure login and registration using Passport.js with local strategy and passport-local-mongoose.

## Technologies
Express.js: Web framework for Node.js.

Session: Manage user sessions.

BodyParser: Parse incoming request bodies.

Mongoose: MongoDB object modeling tool.

Passport: Authentication middleware.

Passport-Local: Local authentication strategy for Passport.

Passport-Local-Mongoose: Simplifies authentication with Passport and Mongoose.

### API Endpoints
User Module
POST /register: Register a new user.

Request Body: { "username": "<username>", "password": "<password>" }
Response: Success message.
POST /login: Log in an existing user.

Request Body: { "username": "<username>", "password": "<password>" }
Response: Success message and user profile.
GET /profile: Get user profile (authenticated required).

Response: User profile details.
Recipe Module
POST /recipes: Add a new recipe (authenticated required).

Request Body:
json
Copy code
{
    "title": "<recipe-title>",
    "description": "<recipe-description>",
    "ingredients": ["<ingredient1>", "<ingredient2>"],
    "instructions": "<recipe-instructions>",
    "images": ["<image-url1>", "<image-url2>"]
}
PUT /recipes/
: Update an existing recipe (authenticated required).

Request Body:
json
Copy code
{
    "title": "<recipe-title>",
    "description": "<recipe-description>",
    "ingredients": ["<ingredient1>", "<ingredient2>"],
    "instructions": "<recipe-instructions>",
    "images": ["<image-url1>", "<image-url2>"]
}
DELETE /recipes/
: Delete a recipe (authenticated required).

Response: Success message.
GET /recipes: Get all recipes.

Response: List of recipes.
