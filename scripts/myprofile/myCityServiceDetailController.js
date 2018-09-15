angular
	.module('DevelopersApp')
	.controller('myCityServiceDetailController',function($routeParams,$uibModal,$anchorScroll,$location,$scope,$http,DevelopersFactory,AuthenticationService){
		
		$scope.delete = function(){
		    $uibModal.open({
		      	templateUrl: 'pages/modal.html',
		      	controller: function ($scope, $uibModalInstance) {
		      		$scope.title = "deleting city service"
			        $scope.dataLoading = true;
					DevelopersFactory.deleteService($routeParams.id)
					.then(function(data){
						$uibModalInstance.close();
						$location.path('/myProfile/city-service');
					},
					function(error){
						console.log(error);
		                $scope.error = response.message;
		                $scope.dataLoading = false;
					});
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

		
		DevelopersFactory.amService(AuthenticationService.getuser().data.userName,function(response){
			$scope.servicesTotalElements = response.data;
			console.log(response);
		});
		DevelopersFactory.amCollection(AuthenticationService.getuser().data.userName,function(response){
			$scope.collectionsTotalElements = response.data;
			console.log(response);
		});
		
 		DevelopersFactory.getServiceByID($routeParams.id)
		.then(function(data){
			$scope.service = data.data;
			if(data.data.serviceId == null){
				$scope.service.serviceId = 'No data';
			}
			if(data.data.description == null){
				$scope.service.description = 'No data';
			}
			if(data.data.appLink == ''){
				$scope.service.appLink = 'No data';
			}
			if(data.data.videoLink == ''){
				$scope.service.videoLink = 'No data';
			}
			if(data.data.swagger == null){
				$scope.service.swagger = 'No data';
			}
			if(data.data.sampleData == null){
				$scope.service.sampleData = 'No data';
			}
		},
		function(error){
			console.log(error);
		});
	});