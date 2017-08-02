let app = angular.module('myApp', []);

app.controller('LoginCheckCtrl', ['$scope', '$http', function($scope, $http){
  $scope.loginData = false;
  $scope.login = function(pin) {
    $scope.PIN = pin;
    if (pin === undefined || pin.toString().length !== 4) {
      alert("Your PIN must be exactly 4 numbers.");
      return;
    }
    $scope.statement = '';
    console.log("logging in");
    $scope.loginData = true;
    $scope.bankrupt = false;

    let pinURL = 'login/' + pin;
    $http.get(pinURL).then(function(results) {
      console.log("recieved balance", results.data);
      $scope.amount = results.data.Balance;
      if ($scope.amount === 0) {
      	$scope.statement = "You're broke! You can't make any withdrawals until you deposit more money.";
      	$scope.bankrupt = true;
      }
    }, function(e) {
      alert("error", e);
    });
  };
  $scope.logout = function() {
    $scope.PIN = 0; 
    $scope.loginData = false;
    $scope.bankrupt = false;
  };
  $scope.withdraw = function(amt) {
    if (amt === undefined || amt <= 0) {
      alert("Please enter an amount greater than 0.");
      return;
    };
    let withdrawURL = 'transaction/' + $scope.PIN + '/withdraw/' + amt;
    $http.get(withdrawURL).then(function(results) {
      console.log("recieved withdrawal balance", results.data);
      if (results.data.Balance <= 0) {
      	$scope.statement = "You're broke! We've given you your remaining balance of " + results.data.Amount + " dollars, but you can't make any more withdrawals until you deposit more money.";	
      	$scope.bankrupt = true;
      } else {
      	$scope.statement = "You have withdrawn " + results.data.Amount + " dollars."; 
      }
      $scope.amount = results.data.Balance;
    }, function(e) {
      alert("error", e);
    });
  };
  $scope.deposit = function(amt) {
    if (amt === undefined || amt <= 0) {
      alert("Please enter an amount greater than 0.");
      return;
    };
    let depositURL = 'transaction/' + $scope.PIN + '/deposit/' + amt;
    $http.get(depositURL).then(function(results) {
      console.log("recieved deposit balance", results.data);
      $scope.statement = "You have deposited " + results.data.Amount + " dollars.";
      $scope.amount = results.data.Balance;
      $scope.bankrupt = $scope.amount <= 0 ? true : false;
      amt = 0;
      return amt;
      }, function(e) {
      alert("error", e);
    });
  };
}]);
