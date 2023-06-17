const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// Promise to handle CSV file processing
const csvProcessingPromise = new Promise((resolve, reject) => {
  const data = [];
  fs.createReadStream('bank_branches.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');
      resolve(data); 
      // Resolve the promise with the processed data
    })
    .on('error', (error) => {
      console.error('Error processing CSV file:', error);
      reject(error); // Reject the promise if an error occurs
    });
});

// REST API endpoint to get the bank list
app.get('/banks', (req, res) => {
  csvProcessingPromise
    .then((data) => {
      const banks = [...new Set(data.map((row) => row.bank_name))];
      res.json(banks);
    })
    .catch((error) => {
      console.error('Error processing CSV file:', error);
      res.status(500).json({ message: 'Error processing CSV file.' });
    });
});

// REST API endpoint to get branch details for a specific bank
app.get('/branches/:bankName', (req, res) => {
  const bankName = req.params.bankName;

  // Filtering the data based on the bank name
  csvProcessingPromise
    .then((data) => {
      const branches = data.filter((row) => row.bank_name === bankName);
      res.json(branches);
    })
    .catch((error) => {
      console.error('Error processing CSV file:', error);
      res.status(500).json({ message: 'Error processing CSV file.' });
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });
  

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Emit the 'ready' event when the server starts listening
  app.emit('ready');
});

module.exports = app;
