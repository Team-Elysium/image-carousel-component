////////////////////////////////////////////////////////////
//
//    Connect to DB and Export Connection

/////////////////////////////////////////
//  Import ORM and connect to db

const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(
  'mongodb://localhost/listingImages',
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', err => {
  console.log('Error connecting to database', err);
});
db.once('open', () => {
  console.log('Successfully connected to database');
});

module.exports.db = db;