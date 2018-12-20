////////////////////////////////////////////////////////////
//
//    Create and Export Database Schema And Listing Model

/////////////////////////////////////////
//  Import dependencies and connect to db

const db = require('./index.js');
const mongoose = require('mongoose');

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

module.exports.listingImagesSchema = listingImagesSchema;
module.exports.ListingImages = ListingImages;
