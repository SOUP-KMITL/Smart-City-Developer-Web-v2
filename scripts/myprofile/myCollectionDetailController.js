angular
	.module('DevelopersApp')
	.controller('myCollectionDetailController',function(userService,$route,$routeParams,$uibModal,$interval,$location,$scope,$rootScope,$http,DevelopersFactory,AuthenticationService){
        $scope.stop2 = $interval(function(){ $route.reload();},360000);
        $scope.manageAccess = function(){
            $uibModal.open({
                templateUrl: 'pages/manage-access.html',
                controller: 'ManageAccessControlController'
            });
        }

        $scope.genticket = function(id){
            $uibModal.open({
                templateUrl: 'pages/genticket.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.dataLoading = true;
                    userService.genTicket(id, function(response) {
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

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    }
                }
            });
        }
        $scope.delete = function(){
            $uibModal.open({
                templateUrl: 'pages/modal.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "deleting your collection"
                    $scope.dataLoading = true;
                    DevelopersFactory.deleteCollection($routeParams.id)
                    .then(function(data){
                        $uibModalInstance.close();
                        $location.path('/myProfile/collection');
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
        DevelopersFactory.getRoleCollection($routeParams.id,function(response){
            $scope.role = response.role;
            console.log(response);
            if(response.role == 'OWNER'){

            $interval(function(){
                DevelopersFactory.meterCollection($routeParams.id,function(response){
                $scope.read = response.read;
                $scope.write = response.write;
            });
            },3000);

            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            Highcharts.chart('container', {
                chart: {
                    type: 'spline',
                   // animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                        load: function () {
                            var series = this.series[0];
                            DevelopersFactory.getCollectionGraph($routeParams.id,function(response){
                                response
                                .then(function(result){
                                    for (var i = 0;i < result.data.length; i++) {
                                     var xx = (new Date(result.data[i].ts)).getTime();
                                     var yy = parseInt(result.data[i].value);
                                     series.addPoint([xx, yy], true, false);
                                    }
                                },
                                function(error){
                                  console.log(error);
                                });
                            })
                            $scope.stop = $interval(function(){
                                DevelopersFactory.getCollectionGraphTime(10,$routeParams.id,function(response){
                                    response
                                    .then(function(data){
                                        console.log(data);
                                        for (var i = 0;i < data.data.length; i++) {
                                         x = (new Date(data.data[i].ts)).getTime();
                                         y = parseInt(data.data[i].value);
                                         series.addPoint([x, y], true, false);
                                        }
                                    },
                                    function(error){
                                      console.log(error);
                                    });
                                })
                                
                            },10000);
                        }
                    }
                },
                title: {
                    text: 'Collection data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'collection data',
                    data: (function () {
                        // generate an array of random data
                        var data = [];
                            
                        return data;
                    }())
                }]
            });
        }
        });
        DevelopersFactory.getAllRoleCollection($routeParams.id,function(response){
            $scope.owners = response.owners;
            $scope.contrs = response.contrs;
            $scope.reads = response.reads;
            console.log(response);
        });

        DevelopersFactory.amService(AuthenticationService.getuser().data.userName,function(response){
            $scope.servicesTotalElements = response.data;
            // console.log(response);
        });
        DevelopersFactory.amCollection(AuthenticationService.getuser().data.userName,function(response){
            $scope.collectionsTotalElements = response.data;
            // console.log(response);
        });
        
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
            if($scope.collection.open == true){
                $scope.collection.isOpen = 'Public';
            }
            else {
                $scope.collection.isOpen = 'Private';
            }
        },
        function(error){
            console.log(error);
        });

          var dereg = $rootScope.$on('$locationChangeSuccess', function() {
            $interval.cancel($scope.stop);
            $interval.cancel($scope.stop2);
            dereg();
          });
	});