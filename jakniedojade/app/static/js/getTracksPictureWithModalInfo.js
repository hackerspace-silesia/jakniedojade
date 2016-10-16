$(document).ready(function ()
 {
	getTrackJS();
	
});


function getTrackJS(){
	 $.ajax({
                url: "/api/connections/",
                dataType: "text",

				load: function()
				    {
					$('.loader').show();
				    },
                success: function(data) 
                    {
					$('.loader').hide();
					createTrackSquareFromJs(data);
					modalInfoOnPictogramClick();	
				    },	
				error:function( xhr,textStatus,err) 
				    {
					alert('Z powodu błędu stronia nie może być załadowane');		
				    }
			});	

};

function createTrackSquareFromJs(data){
	  var json = $.parseJSON(data);
						 $.each( json, function( index, value){
							var squareWithJsonData="<div class='col-lg-3 col-md-4 col-xs-6 thumb'>\
										<div data-id="+value.id+" style='border=0px' class='thumbnail'  id='square"+value.id+"' \
										data-map='"+value.iframe_url+"' \
										data-name='"+value.name+"'\
										data-description='"+value.description+"'> \
										</div>\
									</div>";
							var pictogram="<img class='img-responsive pictogram'  src='"+value.image_url+"'/>";
							var voteBar= "<div class='VoteBar' >\
										<img  class='hand' style='vertical-align:middle float: left;' src='static/img/lapka.png'>\
										<span id='"+value.id+"'class='vote'>"+value.vote_count+"</span></div>";
										
							$('.pictograms').append(squareWithJsonData);
							$("#square"+value.id).append(pictogram);
							$("#square"+value.id).append(voteBar);
							});	
							
};

function modalInfoOnPictogramClick(){
	 $(".pictogram").click(function()
	 {
        $("#modalInfo").modal();
        $(".modal-title-Info").html($(this).parent().data('name'));
        $(".modal-text").html($(this).parent().data('description'));
		var mapSrc=$(this).parent().data('map');
		$('#map').attr("src",mapSrc+"&z=10" );

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 20,
        });
      
    });
};
