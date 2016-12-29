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
					onScrollSetSmallerNavigation();
				    },	
				error:function( xhr,textStatus,err) 
				    {
					alert('Z powodu błędu stronia nie może być załadowane');		
				    }
			});	

};

function createTrackSquareFromJs(data){
	  var json = $.parseJSON(data);
	  console.log(json)
	 $.each( json, function( index, value){
		var squareWithJsonData="<div class='col-lg-3 col-md-4 col-xs-6 col-xxs-12 thumb'>\
					<div data-id="+value.id+" style='border=0px' class='thumbnail'  id='square"+value.id+"' \
					data-map='"+value.iframe_url+"' \
					data-name='"+value.name+"'\
					data-description='"+value.description+"'> \
					</div>\
				</div>";
		var pictogram="<img class='img-responsive pictogram'  src='"+value.image_url+"'/>";
		var voteBar= "<div class='vote-bar' >\
					</div>";

		let about_connection ="<div class='col-lg-7 col-md-7 col-xs-7 vote-bar-information'>\
									<p> czas podróży:_______"+value.connection_time+"</p>\
									<p> ≥ 2 przesiadki:_____________"+value.percent_more_than_2_transfer+"%</p>\
							  </div>";
		let hand_with_votes = "<div class='col-lg-3 col-md-3 col-xs-3 hand-with-count'>\
								  <img  class='hand' src='static/img/lapka.svg'>\
						          <span id='"+value.id+"'class='number-of-votes'>"+value.vote_count+"</span>\
					          </div>"

		$('.pictograms>div:nth-child(1)').after(squareWithJsonData);
		$("#square"+value.id).append(pictogram);
		$("#square"+value.id).append(voteBar);
		$("#square"+value.id+' .vote-bar').append(about_connection);
		$("#square"+value.id+' .vote-bar').append(hand_with_votes);
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
      
    });

};

function onScrollSetSmallerNavigation(){
	$(window).scroll(function() {
		  if ($(document).scrollTop() > 50) {
		    $('nav').addClass('shrink');
		    $('.logo').addClass('shrink');
		    $('.about').addClass('shrink');
		  } else {
		    $('nav').removeClass('shrink');
		    $('.logo').removeClass('shrink');
		    $('.about').removeClass('shrink');
		  }
});
}


