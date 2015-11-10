App.controller('viewEventController', ['$scope', 'SharedEventService', function($scope, SharedEventService){
	$scope.Event = SharedEventService;
	$scope.alerts = [];
}]);