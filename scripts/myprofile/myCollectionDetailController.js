angular
	.module('DevelopersApp')
	.controller('myCollectionDetailController',function($route,$routeParams,$uibModal,$interval,$location,$scope,$rootScope,$http,DevelopersFactory,AuthenticationService){
        $scope.stop2 = $interval(function(){ $route.reload();},360000);
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
        DevelopersFactory.getCollectionByID($routeParams.id)
        .then(function(data){
            $scope.collection = data.data;
            
        if($scope.user.userName == $scope.collection.owner){

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
                            $scope.stop = $interval(function(){
                                DevelopersFactory.getCollectionGraph($routeParams.id)
                                .then(function(data){
                                    for (var i = 0;i < data.data.length; i++) {
                                  	 x = (new Date(data.data[i].ts)).getTime();
                                  	 y = parseInt(data.data[i].data.substr(1,4).split(','));
                                  	 series.addPoint([x, y], true, false);
                                    }
                                },
                                function(error){
                                  console.log(error);
                                });
                            },3000);
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
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                            data.push({
                                x: time - 5 * 1000,
                                y: 1865
                            });
                            data.push({
                                x: time - 4 * 1000,
                                y: 2165
                            });
                            data.push({
                                x: time - 3 * 1000,
                                y: 2013
                            });
                            data.push({
                                x: time - 2 * 1000,
                                y: 2190
                            });
                            data.push({
                                x: time - 1 * 1000,
                                y: 2046
                            });
                        return data;
                    }())
                }]
            });
        }
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

          var dereg = $rootScope.$on('$locationChangeSuccess', function() {
            $interval.cancel($scope.stop);
            $interval.cancel($scope.stop2);
            dereg();
          });
	});