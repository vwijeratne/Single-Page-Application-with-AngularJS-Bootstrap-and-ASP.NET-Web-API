var SPAApp = angular.module("SPAApp", ['ngRoute', 'MainService']);

SPAApp.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

SPAApp.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/Add', {
                templateUrl: 'Views/Add.html',
                controller: 'AddController'
            })
            .when('/Edit', {
                templateUrl: 'Views/Edit.html',
                controller: 'EditController'
            })
            .when('/Delete', {
                templateUrl: 'Views/Delete.html',
                controller: 'DeleteController'
            })
            .when('/Home', {
                templateUrl: 'Views/Home.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/Home'
            });
}]);

