App.controller('yearController', ['$scope', '$routeParams', 'SharedUserService', function($scope, $routeParams, SharedUserService){
	$scope.User = SharedUserService;
	$scope.message = 'calendar year controller stuffs';
	var cdt = new Date($routeParams.date);
	$scope.curyear = cdt.getFullYear();
	$scope.prevYear = function(){
		--$scope.curyear;
	};
	$scope.nextYear = function(){
		++$scope.curyear;
	};
}]);