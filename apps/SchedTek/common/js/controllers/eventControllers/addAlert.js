App.controller('addAlertController', ['$scope', '$location', 'SharedUserService', 'SharedEventService', function($scope, $location, SharedUserService, SharedEventService){
	$scope.User = SharedUserService;
	$scope.Event = SharedEventService;
	$scope.addAlert = function(){
		console.log("add alert Test");
	}
}]);