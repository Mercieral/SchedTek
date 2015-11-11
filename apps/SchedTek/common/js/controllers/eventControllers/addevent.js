App.controller('addEventController', ['$scope', '$location', 'SharedUserService', function($scope, $location, SharedUserService){
	$scope.User = SharedUserService;
	var cdt = new Date();
	cdt.setHours(17);
	cdt.setMinutes(0);
	cdt.setSeconds(0);
	$scope.message = null;
	$scope.event = {name: null, description: null, location: null, text: false, push: false, email: false, date: cdt, time: cdt};
	
	$scope.addEvent = function(){
		if($scope.event.name==null || $scope.event.description==null || $scope.event.location == null || $scope.event.time == null){
			$scope.message = "Please Try Again";
			$scope.$apply();
			return;
		}
		var eventDate = $scope.event.date;
		eventDate.setHours($scope.event.time.getHours());
		eventDate.setMinutes($scope.event.time.getMinutes());
		eventDate.setSeconds($scope.event.time.getSeconds());
		var dateTime = eventDate.getUTCFullYear() + '-' +
	    ('00' + (eventDate.getUTCMonth()+1)).slice(-2) + '-' +
	    ('00' + eventDate.getUTCDate()).slice(-2) + ' ' + 
	    ('00' + eventDate.getUTCHours()).slice(-2) + ':' + 
	    ('00' + eventDate.getUTCMinutes()).slice(-2) + ':' + 
	    ('00' + eventDate.getUTCSeconds()).slice(-2);
		console.log(dateTime);
		var Data = {
				adapter : 'SchedTekDB',
				procedure : 'addEvent',
				parameters : [$scope.User.username, $scope.event.name, $scope.event.description, $scope.event.location, dateTime]
		};

		WL.Client.invokeProcedure(Data,{
			onSuccess : eventAdded,
			onFailure : eventNotAdded
		});

		function eventAdded(result){
			console.log("Success");
			$location.path("/event");
			$scope.$apply();
		}

		function eventNotAdded(result){
			console.log("FAILURE!");
		}
	}
	
}]);