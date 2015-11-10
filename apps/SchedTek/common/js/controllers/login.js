App.controller('LoginController', ['$scope', '$location', 'SharedUserService',
	function($scope, $location, SharedUserService)
	{
			$scope.User = SharedUserService;
			var temp = window.localStorage['user'];
			if (temp !== undefined){
				var loggedUser = JSON.parse(temp);
				console.log(loggedUser);
				$scope.User.userID = loggedUser.userID;
				$scope.User.username = loggedUser.username;
				$scope.User.firstname = loggedUser.firstname;
				$scope.User.lastname = loggedUser.lastname;
				$scope.User.email = loggedUser.email;
				$scope.User.phone = loggedUser.phone;
				
				$location.path("/event");
			
				$scope.$parent.showTabs = true;
			}
			$scope.loginData = {};
			$scope.loginData.userName='';
			$scope.loginData.password='';
			$scope.loginLoaded = false;
			
		
		
		$scope.submitLogin = function()
		{
			console.log("submit login");
			var Data = {
					adapter : 'SchedTekDB',
					procedure : 'logProc',
					parameters : [$scope.loginData.userName, $scope.loginData.password]
					//parameters : ["schedtek", "1234"]
			};

			WL.Client.invokeProcedure(Data,{
				onSuccess : loadSQLQueerySuccess,
				onFailure : loadSQLQueeryFailure
			});

			function loadSQLQueerySuccess(result){
				console.log("attempting to log in with username ", $scope.loginData.userName);
				WL.Logger.debug("Retrieve success" +  JSON.stringify(result));
				if (result.invocationResult.resultSet.length == 1){
					var userResults = result.invocationResult.resultSet[0];
					console.log("correct username/password, now adding active user");
					$scope.User.userID = userResults.ID;
					$scope.User.username = userResults.Username;
					$scope.User.firstname = userResults.FirstName;
					$scope.User.lastname = userResults.LastName;
					$scope.User.email = userResults.EmailAddress;
					$scope.User.phone = userResults.PhoneNumber;
					
					window.localStorage['user'] = JSON.stringify($scope.User);
					
					$location.path("/event");
					$scope.$parent.showTabs = true;
					$scope.$apply();
					//add stuff
				}
				else {
					console.log("incorrect username/password");
					//Not updating errorMsg until second click?
					$scope.loginData.errorMsg = "Incorrect username/password";
					$scope.$apply();
				}
			}

			function loadSQLQueeryFailure(result){
				console.log("FAILURE!");
			}
			
		 
		};
		
	}]
);