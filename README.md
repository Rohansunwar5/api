# Implementaion breakdown for REST API endpoints to get the Bank List and its branch details for a specific branch.
I have used Node.js along with the Express.js web framework to create an API server. Here's a break down of how i came up with the solution:
Setting up the project:
I used the necessary dependencies, including Express.js for creating the API server and csv-parser for parsing the CSV data.
Creating the server file:

I created a file named server.js to serve as the entry point for the server.
Inside the server.js file, I imported the required dependencies, including express, csv-parser, and fs (fs fro file system operation).
I created an instance of the Express application using express().

Then I used the fs.createReadStream() method to read the bank_branches.csv file.
I piped the CSV data stream to the csv-parser module, which allows parsing the CSV data row by row.
For each row of data, I pushed it to the bankData array.
Once the entire CSV file has been parsed, the 'end' event is triggered, and I log a message indicating that the data has been loaded.
REST API endpoints:

I defined two REST API endpoints using the app.get() method provided by Express.js.
The first endpoint /banks returns the bank list by extracting unique bank names from the bankData array and sending the response as JSON.
The second endpoint /banks/:bankName/branches returns the branch details for a specific bank.
I extract the bankName from the request parameters using req.params.
I filter the bankData array based on the bank_name field to find branches matching the specified bank name.
I send the filtered branches as the JSON response.
Starting the server:

I set the port for the server to listen on, using process.env.PORT or the default value of 3000.
I start the server using the app.listen() method, and log a message indicating the server is running and the port it's listening on.

I have also provided the test cases in the repository with the bank name which tested correct:
$ npm test

> api@1.0.0 test
> jest

  console.log
    Server is running on port 3000

      at Server.log (server.js:64:11)

  console.log
    CSV file successfully processed.

      at CsvParser.log (server.js:16:15)

 PASS  ./server.test.js
  API Tests
    √ should return the bank list (1071 ms)
    √ should return branch details for a specific bank (47 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.518 s, estimated 3 s
Ran all test suites.


The Time taken for the completion was about 2 - 3 hours as I had to take some refrences for the test cases.
