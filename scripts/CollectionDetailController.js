angular
	.module('DevelopersApp')
	.controller('CollectionDetailController',function($routeParams,$location,$scope,DevelopersFactory,$uibModal,AuthenticationService){

		$scope.goto = function(url){
			$location.path(url);
		}
		$scope.auth = AuthenticationService.getauth();
		if(AuthenticationService.getauth()){
			$scope.goto('/myProfile/collection/'+$routeParams.id);
			$scope.user = AuthenticationService.getuser().data;
		}
		$scope.logout = function(){
			$scope.auth = false;
			AuthenticationService.ClearCredentials();
		}
		function logincomplete(data){
			$scope.user = data;
			$scope.auth = true;
		}
		$scope.openModal = function () {
		    $uibModal.open({
		      templateUrl: 'pages/login.html',
		      controller: function ($scope, $uibModalInstance) {
		      		AuthenticationService.ClearCredentials();

			      $scope.login = function (username, password) {
			      	console.log("login with : "+ username +" : "+password);
			          $scope.dataLoading = true;
			          AuthenticationService.Login(username, password, function(response) {
			              if(response.success) {
			                  AuthenticationService.SetCredentials(username, password);
			                  $uibModalInstance.close();
			                  logincomplete(response.data);
			              } else {
			                  $scope.error = response.message;
			                  $scope.dataLoading = false;
			              }
			          });
			      }; 
		        
		      }
		    })
		};


		DevelopersFactory.getCollectionByID($routeParams.id)
		.then(function(data){
			$scope.collection = data.data;
			if($scope.collection.collectionId == null){
				$scope.collection.collectionId = 'No data';
			}
			if($scope.collection.description == null){
				$scope.collection.description = 'No data';
			}
			if($scope.collection.example == null){
				$scope.collection.example = 'No data';
			}
			if($scope.collection.category == null){
				$scope.collection.category = 'No data';
			}
			if($scope.collection.isOpen == true){
				$scope.collection.isOpen = 'Public';
			}
			else {
				$scope.collection.isOpen = 'Private';
			}
		},
		function(error){
			console.log(error);
		});	
			
	});

