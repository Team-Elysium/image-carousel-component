const db = require('./index.js');

// Import Assertion Library:
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('hooks', function() {
  after(function() {
    // Close connection after running tests
    db.connection.close();
  });

  describe('Database Model db.ListingImages:', () => {
    xit('should be capable of saving and removing good entries', () => {
      let testListing = new db.ListingImages();

      testListing.id = 100;
      testListing.map = 'www.example.com/example-map-url';
      testListing.floorPlan = 'www.example.com/example-floor-plan-url';
      testListing.photos = ['www.example.com/example-photo-url'];

      let promise = testListing.save();
      promise.should.not.be.rejected;
    });

    xit('should not save incomplete entries saving to the database', () => {
      new db.ListingImages({}).save().catch(err => {
        expect(err).to.be.undefined;
      });
    });

    xit('should be capable of reading from the database', () => {});
  });

  describe('Controller function getById:', () => {
    it('should resolve to an object with map and floorPlan properties when id < 100', done => {
      db.getById(0)
        .then(result => {
          chai.expect(result.map).to.be.string;
          chai.expect(result.floorPlan).to.be.string;
          done();
        })
        .catch(err => {
          throw err;
        });
    });
  });
});
