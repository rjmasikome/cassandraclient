angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$http','Show', function($scope, $http, Show) {

    $scope.keyspaces = Show.keyspaces.query();
    // $scope.filterByGenre = function(genre) {
    //   $scope.shows = Show.query({ genre: genre });
    //   $scope.headingTitle = genre;
    // };

    $scope.GetTables = function(ks) {
        $scope.keySpace = ks;
        $http.post('/metatable', {keyspace: ks}).
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
        $http.post('/gentable', {table: table, keyspace: ks}).
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