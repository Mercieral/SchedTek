App.controller('editEventController', ['$scope', '$location', 'SharedUserService', 'SharedEventService', function($scope, $location, SharedUserService, SharedEventService){
	$scope.User = SharedUserService;
	$scope.Event = SharedEventService;
	var cdt = new Date();
	$scope.message = null;	
	$scope.editEvent = function(){
		if($scope.Event.eventName==null || $scope.Event.eventDescription==null || $scope.Event.eventLocation == null || $scope.Event.eventDate == null || $scope.Event.eventTime == null){
			$scope.message = "Please Try Again";
			$scope.$apply();
			return;
		}
		var date = new Date($scope.Event.eventDate);
		var time = new Date($scope.Event.eventTime);
		date.setHours(time.getHours());
		date.setMinutes(time.getMinutes());
		date.setSeconds(time.getSeconds());
		var dateTime = date.getUTCFullYear() + '-' +
	    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
	    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
	    ('00' + date.getUTCHours()).slice(-2) + ':' + 
	    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
	    ('00' + date.getUTCSeconds()).slice(-2);
		console.log(dateTime);
		var Data = {
				adapter : 'SchedTekDB',
				procedure : 'editEvent',
				parameters : [$scope.Event.eventID, $scope.Event.eventName, $scope.Event.eventDescription, $scope.Event.eventLocation, dateTime]
		};

		WL.Client.invokeProcedure(Data,{
			onSuccess : eventEdited,
			onFailure : eventNotEdited
		});

		function eventEdited(result){
			console.log("Success");
			$location.path("/event");
			$scope.$apply();
		}

		function eventNotEdited(result){
			console.log("FAILURE!");
		}
	}
	
	$scope.deleteEvent = function(){
		var Data = {
				adapter : 'SchedTekDB',
				procedure : 'deleteEvent',
				parameters : [$scope.Event.eventID]
		};

		WL.Client.invokeProcedure(Data,{
			onSuccess : eventDeleted,
			onFailure : eventNotDeleted
		});

		function eventDeleted(result){
			console.log("Success");
			$location.path("/event");
			$scope.$apply();
		}

		function eventNotDeleted(result){
			console.log("FAILURE!");
		}
	}
	
	$scope.cancel = function(){
		$scope.Event = originalEvent;
		$location.path("/viewevent");
	}
	
}]);