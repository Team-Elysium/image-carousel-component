// Essential tests:

// Should respond to a request to / with html
// Should respond to a request to /api/0-100 with json describing a single object
// API request object should have map property with string value
// API request object should have floorPlan property with string value
// API request object should have a photos property with array value at least one item long

const request = require('supertest');
const chai = require('chai');

// Import express server to be tested
const app = require('./index.js');

describe('Component client application server', () => {
  it('respond to a request to url ending in /0/ with html', (done) => {
    request(app)
      .get('/0/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  it('respond to a request to url ending in /99/ with html', (done) => {
    request(app)
      .get('/0/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('Component API', () => {
  it('Respond to a request to /api/carousel/0/ with json', (done) => {
    request(app)
      .get('/api/carousel/0/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  it('API request object should have map property with string value', (done) => {
    request(app)
      .get('/api/carousel/0/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        chai.expect(res.body).to.own.property("map");
        chai.expect(res.body.map).to.be.a('String');
        if (err) throw err;
        done();
      })
  })

  it('API request object should have floorPlan property with string value', (done) => {
    request(app)
      .get('/api/carousel/0/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        chai.expect(res.body).to.own.property("floorPlan");
        chai.expect(res.body.floorPlan).to.be.a('String');
        if (err) throw err;
        done();
      })
  })

  it('API request object should have a photos property with array value at least one item long', (done) => {
    request(app)
      .get('/api/carousel/0/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        chai.expect(res.body).to.own.property("photos");
        chai.expect(res.body.photos).to.be.a('Array');
        chai.expect(res.body.photos.length).to.be.greaterThan(0);
        if (err) throw err;
        done();
      })
  })
})


