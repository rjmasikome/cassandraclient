angular.module('MyApp')
  .factory('Show', ['$resource', function($resource) {
    return {
    	keyspaces: $resource('/metakey'),
    	tables: $resource('/metatable')
    };
}]);