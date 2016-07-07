'use strict';

(function () {

    class CurrencyCtrl {
        constructor() {
            this.reset();
        }

        calculateReturnColones() {
            var priceInColones = this.priceColones ? this.priceColones : this.priceDollars * this.rate;
            this.displayedPriceColones = Math.round(priceInColones);
            var returnInColones = this.customerPaymentColones + this.customerPaymentDollars * this.rate - priceInColones;

            return returnInColones > 0 ? Math.round(returnInColones) : '';
        }

        calculateReturnDollars() {
            var priceInDollars = this.priceDollars ? this.priceDollars : this.priceColones / this.rate;
            this.displayedPriceDollars = this.keepMax2Digits(priceInDollars);
            var returnInDollars = this.customerPaymentDollars + this.customerPaymentColones / this.rate - priceInDollars;

            return returnInDollars > 0 ? this.keepMax2Digits(returnInDollars) : '';
        }

        computeReturnOrcardPayment(shouldCompute = true) {
            if (shouldCompute) {
                this.returnColones = this.calculateReturnColones();
                this.returnDollars = this.calculateReturnDollars();
                this.cardPaymentDollars = this.keepMax2Digits(this.displayedPriceDollars * (1 + this.cardPaymentCommissionPercent / 100));
            }
        }

        keepMax2Digits(numberWithLotsOfDigits) {
            return Math.round(numberWithLotsOfDigits * 100) / 100;
        }

        reset() {
            this.priceColones = '';
            this.priceDollars = '';
            this.displayedPriceColones = '';
            this.displayedPriceDollars = '';
            this.customerPaymentColones = '';
            this.customerPaymentDollars = '';
            this.returnColones = '';
            this.returnDollars = '';
            this.rate = '550';
            this.cardPayment = false;
            this.cardPaymentDollars = '';
            this.cardPaymentCommissionPercent = '5';
        }
    }
    
    

    angular.module('hostelManagerApp').controller('CurrencyCtrl', CurrencyCtrl);
})();