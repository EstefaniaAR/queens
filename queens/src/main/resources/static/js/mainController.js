var app = angular.module("app", []);

app.controller("mainController", ["$scope","$http",function($scope, $http) 
{
    $scope.suffleDeck = function() 
    {
    	var resource = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        console.log("Suffling");
        $http.get(resource).then(
        function successCallback(response) 
        {
          $scope.deck = response.data;
          console.log(response.data);
        },
        function errorCallback(response) 
        {
          alert("Error:" + JSON.stringify(response.data));
          console.log(response);
        }
      );
    };
  }
]);
