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
  id: { type: Number, unique: true, required: true },
  map: { type: String, required: true },
  floorPlan: { type: String, required: true },
  photos: { type: [String], required: true }
});

// Model
const ListingImages = mongoose.model('ListingImages', listingImagesSchema);

module.exports.listingImagesSchema = listingImagesSchema;
module.exports.ListingImages = ListingImages;
