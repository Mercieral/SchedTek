App.controller('viewGroupController', ['$scope', '$location', 'SharedUserService', 'SharedGroupService', 'SharedEventService', function($scope, $location, SharedUserService, SharedGroupService, SharedEventService){
	$scope.User = SharedUserService;
	$scope.Group = SharedGroupService;
	$scope.Event = SharedEventService;
	
	loadSQLRecords();
	
	function loadSQLRecords(){
		var invocationDataMembers = {
			adapter : 'SchedTekDB',
			procedure : 'getGroupMembers',
			parameters : [$scope.Group.groupID]
		};
		
		var invocationDataEvents = {
				adapter : 'SchedTekDB',
				procedure : 'getGroupEvents',
				parameters : [$scope.Group.groupID]
		};

		WL.Client.invokeProcedure(invocationDataEvents,{
			onSuccess : loadSQLQueerySuccessEvents,
			onFailure : loadSQLQueeryFailure
		});
		
		WL.Client.invokeProcedure(invocationDataMembers,{
			onSuccess : loadSQLQueerySuccessMembers,
			onFailure : loadSQLQueeryFailure
		});
	}
	
	function loadSQLQueerySuccessMembers(result){
		WL.Logger.debug("Retrieve success" +  JSON.stringify(result));
		$scope.members = result.invocationResult.resultSet;
		$scope.$apply();
	}
	
	function loadSQLQueerySuccessEvents(result){
		WL.Logger.debug("Retrieve success" +  JSON.stringify(result));
		$scope.groupEvents = result.invocationResult.resultSet;
		$scope.$apply();
	}

	function loadSQLQueeryFailure(result){
		WL.Logger.error("Retrieve failure");
	}
	
	$scope.leaveGroup = function(){
		console.log("leaving");
		console.log($scope.User.userID);
		console.log($scope.Group.groupID);
		var invocationData = {
				adapter : 'SchedTekDB',
				procedure : 'leaveGroup',
				parameters : [$scope.User.userID, $scope.Group.groupID]
		};
	};
	
	$scope.view = function(event){
		$scope.Event.eventID = event.EventID;
		$scope.Event.eventName = event.Name;
		$scope.Event.eventDescription = event.Description;
		$scope.Event.eventLocation = event.Location;
		console.log(event["Time/Date"]);
		$scope.Event.eventDate = new Date(event["Time/Date"]);
		$scope.Event.eventTime = new Date(event["Time/Date"]);
		$location.path("/viewevent");
	}
}]);