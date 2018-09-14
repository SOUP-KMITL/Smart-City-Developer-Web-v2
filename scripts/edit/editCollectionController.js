angular
	.module('DevelopersApp')
	.controller('editCollectionController',function($routeParams,$uibModal,$anchorScroll, uploadService,$location,$scope,$http,DevelopersFactory,AuthenticationService){
	    $scope.$watch('file', function(newfile, oldfile) {
	      if(angular.equals(newfile, oldfile) ){
	        return;
	      }
	      console.log(service);
	      uploadService.upload($routeParams.id,newfile).then(function(res){
	        // DO SOMETHING WITH THE RESULT!
	        console.log("result", res);
	      })
	    });

		$scope.create = function(name,des){
			$uibModal.open({
		      templateUrl: 'pages/modal.html',
		      controller: function ($scope, $uibModalInstance) { 
		      		$scope.dataLoading = true;
				    DevelopersFactory.createCityService(name,des)
				    .then(function(data){
				    		console.log(data);
				    		$location.path('/myProfile/edit/city-service/'+data.data.serviceId);
					        $uibModalInstance.close();
			            },
			            function(error){ 
				    		console.log(error);
			                $scope.error = error.data.message;
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

		
	});