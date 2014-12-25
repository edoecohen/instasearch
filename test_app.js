angular.module('CORSDemo', []).
	config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
	}).
	controller('MyController', function($scope, $http, $sce) {
		
		$scope.embedUrl = "http://www.youtube.com/embed/";
		
		$scope.trustSrc = function(src) {
		    return $sce.trustAsResourceUrl(src);
		};

		$scope.searchYouTube = function(keyword) {
			
			$scope.keyword = keyword;

			var url = "https://www.googleapis.com/youtube/v3/search";
			var request = {
				key: "AIzaSyBIT2homLIII4fhIFO1ePwQDKA_rm2Ym30",
				part: "snippet",
				maxResults: 10,
				order: "viewCount",
				q: keyword,
				type: "video",
				videoEmbeddable: true,
			};

			$http({
				method: 'GET',
				url: url,
				params: request
			}).
			success(function(data) {
				$scope.results = data.items;
			}).
			error(function() {
				alert('error');
			});
		};

	})

	.controller('PromisesExampleCtrl', function($scope, $timeout, $q) {
		function wait() {
			var defer = $q.defer();
			$timeout(function() {
				defer.resolve();
			}, 2000);
			return defer.promise;
		}

		function notify() {
			$scope.notifySaved = true;
			return wait().then(function() {
				$scope.notifySaved = false; 
			});
		}


		$scope.saveSettings = function() {
			$http.put('http://borken-api/update_password', $scope.data)
			.success(function() {
				notify();
			})
			.error(function() {
				$scope.error = true;
				notify().then(function() {
					$scope.error = false;
				});
			})
		};
	});
