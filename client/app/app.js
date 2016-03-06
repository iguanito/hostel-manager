'use strict';

angular.module('hostelManagerApp', [
  'hostelManagerApp.auth',
  'hostelManagerApp.admin',
  'hostelManagerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
        //for backward compatibility
            .when('/calculator', '/money')
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });