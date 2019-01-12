// ////////////////////////////////////////////////////////
// //
// //    Script to Generate Mock Data in PostGres

// //import db connection and schema

const { Pool, Client } = require('pg')

//initiate pool
const pool = new Pool({
    host: 'localhost:27018',
    user: 'database-user',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

  
 async function createDB(){
    try{
    let op1 = await client.query('DROP table IF EXISTS listingImages');
    let op2 = await client.query(`CREATE TABLE listingImages(
             id   integer ,
       bundle  string
      `);  
      await console.log('db purged, ready!') 
    }catch(err){
        console.log(err)
        pool.end();
    }   
}


// //declare const vars

const TARGET_RECORDS = 2000000 //10M change this value to generate that number of records
const BATCH_QTY = 10;         //change this to divide the total number of records to batches of equal size
const timeInit = Date.now();




// ////////////////////////////////////////

// //generate a random index for getting file reference
// const getRandomInt = (length) => Math.floor(Math.random() * length);


// Produce a single listing
const generateListing = (id) => {
  //format: {filepath: index on binArray}
  return `
    'id': ${id},
    'imgs': {
      'map': getRandomInt(17),
      'floorPlan': getRandomInt(6),
      'exterior': getRandomInt(24),
      'kitchen': getRandomInt(20),
      'bedroom': getRandomInt(22),
      'bathroom': getRandomInt(23),
      'livingroom': getRandomInt(24),
      'amenities': getRandomInt(29)
    }
  }`;
};

let batchNum = 1;
//create a batch of listings
const getNextBatch = (num) => {
  let counter = 0;
  let batch = [];
  while (counter < num) {
    let docStr='';      
    do{      
      docStr+=generateListing(counter)+'~';
      counter++;     
    } while(counter%1000!==1);    
    batch.push({docStr});
  }
  console.log('batch in #:', batchNum, ' is ready! Time: ', Math.round(Date.now() - timeInit))
  batchNum++;
  return batch;
}


// const insertDocuments = (db, callback) => {
//   // Get the documents collection
//   const collection = db.collection('listingImages');
//   // Insert some documents
//   let counter = 0;
//   while (counter < BATCH_QTY) {
//     collection.bulkWrite(getWritingOps(TARGET_RECORDS/BATCH_QTY,{ordered:false}), function (err, result) {
//       if (err) console.log('error inserting: ', err)
//       callback(result);
//     });
//     counter++;
//   }
// }


// const connectionPArams = {
//   useNewUrlParser: true,
//   fsync: false,
//   w: 0,
//   j: false,
//   bufferMaxEntries: -1,
//   poolSize: BATCH_QTY
// }

let batchCounter =0;

createDB();
while(batchCounter<BATCH_QTY){

 client =  new Client({
    host: 'localhost:27018',
    user: 'database-user',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

const client = await pool.connect()
const res = await client.query(`
INSERT INTO listingImages(batch, bundle) 
FROM  	unnest(ARRAY${getNextBatch()}) x
`)
let outputBatch = 1;
await console.log(res);
console.log('batch out #:', outputBatch, ' ,Time: ', Math.round((Date.now() - timeInit) / 1000), 's');
await client.end()
}

// await pool.end()



