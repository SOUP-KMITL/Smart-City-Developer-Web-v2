angular
	.module('DevelopersApp')
	.controller('DevelopersController',function($uibModal,$location,$scope,$http,DevelopersFactory,AuthenticationService){
		$scope.goout = function(url){
			window.open(url,'_blank');
		}
		$scope.goto = function(url){
			$location.path(url);
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
			console.log(data);
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
		  $scope.totalItems = 64;
		  $scope.currentPage = 4;

		  $scope.setPage = function (pageNo) {
		    $scope.currentPage = pageNo;
		  };

		  $scope.pageChanged = function() {
		    console.log('Page changed to: ' + $scope.bigCurrentPage);
		  };

		  $scope.maxSize = 5;
		  $scope.bigTotalItems = 175;
		  $scope.bigCurrentPage = 1;

		$scope.goto = function(url){
			$location.path(url)
		}
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
		$scope.CallServiceByID = function(serviceID){
			DevelopersFactory.getServiceByID(serviceID)
			.then(function(data){
				DevelopersFactory.savedata(data.data);
				// $scope.service = data.data;
				// console.log($scope.service);
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
				$location.path('/marketplace/collection/'+collectionID);
			},
			function(error){
				console.log(error);
			});
		}

	});