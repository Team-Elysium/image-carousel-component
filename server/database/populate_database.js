////////////////////////////////////////////////////////
//
//    Script to Generate Mock Data

/////////////////////////////////////////
//  Import database Model

const db = require('./schema.js');

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
  let listing = new db.ListingImages();
  // Attach an id and tier
  listing.id = id;
  listing.tier = tier;
  // Attach a map Url
  listing.mapUrl = getRandomElement(mapUrls.urls);
  // Attach a floor plan url
  listing.floorPlanUrl = getRandomElement(floorPlanUrls.urls);
  // Attach apartment photos
  listing.apartmentUrls = getApartmentPhotosByTier(tier);
  return listing;
};

// Randomizng photos
const getRandomElement = array => {
  let randomIndex = Math.floor(array.length * Math.random());
  return array[randomIndex];
};

const getApartmentPhotosByTier = tier => {
  let photos = {
    exterior: [],
    kitchen: [],
    bedroom: [],
    bathroom: [],
    livingroom: [],
    garden: []
  };

  // Each apt has one exterior photo
  photos.exterior.push(getRandomElement(apartmentUrls.exterior));
  // Each apt has one exterior photo

  if (tier === 0) {
    // Kitchen and bedroom only
    photos.kitchen.push(getRandomElement(apartmentUrls.kitchen));

    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));
  }

  if (tier === 1) {
    // Kitchen, bedroom, bathroom, livingroom
    photos.kitchen.push(getRandomElement(apartmentUrls.kitchen));

    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));

    photos.bathroom.push(getRandomElement(apartmentUrls.bathroom));

    photos.livingroom.push(getRandomElement(apartmentUrls.livingroom));
  }

  if (tier === 2) {
    // Kitchen, 2 bedrooms, bathroom, livingroom, garden
    photos.kitchen.push(getRandomElement(apartmentUrls.kitchen));

    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));
    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));

    photos.bathroom.push(getRandomElement(apartmentUrls.bathroom));

    photos.livingroom.push(getRandomElement(apartmentUrls.livingroom));

    photos.garden.push(getRandomElement(apartmentUrls.garden));
  }

  if (tier === 3) {
    // Lots of everything
    photos.kitchen.push(getRandomElement(apartmentUrls.kitchen));

    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));
    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));
    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));
    photos.bedroom.push(getRandomElement(apartmentUrls.bedroom));

    photos.bathroom.push(getRandomElement(apartmentUrls.bathroom));
    photos.bathroom.push(getRandomElement(apartmentUrls.bathroom));

    photos.livingroom.push(getRandomElement(apartmentUrls.livingroom));
    photos.livingroom.push(getRandomElement(apartmentUrls.livingroom));
    photos.livingroom.push(getRandomElement(apartmentUrls.livingroom));

    photos.garden.push(getRandomElement(apartmentUrls.garden));
  }

  return photos;
};

////////////////////////////////////////////////////////////
//
//    Main Action

const TOTAL_LISTINGS = 100;

// Create listings
let listings = generateNListings(TOTAL_LISTINGS);

// Save listings to db
listings.forEach(e => {
  e.save();
});
