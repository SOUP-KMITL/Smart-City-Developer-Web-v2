angular
	.module('DevelopersApp')
	.controller('createCollectionController',function($uibModal,$anchorScroll,$location,$scope,$http,DevelopersFactory,AuthenticationService){
		$scope.columns = [];
		$scope.ts = {
			"name": "ts",
		    "type": "timestamp",
		    "indexed": true
		}
		$scope.addClick = function(name,type,index){
			$scope.aname = "";
			$scope.atype = "";
			$scope.aindexed = "";
			var temp = {
				"name": name,
			    "type": type,
			    "indexed": index
			}
			$scope.columns.push(temp);
		}

		$scope.deletets = function(name,index){
			$scope.columns.splice(index, 1);
		}
		$scope.deletehd = function(name,index){
			$scope.headers.splice(index, 1);
		}
		$scope.deletehd = function(name,index){
			$scope.headers.splice(index, 1);
		}

		function addcolumns(){
			var data = $scope.columns;
			if($scope.collectionType == 'timeseries'){
				
				data.push($scope.ts);
			}
			console.log($scope.columns);
			var json = angular.toJson( data );
			return json;
		}
		$scope.create = function(){
			var data = {
				"collectionName": $scope.collectionName,
				"description": $scope.collectionDescription,
				"type": $scope.collectionType,
				"category": $scope.collectionCategory,
				"example": JSON.parse($scope.collectionExample),
				"columns": JSON.parse(addcolumns()),
				"isOpen": $scope.collectionOpen
			}
			console.log(data);
			DevelopersFactory.createCollection(data)
			.then(function(data){
				console.log(data);
            	$location.path('/myProfile/collection');

			},function(error){
				$scope.error = error;
				console.log(error);

			})
		}
        $scope.goto = function(url){
            $location.path(url);
        }
		$scope.auth = AuthenticationService.getauth();
		if(AuthenticationService.getauth()){
			$scope.user = AuthenticationService.getuser().data;
		}
        else{
            $scope.goto('/');
        }
		$scope.logout = function(){
			$scope.auth = false;
			AuthenticationService.ClearCredentials();
		}


	});