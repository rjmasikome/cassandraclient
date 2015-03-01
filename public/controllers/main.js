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

    $scope.GenerateTables = function(table, ks, tabmeta) {
        $scope.tableName = table;
        if(tabmeta=="dat"){
          $http.post('/api/gentable', {table: table, keyspace: ks}).
                success(function(data) {
                   console.log(data);
                   $scope.genData = data;
                   $scope.genMeta = null;
                }).error(function(err) {
                    $scope.errorMessage = err;
                    console.log(err);
                });
        }
        
        else if (tabmeta=="met"){
        $http.post('/api/genmeta', {table: table, keyspace: ks}).
                success(function(data) {
                   console.log(data);
                   $scope.genMeta = data;
                   $scope.genData = null;
                }).error(function(err) {
                    $scope.errorMessage = err;
                    console.log(err);
                });
        }
        // $scope.tables = Show.tables.query();
    };

    $scope.addShow = function(){
        $http.post('/api/cql', {textq: $scope.textQuery, keyspace: $scope.keySpace}).
                success(function(data) {
                   console.log(data);
                   $scope.genData = data;
           $scope.textQueryResult = "Query executed successfully!";
            // }).error(function(err) {
        }).error(function(data,status,headers,config){                
          //$scope.errorMessage = err;
                    //console.log(err);
          $scope.textQueryResult = "Failed! See error message below"
          $scope.genData = data;
                });
    };
  
   $scope.resetForm = function ()
    {
      $scope.textQuery="";
    $scope.textQueryResult="";
    $scope.genData="";
    };

    $scope.heartbeat();

  }]);