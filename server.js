const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://ak:ak@api.6qtls9v.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

// Define schema for data
const payloadSchema = new mongoose.Schema({
  data: Object
});
const Payload = mongoose.model('Payload', payloadSchema);

// POST route
app.post('/payload', (req, res) => {
    console.log(req,"Ran")
  const payloadData = new Payload({ data: req.body });
  payloadData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving payload data');
    } else {
      console.log('Payload data saved to MongoDB');
      res.send('Payload received and saved!');
    }
  });
});

// Start the server
const PORT = 443;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
