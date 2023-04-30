const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// POST route
app.post('/payload', (req, res) => {
  console.log(req.body);
  res.send('Payload received!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
