////////////////////////////////////////////////////////////
//
//    Connect to DB and Export Connection, Schema And Listing Model

/////////////////////////////////////////
//  Import dependencies and connect to db

const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(
  'mongodb://localhost/listingImages',
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.on('error', err => {
  console.log('Error connecting to database', err);
});
connection.once('open', () => {
  console.log('Successfully connected to database');
});

////////////////////////////////////////
//  Define Schema and create model

// Schema
const listingImagesSchema = new mongoose.Schema({
  id: { type: Number, Unique: true },
  tier: Number,
  mapUrl: String,
  floorPlanUrl: String,
  apartmentUrls: {
    exterior: [String],
    kitchen: [String],
    bedroom: [String],
    bathroom: [String],
    livingroom: [String],
    garden: [String]
  }
});

// Model
const ListingImages = mongoose.model('ListingImages', listingImagesSchema);

module.exports.connection = connection;
module.exports.listingImagesSchema = listingImagesSchema;
module.exports.ListingImages = ListingImages;
