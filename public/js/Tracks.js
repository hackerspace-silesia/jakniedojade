
angular.module('Tracks')
  .controller('TracksController', ['$modal','$scope', '$http',function ( $modal,$scope, $http) 
{		var track = this;
	
			track.loading = true;
  		 $http({
				  method: 'GET',
				  url: '/api/connections/'
				})
  		 .success(function(data, status, headers, config) 
			    {
			     track.dataTrack = data;
				})
  		 .error(function(data, status, headers, config)
  		 		 {
			      alert('Z powodu błędu nie można było załadować piktogramów');
				});

	
//modals------------------
    track.showModalInformation=function(trackObject)
    {
    	
    	var dialog = $modal.open
    	({
			templateUrl: 'modalWithInformation.html',
			controller: ModalInfoController,
			scope:$scope.$new(true),
			resolve: 
			{
				actualTrack: function () 
				{
				return trackObject;
				}
			},
			size: 'lg'
		})
	};

   var ModalInfoController = function 
   ($scope, $modalInstance, Track, $sce) 
   		{
         $scope.actualTrack = Track;
          $scope.ok = function () 
          {
              $modalInstance.close();
          };

      };

      ModalInfoController['$inject'] = ['$scope', '$modalInstance', 'actualTrack','$sce'];

   
      	 track.showModalAccept=function(trackId)
    {
    	var dialog = $modal.open
    	({
			templateUrl: 'modalForVote.html',
			controller: ModalAccept,
			scope:$scope.$new(true),
			resolve: 
			{
				trackId: function () 
				{
				return trackId;
				}
			},
			size: 'lg'
		})
	};
	   var ModalAccept = function ($scope, $modalInstance,trackId, $sce) 
   		{
          $scope.title ="Czy na pewno chcesz głosować na tę trasę";
          $scope.showButtons=true;
          $scope.trackId = trackId;
          $scope.ok = function () 
          {	
          		
          		$scope.title = sendVote(trackId);
              	$scope.showButtons=false;

          };
           $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

		  sendVote = function(id)
		{
		   $http({
				method: "POST",
            	url:"/api/connections/"+id+"/vote/", 
				})
  		 .success(function(data, status, headers, config) 
			    {
			    	$scope.title='Dziękujemy za zagłosowanie';
				})
  		 .error(function(data, status, headers, config)
  		 		 {
  		 		 		if (status==409)
						{
							$scope.title= 'Niestety nie możesz znowu głosować na tę trasę';	
						}
						else
						{
							$scope.title= 'Niestety z powodu błędu nie możesz zagłosować';
						}
				}); 
      	};

      };

      ModalAccept['$inject'] = ['$scope', '$modalInstance','trackId','$sce'];
}]);
