
/*
 * Version 1.0
 * ES6 && AngularJS
 * Card JS
 * Author: Estefania Arriaga 
 * https://www.michaelbromley.co.uk/blog/exploring-es6-classes-in-angularjs-1.x/
 */
const URLDECK= 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

class Services 
{
	constructor ($http,$timeout,$q)
	{
        this.http = $http
        this.timeout = $timeout;
        this.q=$q;
	}
	getDeck(url, timeout)
	{
        return new this.q ((resolve,reject)=>
        {
            this.timeout(()=>
            {
                this.http.get(url)
                .then(result => resolve(result.data))
                .catch(err => reject(err));
            },timeout)
        });
    }

    draw(deckId,timeout=1000)
    {
        return new this.q ((resolve,reject)=>
        {
            setTimeout(()=>
            {
                this.http.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(result => resolve(result.data))
                .catch(err => reject(err));
            },timeout)
        });
    }
};

class Factory
{
    returnNumber(param)
    {
        if(!Number.isInteger(param))
        {
            switch(param)
            {
                case "JACK":
                    return 11;
                case "QUEEN":
                    return 12;
                case "KING":
                    return 13;
                case "ACE":
                    return 14;
            }
        }
        return Number(param);
    }

}


class MainController
{
    
	constructor(services,factories)
	{
        this.services = services;
        this.factory = factories;
        this.card={};
        this.showCards=false;
        this.startProcess = false; 
        this.showButton = true;
        this.queenPile =[];
        this.heartPile=[];
        this.diamondPile=[];
        this.spadePile=[];
        this.clubPile=[];
    }

    doProcess()
    {
        this.showButton=false;
        this.services.getDeck(URLDECK,0)
        .then((data)=>
        {
            this.startProcess=true;
            this.recursiveDraw(data.deck_id);
        })
        .catch((err)=> 
        {
            alert(err);
            return;
        }); 
    }

    recursiveDraw(deck_id)
    {   
        this.services.draw(deck_id)
        .then((data)=>
        {
            this.card = data.cards[0];
            switch (this.card.suit)
            {
                case "HEARTS":
          		this.heartPile.push(this.card);
          		break;
          		
          	    case "DIAMONDS":
          		this.diamondPile.push(this.card);
          		break;
          		
          	    case "CLUBS":
          		this.clubPile.push(this.card);
          		break;
          		
          	    case "SPADES":
          		this.spadePile.push(this.card);
          		break;
            }
            if(this.card.value == "QUEEN")
            {
                this.queenPile.push(this.card);
            }
            if(this.queenPile.length == 4)
            {
                this.heartPile.sort((a,b)=> this.factory.returnNumber(a.value)-this.factory.returnNumber(b.value));
                this.clubPile.sort((a,b)=> this.factory.returnNumber(a.value)-this.factory.returnNumber(b.value));
                this.diamondPile.sort((a,b)=> this.factory.returnNumber(a.value)-this.factory.returnNumber(b.value));
                this.spadePile.sort((a,b)=> this.factory.returnNumber(a.value)-this.factory.returnNumber(b.value));
                this.showCards=true;
                setTimeout(() =>{ alert("Done: All queens have been found. Showing all cards"); }, 500);
                return;
            }
            return this.recursiveDraw(deck_id);
        })
        .catch((err)=>
        {
            alert(err);
        });
    }
}

angular.module('app',[])
.service('services', Services)
.controller('mainController', MainController)
.factory('factories',Factory);

/*
 * var app = angular.module("app", []);

app.controller("mainController", ["ngMaterial","$scope","$http","$q",function(ngMaterial,$scope, $http,$q) 
{
	$scope.heartPile=[];
	$scope.diamondPile=[];
	$scope.clubPile=[];
	$scope.spadePile=[];
	$scope.queenPile = [];
	$scope.log="".trim();
	$scope.show = false;
	$scope.showLabel = false;
	
  $scope.showButton = true;

	$scope.doStuff= function()
	{
		var promise =suffle();
		promise.then(function(greeting) 
		{
			$scope.showLabel = true;
      $scope.showButton = false; 
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
		setTimeout( function ()
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
          $scope.log = "\r\nMachine draws a "+ $scope.deck.cards[0].value +" of "+ $scope.deck.cards[0].suit + " card.\r\n"+$scope.log ;
          if($scope.queenPile.length < 4)
          {
        	  draw();
          }
          else 
          {
        	  sort();
          }
          
        },
        function errorCallback(response) 
        {
          alert("Error:" + JSON.stringify(response.data));
          console.log(response);
        }
      );
    },1000);
	}
	
	function sort()
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
    	$scope.show = true;
	}
	
  }
]);


 */



