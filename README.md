# image-carousel-component
> Image Carousel Component for Real Estate Listing Page

![component-screen-capture](documentation/images/component-screen-capture.gif)



This repository contains the source for a single component of a real estate listing page built with a microservice architecture. The component is designed a full stack service and includes a database and web server which serves a client application and a restful api which provides different image links to the client depending on a listing id number.

For this project, a team of developers each contributed individual components which were combined into a full listing page. To view the whole web app, check out the [complete listing page repo](https://github.com/Team-Elysium/streeteasy-listing-proxy-server-jte).

## Related Repositories

- Complete Listing Page
  - [Full Listing Proxy Server](https://github.com/Team-Elysium/streeteasy-listing-proxy-server-jte)

- Related Components on Listing Page
  - [Listing Details Component](https://github.com/Team-Elysium/listing-details)
  - [Listing Description Component](https://github.com/Team-Elysium/Description-Amenities-About_the_Building)
  - [Similiar Listings Component](https://github.com/Team-Elysium/Similar-Listings-Recommendations)

## Requirements

#### External API Key

- Note that this project makes use of the MapBox API to access static map images. To get an API key visit: https://www.mapbox.com/signup

#### Key Dependencies

- [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- [React](https://reactjs.org/docs/getting-started.html)

## Development Setup

### Installing Dependencies

This project uses a MongoDB database, be sure that it is installed: 

​	https://docs.mongodb.com/manual/installation/

To install node dependencies:

```bash
rm package-lock.json
npm install -g webpack
npm install
```

The MapBox API key should be stored in a file in the root directory called `config.js`, please look at `config.example.js` .

To seed the database with randomized listing images, run this command from the root of the project repo: 

```bash
node database/populate-database.js
```

Run webpack to create a`bundle.js` which contains the client application then start the server.

```bash
npm run build-dev
npm run start-dev
```

## Authors

* **Jared Ellison** - [jaredellison.net](http://jaredellison.net)

## Acknowledgments

- **Project Team** - *Each contributed similar components to full listing page*
  - [Sujin Lee](https://github.com/slee1016)
  - [Austin Joo](https://github.com/AustinJoo)
  - [Muhammad Mosaad](https://github.com/mowithafro)