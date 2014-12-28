angular.module("app", ["ngAnimate"])
.controller("MainCtrl", function($scope, $http) {
	$scope.landing = true;
	$scope.count = true;
	$scope.photos = [];
	
	$scope.search = function() {

		//var query = $scope.tag;
		$scope.query = $scope.tag;

		$http.jsonp('https://api.instagram.com/v1/tags/'+$scope.query+'/media/recent', {params: {callback: 'JSON_CALLBACK', client_id: '18fc4f8c55a64a88a5e73e3341115167', count: 30}})
		.success(function(data) {
			$scope.photos = data.data;
			$scope.count = true;
			$scope.landing = false;
			//$scope.message = $scope.photos.length + " results found for " + query;

		})
		.error(function(data) {
			$scope.count = false;
		})
		.then(function() {
          $scope.tag = '';
       	});		
	};

	$scope.home = function () {
		$scope.count = true;
		$scope.landing = true;
	};

	$scope.showNow = function () {
		if ($(".sampleClass").css("float") == "none" ){
			show = false;
		}
		else {
			show = true;
		}
	}
	

});

/*
- Responsive for mobile - no hovers
*/