////////////////////////////////////////////////////////////
//
//    Create and Export Database Schema And Listing Model

/////////////////////////////////////////
//  Import dependencies and connect to db

const mongoose = require('mongoose');
const {Schema} = require('mongoose');


////////////////////////////////////////
//  Define Schema and create model

// Schema
const listingImagesSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  map: { type: String, required: true },
  floorPlan: { type: String, required: true },
  photos: { type: [String], required: true }
}/*,{safe:{ j:0,w: 0, wtimeout: 10000 }*/);

// Model
module.exports = mongoose.model('ListingImages', listingImagesSchema);

