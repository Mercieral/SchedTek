App.controller('editGroupController', ['$scope', '$location', 'SharedUserService', 'SharedGroupService', function($scope, $location, SharedUserService, SharedGroupService){
	$scope.User = SharedUserService;
	$scope.Group = SharedGroupService;
	
	$scope.editGroup = function(){
		console.log("edit");
		if($scope.Group.groupName==null || $scope.Group.groupName==null){
			$scope.message = "Please Try Again";
			return;
		}
		console.log($scope.Group.groupID);
		var invocationData = {
				adapter : 'SchedTekDB',
				procedure : 'editGroup',
				parameters : [$scope.Group.groupID, $scope.Group.groupName, $scope.Group.groupDescription]
		};

		WL.Client.invokeProcedure(invocationData,{
				onSuccess : loadSQLQueerySuccess,
				onFailure : loadSQLQueeryFailure
		});
		
		function loadSQLQueerySuccess(result){
			$location.path("/viewgroup");
			$scope.$apply();
		}

		function loadSQLQueeryFailure(result){
			WL.Logger.error("Retrieve failure");
		}
		
	}
}]);