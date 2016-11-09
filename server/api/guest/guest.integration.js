'use strict';

var app = require('../..');
import request from 'supertest-as-promised';

var guest = {
  firstName: 'firstName',
  lastName: 'lastName',
  country: 'groland',
  date: 'date',
  arrivalHour: 'arrivalHour',
  roomType: 'roomType',
  personNb: 1,
  price: 100,
  currency: 'CRC',
  bookingType: 'hw',
  note: 'note'
};

var anotherGuest = {
  firstName: 'anotherName',
  lastName: 'anotherName',
  country: 'groland',
  date: 'date',
  arrivalHour: 'arrivalHour',
  roomType: 'roomType',
  personNb: 1,
  price: 100,
  currency: 'CRC',
  bookingType: 'hw',
  note: 'note'
};

describe('Guest API:', function() {
  var guests;
  before(function() {
    return request(app)
      .post('/api/guests/')
      .send(guest)
      .expect(201)
      .then(function(res){
        return request(app)
          .post('/api/guests/')
          .send(anotherGuest)
          .expect(201)
      });
  });

  after(function(done){
    guests.forEach(
      function (guest, index) {
        request(app)
          .delete('/api/guests/' + guest._id)
          .expect(204)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            if(index === guests.length - 1) done();
          });
      });
  });

  it('should respond with JSON array', function() {
    return request(app)
      .get('/api/guests')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function(res) {
        guests = res.body;
      })
      .then(function(){
        guests.should.be.instanceOf(Array);
        // guests.should.have.length(3);
      });
  });
});

describe('POST /api/guests', function() {
  var createdGuest;

  before(function() {
    return request(app)
      .post('/api/guests')
      .send(guest)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function(res){
        createdGuest = res.body
      });
  });

  after(function () {
    return request(app)
      .delete('/api/guests/' + createdGuest._id)
      .then(function(){
        createdGuest = {};
      });
  });

  it('should respond with the newly created guest', function() {
    createdGuest.firstName.should.equal(guest.firstName);
    createdGuest.lastName.should.equal(guest.lastName);
    createdGuest.country.should.equal(guest.country);
    createdGuest.date.should.equal(guest.date);
    createdGuest.arrivalHour.should.equal(guest.arrivalHour);
    createdGuest.roomType.should.equal(guest.roomType);
    createdGuest.personNb.should.equal(guest.personNb.toString());
    createdGuest.price.should.equal(guest.price.toString());
    createdGuest.currency.should.equal(guest.currency);
    createdGuest.bookingType.should.equal(guest.bookingType);
    createdGuest.note.should.equal(guest.note);
  });

});

describe('GET /api/guests/:id', function() {
  var retrievedGuest;

  before(function() {
    return request(app)
    //create guest in db
      .post('/api/guests')
      .send(guest)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function (res) {
        // get user from db
        return request(app)
          .get('/api/guests/' + res.body._id)
          .expect(200)
          .expect('Content-Type', /json/)
      })
      .then(function(res){
        // save user from db
        retrievedGuest = res.body;
      });
  });

  after(function() {
    return request(app).delete('/api/guests/' + retrievedGuest._id).then(function () {
      retrievedGuest = {};
    });
  });

  it('should respond with the requested guest', function() {
    retrievedGuest.firstName.should.equal(guest.firstName);
    retrievedGuest.lastName.should.equal(guest.lastName);
    retrievedGuest.country.should.equal(guest.country);
    retrievedGuest.date.should.equal(guest.date);
    retrievedGuest.arrivalHour.should.equal(guest.arrivalHour);
    retrievedGuest.roomType.should.equal(guest.roomType);
    retrievedGuest.personNb.should.equal(guest.personNb.toString());
    retrievedGuest.price.should.equal(guest.price.toString());
    retrievedGuest.currency.should.equal(guest.currency);
    retrievedGuest.bookingType.should.equal(guest.bookingType);
    retrievedGuest.note.should.equal(guest.note);
  });

});

describe('PUT /api/guests/:id', function() {
  var updatedGuest;

  before(function() {
    //create guest in db
    return request(app)
      .post('/api/guests')
      .send(guest)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function(res){
        return request(app)
          .put('/api/guests/' + res.body._id)
          .send({
            firstName: 'new firstName',
            lastName: 'new lastName',
            country: 'other land',
            date: 'new date',
            arrivalHour: 'new arrivalHour',
            roomType: 'new roomType',
            personNb: 2,
            price: 200,
            currency: 'USD',
            bookingType: 'Booking',
            note: 'new note'
          })
          .expect(200)
          .expect('Content-Type', /json/)
      }).then(function(res) {
        updatedGuest = res.body;
      });
  });

  after(function() {
    return request(app).delete('/api/guests/' + updatedGuest._id).then(function () {
      updatedGuest = {};
    });
  });

  it('should respond with the updated guest', function() {
    updatedGuest.firstName.should.equal('new firstName');
    updatedGuest.lastName.should.equal('new lastName');
    updatedGuest.country.should.equal('other land');
    updatedGuest.date.should.equal('new date');
    updatedGuest.arrivalHour.should.equal('new arrivalHour');
    updatedGuest.roomType.should.equal('new roomType');
    updatedGuest.personNb.should.equal('2');
    updatedGuest.price.should.equal('200');
    updatedGuest.currency.should.equal('USD');
    updatedGuest.bookingType.should.equal('Booking');
    updatedGuest.note.should.equal('new note');
  });

});



describe('GET /api/guests/search?name=:text', function() {
  var foundGuests;
  var createdGuestId;

  before(function () {
    //create guest in db
    return request(app)
      .post('/api/guests')
      .send(guest)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function(res){
        return request(app)
          .get('/api/guests/' + res.body._id)
          .expect(200)
          .expect('Content-Type', /json/)
      })
      .then(function(res){
        foundGuests = [res.body];
      });
  });

  after(function () {
    return request(app).delete('/api/guests/' + createdGuestId).then(function () {
      foundGuests = {};
    });
  });

  it('should respond with 200 and an array of results', function (done) {
    request(app)
      .get('/api/guests/search?name=lastN')
      .expect('Content-Type', /json/)
      .expect(200, foundGuests, done);
  });
});

describe('DELETE /api/guests/:id', function() {

  var guestId;


  it('should respond with 204 on successful removal', function() {

    return request(app)
      .post('/api/guests')
      .send(guest)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function (res) {
        return request(app)
          .get('/api/guests/' + res.body._id)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(guestId = res.body._id);
      })
      .then(function(res) {
          return request(app)
            .delete('/api/guests/' + guestId)
            .expect(204);
        }
      );

  });

  it('should respond with 404 when guest does not exist', function() {
    return request(app)
      .delete('/api/guests/582214ae5267e19624307434')
      .expect(404);
  });
});
