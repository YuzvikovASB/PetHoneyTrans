const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

const authorized = require('./routes/middleware/auth');
const registration = require('./routes/api/registration');
const login = require('./routes/api/login');
const profile = require('./routes/api/profile');
const load = require('./routes/api/load');
const truck = require('./routes/api/truck');

app = express();
const PORT = config.get('port') || 8081;

mongoose.connect(config.get('mongoUri'));
const db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

// Parsers:
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json( {extended: true}));


// Routes:
app.get('/', (req, res) => {
  return res.status(200).json({message: 'OK!'});
});

app.use('/registration', registration);
app.use('/login', login);
app.use(authorized);
app.use('/profile', profile);
app.use('/loads', load);
app.use('/trucks', truck);


app.use('*', (req, res) => {
  res.status(404).json({status: 'Page not found'});
});

// Start Server
app.listen(PORT, (error) => {
  if (error) {
    console.log('Cannot start servers:', error);
  }
  console.log(`Server is listening on port ${PORT}...`);
});
