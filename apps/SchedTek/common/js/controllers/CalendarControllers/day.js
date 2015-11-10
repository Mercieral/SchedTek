App.controller('dayController', ['$scope', '$routeParams', '$location', 'SharedUserService', 'SharedEventService', function($scope, $routeParams, $location, SharedUserService, SharedEventService){
	$scope.User = SharedUserService;
	$scope.events = null;
	$scope.Event = SharedEventService;
	var year = $routeParams.day.substring(0,4);
	var month = $routeParams.day.substring(5,7);
	var day = $routeParams.day.substring(8,10);
	$scope.date = new Date(year, month-1, day);
	console.log($scope.date);
	$scope.message = $scope.date.toLocaleDateString();
	$scope.prevDay = function(){
		$scope.date.setDate($scope.date.getDate() - 1);
		$scope.message = $scope.date.toLocaleDateString();
		loadSQLRecords();
	};
	$scope.nextDay = function(){
		$scope.date.setDate($scope.date.getDate() + 1);
		$scope.message = $scope.date.toLocaleDateString();
		loadSQLRecords();
	};
	
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