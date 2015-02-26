angular.module('MyApp')
  .factory('Show', ['$resource', function($resource) {
    return {
    	metadata: $resource('/api/metakey'),
    	tables: $resource('/api/metatable')
    };
}]);