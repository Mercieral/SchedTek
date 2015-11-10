App.controller('groupController', ['$scope', '$location', 'SharedUserService', 'SharedGroupService', function($scope, $location, SharedUserService, SharedGroupService){
	$scope.User = SharedUserService;
	$scope.Group = SharedGroupService;
	
	loadSQLRecords();
	
	function loadSQLRecords(){
		var invocationData = {
			adapter : 'SchedTekDB',
			procedure : 'getGroups',
			parameters : [$scope.User.userID]
		};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : loadSQLQueerySuccess,
			onFailure : loadSQLQueeryFailure
		});
	}
	
	function loadSQLQueerySuccess(result){
		WL.Logger.debug("Retrieve success" +  JSON.stringify(result));
		$scope.groups = result.invocationResult.resultSet;
		$scope.$apply();
		console.log($scope.groups);
	}

	function loadSQLQueeryFailure(result){
		WL.Logger.error("Retrieve failure");
	}
	
	$scope.view = function(group){
		console.log(group.Group_Name);
		$scope.Group.groupID = group.Group_ID;
		$scope.Group.groupName = group.Group_Name;
		$scope.Group.groupDescription = group.Description;
		$location.path("/viewgroup");
	}
}]);