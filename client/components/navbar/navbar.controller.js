    'use strict';

    class NavbarController {
        //start-non-standard
        menu = [{
                'title': 'Home',
                'state': 'main'
        },
            {
                'title': 'Hosts',
                'state': 'myroute'
        },
            {
                'title': 'Calculator',
                'state': 'calculator'
    }];

        isCollapsed = true;
        //end-non-standard

        constructor(Auth) {
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
        }
    }

    angular.module('hostelManagerApp')
        .controller('NavbarController', NavbarController);