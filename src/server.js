// Server for BBC Web Coding Test 2020

// Use the Express framework for Node.js
const express = require('express');
const fetch = require('node-fetch');

// Define the port (3000)
const port = 3000;

// Define some Express middleware that fetches and processes the required data
const fetchArticleData = async (request, response, next) => {
  // Fetch the article data using GitHub's REST API
  const fetchUrl = 'https://api.github.com/repos/'
    + 'bbc/news-coding-test-dataset/contents/data/'
    + `${request.params.article_id}.json?ref=master`;

  try {
    let data = await fetch(fetchUrl);
    data = await data.json();
    request.content = data.content;
    request.encoding = data.encoding;
    next();

  } catch(error) {
    // Passing anything apart from 'route' to next informs Express that it
    // should be handling the error
    next(error);
  }
};

const decodeArticleData = async (request, response, next) => {
  try {
    // The content of the data returned from GitHub's REST API is encoded
    // (in base-64), so we need to decode it before we can use it.
    const content_buffer = Buffer.from(request.content, request.encoding);
    const decoded_content = JSON.parse(content_buffer.toString());
    request.content = decoded_content;
    next();

  } catch(error) {
    next(error);
  }
};

// Start the server
const server = express();

// Define responses to GET and POST requests
// TODO: Consider a redirection to /article-1
// server.get('/', (request, response) => {
//
// });

// Covers all five articles using route parameters
server.get('/:article_id(article-[12345])',
  fetchArticleData,
  decodeArticleData,
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
