////////////////////////////////////////////////////////////
//
//    Script to Generate Mock Data

/////////////////////////////////////////
//  Import database Model

const db = require('./schema.js');

// Database Schema Definition for reference:
// id: { type: Number, Unique: true },
// mapUrl: String,
// floorPlanUrl: String,
// apartmentUrls: {
//   exterior: [String],
//   kitchen: [String],
//   bedroom: [String],
//   bathroom: [String],
//   livingroom: [String],
//   garden: [String]
// }

////////////////////////////////////////
//  Helper Functions

// Create an array of listing models
const generateNListings = n => {
  let results = [];
  // Apartments are split into price tiers
  // from lowest cost to highest cost
  let TOTAL_TIERS = 4;
  let tier;
  for (let i = 0; i < n; i++) {
    tier = Math.floor(i / (n / TOTAL_TIERS));
    results.push(generateListing(i, tier));
  }
  return results;
};

// Produce a specific listing model
const generateListing = (id, tier) => {
  let listing = new db.ListingImages();
  // Attach an id
  listing.id = id;
  // Attach a map Url
  listing.mapUrl = getRandomMap();
  // Attach a floor plan url
  listing.floorPlanUrl = getRandomFloorplan();
  // Attach apartment photos
  listing.apartmentUrls = getApartmentPhotosByTier(teir);
  return listing;
};

// Randomizng photos
const getRandomMap = () => {};

const getRandomFloorplan = () => {};

const getApartmentPhotosByTier = tier => {
  let photos = {};

  return photos;
};

////////////////////////////////////////
//  Import URL Data in JSON format

const mapUrls = require('./sample_data/map_images.json');
const floorPlanUrls = require('./sample_data/floor_plan_images.json');
const apartmentUrls = require('./sample_data/apartment_images.json');

////////////////////////////////////////////////////////////
//
//    Main Action

const TOTAL_LISTINGS = 100;

// Create listings
let listings = generateNListings(TOTAL_LISTINGS);

// Save listings to db
// listings.forEach(e => {
//   e.save();
// });
