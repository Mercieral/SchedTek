App.controller('calendarController', ['$scope', '$routeParams', 'SharedUserService', function($scope, $routeParams, SharedUserService){
	$scope.User = SharedUserService;
	$scope.date = $routeParams.date;
	$scope.presetDate = $routeParams.date;
	$scope.message = $scope.presetDate;
}]);