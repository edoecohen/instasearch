angular.module("app", [])
.controller("MainCtrl", function($scope, $http) {
	$scope.landing = true;
	$scope.count = true;

	$scope.photos = [];
		/*{"url":"images/cats/cat1.jpeg","likes":"120"},
		{"url":"images/cats/cat2.jpeg","likes":"120"},
		{"url":"images/cats/cat3.jpg","likes":"120"},
		{"url":"images/cats/cat4.jpg","likes":"120"},
		{"url":"images/cats/cat5.jpg","likes":"120"},
		{"url":"images/cats/cat6.jpg","likes":"120"},
		{"url":"images/cats/cat7.jpg","likes":"120"},
		{"url":"images/cats/cat8.jpg","likes":"120"}
	];*/

	$scope.search = function() {

		//var query = $scope.tag;
		$scope.query = $scope.tag;

		$http.jsonp('https://api.instagram.com/v1/tags/'+$scope.query+'/media/recent', {params: {callback: 'JSON_CALLBACK', client_id: '18fc4f8c55a64a88a5e73e3341115167', count: 40}})
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
	}

	$scope.home = function () {
		$scope.count = true;
		$scope.landing = true;
	}

});

/*
- Animate results as they come in
- Hover over state
- Responsive for mobile
*/