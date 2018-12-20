////////////////////////////////////////////////////////////
//
//    Create and Export Database Schema And Listing Model

/////////////////////////////////////////
//  Import dependencies and connect to db

const mongoose = require('mongoose');

mongoose.Promise = Promise;

////////////////////////////////////////
//  Define Schema and create model

// Schema
const listingImagesSchema = new mongoose.Schema({
  id: { type: Number, Unique: true },
  map: String,
  floorPlan: String,
  photos: [String]
});

// Model
const ListingImages = mongoose.model('ListingImages', listingImagesSchema);

module.exports.listingImagesSchema = listingImagesSchema;
module.exports.ListingImages = ListingImages;
