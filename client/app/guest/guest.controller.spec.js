'use strict';

describe('Controller: GuestCtrl', function () {

    // load the controller's module
    beforeEach(module('hostelManagerApp'));

    var GuestCtrl, createController, scope, httpBackend, state, rootScope;

    var defaultGuest = {
        personNb: 1,
        currency: 'dollar',
        roomType: 'Dorm',
        bookingType: 'Hostelworld'
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $state) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        state = $state;
        createController = function (id) {
            GuestCtrl = $controller('GuestCtrl', {
                $scope: scope,
                $state: $state,
                $stateParams: {guestId: id}
            });
        };

        createController();

        httpBackend.expectGET('app/main/main.html').respond(200);
        httpBackend.flush();
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should instanciate controller', function () {
        expect(scope.guest).toEqual(defaultGuest);
        expect(GuestCtrl).not.toBeNull();
    });

    it('should instanciate controller fetching guest', function () {
        var newGuest = {
            _id: 1234,
            firstName: 'ninja'
        };
        httpBackend.expectGET('/api/guests/1234').respond(newGuest);

        createController(1234);

        httpBackend.flush();
        expect(GuestCtrl).not.toBeNull();
        expect(scope.guest).toEqual(newGuest);
    });

    it('should reset guest in scope', function () {
        scope.guest = {};

        GuestCtrl.reset();

        expect(scope.guest).toEqual(defaultGuest);
    });

    it('should add guest in database and display and go to display state with id in params', function () {
        var guest = {
            name: 'davour'
        };
        httpBackend.expectPOST('/api/guests', guest).respond(200, {_id: '1234'});
        spyOn(state, 'go');

        GuestCtrl.addGuest(guest);

        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('guest.display', {guestId: '1234'});
    });

    it('should add guest in database but receive error response', function () {
        var guest = {
            name: 'davour'
        };
        var errorObject = {error: 'error'};
        httpBackend.expectPOST('/api/guests', guest).respond(500, errorObject);

        GuestCtrl.addGuest(guest);

        httpBackend.flush();
        expect(scope.error).toEqual(errorObject);
    });

    it('should NOT add guest in database if default guest', function () {
        GuestCtrl.addGuest(defaultGuest);
        //no unexpected request
    });

    it('should get guest from backend', function () {
        var guest = {
            name: 'liesbet'
        };
        httpBackend.expectGET(/\/api\/guests\/[0-9]+/).respond(200, guest);

        GuestCtrl.getGuest(123);

        httpBackend.flush();
        expect(scope.guest).toEqual(guest);
    });

    it('should NOT get guest from backend', function () {
        httpBackend.expectGET(/\/api\/guests\/[0-9]+/).respond(500);

        GuestCtrl.getGuest(123);

        httpBackend.flush();
        expect(scope.guest).toEqual('Guest not found');
    });

    it('should go to edit state', function () {
        spyOn(state, 'go');

        GuestCtrl.editGuest(123);

        expect(state.go).toHaveBeenCalledWith('guest.edit', {guestId: 123});
    });

    it('should update guest and go to display state', function () {
        var guestToUpdate = {
            name: 'ivan',
            _id: 123
        };
        httpBackend.expectPUT('/api/guests/123', guestToUpdate).respond(201, {_id: 123});
        spyOn(state, 'go');

        GuestCtrl.updateGuest(guestToUpdate);

        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('guest.display', {guestId: 123});
    });

    it('should delete guest and go to search state', function () {
        httpBackend.expectDELETE('/api/guests/123').respond(204);
        spyOn(state, 'go');

        GuestCtrl.deleteGuest(123);

        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('guest.search');
    });

    it('should search guest from name', function () {
        var expectedNames = {firstName: 'ruse'};
        httpBackend.expectGET('/api/guests/search?name=rus').respond(200, expectedNames);

        var promiseFoundNames = GuestCtrl.searchGuestFromName('rus');

        httpBackend.flush();
        rootScope.$digest();

        promiseFoundNames.then(function(resp){
            expect(resp).toEqual(expectedNames);
        });
    });

    it('should go to display customer state', function () {
        spyOn(state, 'go');

        GuestCtrl.displayGuest({_id:1234});

        expect(state.go).toHaveBeenCalledWith('guest.display', {guestId: 1234});
    });
});
