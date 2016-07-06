'use strict';

angular.module('hostelManagerApp')
    .controller('FormatCtrl', function ($scope) {

        $scope.guest = {};
        $scope.website = 'hostelworld';

        $scope.reset = function () {
            $scope.guest = {};
            $scope.guestInfo = {};
            $scope.website = 'hostelworld';
        };

        $scope.extractAndFormatGuestInfo = function (rawGuestInfo) {
            $scope.guest={};
            var unformattedGuest = extractGuestInfos(rawGuestInfo);
            $scope.guest = formatGuestInfo(unformattedGuest);
        };

        var baseRegex = '[ \\n]+(.*)';
        var regexps = {
            name: new RegExp('Name' + baseRegex),
            email: new RegExp('Email' + baseRegex),
            nationality: new RegExp('Nationality' + baseRegex),
            arrivalTime: new RegExp('Arrival Time' + baseRegex),
            peopleNumber: new RegExp('Persons' + baseRegex),
            price: new RegExp('Balance Due' + baseRegex),
            currency: new RegExp('Balance Due' + baseRegex),
            nights: /N\/A/g
        };

        var extractGuestInfos = function (rawGuestInfo) {
            var guest = {};
            for (var property in regexps) {
                if (property === 'nights') {
                    var occurenceNb = 0;
                    while ((regexps[property].exec(rawGuestInfo)) !== null) {
                        occurenceNb++;
                    }
                    regexps[property].lastIndex = 0;
                    guest[property] = occurenceNb;
                } else {
                    var test = regexps[property].exec(rawGuestInfo);
                    if (test) {
                        guest[property] = test[1];
                    }
                }
            }

            return guest;
        };

        var formatings = {
            arrivalTime: function (unformatedArrivalTime) {
                return unformatedArrivalTime.replace('.', ':');
            },
            price: function(unformatedPrice){
                var test = /[A-Z]{3} ([0-9,]+).*/.exec(unformatedPrice);
                if(test){
                    return test[1].replace(',', '');
                }
            },
            currency: function (unformatedCurrency) {
                var test = /([A-Z]{3}) .*/.exec(unformatedCurrency);
                if(test){
                    return test[1];
                }
            },
            peopleNumber: function(unformatedPeopleNb){
                return unformatedPeopleNb.split(' ')[0];
            }
        };

        var formatGuestInfo = function (guest) {
            for (var property in formatings) {
                if (guest.hasOwnProperty(property)) {
                    guest[property] = formatings[property](guest[property]);
                }
            }

            return guest;
        };

        $scope.displayPeopleNb = function (unformatedPeopleNb) {
            if (unformatedPeopleNb === '1') {
                return '1 persona';
            } else {
                return unformatedPeopleNb + ' personas';
            }
        };

        $scope.displayNightNb = function (unformatedNight) {
            if (unformatedNight === 1) {
                return '1 noche';
            } else {
                return unformatedNight + ' noches';
            }
        };

        $scope.displayPriceInDollars = function(currency, price) {
            if(currency === 'CRC'){
                return '$ ' + price/540;
            } else if (currency === 'USD'){
                return '$ ' + price;
            } else {
                return currency + price;
            }
        };

      $scope.displayWebsite = function(website) {
        var websiteNameFormatings = {
          hostelworld: 'HW',
          booking: 'B'
        };
        
        return websiteNameFormatings[website];
      };

        $scope.peopleRange = function(peopleNb) {
            return _.range(peopleNb - 1);
        };

    });
