function TodoCtrl($scope) {
  // APIGEE init
  var client_creds = {
        orgName:'jojo',
        appName:'sandbox'
  }

  //Initializes the SDK. Also instantiates Apigee.MonitoringClient
  var dataClient = new Apigee.Client(client_creds);  
  
  $scope.items=[]; 
  $scope.results= "test";
  
  $scope.insert= function(){
    
    //Set the properties of the entity
    var options = {
	type:'item', //required
	name:$scope.name,//'milk',
	price:$scope.price//'3.25'
    };

    //Create the entity and process the results
    dataClient.createEntity(options, function (error, result) {
	if (error) {
            $scope.error=error;
	    //error
	} else {
            $scope.success="success !";
	    $scope.items.push(result._data)
            $scope.results=result;
	    //success          
	}
    });     
    //alert("ok");
  };

  $scope.fetch = function(){
    var options = {
	type:"item", //Required - the type of collection to be retrieved
	client:dataClient //Required
    };

    //Create a collection object to hold the response
    var collection = new Apigee.Collection(options);
    collection.fetch( $scope.recieved, function(error){
      //success callback }, function() { //error callback } ); 
      $scope.errors="error";
    });
  };

  $scope.recieved = function(error,result){
        $scope.items=[];
        if (error) {
            $scope.error=error;
            //error
        } else {
            $scope.success="success !";
	    angular.forEach(result.entities, function(entity){
	      $scope.items.push(entity);
	    });
            //$scope.items.push(result.entities)
            $scope.results=result;
            //success          
        }
  };
}
