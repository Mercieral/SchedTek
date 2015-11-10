App.controller('addGroupEventController', ['$scope', '$location', 'SharedUserService', 'SharedGroupService', function($scope, $location, SharedUserService, SharedGroupService){
	$scope.User = SharedUserService;
	$scope.Group = SharedGroupService;
	
	var cdt = new Date();
	$scope.message = null;
	$scope.gevent = {name: null, description: null, location: null, text: false, push: false, email: false, date: cdt, time: null};
	
	$scope.addEvent = function(){
		if($scope.gevent.name==null || $scope.gevent.description==null || $scope.gevent.location == null || $scope.gevent.time == null){
			$scope.message = "Please Try Again";
			return;
		}
		var eventDate = $scope.gevent.date;
		eventDate.setHours($scope.gevent.time.getHours());
		eventDate.setMinutes($scope.gevent.time.getMinutes());
		eventDate.setSeconds($scope.gevent.time.getSeconds());
		var dateTime = eventDate.getUTCFullYear() + '-' +
	    ('00' + (eventDate.getUTCMonth()+1)).slice(-2) + '-' +
	    ('00' + eventDate.getUTCDate()).slice(-2) + ' ' + 
	    ('00' + eventDate.getUTCHours()).slice(-2) + ':' + 
	    ('00' + eventDate.getUTCMinutes()).slice(-2) + ':' + 
	    ('00' + eventDate.getUTCSeconds()).slice(-2);
		console.log(dateTime);
		var Data = {
				adapter : 'SchedTekDB',
				procedure : 'addGroupEvent',
				parameters : [$scope.Group.groupID, $scope.gevent.name, $scope.gevent.description, $scope.gevent.location, dateTime]
		};
		
		WL.Client.invokeProcedure(Data,{
			onSuccess : eventAdded,
			onFailure : eventNotAdded
		});

		function eventAdded(result){
			console.log("Success");
			$location.path("/group");
		}

		function eventNotAdded(result){
			console.log("FAILURE!");
			$location.path("/group");
		}
		$location.path("/viewgroup");
	}
}]);