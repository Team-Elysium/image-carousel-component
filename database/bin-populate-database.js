////////////////////////////////////////////////////////
//
//    Script to Generate Mock Data

//import db connection and schema

const {MongoClient} = require('mongodb');




const ListingRecord = require('./schema');

const filesDir = 'database/bin';
////////////////////////////////////////

//generate a random index for getting file reference
const getRandomInt = (length) => Math.floor(Math.random() * length);


// Produce a single listing
const generateListing = (id) => {
  return {
    id: id,
    map: `({map.json : imgs[${getRandomInt(17)}]})`,
    floorPlan: `({floorPlan.json : imgs[${getRandomInt(6)}]})`,
    photos: {
      //format: {filepath: index on binArray}
      'exterior': `imgs[${getRandomInt(24)}]})`,
      'kitchen': `imgs[${getRandomInt(20)}]})`,
      'bedroom': `imgs[${getRandomInt(22)}]})`,
      'bathroom': `imgs[${getRandomInt(23)}]})`,
      'livingroom': `imgs[${getRandomInt(24)}]})`,
      'amenities': `imgs[${getRandomInt(29)}]})`
    }
  };
};

//create a batch of listings
const getListings=(num)=>{
  let counter =0;
  let batch=[];
  while (counter < num) {
    batch.push(generateListing(counter));
    counter++;
  }
  return batch;
}


const insertDocuments = (db,callback)=> {
  // Get the documents collection
  const collection = db.collection('listingImages');
  // Insert some documents
  collection.insertMany(getListings(TARGET_RECORDS) , function(err, result) {
    if(err)console.log('error inserting: ',err)    
    callback(result);
  });
}

const connectionPArams = {
  useNewUrlParser: true,
  fsync: false,
  w: 0,
  j: 0,
  bufferMaxEntries: -1
}

let TARGET_RECORDS = 100000 // change this value to generate that number of records
let timeInit = Date.now();

MongoClient.connect('mongodb://localhost:27017',connectionPArams,(err,client)=>{
  if(err)console.log('error connecting to DB') 
 
  const db = client.db('listingImages');
 
  insertDocuments(db, function(result) {
    console.log('Result: ',result);
    client.close();

  });
  console.log('time taken to store ', TARGET_RECORDS, 'docs: ', Date.now() - timeInit, 'ms', 'TPS: ', timeInit / 1000 / TARGET_RECORDS)
});


  
  //   let batch = 0;
//   try {
//     while (batch < 100) {
//       modelArray.push(generateListing(counter + batch));
//       batch++;
//     }
//   } catch (unhandledErr) {
//     console.log('database error: ', unhandledErr);
//   }
//   //3. store all docs into DB  
//   ListingRecord.insertMany(modelArray, null, false, (err, output) => {
//     if (err) console.log('error storing to DB: ', err, ':::', Date.now() - timeInit, 'ms')
//   })
//   batch++;
//   counter += batch;
//   console.log('time taken to store ', counter, 'docs: ', Date.now() - timeInit, 'ms', 'TPS: ', timeInit / 1000 / counter)

// }
// console.log('saved all ', counter, 'docs: ', Date.now() - timeInit, 'ms', 'TPS: ', timeInit / 1000 / counter)
// db.disconnect()

