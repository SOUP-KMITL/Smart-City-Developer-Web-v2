angular
	.module('DevelopersApp')
	.controller('createCollectionController',function($uibModal,$anchorScroll,$location,$scope,$http,DevelopersFactory,AuthenticationService){
	console.log($scope.imageSrc);
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

		  $scope.pageChanged = function() {
			DevelopersFactory.getPageService($scope.CurrentPage-1,10)
			.then(function(data){
				console.log($scope.CurrentPage);
				console.log(data);
				$scope.services = data.data.content;
			  	$scope.TotalItems = data.data.totalElements;
			  	$anchorScroll();
			},
			function(error){
				console.log(error);
			});
		  };

		DevelopersFactory.getMyPageService(AuthenticationService.getuser().data.userName,0,10)
		.then(function(data){
			$scope.services = data.data.content;
			console.log(data);
		  	$scope.maxSize = 5;
		  	$scope.TotalItems = data.data.totalElements;
		  	$scope.CurrentPage = 1;
		},
		function(error){
			console.log(error);
		});

	});