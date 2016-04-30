'use strict';

describe('Controller: FormatCtrl', function () {

  // load the controller's module
  beforeEach(module('hostelManagerApp'));

  var FormatCtrl, scope;

  var bookingContent = '1454626 · Hostel Kinkaju \n\
  Zinedine Zidane\n\
  1 chambre · US$76,80\n\
  Avez-vous déjà débité le client ?\n\
  12&#47;67 Bayswater Road, Sydney, 2011, Australie\n\
  Chambres 1 \n\
  Nom du client   Zinedine Zidane\n\
  Arrivée	19-04-2016\n\
  Départ 	20-04-2016\n\
  Type d\'hébergement 	Lit dans un Dortoir Mixte de 6 Lits\n\
  Nombre de personnes 	1\n\
  Arrivée 	mardi 19 avril 2016\n\
  Départ 	mercredi 20 avril 2016\n\
  Nombre de nuitées 	2\n\
  Montant total confirmé au client\n\
  Tarif de l\'hébergement 	US$15,60\n\
  Total confirmé au client 	US$15,60\n\
  Non compris 13 % de TVA 	US$2,03\n\
  Détails de la commission\n\
  Montant soumis à commission : 	US$15,60\n\
  Commission 	US$2,34\n\
  Tarifs par nuitée\n\
  Date 	Tarif 	Tarif\n\
  04/19 	US$15,60 	Standard Rate\n\
  Tarifs par nuitée pour 1 personne 	US$15,60\n\
  Statut 	ok\n\
  Fumeurs ou non-fumeurs 	non-smoking\n\
  Applicable Conditions d\'annulation 	En cas d\'annulation ou de modification jusqu\'à 3 jours avant la date d\'arrivée, l\'établissement ne prélève pas de frais.\n\
  En cas d\'annulation ou de modification tardive ou de non-présentation, l\'établissement exige 100 % du montant de la première nuit.\n\
    Applicable Prépaiement / Dépôt de garantie 	L\'établissement ne demande pas de prépaiement.\n\
  Formule repas applicable 	Les repas ne sont pas compris dans le tarif de la chambre.\n\
    Chambres 2\n\
  Nom du client  	Beatrijs Goeman Borgesius\n\
  Arrivée	19-04-2016\n\
  Départ 	20-04-2016\n\
  Type d\'hébergement 	Lit dans un Dortoir Mixte de 6 Lits\n\
  Nombre de personnes 	1\n\
  Arrivée 	mardi 19 avril 2016\n\
  Départ 	mercredi 20 avril 2016\n\
  Nombre de nuitées 	1\n\
  Montant total confirmé au client\n\
  Tarif de l\'hébergement 	US$15,60\n\
  Total confirmé au client 	US$15,60\n\
  Non compris 13 % de TVA 	US$2,03\n\
  Approximate time of arrival: between 21:00 and 22:00 hours\n\
  Détails de la commission\n\
  Montant soumis à commission : 	US$15,60\n\
  Commission 	US$2,34\n\
  Tarifs par nuitée\n\
  Date 	Tarif 	Tarif\n\
  04/19 	US$15,60 	Standard Rate\n\
  Tarifs par nuitée pour 1 personne 	US$15,60\n\
  Statut 	ok\n\
  Fumeurs ou non-fumeurs 	non-smoking\n\
  Applicable Conditions d\'annulation 	En cas d\'annulation ou de modification jusqu\'à 3 jours avant la date d\'arrivée, l\'établissement ne prélève pas de frais.\n\
  En cas d\'annulation ou de modification tardive ou de non-présentation, l\'établissement exige 100 % du montant de la première nuit.\n\
  Applicable Prépaiement / Dépôt de garantie 	L\'établissement ne demande pas de prépaiement.\n\
  Formule repas applicable 	Les repas ne sont pas compris dans le tarif de la chambre.';

  var hwContent = "Hostelworld.com    Increase Bookings    FAQ0? Quality Score: Top performerHostel Kinkaju | manager | LogoutNew Bookings21April '16M	T	W	T	F	S	S				1	2	34	5	6	7	8	9	1011	12	13	14	15	16	1718	19	20	21	22	23	2425	26	27	28	29	30	booking search8.7HW RatingVM8.4Se8.9L8.8St9.7A8.6Cl9.0Fc7.8    Home    Bookings    Availability    Rooms & Rates    Property Setup    Reports    MarketingPrint this pageReference : 99295-225437765Customer Details    Name    David Camora\n   Email    address@gmail.com\n    Phone    2461058972    Nationality    Mexico\n    Booked    22nd Apr '16 22:29:42    Source    Hostelworld.com    Arriving    23rd May '16    Arrival Time    19.00\n    Persons    1 Male\nRoom Details    Date Acknowledged Room Type Persons Price\n     23rd May '16 N/A Basic 6 bed Mixed Dorm 1 CRC 7,800.00\n     24th May '16 N/A Basic 6 bed Mixed Dorm 1 CRC 7,800.00\n     Service Charge CRC 0.00     Total Price incl. Service Charge CRC 15,600.00     15% Deposit CRC 2,340.00     Balance Due CRC 13,260.00\n View Credit Card Informationhostelbookers.comhostels.combackpackonlinebedandbreakfastworld.comRecommend Hostelworld.comCopyright © 2016 Hostelworld.com Limited";  /* jshint ignore:line */


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormatCtrl = $controller('FormatCtrl', {
      $scope: scope
    });
  }));

  it('should detect find name in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.name).toEqual('David Camora');

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.name).toEqual('Zinedine Zidane');
  });

  it('should detect find email in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.email).toEqual('address@gmail.com');
  });

  it('should detect find nationality in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.nationality).toEqual('Mexico');

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.nationality).toEqual('Australie');
  });

  it('should detect arrival time in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.arrivalTime).toEqual('19:00');

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.arrivalTime).toEqual('21:00-22:00');
  });

  it('should detect number of people in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.peopleNumber).toEqual(1);

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.peopleNumber).toEqual(2);
  });

  it('should detect price in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.price).toEqual('13260');

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.price).toEqual('76,80');
  });

  it('should detect currency in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.currency).toEqual('CRC');

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.currency).toEqual('USD');
  });

  it('should detect number of nights in content', function () {
    scope.extractAndFormatGuestInfo(hwContent, 'hostelworld');
    expect(scope.guest.nights).toEqual(2);

    scope.extractAndFormatGuestInfo(bookingContent, 'booking');
    expect(scope.guest.nights).toEqual(2);
  });

  it('should return a range of number', function () {
    var range = scope.peopleRange(3);
    expect(range).toEqual([0,1]);
  });

});


