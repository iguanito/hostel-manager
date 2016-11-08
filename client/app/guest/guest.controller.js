'use strict';


(function () {

  class GuestCtrl {

    constructor($http, $scope, $state, $stateParams) {
      this.$http = $http;
      this.$scope = $scope;
      this.$state = $state;
      this.defaultGuest = {
        personNb: 1,
        currency: 'dollar',
        roomType: 'Dorm',
        bookingType: 'Hostelworld'
      };

      if($stateParams.guestId){
          this.getGuest($stateParams.guestId);
      } else {
          this.reset();
      }
    }

    reset() {
        this.$scope.guest = {
            personNb: this.defaultGuest.personNb,
            currency: this.defaultGuest.currency,
            roomType: this.defaultGuest.roomType,
            bookingType: this.defaultGuest.bookingType
        };
    }

    addGuest(guest) {
      if (!_.isEqual(guest, this.defaultGuest)) {
        this.$http.post('/api/guests', guest).then(
          function (response) {
            this.$state.go('guest.display', {guestId: response.data._id});
          }.bind(this),
          function (response) {
            this.$scope.error = response.data;
          }.bind(this)
        );
      }
    }

    getGuest(guestId){
      if(guestId) {
        this.$http.get('/api/guests/' + guestId).then(
          function (response) {
            this.$scope.guest = response.data;
          }.bind(this),
          function () {
            //TODO improve
            this.$scope.guest = 'Guest not found';
          }.bind(this)
        );
      }
    }
      
    editGuest(guestId){
        if(guestId){
            this.$state.go('guest.edit', {guestId: guestId});
        }
    }
      
    updateGuest(guest) {
      if(guest){
        this.$http.put('/api/guests/' + guest._id, guest).then(
            function (response) {
                this.$state.go('guest.display', {guestId: response.data._id});
            }.bind(this),
            function (response) {
                this.$scope.error = response.data;
            }.bind(this)
            );
      }
  }
        deleteGuest(id){
          this.$http.delete('/api/guests/' + id).then(
              function () {
                  this.$state.go('guest.search');
              }.bind(this),
              function (response) {
                  this.$scope.error = response.data;
              }.bind(this)
          );
      }

    searchGuestFromName(name) {
        return this.$http.get('/api/guests/search', {
            params: {
                name: name,
            }
        }).then(function(response) {
                return response.data;
        }.bind(this),
            function (response) {
                this.$scope.error = response.data;
        }.bind(this));
    }

    displayGuest($item){
        this.$state.go('guest.display', {guestId: $item._id});
    }
}

  angular.module('hostelManagerApp').controller('GuestCtrl', GuestCtrl);
})();
