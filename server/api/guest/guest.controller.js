/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/guests              ->  index
 * POST    /api/guests              ->  create
 * GET     /api/guests/:id          ->  show
 * PUT     /api/guests/:id          ->  update
 * DELETE  /api/guests/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Guest from './guest.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Guests
export function index(req, res) {
  Guest.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Guest from the DB
export function show(req, res) {
  Guest.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Guest in the DB
export function create(req, res) {
  Guest.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Guest in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Guest.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Guest from the DB
export function destroy(req, res) {
  Guest.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function buildDbQuery(queryParams) {
  var query = {};

  if(queryParams.name){
    return {$or:
      [
        {firstName: new RegExp(queryParams.name, 'i')},
        {lastName: new RegExp(queryParams.name, 'i')}
      ]
    };
  }

  if(queryParams.fromDate  && queryParams.toDate) {
    return {$or:
      [
        {'date.startDate': {$gte: new Date(queryParams.fromDate), $lte: new Date(queryParams.toDate)}},
        {'date.endDate': {$gte: new Date(queryParams.fromDate), $lte: new Date(queryParams.toDate)}},
        {$and:[
          {'date.startDate': {$lt: new Date(queryParams.fromDate)}},
          {'date.endDate': {$gt: new Date(queryParams.toDate)}}
        ]}
      ]
    };
  }
}

export function search(req, res) {
  Guest.findAsync(buildDbQuery(req.query))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

