App.controller('eventController', ['$scope', '$location', 'SharedUserService','SharedEventService', function($scope, $location, SharedUserService, SharedEventService){
	console.log("event controller");
	$scope.User = SharedUserService;
	$scope.Event = SharedEventService;
	$scope.events = null;
	$scope.date = new Date();
	console.log($scope.date);
	$scope.message = $scope.date.toLocaleDateString();
	$scope.prevDay = function(){
		$scope.date.setDate($scope.date.getDate() - 1);
		$scope.message = $scope.date.toLocaleDateString();
	};
	$scope.nextDay = function(){
		$scope.date.setDate($scope.date.getDate() + 1);
		$scope.message = $scope.date.toLocaleDateString();
	};
	
	var startTime = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), 0, 0, 0);
	var endTime = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), 23, 59, 59);

	var dateTime = startTime.getUTCFullYear() + '-' +
    ('00' + (startTime.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + startTime.getUTCDate()).slice(-2) + ' ' + 
    ('00' + startTime.getUTCHours()).slice(-2) + ':' + 
    ('00' + startTime.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + startTime.getUTCSeconds()).slice(-2);
	
	var finishDateTime = endTime.getUTCFullYear() + '-' +
    ('00' + (endTime.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + endTime.getUTCDate()).slice(-2) + ' ' + 
    ('00' + endTime.getUTCHours()).slice(-2) + ':' + 
    ('00' + endTime.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + endTime.getUTCSeconds()).slice(-2);
	
	loadSQLRecords();
	
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
	
	function loadSQLRecords(){
		var invocationData = {
			adapter : 'SchedTekDB',
			procedure : 'getDayEvents',
			parameters : [$scope.User.username, dateTime, finishDateTime]
		};

		WL.Client.invokeProcedure(invocationData,{
			onSuccess : loadSQLQueerySuccess,
			onFailure : loadSQLQueeryFailure
		});
	}
	
	function loadSQLQueerySuccess(result){
		WL.Logger.debug("Retrieve success" +  JSON.stringify(result));
		$scope.events = result.invocationResult.resultSet;
		$scope.$apply();
		console.log($scope.events);
	}

	function loadSQLQueeryFailure(result){
		WL.Logger.error("Retrieve failure");
	}
}]);