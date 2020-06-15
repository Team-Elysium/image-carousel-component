const https = require('https');
const fs = require('fs');
const path = require('path');

////////////////////////////////////////
//  Remote Media URLS

const apartmentImagesRemote = require('./media-urls/apartment_images.json');
const floorPlanImagesRemote = require('./media-urls/floor_plan_images.json');
const mapImagesRemote = require('./media-urls/map_images.json');

////////////////////////////////////////
//  PATHS

const MEDIA_OUPUT_PATH = 'public';
const PUBLIC_PATH = 'assets/images/photos';

// Local Media Urls
const APARTMENT_IMAGES = './database/asset-paths/apartment_images.json';
const FLOOR_PLAN_IMAGES = './database/asset-paths/floor_plan_images.json';
const MAP_IMAGES = './database/asset-paths/map_images.json';

// Create assets directory if it does not exist
fs.mkdirSync(MEDIA_OUPUT_PATH, { recursive: true });

(async function main() {
  ////////////////////////////////////////
  //  Apartment Images

  const apartmentImagesLocal = {};

  for (tier in apartmentImagesRemote) {
    apartmentImagesLocal[tier] = {};
    for (room in apartmentImagesRemote[tier]) {
      apartmentImagesLocal[tier][room] = [];
      for (let i = 0; i < apartmentImagesRemote[tier][room].length; i++) {
        const url = apartmentImagesRemote[tier][room][i];
        const extension = url.split('.').slice(-1);
        const newFileName = `${tier.slice(-1)}-${room.slice(
          0,
          3
        )}-${i}.${extension}`;
        const newFilePath = path.join(MEDIA_OUPUT_PATH, PUBLIC_PATH, newFileName);
        apartmentImagesLocal[tier][room].push(
          path.join(PUBLIC_PATH, newFileName)
        );
        await new Promise(resolve => setTimeout(resolve, 1000));
        download(url, newFilePath);
      }
    }
  }

  writeJson(APARTMENT_IMAGES, apartmentImagesLocal);

  ////////////////////////////////////////
  //  Floor Plans

  const floorPlansLocal = {};

  floorPlansLocal['urls'] = [];
  floorPlanImagesRemote['urls'].forEach((url, i) => {
    console.log('url:', url);
    const extension = url.split('.').slice(-1)[0].split('?')[0];
    console.log('extension:', extension);
    const newFileName = `floor-plan-${i}.${extension}`;
    const newFilePath = path.join(MEDIA_OUPUT_PATH, newFileName);
    floorPlansLocal['urls'].push(
      path.join(PUBLIC_PATH, newFileName)
    );
    download(url, newFilePath);
  });

  writeJson(FLOOR_PLAN_IMAGES, floorPlansLocal);

  ////////////////////////////////////////
  //  Map Images

  const mapImagesLocal = {};

  mapImagesLocal['urls'] = [];
  mapImagesRemote['urls'].forEach((url, i) => {
    const extension = 'png';
    const newFileName = `map-${i}.${extension}`;
    const newFilePath = path.join(MEDIA_OUPUT_PATH, newFileName);
    mapImagesLocal['urls'].push(
      path.join(PUBLIC_PATH, newFileName)
    );
    download(url, newFilePath);
  });

  writeJson(MAP_IMAGES, mapImagesLocal);
})();

////////////////////////////////////////
//  Helper Functions

function download(url, destination) {
  const file = fs.createWriteStream(destination);
  https
    .get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
      });
    })
    .on('error', err => {
      fs.unlink(destination, (err) => {
        console.log('Error unlinking file:', url, err);
      });
      console.log('Error downloading file:', url, err);
    });
}

function writeJson(path, json) {
  fs.writeFile(path, JSON.stringify(json, null, '\t'), err => {
    console.log('error:', err);
  });
}
