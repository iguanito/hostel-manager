'use strict';

angular.module('hostelManagerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('money', {
                url: '/money',
                views: {
                    '': {
                        templateUrl: 'app/money/index.html'
                    },
                    'currency@money': {
                        templateUrl: 'app/money/currency/currency.html',
                        controller: 'CurrencyCtrl',
                        controllerAs: 'currency'
                    },
                    'calculator@money': {
                        templateUrl: 'app/money/calculator/calculator.html',
                        controller: 'CalculatorCtrl',
                        controllerAs: 'calculator'
                    }
                }
            });
    });