var app = angular.module('AngularATM', []);

app.controller('MainCtrl', [ '$scope', function($scope){
  $scope.test = 'Hello world!';

	$scope.loginData = false
	$scope.login = function() {
		console.log($scope.loginData  ? 'logged in' : 'not logged in');
    	$scope.loginData = true;
	};
	$scope.logout = function() {
		console.log($scope.loginData ? 'logged in' : 'not logged in');
    	$scope.loginData = false;
	};
}]);