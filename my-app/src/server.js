// Import dependencies
const express = require('express');
const mysql = require('mysql');
const fs = require('fs');


// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server hostname
  user: 'admin', // Replace with your MySQL username
  password: 'placeholder', // Replace with your MySQL password
  database: 'testvectorgeneration', // Replace with your MySQL database name
});


// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


// Create Express app
const app = express();

// Handle GET request
app.get('/', (req, res) => {
  connection.query('SELECT * FROM project', (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(rows);
  });
});

// Handle GET request
app.get('/uploadDB', async function(req, res) {
    let filePath = "./data/Demo.json";

    let jsonData;

    try {
        jsonData = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        res.status(500).send('Error parsing JSON string:', error);
    }

    try {
      // Insert Project data
      const project = JSON.parse(jsonData).Project;
      const projectQuery = `INSERT INTO Project (Id, Name) VALUES (?, ?)`;
      await executeQuery(projectQuery, [project.Id, project.Name]);
  
      // Insert Sample data
      const samples = JSON.parse(jsonData).Project.Samples;
      const sampleQuery = `INSERT INTO Sample (Id, FamilyName, ProductName, Name) VALUES (?, ?, ?, ?)`;
      await Promise.all(samples.map(sample => executeQuery(sampleQuery, [sample.Id, sample.FamilyName, sample.ProductName, sample.Name])));
  
      // Insert InputCondition data
      const inputConditions = JSON.parse(jsonData).Project.InputConditions;
      const inputConditionQuery = `INSERT INTO InputCondition (Id, Parameter, Min, Typical, Max, TimeBetweenPoints) VALUES (?, ?, ?, ?, ?, ?)`;
      await Promise.all(inputConditions.map(inputCondition => executeQuery(inputConditionQuery, [inputCondition.Id, inputCondition.Parameter, inputCondition.Min, inputCondition.Typical, inputCondition.Max, inputCondition.TimeBetweenPoints])));
  
      // Insert TestPointCollections data
      const testPointCollections = JSON.parse(jsonData).TestPointCollections;
      const testPointCollectionQuery = `INSERT INTO TestPointCollections (Id, InputConditionId) VALUES (?, ?)`;
      const testPointQuery = `INSERT INTO TestPoint (Id, Value, Unit) VALUES (?, ?, ?)`;
  
      for (const testPointCollection of testPointCollections) {
        await executeQuery(testPointCollectionQuery, [testPointCollection.Id, testPointCollection.InputConditionId]);
        const testPointCollectionId = testPointCollection.Id;
  
        for (const testPoint of testPointCollection.TestPoints) {
          await executeQuery(testPointQuery, [testPoint.Id, testPoint.Value, testPoint.Unit]);
          const testPointId = testPoint.Id;
  
          const testPointListQuery = `INSERT INTO TestPointList (TestPointId, TestPointCollectionId) VALUES (?, ?)`;
          await executeQuery(testPointListQuery, [testPointId, testPointCollectionId]);
        }
  
        for (const sampleId of testPointCollection.SampleIds) {
          const sampleListQuery = `INSERT INTO SampleList (SampleId, TestPointCollectionId) VALUES (?, ?)`;
          await executeQuery(sampleListQuery, [sampleId, testPointCollectionId]);
        }
      }
  
      console.log('Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
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

async function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

