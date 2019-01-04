////////////////////////////////////////////////////////
//
//    Script to Generate Mock Data

/////////////////////////////////////////
//  Import database Model

// Import db to create a database connection
const db = require('./index.js');

////////////////////////////////////////
//  Import URL Data in JSON format

const mapUrls = require('./sample-data/map_images.json');
const floorPlanUrls = require('./sample-data/floor_plan_images.json');
const apartmentUrls = require('./sample-data/apartment_images.json');

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

// This function returns an array of photos based on 4 tiers of listings.
// Depending on the tier number, the photos array is filled out with urls from
// different sets of urls. Each photos array will have a random number of photos
// from various categories within a certain range. Tier0 photos arrays have less
// images of less expensive properties, Tier3 photos arrays will have more
// images of fancier properties.
const getApartmentPhotosByTier = tier => {
  let photos = [];

  if (tier === 0) {
    // Modest listing
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier0.exterior))
      .concat(getRandomElements(apartmentUrls.tier0.kitchen, randomFrom(0, 1)))
      .concat(getRandomElements(apartmentUrls.tier0.bedroom, randomFrom(0, 2)));
  }

  if (tier === 1) {
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier1.exterior))
      .concat(getRandomElements(apartmentUrls.tier1.kitchen, randomFrom(0, 1)))
      .concat(getRandomElements(apartmentUrls.tier1.bathroom, randomFrom(1, 1)))
      .concat(getRandomElements(apartmentUrls.tier1.bedroom, randomFrom(1, 2)))
      .concat(
        getRandomElements(apartmentUrls.tier1.amenities, randomFrom(1, 2))
      );
  }

  if (tier === 2) {
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier2.exterior))
      .concat(getRandomElements(apartmentUrls.tier2.kitchen, randomFrom(1, 2)))
      .concat(getRandomElements(apartmentUrls.tier2.bedroom, randomFrom(1, 3)))
      .concat(getRandomElements(apartmentUrls.tier2.bathroom, randomFrom(0, 3)))
      .concat(
        getRandomElements(apartmentUrls.tier2.amenities, randomFrom(0, 4))
      );
  }

  if (tier === 3) {
    // Very deluxe listing
    photos = photos
      .concat(getRandomElements(apartmentUrls.tier3.exterior))
      .concat(getRandomElements(apartmentUrls.tier3.kitchen, randomFrom(1, 3)))
      .concat(getRandomElements(apartmentUrls.tier3.bedroom, randomFrom(2, 5)))
      .concat(getRandomElements(apartmentUrls.tier3.bathroom, randomFrom(1, 4)))
      .concat(
        getRandomElements(apartmentUrls.tier3.amenities, randomFrom(3, 6))
      );
  }

  return photos;
};

// This function is used to pick resultLength random elements from an array
// without repeating elements. If resultLength is greater than the length of the
// array, the function returns the whole array in random order. The default
// resultLength is 1.
const getRandomElements = (array, resultLength = 1) => {
  let targetLength = Math.min(array.length, resultLength);
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

// Get a random integer between a and b inclusive
const randomFrom = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

////////////////////////////////////////////////////////////
//
//    Main Action

const TOTAL_LISTINGS = 100;

// Create listings
let listings = generateNListings(TOTAL_LISTINGS);

// Clear out all prexisting models in the database
db.ListingImages.deleteMany({}, err => {
  if (err) return console.log('Error updating database', err);
  console.log('Cleared previous database listing entries');
  // Save new listings to db
  return Promise.all(
    listings.map(e => {
      return e.save();
    })
  )
    .then(() => {
      console.log('Updated database with new randomized listing entries');
      // Close db connection when done saving all models
      db.connection.close();
    })
    .catch(err => {
      console.log('Error saving to database', err);
    });
});
