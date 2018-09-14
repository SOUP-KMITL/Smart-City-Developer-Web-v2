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
				                $scope.token = response.data;
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
		//DevelopersFactory.getMyService(AuthenticationService.getuser().data.userName,0,3)
		DevelopersFactory.getMyService(AuthenticationService.getuser().data.userName)
		.then(function(data){
			$scope.services = data.data.content;
			console.log(data);
		},
		function(error){
			console.log(error);
		});
		DevelopersFactory.getMyCollection(AuthenticationService.getuser().data.userName)
		.then(function(data){
			console.log(data);
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