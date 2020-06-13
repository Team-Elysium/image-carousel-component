////////////////////////////////////////////////////////////
//
//    Connect to DB and Export Connection

// db is an object who's keys define the interface to the database
const db = {};

/////////////////////////////////////////
//  Import ORM and connect to db

const mongoose = require('mongoose');

// Configure mongoose to fix deprecation warning
mongoose.set('useCreateIndex', true);

mongoose.Promise = Promise;

mongoose.connect(
  'mongodb://localhost/listingImages',
  { useNewUrlParser: true }
);

// Expose database connection
db.connection = mongoose.connection;

db.connection.on('error', err => {
  console.log('Error connecting to database', err);
});
db.connection.once('open', () => {
  console.log('Successfully connected to database');
});

// Import schema and module then expose them on the db object
const { ListingImages, listingImagesSchema } = require('./schema.js');

db.ListingImages = ListingImages;
db.listingImagesSchema = listingImagesSchema;

// Define controller functions
db.getById = id => {
  return ListingImages.findOne({ id: id }).exec();
};

module.exports = db;
