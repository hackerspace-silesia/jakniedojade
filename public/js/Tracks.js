angular.module('Tracks')
  .controller('TracksController', ['$modal','$scope', '$http',function ( $modal,$scope, $http) 
{		
	function getInformationAboutTracks()
		{
			$scope.loading = true;
  		 $http({
				  method: 'GET',
				  url: '/api/connections/'
				})
  		 .success(function(data, status, headers, config) 
			    {
			     $scope.tracks=data;
				})
  		 .error(function(data, status, headers, config)
  		 		 {
			      console.log(headers);
				});
  		} ;

	$scope.sendVote = function()
		{
		      console.log('send'); 
      	};
//modals------------------
    $scope.showModalInformation=function(trackObject)
    {
    	var dialog = $modal.open
    	({
			templateUrl: 'information',
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

	var init = function () 
	{
          getInformationAboutTracks();
      };

      init();

   var ModalInfoController = function 
   ($scope, $modalInstance, actualTrack, $sce) 
   		{
          $scope.actualTrack = actualTrack;
          $scope.ok = function () 
          {
              $modalInstance.close();
          };

      };

      ModalInfoController['$inject'] = 
      ['$scope', '$modalInstance', 'actualTrack','$sce'];

      var init = function () {
      };
      init();

      	 $scope.showModalAccept=function(trackName,trackId)
    {
    	var dialog = $modal.open
    	({
			templateUrl: 'voteConversation',
			controller: ModalAccept,
			scope:$scope.$new(true),
			resolve: 
			{
				trackNameToVote: function () 
				{
				return trackName;
				},
				trackId: function () 
				{
				return trackId;
				}
			},
			size: 'lg'
		})
	};
	   var ModalAccept = function ($scope, $modalInstance,trackNameToVote,trackId, $sce) 
   		{
          $scope.title ="Czy na pewno chcesz głosować na '"+trackNameToVote+"'";
          $scope.showButtons=true;
          $scope.trackId = trackId;
          $scope.ok = function () 
          {		$scope.title ='zalezy od zwrotu'
              $scope.showButtons=false;

          };
           $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

      };

      ModalAccept['$inject'] = ['$scope', '$modalInstance', 'trackNameToVote','trackId','$sce'];

      var init = function () {
      };
      init();

}]);