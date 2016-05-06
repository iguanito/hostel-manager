'use strict';

angular.module('hostelManagerApp')
  .controller('FormatCtrl', function ($scope) {

    $scope.guest = {};
    $scope.website = 'hostelworld';
    var hw = {};
    var booking = {};

    $scope.reset = function () {
      $scope.guest = {};
      $scope.guestInfo = {};
      $scope.website = 'hostelworld';
    };

    $scope.extractAndFormatGuestInfo = function (rawGuestInfo, website) {
      $scope.guest={};
      var unformattedGuest;
      if(website === 'hostelworld'){
        unformattedGuest = extractGuestInfos(rawGuestInfo, hw.regexps, website);
        $scope.guest = formatGuestInfo(unformattedGuest, hw.formatings);
      } else if (website === 'booking'){
        unformattedGuest = extractGuestInfos(rawGuestInfo, booking.regexps, website);
        $scope.guest = formatGuestInfo(unformattedGuest, booking.formatings, website);
      }
    };

    hw.baseRegex = '[ \\n]+(.*)';
    hw.regexps = {
      name: new RegExp('Name' + hw.baseRegex),
      email: new RegExp('Email' + hw.baseRegex),
      nationality: new RegExp('Nationality' + hw.baseRegex),
      arrivalTime: new RegExp('Arrival Time' + hw.baseRegex),
      peopleNumber: new RegExp('Persons' + hw.baseRegex),
      price: new RegExp('Balance Due' + hw.baseRegex),
      currency: new RegExp('Balance Due' + hw.baseRegex),
      nights: /N\/A/g
    };

    booking.regexps = {
      name: /Nom du client[ ]+(.*)/,
      nationality: /.*,.*,.*, (.*)/,
      arrivalTime: /Approximate time of arrival: (.*)/,
      peopleNumber: new RegExp('Nombre de personnes.+([0-9]+)','g'),
      price: /[0-9]+ chambre[s]? · (.*)/,
      currency: /[0-9]+ chambre[s]? · (.*)/,
      nights: /Nombre de nuitées.+([0-9]+)/
    };

    hw.formatings = {
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
        return Number(unformatedPeopleNb.split(' ')[0]);
      }
    };

    booking.formatings = {
      arrivalTime: function (unformatedArrivalTime) {
        var test = /between ([0-9:]+) and ([0-9:]+) hours/.exec(unformatedArrivalTime);
        if(test) {
          return test[1] + '-' + test[2];
        }
      },
      price: function(unformatedPrice){
        var test = /[A-Z$]{3}([0-9,]+).*/.exec(unformatedPrice);
        if(test){
          return test[1];
        }
      },
      currency: function (unformatedCurrency) {
        var test = /([A-Z$]{3}).*/.exec(unformatedCurrency);
        if(test){
          if(test[1] === 'US$'){
            return 'USD';
          }

          return test[1];
        }
      },
      nights: function (unformatedNightNb){
        return Number(unformatedNightNb);
      }
    };

    var extractGuestInfos = function (rawGuestInfo, websiteRegexps, website) {
      var guest = {};
      for (var property in websiteRegexps) {
        if (property === 'nights' && website === 'hostelworld') {
          var occurenceNb = 0;
          while ((websiteRegexps[property].exec(rawGuestInfo)) !== null) {
            occurenceNb++;
          }
          websiteRegexps[property].lastIndex = 0;
          guest[property] = occurenceNb;
        } else if(property === 'peopleNumber' && website === 'booking'){
          var peopleNumber = 0;
          var testPeopleNb = websiteRegexps[property].exec(rawGuestInfo);
          while (testPeopleNb !== null) {
            peopleNumber+=Number(testPeopleNb[1]);
            testPeopleNb = websiteRegexps[property].exec(rawGuestInfo);
          }
          websiteRegexps[property].lastIndex = 0;
          guest[property] = peopleNumber;
        } else {
          var test = websiteRegexps[property].exec(rawGuestInfo);
          if (test) {
            guest[property] = test[1];
          }
        }
      }

      return guest;
    };

    var formatGuestInfo = function (guest, websiteFormatings) {
      for (var property in websiteFormatings) {
        if (guest.hasOwnProperty(property)) {
          guest[property] = websiteFormatings[property](guest[property]);
        }
      }

      return guest;
    };

    $scope.displayPeopleNb = function (unformatedPeopleNb) {
      if (unformatedPeopleNb === 1) {
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

    $scope.displayPrice = function(currency, price) {
      if(currency === 'CRC'){
        return '₡' + price;
      } else if (currency === 'USD'){
        return '$' + price;
      } else {
        return currency + price;
      }
    };

    $scope.displayWebsite = function(website) {
      var websiteNameFormatings = {
        hostelworld: 'HW',
        booking: 'BK'
      };

      return websiteNameFormatings[website];
    };

    $scope.peopleRange = function(peopleNb) {
      return _.range(peopleNb - 1);
    };

  });
