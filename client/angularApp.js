var app = angular.module('myApp', []);

app.controller('LoginCheckCtrl', ['$scope', '$http', function($scope, $http){
  $scope.test = 'Hello world!';
  $scope.loginData = false
  $scope.login = function(pin) {

    //GET amount from DB
    $scope.PIN = pin;
    console.log(typeof(pin), pin.length)
    if (pin.toString().length !== 4) {
      alert("Your PIN must be exactly 4 numbers.")
      return
    }
    console.log(pin)
    console.log(typeof(pin))
    $scope.statement = ''
    console.log($scope.loginData  ? 'logged in' : 'not logged in');
    $scope.loginData = true;

    let pinURL = 'login/' + pin
    $http.get(pinURL).then(function(results) {
      console.log("recieved balance", results.data);
      console.log(typeof(results.data.Balance))
      $scope.amount = results.data.Balance;
      // $scope.jobResults = results.data;
      // if ($scope.jobResults.length === 0) {
      //   $scope.message = 'No jobs found. Please check your search terms and try again.';
      // } else {
      //   $scope.message = ''
      // };
    }, function(e) {
      alert("error", e);
    });
  };
  $scope.logout = function() {
    console.log($scope.loginData ? 'logged in' : 'not logged in');
    $scope.PIN = 0; 
    $scope.loginData = false;
  };
  $scope.withdraw = function(amt) {
    let withdrawURL = 'transaction/' + $scope.PIN + '/withdraw/' + amt
    $http.get(withdrawURL).then(function(results) {
      console.log("recieved withdrawal balance", results.data);
      console.log(typeof(results.data))
      // $scope.jobResults = results.data;
      // if ($scope.jobResults.length === 0) {
      //   $scope.message = 'No jobs found. Please check your search terms and try again.';
      // } else {
      //   $scope.message = ''
      // };
    }, function(e) {
      alert("error", e);
    });
    if (amt > $scope.amount) { //move this logic server side
      $scope.statement = "WARNING: Overdraft for withdrawal of " + amt + " dollars. A 10 dollar conveience fee has been applied."
      $scope.amount = $scope.amount - amt - 10
    } else {
      $scope.statement = "You have withdrawn " + amt + " dollars."
      $scope.amount = $scope.amount - amt
    }
  }
  $scope.deposit = function(amt) {
    let depositURL = 'transaction/' + $scope.PIN + '/deposit/' + amt
    $http.get(depositURL).then(function(results) {
      console.log("recieved deposit balance", results.data);
      console.log(typeof(results.data))
      // $scope.jobResults = results.data;
      // if ($scope.jobResults.length === 0) {
      //   $scope.message = 'No jobs found. Please check your search terms and try again.';
      // } else {
      //   $scope.message = ''
      // };
    }, function(e) {
      alert("error", e);
    });
    $scope.statement = "You have deposited " + amt + " dollars."
    $scope.amount = $scope.amount + amt
  }
}]);
// var app = angular.module('flapperNews', []);

// app.controller('MainCtrl', [
// '$scope',
// function($scope){
// 	$scope.test = 'Hello world!';
//     $scope.loginData = false
//     $scope.login = function() {
//         console.log($scope.loginData  ? 'logged in' : 'not logged in');
//         $scope.loginData = true;
//     };
//     $scope.logout = function() {
//         console.log($scope.loginData ? 'logged in' : 'not logged in');
//         $scope.loginData = false;
//     };
// }]);

// var app = angular.module('AngularATM', []);

// app.controller('MainCtrl', [ '$scope', function($scope){
//   $scope.test = 'Hello world!';

// 	$scope.loginData = false
// 	$scope.login = function() {
// 		console.log($scope.loginData  ? 'logged in' : 'not logged in');
//     	$scope.loginData = true;
// 	};
// 	$scope.logout = function() {
// 		console.log($scope.loginData ? 'logged in' : 'not logged in');
//     	$scope.loginData = false;
// 	};
// }]);