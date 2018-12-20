////////////////////////////////////////////////////////
//
//    Script to Generate Mock Data

/////////////////////////////////////////
//  Import database Model

const { db } = require('./index.js');
const { ListingImages } = require('./schema.js');

////////////////////////////////////////
//  Import URL Data in JSON format

const mapUrls = require('./sample_data/map_images.json');
const floorPlanUrls = require('./sample_data/floor_plan_images.json');
const apartmentUrls = require('./sample_data/apartment_images.json');

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
  let listing = new ListingImages();
  // Attach an id and tier
  listing.id = id;
  // Attach a map Url
  listing.map = getRandomElements(mapUrls.urls);
  // Attach a floor plan url
  listing.floorPlan = getRandomElements(floorPlanUrls.urls);
  // Attach apartment photos
  listing.photos = getApartmentPhotosByTier(tier);
  return listing;
};

// Get a random integer between greater than a and b inclusive
const rnd = (a,b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

// This function is used to pick a random selection of photos from an array
// without repeating elements. If n is greater than the length of the array, the
// function returns the whole array in random order. The default n is 1.
const getRandomElements = (array, n = 1) => {
  let targetLength = Math.min(array.length, n);
  let results = [];
  let prevIndices = [];

  while (results.length < targetLength) {
    randomIndex = Math.floor(array.length * Math.random());
    if (!prevIndices.includes(randomIndex)) {
      prevIndices.push(randomIndex);
      results.push(array[randomIndex]);
    }
  }

  return results;
};

const getApartmentPhotosByTier = tier => {
  let photos = [];

  if (tier === 0) {
    // Modest listing
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier0.exterior))
      .concat(getRandomElements(apartmentUrls.tier0.kitchen, rnd(0,1)))
      .concat(getRandomElements(apartmentUrls.tier0.bedroom, rnd(0,2)));
  }

  if (tier === 1) {
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier1.exterior))
      .concat(getRandomElements(apartmentUrls.tier1.kitchen, rnd(0,1)))
      .concat(getRandomElements(apartmentUrls.tier1.bathroom, rnd(1,1)))
      .concat(getRandomElements(apartmentUrls.tier1.bedroom, rnd(1,2)))
      .concat(getRandomElements(apartmentUrls.tier1.amenities, rnd(1,2)));
  }

  if (tier === 2) {
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier2.exterior))
      .concat(getRandomElements(apartmentUrls.tier2.kitchen, rnd(1,2)))
      .concat(getRandomElements(apartmentUrls.tier2.bedroom, rnd(1,3)))
      .concat(getRandomElements(apartmentUrls.tier2.bathroom, rnd(0,3)))
      .concat(getRandomElements(apartmentUrls.tier2.amenities, rnd(0,4)));
  }

  if (tier === 3) {
    // Very deluxe listing
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier3.exterior))
      .concat(getRandomElements(apartmentUrls.tier3.kitchen, rnd(1,3)))
      .concat(getRandomElements(apartmentUrls.tier3.bedroom, rnd(2,5)))
      .concat(getRandomElements(apartmentUrls.tier3.bathroom, rnd(1,4)))
      .concat(getRandomElements(apartmentUrls.tier3.amenities, rnd(3,6)));
  }

  return photos;
};

////////////////////////////////////////////////////////////
//
//    Main Action

const TOTAL_LISTINGS = 100;

// Create listings
let listings = generateNListings(TOTAL_LISTINGS);

// Clear out all prexisting models in the database
ListingImages.deleteMany({}, err => {
  if (err) return console.log('Error updating database', err);
  console.log('Cleared previous database listing entries');
  // Save new listings to db
  Promise.all(
    listings.map(e => {
      e.save();
    })
  )
    .then(() => {
      console.log('Updated database with new randomized listing entries');
    })
    .catch(err => {
      console.log('Error saving to database', err);
    });
});