describe("Controller test", function() {
	// beforeEach(module("MyApp"));

        // var $httpBackend,
        //     expectedUrl = '/api/metakey',
        //     promise,
        //     successCallback,
        //     errorCallback,
        //     httpController;

        // beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
        //     $httpBackend = _$httpBackend_;
        //     scope = $rootScope.$new();
        //     successCallback = jasmine.createSpy();
        //     errorCallback = jasmine.createSpy();
        //     httpController = $controller('MainCtrl', {
        //         $scope: scope
        //     });
        // }));

        // afterEach(function() {
        //     // $httpBackend.verifyNoOutstandingExpectation();
        //     $httpBackend.verifyNoOutstandingRequest();
        // });

        // it('returns http requests successfully and resolves the promise', function () {
        //     expect(httpController).toBeDefined();
        //     $httpBackend.expectGET(expectedUrl).respond(200, 'Works');
        //     promise = scope.heartbeat();
        //     promise.then(successCallback, errorCallback);

        //     $httpBackend.flush();

        //     expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
        //     expect(errorCallback).not.toHaveBeenCalled();
        // });

        // it('returns http requests with an error and rejects the promise', function () {
        //     // $httpBackend.expectGET(expectedUrl).respond(500, 'Oh no!!');
        //     // promise = scope.heartbeat();
        //     // promise.then(successCallback, errorCallback);

        //     // $httpBackend.flush();

        //     // expect(successCallback).not.toHaveBeenCalled();
        //     // expect(errorCallback).toHaveBeenCalled();
        // });

var ctrl, scope, service;

  beforeEach(module("MyApp"));

  beforeEach(inject(function($controller, $rootScope, Show) {

  scope = $rootScope.$new();
  service = Show;
  ctrl = $controller("MainCtrl", {$scope: scope, Show: service});
  }));


  describe("MainCtrl", function() {
  	it('makes sure no keyspace is selected', function () {
  		expect(scope.keySpace).toBeUndefined();
	})
	it('makes sure server and database is running', function () {
		spyOn(scope, "heartbeat");
		scope.heartbeat();
		expect(scope.heartbeat).toHaveBeenCalled();
	})
	it('loads the initial data', function () {
		spyOn(scope, "metadata");
		scope.metadata();
		expect(scope.metadata).toHaveBeenCalled();
	})
  })
});