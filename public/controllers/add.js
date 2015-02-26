angular.module('MyApp')
  .controller('AddCtrl', ['$scope', '$http', 'Show', function($scope, $http, Show) {

    $scope.metadata = Show.metadata.query();

    $scope.GetTables = function(ks) {
        $scope.keySpace = ks;
    };

    $scope.addShow = function() {
        $http.post('/api/cql', {textq: $scope.textQuery, keyspace: $scope.keySpace}).
                success(function(data) {
                   console.log(data);
                   $scope.genData = data;
                }).error(function(err) {
                    $scope.errorMessage = err;
                    console.log(err);
                });
    };
  }]);