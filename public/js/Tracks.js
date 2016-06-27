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
			      console.log(headers);
				});
  		
  	track.getActualTrack=function(){
  		return actualTrack;
  	}
	track.sendVote = function()
		{
		      console.log('send'); 
      	};
//modals------------------
    track.showModalInformation=function(trackObject)
    {
    	
    	var dialog = $modal.open
    	({
			templateUrl: 'modalWithInformation.html',
			controller: ModalInfoController,
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

     track.showModalAccept=function(trackName,trackId)
    {
    	var dialog = $modal.open
    	({
			templateUrl: 'voteConversation',
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
          $scope.title ="Czy na pewno chcesz zagłosować? ";
          $scope.showButtons=true;
          $scope.trackId = trackId;
          $scope.ok = function () 
          {	$scope.title ='zalezy od zwrotu'
              $scope.showButtons=false;

          };
           $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

      };

      ModalAccept['$inject'] = ['$scope', '$modalInstance', 'trackNameToVote','trackId','$sce'];

}]);