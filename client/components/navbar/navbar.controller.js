    'use strict';

    class NavbarController {
        //start-non-standard
        menu = [{
                'title': 'Home',
                'state': 'main'
        },
            {
                'title': 'Guests',
                'subtitles':  [{
                    'title': 'Create guest',
                    'state': 'guest.create'
                },
                {
                    'title': 'Search guest',
                    'state': 'guest.search'
                }]
        },
            {
                'title': 'Money',
                'state': 'money'
        },
            {
                'title': 'Websites',
                'state': 'format'
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