$(document).ready(function () {
	getJS();
	
});
function getJS(){
	 $.ajax({
                    url: "/jakniedojade/api/connections/",
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
										<a class='thumbnail' data-name='"+value.name+"' data-description='"+value.description+"' href='#'>\
											<img class='img-responsive' src="+value.image_url+" alt=''>\
											<div  class='underSquare'>\
												<img class='img-responsive hand' src='connects/lapka.png' alt=''>\
												<span class='voit'>0</span>\
											</div>\
										</a>\
									</div>"
								$('.row').append(square);
									modal();						
							});	
	
}

function modal(){
	 $(".thumbnail").click(function(){
        $("#myModal").modal();
        $(".modal-title").html($(this).data('name'));
        $(".modal-body").html($(this).data('description'));
		initMap();
		
    });
}
function initMap() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
          center: {lat: 44.540, lng: -78.546},
          zoom: 8
        });
      }
