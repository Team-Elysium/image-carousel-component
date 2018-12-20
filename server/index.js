////////////////////////////////////////////////////////////
//
//    Express Server

////////////////////////////////////////
//  Configuration Constants

const PORT = process.env.PORT || 3010;
const PUBLIC_DIR = '../public/';

/////////////////////////////////////////
//  Import dependencies

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Apply middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

////////////////////
//  Serve Routes

// Static Files
app.use('/', express.static(path.join(__dirname, '../public')));

// API Routes
app.get('/api/:id', (req, res) => {
  console.log('req.params:', req.params);
});

////////////////////
//  Run Server

app.listen(PORT, (err, data) => {
  if (err) return console.log('Error starting server:', err);
  console.log(`Successfully started server on http://localhost:${PORT}`);
});
