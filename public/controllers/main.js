angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$http','Show', function($scope, $http, Show) {

    $scope.metadata = Show.metadata.query();

    $scope.GetTables = function(ks) {
        $scope.keySpace = ks;
        $http.post('/api/metatable', {keyspace: ks}).
                success(function(data) {
                   console.log(data);
                   $scope.tables = data;
                }).error(function(err) {
                    $scope.errorMessage = err;
                    console.log(err);
                });
        // $scope.tables = Show.tables.query();
    };

    $scope.GenerateTables = function(table, ks) {
        $scope.tableName = table;
        $http.post('/api/gentable', {table: table, keyspace: ks}).
                success(function(data) {
                   console.log(data);
                   $scope.genData = data;
                }).error(function(err) {
                    $scope.errorMessage = err;
                    console.log(err);
                });
        // $scope.tables = Show.tables.query();
    };

  }]);