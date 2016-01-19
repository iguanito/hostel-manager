'use strict';

angular.module('hostelManagerApp.auth', [
  'hostelManagerApp.constants',
  'hostelManagerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
