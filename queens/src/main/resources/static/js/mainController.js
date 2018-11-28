var app = angular.module("app", []);

app.controller("mainController", ["$scope","$http",function($scope, $http) 
{
	$scope.heartPile=[];
	$scope.diamondPile=[];
	$scope.clubPile=[];
	$scope.spadePile=[];
	$scope.queenPile = [];
    $scope.suffleDeck = function() 
    {
    	var resource = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        $http.get(resource).then(
        function successCallback(response) 
        {
          $scope.deck = response.data;
        },
        function errorCallback(response) 
        {
          alert("Error:" + JSON.stringify(response.data));
          console.log(response);
        }
      );
    };
    
    $scope.drawCard = function() 
    {
    	var resource = "https://deckofcardsapi.com/api/deck/"+$scope.deck.deck_id+"/draw/?count=1";
        $http.get(resource).then(
        function successCallback(response) 
        {
          $scope.deck = response.data;
          switch ($scope.deck.cards[0].suit)
          {
          	case "HEARTS":
          		$scope.heartPile.push($scope.deck.cards[0]);
          		break;
          		
          	case "DIAMONDS":
          		$scope.diamondPile.push($scope.deck.cards[0]);
          		break;
          		
          	case "CLUBS":
          		$scope.clubPile.push($scope.deck.cards[0]);
          		break;
          		
          	case "SPADES":
          		$scope.spadePile.push($scope.deck.cards[0]);
          		break;
          }
          
          if($scope.deck.cards[0].value == "QUEEN")
          {
        	  $scope.queenPile.push($scope.deck.cards[0]);
          }
          
        },
        function errorCallback(response) 
        {
          alert("Error:" + JSON.stringify(response.data));
          console.log(response);
        }
      );
    };
    
    
    $scope.show= function ()
    {
    	$scope.heartPile.sort(compare);
    	$scope.diamondPile.sort(compare);
    	$scope.spadePile.sort(compare);
    	$scope.clubPile.sort(compare);
    	function compare(a,b)
    	{
    		var valueA = a.value;
    		var valueB = b.value;
    		
        	var iA =0;
        	var iB=0;
        	
    		if(valueA == "JACK")
    			valueA = 11;
    		if(valueB == "JACK")
    			valueB = 11;
    		if(valueA == "QUEEN")
    			valueA = 12;
    		if(valueB == "QUEEN")
        		valueB = 12;
        	if(valueA == "KING")
        		valueA = 13;
        	if(valueB == "KING")
        		valueB == 13;
        	if(valueA == "ACE")
        		valueA = 14;
        	if(valueB == "ACE")
        		valueB = 14;
        	
        	valueA = Number(valueA);
        	valueB = Number(valueB);
        	
        	console.log("a:"+valueA+" type:"+typeof valueA);
        	console.log("b:"+valueB+" type: "+typeof valueB);
        		
        	if(valueA > valueB)
        		return 1;
        	if(valueA < valueB )
        		return -1;
        	 return 0;
    		
    	};
    }

    
  }
]);
