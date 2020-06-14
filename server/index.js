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
const compression = require('compression');

const app = express();

// Import Database Connection
const db = require('../database/index.js');

// Apply middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());

////////////////////
//  Serve Routes

// Static Files
app.use('/:id(\\d+)/', express.static(path.join(__dirname, '../public')));

app.use('/', express.static(path.join(__dirname, '../public')));


// API Routes
app.get('/api/carousel/:id', (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(result => {
      // If nothing is found, respond with 404
      if (result === null) return res.sendStatus(404);

      // The database adds some extra, private properties to each entry.
      // Explicity mapping the result of the database fetch is one way to filter
      // the served json.
      res.json({
        id: result.id,
        photos: result.photos,
        floorPlan: result.floorPlan,
        // Concatinate mapbox url with API key here
        map: result.map
      });
    })
    .catch(err => {
      console.log('Error running db.getById:', err);
      res.sendStatus(500);
    });
});

////////////////////
//  Run Server

app.listen(PORT, (err, data) => {
  if (err) return console.log('Error starting server:', err);
  console.log(`Successfully started server on http://localhost:${PORT}`);
});


////////////////////
//  Export server for testing

module.exports = app;

