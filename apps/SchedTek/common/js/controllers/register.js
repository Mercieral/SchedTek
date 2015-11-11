App.controller('registerController', ['$scope', '$location', 'SharedUserService',
	function($scope, $location, SharedUserService){
		$scope.User = SharedUserService;
		$scope.formData = {};
		$scope.formData.email = '';
		$scope.formData.regusername = '';
		$scope.formData.regpassword = '';
		$scope.formData.first = '';
		$scope.formData.last = '';
		$scope.formData.phone = '';
		$scope.PassError = '';
		
		
		$scope.continuereg = function(){
			
			if ($scope.formData.regpassword != $scope.formData.passwordConfirm){
				console.log("error");
				$scope.PassError = "Password did not match";
				return;
			}
			
			var regData = {
				adapter : 'SchedTekDB',
				procedure : 'regSProc',
				parameters : [$scope.formData.email, $scope.formData.regusername, 
				              $scope.formData.regpassword, $scope.formData.first, 
				              $scope.formData.last, $scope.formData.phone]
			};

			WL.Client.invokeProcedure(regData,{
				onSuccess : getUserId,
				onFailure : loadSQLQueeryFailure
			});
			
			var userIdData = {
				adapter : 'SchedTekDB',
				procedure : 'getUserId',
				parameters : [$scope.formData.regusername]
			};
			
			function getUserId(result){
				WL.Client.invokeProcedure(userIdData,{
					onSuccess : loadSQLQueerySuccess,
					onFailure : loadSQLQueeryFailure
				});
			};

			function loadSQLQueerySuccess(result){
				console.log("success!");
				console.log(result);
				$scope.User.userID = result.invocationResult.resultSet[0].ID;
				$scope.User.username = $scope.formData.regusername;
				$scope.User.firstname = $scope.formData.first;
				$scope.User.lastname = $scope.formData.last;
				$scope.User.email = $scope.formData.email;
				$scope.User.phone = $scope.formData.phone;
				window.localStorage['user'] = JSON.stringify($scope.User);
				$location.path("/register2");
				$scope.$apply();
			}

			function loadSQLQueeryFailure(result){
				console.log("FAILURE!");
				$location.path("/login");
				$scope.$apply();
			}
		};
	}]
);