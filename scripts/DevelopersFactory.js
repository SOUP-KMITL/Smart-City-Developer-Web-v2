angular
	.module('DevelopersApp')
	.factory('DevelopersFactory',function(userService,$http,AuthenticationService) {
	
		function getService() {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services');
		};

		function getCollection() {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections');
		};
		function amService(username,callback) {
			var response = {success : false}
			$http.get('https://api.smartcity.kmitl.io/api/v1/services?owner='+username)
			.then(function(data){
				response.success = true;
				response.data = data.data.totalElements;
				callback(response);
			},function(error){
				callback(response);
			});
		};

		function amCollection(username,callback) {
			var response = {success : false}
			$http.get('https://api.smartcity.kmitl.io/api/v1/collections?owner='+username)
			.then(function(data){
				response.success = true;
				response.data = data.data.totalElements;
				callback(response);
			},function(error){
				callback(response);
			});
		};
		function getMyService(username) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services?owner='+username);
		};		
		function getMyPageService(username,page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services?owner='+username+'&page='+page+'&size='+pagesize);
		};
		function getPageService(page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services?page='+page+'&size='+pagesize);
		};

		function getMyCollection(username) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections?owner='+username);
		};
		function getPageCollection(page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections?page='+page+'&size='+pagesize);
		};
		function getMyPageCollection(username,page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections?owner='+username+'&page='+page+'&size='+pagesize);
		};
		function getServiceByID(serviceID) {
			console.log(serviceID);
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services/'+serviceID);
		};

		function getCollectionByID(collectionID) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID+'/meta');
		};
		 
		function getCollectionGraph(collectionID,callback){
			userService.genTicket(collectionID, function(response) {
	            if(response.success) {
	                var req = {
		               	method: 'GET',
		               	// url: 'https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID+'?last=10',
		               	url: 'https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID,
		               	headers: {
		                 	'Authorization':  response.data
		               	}
		           	}
		        	callback($http(req));
	            } 
	            else {
	                var req = {
		               	method: 'GET',
		               	// url: 'https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID+'?last=10'
		               	url: 'https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID
		           	}
		        	callback($http(req));
	            }
	        });
		}
		var data = {};
		function savedata(mydata){
			data = mydata;
		}
		function getdata(){
			return data;
		}
		var owner = 'user';
		function saveowner(myowner){
			owner = myowner;
		}
		function getowner(){
			return owner;
		}
		function createCityService(name,des){
			var data = {serviceName: name,description: des};
			var req = {
               	method: 'POST',
               	data: data,
               	url: 'https://api.smartcity.kmitl.io/api/v1/services',
               headers: {
                 'Authorization':  AuthenticationService.getuser().data.accessToken
               }
           	}
        	return $http(req);
		} 
		function updateThunbnail(id,img){
			var form = new FormData();
			form.append("file", img);

			var req = {
               	method: 'PUT',
               	data: form,
               	url: 'https://api.smartcity.kmitl.io/api/v1/services/'+id+'/thumbnail',
               headers: {
                 'Authorization':  AuthenticationService.getuser().data.accessToken
               }
           	}
        	return $http(req);	
		}
		function deleteService(id){
			var req = {
               	method: 'DELETE',
               	url: 'https://api.smartcity.kmitl.io/api/v1/services/'+id
           	}
        	return $http(req);	
		}
		function deleteCollection(id){
			var req = {
               	method: 'DELETE',
               	url: 'https://api.smartcity.kmitl.io/api/v1/collections/'+id
           	}
        	return $http(req);	
		}
		function meterCollection(id,callback){
			var req = {
				method: 'GET',
				url: 'https://api.smartcity.kmitl.io/api/v1/meters/collections?collectionId='+id+'&aggregate=true'
			}
        	var response = {success : false,read : 0,write:0}
        	$http(req)
			.then(function(data){
				console.log(data);
				for(var i=0;i<data.data.length;i++){
					if(data.data[i].type = "read"){
						response.read = data.data[i].size;
					}
					else if(data.data[i].type = "write"){
						response.write = data.data[i].size;
					}
				}
				response.success = true;
				callback(response);
			},function(error){
				response.read = error.statusText;
				response.write = error.statusText;
				callback(response);
			});
		}
		function getRoleCollection(id,callback){
			var req = {
				method: 'GET',
				url: 'https://api.smartcity.kmitl.io/api/v1/accesscontrol/collections/'+id
			}
        	var response = {role: "READ"}
        	$http(req)
			.then(function(data){
				console.log(data);
				response.role = data.data;
				callback(response);
			},function(error){
				response.role = "UNAUTH";
				callback(response);
			});
		}
		function getAllRoleCollection(id,callback){
			
			var req = {
				method: 'GET',
				url: 'https://api.smartcity.kmitl.io/api/v1/accesscontrol?collectionId='+id
			}
        	var response = {success : false,owners : [] ,contrs :[] ,reads:[]}
        	$http(req)
			.then(function(data){
				console.log(data);
				console.log(data.data.length);
				for(var i=0;i<data.data.length;i++){
					if(data.data[i].role == "owner"){
						response.owners.push(data.data[i].user_name)
					}
					else if(data.data[i].role == "contributor"){
						response.contrs.push(data.data[i].user_name)
					}
					else if(data.data[i].role == "read"){
						response.reads.push(data.data[i].user_name)
					}
				}
				response.success = true;
				callback(response);
			},function(error){
				response.read = error.statusText;
				response.write = error.statusText;
				callback(response);
			});
		}
		return {
			getRoleCollection: getRoleCollection,
			getAllRoleCollection: getAllRoleCollection,
			meterCollection: meterCollection,
			deleteCollection: deleteCollection,
			deleteService: deleteService,
			updateThunbnail: updateThunbnail,
			createCityService: createCityService,
			getCollectionGraph: getCollectionGraph,
			getMyPageService: getMyPageService,
			getMyPageCollection: getMyPageCollection,
			getPageService: getPageService,
			getPageCollection: getPageCollection,
			getMyService: getMyService,
			getMyCollection: getMyCollection,
			getService: getService,
			getCollection: getCollection,
			amService: amService,
			amCollection: amCollection,
			getServiceByID: getServiceByID,
			getCollectionByID: getCollectionByID,
			savedata: savedata,
			getdata:getdata,
			saveowner: saveowner,
			getowner:getowner
		}
	});