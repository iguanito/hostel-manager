'use strict';

describe('Controller: CurrencyCtrl', function () {

    // load the controller's module
    beforeEach(module('hostelManagerApp'));

    var CurrencyCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        CurrencyCtrl = $controller('CurrencyCtrl', {
            $scope: scope
        });
    }));

    it('should initiate controller', function () {
        expect(CurrencyCtrl).toBeDefined();
        expect(CurrencyCtrl.rate).toEqual('540');
        expect(CurrencyCtrl.priceColones).toEqual('');
        expect(CurrencyCtrl.priceDollars).toEqual('');
        expect(CurrencyCtrl.customerPaymentColones).toEqual('');
        expect(CurrencyCtrl.customerPaymentDollars).toEqual('');
        expect(CurrencyCtrl.returnColones).toEqual('');
        expect(CurrencyCtrl.returnDollars).toEqual('');
        expect(CurrencyCtrl.cardPayment).toBe(false);
        expect(CurrencyCtrl.cardPaymentDollars).toEqual('');
        expect(CurrencyCtrl.cardPaymentCommissionPercent).toEqual('5');    
    });
    
    it('should reset controller', function(){
        
        CurrencyCtrl.rate = 123;
        CurrencyCtrl.priceColones = 'hello';
        CurrencyCtrl.cardPaymentDollars = 'sd;fdsf';
        
        CurrencyCtrl.reset();
        
        expect(CurrencyCtrl.rate).toEqual('540');
        expect(CurrencyCtrl.priceColones).toEqual('');
        expect(CurrencyCtrl.priceDollars).toEqual('');
        expect(CurrencyCtrl.customerPaymentColones).toEqual('');
        expect(CurrencyCtrl.customerPaymentDollars).toEqual('');
        expect(CurrencyCtrl.returnColones).toEqual('');
        expect(CurrencyCtrl.returnDollars).toEqual('');
        expect(CurrencyCtrl.cardPayment).toBe(false);
        expect(CurrencyCtrl.cardPaymentDollars).toEqual('');
        expect(CurrencyCtrl.cardPaymentCommissionPercent).toEqual('5'); 
        
    });

    it('should compute displayed price and return price in colones with no decimal', function () {
        CurrencyCtrl.priceDollars = 10.23;
        CurrencyCtrl.customerPaymentColones = 6000;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.displayedPriceColones).toBe(5524);
        expect(CurrencyCtrl.returnColones).toBe(476);
    });

    it('should compute displayed price and return price in dollars with 2 decimals maximum', function () {
        CurrencyCtrl.priceColones = 2234;
        CurrencyCtrl.customerPaymentDollars = 5;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.displayedPriceDollars).toBe(4.14);
        expect(CurrencyCtrl.returnDollars).toBe(0.86);
    });


    it('should calculate return in colones', function () {
        CurrencyCtrl.priceColones = 21;
        CurrencyCtrl.customerPaymentColones = 27;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.returnColones).toBe(6);
    });

    it('should calculate return in dollars', function () {
        CurrencyCtrl.priceDollars = 21;
        CurrencyCtrl.customerPaymentDollars = 27;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.returnDollars).toBe(6);
    });

    it('should NOT calculate return in colones if payment lesser than price', function () {
        CurrencyCtrl.priceColones = 21;
        CurrencyCtrl.customerPaymentColones = 20;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.returnColones).toBe('');
    });

    it('should NOT calculate return in dollares if payment lesser than price', function () {
        CurrencyCtrl.priceDollars = 21;
        CurrencyCtrl.customerPaymentDollars = 20;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.returnDollars).toBe('');
    });

    it('should take into account customer payment in dollars AND in colones', function () {
        CurrencyCtrl.priceDollars = 15;
        CurrencyCtrl.customerPaymentDollars = 10;
        CurrencyCtrl.customerPaymentColones = 3000;

        CurrencyCtrl.computeReturnOrcardPayment();

        expect(CurrencyCtrl.returnColones).toBeCloseTo(300);
    });

    it('should not compute return if flag is set to false', function () {
        CurrencyCtrl.priceDollars = 15;
        CurrencyCtrl.customerPaymentDollars = 20;
        
        CurrencyCtrl.computeReturnOrcardPayment(false);

        expect(CurrencyCtrl.returnColones).toBe('');
        expect(CurrencyCtrl.returnDollars).toBe('');
    });
    
    it('should compute return with different change', function() {
        CurrencyCtrl.priceDollars = 15;
        CurrencyCtrl.customerPaymentDollars = 20;
        CurrencyCtrl.rate = 500;
        
        CurrencyCtrl.computeReturnOrcardPayment(true);

        expect(CurrencyCtrl.returnColones).toBe(2500);
    });
});