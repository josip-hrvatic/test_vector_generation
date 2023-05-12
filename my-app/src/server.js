// Import dependencies
const express = require('express');
const mysql = require('mysql');
const fs = require('fs');


// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server hostname
  user: 'root', // Replace with your MySQL username
  password: 'password', // Replace with your MySQL password
  database: 'mydatabase', // Replace with your MySQL database name
});

/*
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});
*/

// Create Express app
const app = express();

// Handle GET request
app.get('/', (req, res) => {
  connection.query('SELECT * FROM mytable', (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(rows);
  });
});

// Handle GET request
app.get('/parse', (req, res) => {
    let filePath = "./data/L2.json";

    let jsonObj;

    try {
        const jsonString = fs.readFileSync(filePath, 'utf8');
        jsonObj = JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON string:', error);
    }
      
      // Check if parsing was successful
    if (jsonObj) {
        console.log('Parsed JSON object:', jsonObj);
    }

    res.json(jsonObj);
});


  


// Handle POST request
app.post('/', (req, res) => {
  // Handle the POST data here
  res.send('Received a POST request');
});

// Start the server
const port = 4000; // Replace with the desired port number
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});


