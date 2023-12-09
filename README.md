# Game API - Development Environment Setup

This repository contains a Node.js API for user registration, authentication, and basic game data using Express, MySQL for user data, MongoDB for game data, and RabbitMQ for event processing.

## Prerequisites

- Node.js and npm: https://nodejs.org/
- MySQL: https://www.mysql.com/
- MongoDB: https://www.mongodb.com/
- RabbitMQ: https://www.rabbitmq.com/

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/game-api.git
    ```

2. **Install Dependencies:**

    ```bash
    cd game-api
    npm install
    ```

3. **Database Setup:**

    - **MySQL:**
        - Create a new MySQL database and update the connection details in `config/mysql.js`.
        - Run the SQL script for creating the users table:

            ```bash
            mysql -u your-mysql-user -p your-database-name < database-scripts/create_users_table.sql
            ```

    - **MongoDB:**
        - Make sure MongoDB is installed and running.
        - No additional setup required as MongoDB will dynamically create collections.

4. **RabbitMQ Setup:**

    - Make sure RabbitMQ is installed and running.
    - No additional setup required as the code will dynamically create the necessary exchanges and queues.

5. **Configuration:**

    - Update the MongoDB connection details in `config/mongodb.js`.
    - Update the RabbitMQ connection details in `config/rabbitmq.js`.

6. **Run the Application:**

    ```bash
    npm start
    ```

    The API server will be running at `http://localhost:3000`.

## API Endpoints

- **User Registration:**
    - `POST /register`

- **User Authentication:**
    - `POST /login`

- **Game Data API:**
    - `POST /game/create`
    - `GET /game/get/:username`
    - `PUT /game/update/:username`
    - `DELETE /game/delete/:username`

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

