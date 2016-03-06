'use strict';

(function () {

    class CalculatorCtrl {
        constructor() {
            this.reset();
        }

        reset() {
            this.expression = '';
            this.result = '';
            this.isExpressionValid = true;
        }

        eval() {
            var expressionReg = /[-()\d/*+.]/;
            if (expressionReg.test(this.expression)) {
                try {
                    this.result = eval(this.expression); /*jshint ignore:line */
                    this.isExpressionValid = true;
                    return;
                } catch (ignored){            
                }
            } 
            
            this.result = '';
            this.isExpressionValid = this.expression === '' ? true : false;   
        }
        
        putAndEval(character) {
            this.expression += character;
            this.eval();
        }

        removeAndEval() {
            if (this.expression !== '' || this.result !== '') {
                this.expression = this.expression.slice(0, this.expression.length - 1);
                this.eval();
            }
        }
    }


    angular.module('hostelManagerApp').controller('CalculatorCtrl', CalculatorCtrl);
})();