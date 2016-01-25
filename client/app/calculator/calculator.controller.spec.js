'use strict';

describe('Controller: CalculatorCtrl', function () {

    // load the controller's module
    beforeEach(module('hostelManagerApp'));

    var CalculatorCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        CalculatorCtrl = $controller('CalculatorCtrl', {
            $scope: scope
        });
    }));

    it('should initiate controller', function () {
        expect(CalculatorCtrl).toBeDefined();
        expect(CalculatorCtrl.rate).toEqual('540');
        expect(CalculatorCtrl.priceColones).toEqual('');
        expect(CalculatorCtrl.priceDollars).toEqual('');
        expect(CalculatorCtrl.customerPaymentColones).toEqual('');
        expect(CalculatorCtrl.customerPaymentDollars).toEqual('');
        expect(CalculatorCtrl.returnColones).toEqual('');
        expect(CalculatorCtrl.returnDollars).toEqual('');
        expect(CalculatorCtrl.cardPayment).toBe(false);
        expect(CalculatorCtrl.cardPaymentDollars).toEqual('');
        expect(CalculatorCtrl.cardPaymentCommissionPercent).toEqual('5');    
    });
    
    it('should reset controller', function(){
        
        CalculatorCtrl.rate = 123;
        CalculatorCtrl.priceColones = 'hello';
        CalculatorCtrl.cardPaymentDollars = 'sd;fdsf';
        
        CalculatorCtrl.reset();
        
        expect(CalculatorCtrl.rate).toEqual('540');
        expect(CalculatorCtrl.priceColones).toEqual('');
        expect(CalculatorCtrl.priceDollars).toEqual('');
        expect(CalculatorCtrl.customerPaymentColones).toEqual('');
        expect(CalculatorCtrl.customerPaymentDollars).toEqual('');
        expect(CalculatorCtrl.returnColones).toEqual('');
        expect(CalculatorCtrl.returnDollars).toEqual('');
        expect(CalculatorCtrl.cardPayment).toBe(false);
        expect(CalculatorCtrl.cardPaymentDollars).toEqual('');
        expect(CalculatorCtrl.cardPaymentCommissionPercent).toEqual('5'); 
        
    });

    it('should compute displayed price and return price in colones with no decimal', function () {
        CalculatorCtrl.priceDollars = 10.23;
        CalculatorCtrl.customerPaymentColones = 6000;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.displayedPriceColones).toBe(5524);
        expect(CalculatorCtrl.returnColones).toBe(476);
    });

    it('should compute displayed price and return price in dollars with 2 decimals maximum', function () {
        CalculatorCtrl.priceColones = 2234;
        CalculatorCtrl.customerPaymentDollars = 5;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.displayedPriceDollars).toBe(4.14);
        expect(CalculatorCtrl.returnDollars).toBe(0.86);
    });


    it('should calculate return in colones', function () {
        CalculatorCtrl.priceColones = 21;
        CalculatorCtrl.customerPaymentColones = 27;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.returnColones).toBe(6);
    });

    it('should calculate return in dollars', function () {
        CalculatorCtrl.priceDollars = 21;
        CalculatorCtrl.customerPaymentDollars = 27;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.returnDollars).toBe(6);
    });

    it('should NOT calculate return in colones if payment lesser than price', function () {
        CalculatorCtrl.priceColones = 21;
        CalculatorCtrl.customerPaymentColones = 20;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.returnColones).toBe('');
    });

    it('should NOT calculate return in dollares if payment lesser than price', function () {
        CalculatorCtrl.priceDollars = 21;
        CalculatorCtrl.customerPaymentDollars = 20;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.returnDollars).toBe('');
    });

    it('should take into account customer payment in dollars AND in colones', function () {
        CalculatorCtrl.priceDollars = 15;
        CalculatorCtrl.customerPaymentDollars = 10;
        CalculatorCtrl.customerPaymentColones = 3000;

        CalculatorCtrl.computeReturnOrcardPayment();

        expect(CalculatorCtrl.returnColones).toBeCloseTo(300);
    });

    it('should not compute return if flag is set to false', function () {
        CalculatorCtrl.priceDollars = 15;
        CalculatorCtrl.customerPaymentDollars = 20;
        
        CalculatorCtrl.computeReturnOrcardPayment(false);

        expect(CalculatorCtrl.returnColones).toBe('');
        expect(CalculatorCtrl.returnDollars).toBe('');
    });
    
    it('should compute return with different change', function() {
        CalculatorCtrl.priceDollars = 15;
        CalculatorCtrl.customerPaymentDollars = 20;
        CalculatorCtrl.rate = 500;
        
        CalculatorCtrl.computeReturnOrcardPayment(true);

        expect(CalculatorCtrl.returnColones).toBe(2500);
    });
});