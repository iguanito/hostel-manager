'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var guestCtrlStub = {
  index: 'guestCtrl.index',
  show: 'guestCtrl.show',
  create: 'guestCtrl.create',
  update: 'guestCtrl.update',
  destroy: 'guestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var guestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './guest.controller': guestCtrlStub
});

describe('Guest API Router:', function() {

  it('should return an express router instance', function() {
    guestIndex.should.equal(routerStub);
  });

  describe('GET /api/guests', function() {

    it('should route to guest.controller.index', function() {
      routerStub.get
        .withArgs('/', 'guestCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/guests/:id', function() {

    it('should route to guest.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'guestCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/guests', function() {

    it('should route to guest.controller.create', function() {
      routerStub.post
        .withArgs('/', 'guestCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/guests/:id', function() {

    it('should route to guest.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'guestCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/guests/:id', function() {

    it('should route to guest.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'guestCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/guests/:id', function() {

    it('should route to guest.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'guestCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
