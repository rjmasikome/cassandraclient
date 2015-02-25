angular.module('MyApp')
  .factory('Show', ['$resource', function($resource) {
    return {
    	keyspaces: $resource('/api/metakey'),
    	tables: $resource('/api/metatable')
    };
}]);