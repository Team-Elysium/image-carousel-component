# image-carousel-component
> Image Carousel Component for StreetEasy Style Item Listing Page

This project contains the source for a single component that is part of a listing page inspired by the New York City real estate website StreetEasy.com

This component is designed as it's own encapsulated full stack application to work along side related components in the style of a microservice architecture. In the case of this project, several developers contributed components to the page and each developer created their own proxy server to deliver a complete web app.

To view the whole web app, check out the Proxy Server for Full Listing link below.

## Related Repositories

- Complete Listing Page
  - [Proxy Server for Full Listing](https://github.com/Team-Elysium/streeteasy-listing-proxy-server-jte)

- Related Components on Listing Page
  - [Listing Details Component](https://github.com/Team-Elysium/listing-details)
  - [Listing Description Component](https://github.com/Team-Elysium/Description-Amenities-About_the_Building)
  - [Similiar Listings Component](https://github.com/Team-Elysium/Similar-Listings-Recommendations)

## Table of Contents

1. [Usage](https://github.com/hackreactor/hrnyc19-front-end-capstone#Usage)
2. [Requirements](https://github.com/hackreactor/hrnyc19-front-end-capstone#requirements)
3. [Development](https://github.com/hackreactor/hrnyc19-front-end-capstone#development)

## Usage

Run npm start-dev to start the database daemon and the nodemon server which restarts whenever the server code is changed.

```bash
$ npm run start-dev
```

Here are a few example commands to manually inspect the MongoDB database via the Mongo shell

```bash
# Enter the mongo shell
$ mongo

# Use the project database
> use listingImages

# Show all listingimages entries
> db.listingimages.find()

# Show a specific entry
> db.listingimages.find()[0]

# Count total entries saved
> db.listingimages.count()

# Delete all entries in listingimages
> db.listingimages.drop()

```

## Requirements

- Note that this project makes use of the MapBox API to access static map images. To get an API key visit: https://www.mapbox.com/signup

## Development

### Installing Dependencies

This project uses a MongoDB database, be sure that it is installed: 

​	https://docs.mongodb.com/manual/installation/

To install node dependencies:

```
npm install -g webpack
npm install
```

The MapBox API key should be stored in a file in the root directory called `config.js`, please look at `config.example.js` .