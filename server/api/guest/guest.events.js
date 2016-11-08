/**
 * Guest model events
 */

'use strict';

import {EventEmitter} from 'events';
var Guest = require('./guest.model');
var GuestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GuestEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Guest.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GuestEvents.emit(event + ':' + doc._id, doc);
    GuestEvents.emit(event, doc);
  }
}

export default GuestEvents;
