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

// This function is used to pick a random selection of photos from an array
// without repeating elements. If n is greater than the length of the array, the
// function returns the whole array in random order. The default n is 1.
const getRandomElements = (array, n = 1) => {
  let targetLength = Math.min(array.length, n);
  let results = [];
  let prevIndices = [];

  while(results.length < targetLength) {
    randomIndex = Math.floor(array.length * Math.random());
    if (!prevIndices.includes(randomIndex)) {
      results.push(array[randomIndex]);
    }
  }

  return results;
};

const getApartmentPhotosByTier = tier => {
  let photos = [];

  // Each apt has one exterior photo
  photos.push(getRandomElements(apartmentUrls.exterior));

  if (tier === 0) {
    // Kitchen and bedroom only
    photos.push(getRandomElements(apartmentUrls.kitchen));

    photos.push(getRandomElements(apartmentUrls.bedroom));
  }

  if (tier === 1) {
    // Kitchen, bedroom, bathroom, livingroom
    photos.push(getRandomElements(apartmentUrls.kitchen));

    photos.push(getRandomElements(apartmentUrls.bedroom));

    photos.push(getRandomElements(apartmentUrls.bathroom));

    photos.push(getRandomElements(apartmentUrls.livingroom));
  }

  if (tier === 2) {
    // Kitchen, 2 bedrooms, bathroom, livingroom, garden
    photos.push(getRandomElements(apartmentUrls.kitchen));

    photos.concat(getRandomElements(apartmentUrls.bedroom, 2));

    photos.push(getRandomElements(apartmentUrls.bathroom));

    photos.push(getRandomElements(apartmentUrls.livingroom));

    photos.push(getRandomElements(apartmentUrls.garden));
  }

  if (tier === 3) {
    // Lots of everything
    photos.push(getRandomElements(apartmentUrls.kitchen));

    photos.concat(getRandomElements(apartmentUrls.bedroom, 4));

    photos.concat(getRandomElements(apartmentUrls.bathroom, 2));

    photos.concat(getRandomElements(apartmentUrls.livingroom, 3));

    photos.push(getRandomElements(apartmentUrls.garden));
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
