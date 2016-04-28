'use strict';

describe('Controller: FormatCtrl', function () {

  // load the controller's module
  beforeEach(module('hostelManagerApp'));

  var FormatCtrl, scope, hwContent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormatCtrl = $controller('FormatCtrl', {
      $scope: scope
    });
    hwContent = "Hostelworld.com    Increase Bookings    FAQ0? Quality Score: Top performerHostel Kinkaju | manager | LogoutNew Bookings21April '16M	T	W	T	F	S	S				1	2	34	5	6	7	8	9	1011	12	13	14	15	16	1718	19	20	21	22	23	2425	26	27	28	29	30	booking search8.7HW RatingVM8.4Se8.9L8.8St9.7A8.6Cl9.0Fc7.8    Home    Bookings    Availability    Rooms & Rates    Property Setup    Reports    MarketingPrint this pageReference : 99295-225437765Customer Details    Name    David Camora\n   Email    address@gmail.com\n    Phone    2461058972    Nationality    Mexico\n    Booked    22nd Apr '16 22:29:42    Source    Hostelworld.com    Arriving    23rd May '16    Arrival Time    19.00\n    Persons    1 Male\nRoom Details    Date Acknowledged Room Type Persons Price\n     23rd May '16 N/A Basic 6 bed Mixed Dorm 1 CRC 7,800.00\n     24th May '16 N/A Basic 6 bed Mixed Dorm 1 CRC 7,800.00\n     Service Charge CRC 0.00     Total Price incl. Service Charge CRC 15,600.00     15% Deposit CRC 2,340.00     Balance Due CRC 13,260.00\n View Credit Card Informationhostelbookers.comhostels.combackpackonlinebedandbreakfastworld.comRecommend Hostelworld.comCopyright © 2016 Hostelworld.com Limited";  /* jshint ignore:line */
  }));

  it('should detect find name in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.name).toEqual('David Camora');
  });
    
  it('should detect find email in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.email).toEqual('address@gmail.com');
  });
    
  it('should detect find nationality in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.nationality).toEqual('Mexico');
  });
    
  it('should detect arrival time in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.arrivalTime).toEqual('19:00');
  });
    
  it('should detect number of people in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.peopleNumber).toEqual('1');
  });
 
  it('should detect price in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.price).toEqual('13260');
  });
    
  it('should detect currency in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.currency).toEqual('CRC');
  });
    
  it('should detect number of nights in content', function () {
    scope.extractAndFormatGuestInfo(hwContent);  
    expect(scope.guest.nights).toEqual(2);
  });  
    
        
  it('should retrun a range of number', function () {
    var range = scope.peopleRange(3);  
    expect(range).toEqual([0,1]);
  });    
    
    
    
  
    
  
    

    
    
    
});


