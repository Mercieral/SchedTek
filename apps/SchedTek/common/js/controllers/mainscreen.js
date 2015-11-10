App.controller('MainscreenController', ['$scope', 'SharedUserService',
	function($scope, SharedUserService)
	{
		$scope.showTabs = false;
		$scope.User = SharedUserService;
		console.log("Main Screen Controller", $scope);
		$scope.tabSelect = function(selected){
			$(".tab-item").removeClass("tab-item-active");
			$("#"+selected).addClass("tab-item-active");
		}
		var cdt = new Date();
		var year = cdt.getFullYear();
		var month = cdt.getMonth() + 1; //getMonth() starts at 0 for January
		//var day = cdt.getDate();
		$scope.curdate = year + "-" + month + "-" + 1;
	}]
);
