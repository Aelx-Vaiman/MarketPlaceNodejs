# MarketPlaceNodejs

MarketPlaceNodejs is a simple REST API server for managing market items. It provides endpoints for fetching, adding, removing, and updating market items. Before running the server, make sure you have MongoDB set up and running.

## Getting Started

To run this server, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/)

### Installing Dependencies

1. Navigate to the server directory.

   ```bash
   cd MarketPlaceNodejs
2. Install the dependencies.
   npm install
3. Running the Server   
   npm start

This will start the server on http://localhost:3000.

Generating Mock Data

The server includes a script, mock.js, to generate mock data for testing and development. This script populates the MongoDB database with 100 randomly generated items.
Running the Mock Data Script

Execute the script.

node mock.js

Important Note

    Security: The mock data script is intended for testing and development purposes only. It generates random data and should not be used in a production environment.

    MongoDB Connection: Ensure that your MongoDB server is running, and the connection details in the server (app.js) match your local MongoDB setup.

API Endpoints

    GET /items: Retrieve all market items.
    POST /items: Add a new market item.
    PUT /items/:id: Update a specific market item.
    DELETE /items/:id: Remove a specific market item.
    
   
   
  
