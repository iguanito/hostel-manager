'use strict';

angular.module('hostelManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calculator', {
        url: '/calculator',
        templateUrl: 'app/calculator/calculator.html',
        controller: 'CalculatorCtrl',
        controllerAs: 'calculator'
      });
  });
