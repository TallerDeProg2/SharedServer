angular.module('Rules', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/rules')
		.success(function(data) {
			$scope.rules = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}
