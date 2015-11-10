App.controller('settingsController', ['$scope', 'SharedUserService', '$location', function($scope, SharedUserService, $location){
	$scope.User = SharedUserService;
	$scope.message = 'settings controller stuffs';
	
	$scope.logout = function(){
		$scope.User.username = '';
		$scope.User.userID = '';
		$scope.User.firstname = '';
		$scope.User.lastname = '';
		$scope.User.email =  '';
		$scope.User.phone = '';
		window.localStorage.clear();
		$location.path("/login");
		$scope.$parent.showTabs = false;
	};
	
	
}]);