'use strict';

angular.module('hostelManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
        .state('guest', {
          abstract: true,
          url: '/guest',
          template: '<ui-view/>'
        })
      .state('guest.create', {
        url: '/create',
        templateUrl: 'app/guest/guest.add.html',
        controller: 'GuestCtrl',
        controllerAs: 'guestCtrl'

      })
      .state('guest.search', {
        url: '/search',
        templateUrl: 'app/guest/guest.search.html',
        controller: 'GuestCtrl',
        controllerAs: 'guestCtrl'
      })
      .state('guest.display', {
        url: '/view',
        params: {
          guestId: null
        },
        templateUrl: 'app/guest/guest.display.html',
        controller: 'GuestCtrl',
        controllerAs: 'guestCtrl'
      })
      .state('guest.edit', {
        url: '/edit',
        params: {
          guestId: null
        },
        templateUrl: 'app/guest/guest.edit.html',
        controller: 'GuestCtrl',
        controllerAs: 'guestCtrl'
      });
  });
