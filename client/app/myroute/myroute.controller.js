'use strict';


(function () {

    class MyRouteCtrl {
        constructor($http) {
            this.$http = $http;
            this.host = {};
        }

        addHost() {
            if (this.host) {
                this.$http.post('/api/host', this.host);
                this.host = {};
            }
        }

        reset() {
            this.host = {};
        }
    }

    angular.module('hostelManagerApp').controller('MyrouteCtrl', MyRouteCtrl);
})();