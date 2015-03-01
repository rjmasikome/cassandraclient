var MyApp = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
	  .when('/', {
	    templateUrl: 'views/explore.html',
	    controller: 'MainCtrl'
	  })
	  .when('/cql', {
	    templateUrl: 'views/cql.html',
	    controller: 'MainCtrl'
	  })
	  .when('/details', {
	    templateUrl: 'views/details.html',
	    controller: 'MainCtrl'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });

  }]);