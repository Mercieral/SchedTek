App.controller('accountController', ['$scope', 'SharedUserService', function($scope, SharedUserService){
	$scope.User = SharedUserService;
	$scope.message = 'account controller stuffs';
}]);