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
