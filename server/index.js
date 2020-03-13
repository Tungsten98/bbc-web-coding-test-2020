// Server for BBC Web Coding Test 2020
require('dotenv').config();

// Use the Express framework for Node.js
const express = require('express');
const fs = require('fs');

// Define the port (3001)
const port = process.env.SERVER_PORT || 3001;

// Define some Express middleware that fetches and processes the required data
const fetchArticleData = (request, response, next) => {
  try {
    let data = fs.readFileSync(`server/db/${request.params.article_id}.json`,
      'utf-8');
    request.content = JSON.parse(data);
    next();

  } catch(error) {
    // Passing anything apart from 'route' to next informs Express that it
    // should be handling the error
    next(error);
  }
};

// Start the server
const server = express();

// Covers all five articles using route parameters
server.get('/api/:article_id(article-[12345])',
  fetchArticleData,
  (request, response) => {
    try {
      const data = request.content
      response.json(data)
    } catch(error) {
      response.status(500).send(error)
    }
  }
);

// server.post('/rating', (request, response) => {
//
// });

// Make the server listen to requests on the specified port
server.listen(port, (error) => {
  if (error) {
    console.log(`Server encountered error: ${error}`);
    throw error;
  }
  console.log(`Server listening on port ${port}`);
});
