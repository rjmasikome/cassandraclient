angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
	  .when('/', {
	    templateUrl: 'views/home.html',
	    controller: 'MainCtrl'
	  })
	  .when('/explore', {
	    templateUrl: 'views/explore.html',
	    controller: 'MainCtrl'
	  })
	  .when('/cql', {
	    templateUrl: 'views/cql.html',
	    controller: 'AddCtrl'
	  })
	  .when('/signup', {
	    templateUrl: 'views/signup.html',
	    controller: 'SignupCtrl'
	  })
	  .when('/add', {
	    templateUrl: 'views/add.html',
	    controller: 'AddCtrl'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });

  }]);