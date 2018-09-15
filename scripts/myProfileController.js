angular
	.module('DevelopersApp')
	.controller('myProfileController',function($uibModal,$location,$scope,$http,DevelopersFactory,AuthenticationService,userService){
	
		$scope.gentoken = function () {
		    $uibModal.open({
		      	templateUrl: 'pages/gentoken.html',
		      	controller: function ($scope, $uibModalInstance) {
			      	$scope.clickGen = function(password){
				      	$scope.dataLoading = true;
				        userService.genAccessToken(AuthenticationService.getuser().data.userName, password, function(response) {
				            if(response.success) {
				                $scope.dataLoading = false;
				                $scope.token = response.data;
				                $scope.error = false;
				            } 
				            else {
				            	console.log(response);
				            	$scope.error = response.message;
				                $scope.dataLoading = false;
				            }
				        });
					}
				    $scope.cancel = function () {
					    $uibModalInstance.dismiss('cancel');
					}
				}
			});
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
			$location.path("/");
		}
		DevelopersFactory.amService(AuthenticationService.getuser().data.userName,function(response){
			$scope.servicesTotalElements = response.data;
			console.log(response);
		});
		DevelopersFactory.amCollection(AuthenticationService.getuser().data.userName,function(response){
			$scope.collectionsTotalElements = response.data;
			console.log(response);
		});
		
		DevelopersFactory.getMyService(AuthenticationService.getuser().data.userName)
		.then(function(data){
			// $scope.servicesTotalElements = data.data.totalElements;
			$scope.services = data.data.content;
			console.log(data);
		},
		function(error){
			console.log(error);
		});
		DevelopersFactory.getMyCollection(AuthenticationService.getuser().data.userName)
		.then(function(data){
			console.log(data);
			// $scope.collectionsTotalElements = data.data.totalElements;
			$scope.collections = data.data.content;
		},
		function(error){
			console.log(error);
		});

		$scope.CallServiceByID = function(serviceID){
			DevelopersFactory.getServiceByID(serviceID)
			.then(function(data){
				DevelopersFactory.savedata(data.data);
				$location.path('/marketplace/service/'+serviceID);
			},
			function(error){
				console.log(error);
			});
		}

		$scope.CallCollectionByID = function(CollectionID,owner){
			DevelopersFactory.getCollectionByID(CollectionID)
			.then(function(data){
				DevelopersFactory.savedata(data.data);
				DevelopersFactory.saveowner(owner);
				$location.path('/marketplace/collection/'+CollectionID);
			},
			function(error){
				console.log(error);
			});
		}

	});