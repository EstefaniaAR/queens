var app = angular.module("app", []);

app.controller("mainController", ["$scope","$http","$q",function($scope, $http,$q) 
{
	$scope.heartPile=[];
	$scope.diamondPile=[];
	$scope.clubPile=[];
	$scope.spadePile=[];
	$scope.queenPile = [];
	$scope.log="".trim();

	$scope.doStuff= function()
	{
		var promise =suffle();
		promise.then(function(greeting) 
		{
			$scope.deck= promise.$$state.value;
			draw();
		}, function(reason) {
		  alert('Failed: ' + reason);
		});
	}
	
	function suffle()
	{
		return $q (function (resolve,reject)
		{
			console.log("Suffling...");
	    	var resource = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
	    	setTimeout( function ()
	    	{
		        $http.get(resource).then(
			        function successCallback(response) 
			        {
			          resolve (response.data);          
			        },
			        function errorCallback(response) 
			        {
			          alert("Error:" + JSON.stringify(response.data));
			          reject(JSON.stringify(response.data));
			        }
		      	);
	    	},1000);
		});
	};
	
	function draw()
	{
		console.log("drwaing card...");
    	console.log($scope.deck)
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
          $scope.log = $scope.log+ "Machine draws a "+ $scope.deck.cards[0].value +" of "+ $scope.deck.cards[0].suit + " card.\r\n";
          if($scope.queenPile.length < 4)
        	  draw();
          
        },
        function errorCallback(response) 
        {
          alert("Error:" + JSON.stringify(response.data));
          console.log(response);
        }
      );
	}
	function draws()
	{
		return $q (function (resolve,reject)
		{
			console.log("Suffling...");
	    	var resource = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
	    	setTimeout( function ()
	    	{
	    		console.log("drwaing card...");
	        	console.log($scope.deck)
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
	              $scope.log = $scope.log+ "Machine draws a "+ $scope.deck.cards[0].value +" of "+ $scope.deck.cards[0].suit + " card.\r\n";
	              
	              
	            },
	            function errorCallback(response) 
	            {
	              alert("Error:" + JSON.stringify(response.data));
	              console.log(response);
	            }
	          );
	    	},1000);
		});
	};
	
	function base()
	{
		return $q (function (resolve,reject)
		{
			console.log("Suffling...");
	    	var resource = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
	    	setTimeout( function ()
	    	{
		        
	    	},1000);
		});
	};
	


    $scope.drawCard = function() 
    {
    	console.log("drwaing card...");
    	console.log($scope.deck)
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
          $scope.log = $scope.log+ "Machine draws a "+ $scope.deck.cards[0].value +" of "+ $scope.deck.cards[0].suit + " card.\r\n";
          if($scope.deck.queenPile.length < 4)
        	  $scope.draw();
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
        		valueB = 13;
        	
        	if(valueA == "ACE")
        		valueA = 14;
        	if(valueB == "ACE")
        		valueB = 14;
        	
        	valueA = Number(valueA);
        	valueB = Number(valueB);
        	
        	//console.log("value: "+a.value+" suit: "+a.suit+" a:"+valueA+" type:"+typeof valueA);
        	//console.log("value: "+b.value+" suit: "+b.suit+" b:"+valueB+" type: "+typeof valueB);
        		
        	if(valueA > valueB)
        		return 1;
        	if(valueA < valueB )
        		return -1;
        	 return 0;
    		
    	};
    }

    
  }
]);


app.factory("suffle",function ($http) 
{
	console.log("Suffling...");
	var resource = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    return $http.get(resource).then(
	    function successCallback(response) 
	    {
	      return response.data;          
	    },
	    function errorCallback(response) 
	    {
	      alert("Error:" + JSON.stringify(response.data));
	      console.log(response);
	    }
    );
});
