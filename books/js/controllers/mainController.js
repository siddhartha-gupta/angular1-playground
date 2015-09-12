booksApp.controller('mainController', function mainController($scope, $routeParams, $timeout, bookData) {
	$scope.books = {
		'searchQuery': '',
		'sortOrder': 'volumeInfo.title',
		'maxLimit': '10'
	};
	$scope.booksList = [];
	$scope.searchTimer = null;
	$scope.currentReq = null;

	$scope.getBooks = function() {
		$scope.books.searchQuery = $scope.books.searchQuery.trim();
		$timeout.cancel($scope.searchTimer);

		if ($scope.currentReq) {
			$scope.currentReq.abort();
		}

		if ($scope.books.searchQuery.length > 2) {
			$scope.searchTimer = $timeout(function(search) {
				$scope.currentReq = bookData.getAllBooks({
					'searchQuery': $scope.books.searchQuery,
					'maxLimit': $scope.books.maxLimit
				}).then(function(response) {
					$scope.currentReq = null;
					$scope.booksList = response.data.items;
					console.log('success: ', $scope.booksList);
				}, function(response) {
					$scope.currentReq = null;
					console.log('error: ', response);
				});
			}, 500);
		}
	};
});
