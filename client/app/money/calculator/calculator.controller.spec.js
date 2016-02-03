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
    
    it('should initiate controller', function(){
        expect(CalculatorCtrl.expression).toEqual('');
        expect(CalculatorCtrl.result).toEqual('');
        expect(CalculatorCtrl.isExpressionValid).toBe(true);
    });
    
    it('should reset expression', function(){
        CalculatorCtrl.expression = '1+2*4';
        
        CalculatorCtrl.reset();
        
        expect(CalculatorCtrl.expression).toEqual(''); 
    });
    
    it('should eval expression', function(){
        CalculatorCtrl.expression = '1+2*4';
        
        CalculatorCtrl.eval();
        
        expect(CalculatorCtrl.result).toEqual(9);
        expect(CalculatorCtrl.isExpressionValid).toBe(true);
    });
    
    it('should tell if expression is unvalid not write result when expresion contain unvalid characters', function(){
        CalculatorCtrl.expression = '1+2+3';
        CalculatorCtrl.eval();
        CalculatorCtrl.expression = '1+aze*12';
        
        CalculatorCtrl.eval();
        
        expect(CalculatorCtrl.result).toEqual('');
        expect(CalculatorCtrl.isExpressionValid).toBe(false);
    });
    
     it('should tell if expression is unvalid not write result when expresion is not valid mathematically', function(){
        CalculatorCtrl.expression = '1+2+3';
        CalculatorCtrl.eval();
        CalculatorCtrl.expression = '1++12';
        
        CalculatorCtrl.eval();
        
        expect(CalculatorCtrl.result).toEqual('');
        expect(CalculatorCtrl.isExpressionValid).toBe(false);
    });
    
    it('should add character to expression and evaluate it', function(){
        CalculatorCtrl.expression = '1+2+';
        
        CalculatorCtrl.putAndEval(3);
        
        expect(CalculatorCtrl.result).toEqual(6);
    });
    
    it('should remove character to expression and evaluate it', function(){
        CalculatorCtrl.expression = '1+2+';
        
        CalculatorCtrl.removeAndEval();
        
        expect(CalculatorCtrl.result).toEqual(3);
    });
    
});