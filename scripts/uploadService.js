  angular
  .module('DevelopersApp')
  .service("uploadService", function($http, $q,AuthenticationService) {

    return ({
      upload: upload
    });

    function formData(img){
      var form = new FormData();
      form.append('file', img);
      return form;
    }
    function upload(id,img) {
      // var formData = new FormData();
      // formData.append('file', img);
      // var upl = $http({
      //   method: 'PUT',
      //   url: 'https://api.smartcity.kmitl.io/api/v1/services/'+id+'/thumbnail', // /api/upload
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization':  AuthenticationService.getuser().data.accessToken
      //   },
      //   data: formData
      // });
      // console.log(upl);
      // return upl.then(handleSuccess, handleError);
      var form = new FormData();
      form.append('file', img);
      console.log(img);
      return $http.put('https://api.smartcity.kmitl.io/api/v1/services/'+id+'/thumbnail', form, {headers: {'Authorization':  AuthenticationService.getuser().data.accessToken}})
         .then(
             function(response){
               console.log(response);
             }, 
             function(response){
               console.log(response);
               // failure callback
             }
          );

      // var req = {
      // url: 'https://api.smartcity.kmitl.io/api/v1/services/2276a182-b81a-11e8-b835-02420a000135/thumbnail',
      // method: 'PUT',
      // headers: {
      //   'authorization': '8fe159c3fb9f4b2a0dfa377dbcb78911de81649eabd0aa91b513b5e76b19aaa6'
      //   },
      // data: formData(img)
      // }
      // console.log(req);
      //   return $http(req);
    } // End upload function

    // ---
    // PRIVATE METHODS.
    // ---
  
    function handleError(response, data) {
      if (!angular.isObject(response.data) ||!response.data.message) {
        return ($q.reject("An unknown error occurred."));
      }

      return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
      return (response);
    }

  })
  .directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);