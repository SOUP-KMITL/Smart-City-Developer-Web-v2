angular
	.module('DevelopersApp')
	.controller('marketplaceController',function($uibModal,$location,$scope,$http,DevelopersFactory,AuthenticationService){

		$scope.goto = function(url){
			$location.path(url)
		}	
		$scope.auth = AuthenticationService.getauth();
		if(AuthenticationService.getauth()){
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

		DevelopersFactory.getService()
		.then(function(data){
			$scope.services = data.data.content;
		},
		function(error){
			console.log(error);
		});

		DevelopersFactory.getCollection()
		.then(function(data){
			$scope.collections = data.data.content;
		},
		function(error){
			console.log(error);
		});
		

	});