'use strict';

angular.module('hostelManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('format', {
        url: '/format',
        templateUrl: 'app/format/format.html',
        controller: 'FormatCtrl'
      });
  });
