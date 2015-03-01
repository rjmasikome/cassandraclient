MyApp
  .controller('MainCtrl', ['$scope', '$timeout', '$alert', '$http','Show', function($scope, $timeout, $alert, $http, Show) {

    $scope.metadata = Show.metadata.query();

    $scope.heartbeat = function() {
      $http.post('api/metakey').
        success(function(data) {
           console.log(data);
           $timeout($scope.heartbeat, 5000);
        }).error(function(err) {
            $scope.errorMessage = err;
            console.log(err);
            $alert({
                title: 'Error!',
                content: 'Connection lost. Please make sure your server or database is up and running.',
                placement: 'top-right',
                type: 'danger',
                duration: 10
              });
        });
      };

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
    };

    $scope.heartbeat();

  }]);