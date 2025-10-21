Grocery List REST API

Step-by-Step Setup Guide

1. Clone the Repository

git clone [<your-repository-url>](https://github.com/MatiasGonzalez97/challenge-grocery)

2. Install Dependencies

npm install

3. Configure Environment Variables

Copy the content from .env.example to a new file called .env

4. Set Up the Database with Docker Compose

docker-compose up -d

5. Run Database Migrations

npx prisma migrate dev

6. Start the Server

node src/index.js

| Method | Endpoint    | Description                       | Body                      |
| :----- | :---------- | :---------------------------------- | :------------------------ |
| `POST` | `/register` | Creates a new user account.       | `{ "email", "password" }` |
| `POST` | `/login`    | Logs in a user and returns a JWT. | `{ "email", "password" }` |

| Method   | Endpoint     | Description                               | Body                                   |
| :------- | :----------- | :---------------------------------------- | :------------------------------------- |
| `POST`   | `/items`     | Adds a new grocery item.                  | `{ "name", "quantity"?, "store"? }`   |
| `GET`    | `/items`     | Lists all items for the logged-in user.   | (None)                                 |
| `PUT`    | `/items/:id` | Updates an existing grocery item.         | `{ "name", "quantity"?, "store"? }`   |
| `DELETE` | `/items/:id` | Deletes a grocery item.                   | (None)                                 |