App.controller('inviteController', ['$scope', '$location', 'SharedUserService', 'SharedGroupService', function($scope, $location, SharedUserService, SharedGroupService){
	$scope.User = SharedUserService;
	$scope.Group = SharedGroupService;
	$scope.value = {username: null, position: null};
	
	$scope.invite = function(){
		if($scope.value.position == null){
			$scope.message = "Please Try Again";
			$scope.$apply();
			return;
		}
		
		var Data = {
				adapter : 'SchedTekDB',
				procedure : 'addGroupMember',
				parameters : [$scope.value.username, $scope.value.position, $scope.Group.groupID]
		};

		WL.Client.invokeProcedure(Data,{
			onSuccess : groupMemberAdded,
			onFailure : groupMemberNotAdded
		});

		function groupMemberAdded(result){
			console.log("Success");
			$location.path("/viewgroup");
			$scope.$apply();
		}

		function groupMemberNotAdded(result){
			$scope.message = "Please Try Entering User Again"
			console.log("FAILURE!");
		}
	}
	
}]);