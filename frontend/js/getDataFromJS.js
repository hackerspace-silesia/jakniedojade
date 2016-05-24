$(document).ready(function () {
	getJS();
	
});
function getJS(){
	 $.ajax({
                    url: "zadanie.json",
                    dataType: "text",
                    success: function(data) {
						createTasksFromJs(data);
					}							
					});					     
};
function createTasksFromJs(data){
	  var json = $.parseJSON(data);
						 $.each( json, function( index, value ){
							square="<div class='col-lg-3 col-md-4 col-xs-6 thumb'>\
										<div style='border=0px' class='thumbnail' data-name='"+value.name+"' data-description='"+value.description+"' href='#'> \
											<img class='img-responsive' src="+value.image_url+" alt=''>\
											<div class='VoteBar' >\
												<img  class=' hand' style='vertical-align:middle float: left;' src='connects/lapka.png'>\
												<span class='vote'>0</span>\
											</div>\
										</div>\
									</div>";
								$('.row').append(square);
									modal();						
							});	
};


function modal(){
	 $(".img-responsive").click(function(){
        $("#myModal").modal();
        $(".modal-title").html($(this).parent().data('name'));
        $(".modal-body").html($(this).parent().data('description'));
		initMap();
		
    });
};
function initMap() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
          center: {lat: 44.540, lng: -78.546},
          zoom: 8
        });
      };
