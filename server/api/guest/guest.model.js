'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var guestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  country: String,
  date: Object,
  arrivalHour: String,
  roomType: String,
  personNb: String,
  price: String,
  currency: String,
  bookingType: String, 
  note: String
});

export default mongoose.model('Guest', guestSchema);
