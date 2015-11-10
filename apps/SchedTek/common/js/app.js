var App = angular.module('App', ['ionic', 'ngRoute', 'pickadate']);

App.config(function($routeProvider){
		$routeProvider
		
		//route to login page
		.when('/',
		{
			templateUrl:'pages/settingsPages/login.html',
			controller: 'LoginController'
		})
		
		//route to account page
		.when('/account',
		{
			templateUrl: 'pages/settingsPages/account.html',
			controller: 'accountController'
		})
		
		//route to main page
		.when('/event',
		{
			templateUrl: 'pages/eventPages/event.html',
			controller: 'eventController'
		})
		
		//route to create event page
		.when('/createevent',
		{
			templateUrl: 'pages/eventPages/createevent.html',
			controller: 'addEventController'
		})
		
		//route to calendar page
		.when('/calendar/month/:date',
		{
			templateUrl: 'pages/calendarPages/calendar.html',
			controller: 'calendarController'
		})
		
		.when('/calendar/day/:day',
		{
			templateUrl: 'pages/calendarPages/day.html',
			controller: 'dayController'
		})
		
		.when('/calendar/year/:date',
		{
			templateUrl: 'pages/calendarPages/calendaryear.html',
			controller: 'yearController'
		})
		
		//route to group page
		.when('/group',
		{
			templateUrl: 'pages/groupPages/group.html',
			controller: 'groupController'
		})
		
		//route to group add page
		.when('/addGroup',
		{
			templateUrl: 'pages/groupPages/addGroup.html',
			controller: 'groupAddController'
		})
		
		//route to group invite page
		.when('/addMember',
		{
			templateUrl: 'pages/groupPages/addGroupMember.html',
			controller: 'inviteController'
		})
		
		//route to group event add
		.when('/groupEvent',
		{
			templateUrl: 'pages/groupPages/AddGroupEvent.html',
			controller: 'addGroupEventController'
		})
		
		//route to settings page
		.when('/settings',
		{
			templateUrl: 'pages/settingsPages/settings.html',
			controller: 'settingsController'
		})
		
		//route to specific group info
		.when('/viewgroup',
		{
			templateUrl:'pages/groupPages/groupoverview.html',
			controller: 'viewGroupController'
		})
		
		//route to edit group
		.when('/editGroup',
		{
			templateUrl: 'pages/groupPages/editGroup.html',
			controller: 'editGroupController'
		})
		
		//route to create todo
		.when('/createtodo',
		{
			templateUrl:'pages/eventPages/createtodo.html'
		})
		
		//route to update todo
		.when('/updatetodo',
		{
			templateUrl:'pages/eventPages/updatetodo.html'
		})
		
		
		//route to login
		.when('/login',
		{
			templateUrl: 'pages/settingsPages/login.html',
			controller: 'LoginController'
		})
		
		//route to register
		.when('/register',
		{
			templateUrl: 'pages/settingsPages/register1.html',
			controller: 'registerController'
		})
		
		//route to continued register
		.when('/register2',
		{
			templateUrl: 'pages/settingsPages/register2.html'
		})
		
		//route to viewing event
		.when('/viewevent',
		{
			templateUrl: 'pages/eventPages/viewevent.html',
			controller: 'viewEventController'
		})
		
		//route to edit event
		.when('/editevent',
		{
			templateUrl: 'pages/eventPages/editevent.html',
			controller: 'editEventController'
		})
		
		//default to main
		.otherwise({
			templateUrl: 'pages/eventPages/event.html',
			controller: 'eventController'
		});
});