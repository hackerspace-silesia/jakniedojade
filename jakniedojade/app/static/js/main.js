$(document).ready(function () {
	getJS();
	
});
function getJS(){
	 $.ajax({
                    url: "/api/connections/",
                    dataType: "text",
                    success: function(data) {
						createTasksFromJs(data);
					}							
					});					     
};
function createTasksFromJs(data){
	  var json = $.parseJSON(data);
						 $.each( json, function( index, value){
							var square="<div class='col-lg-3 col-md-4 col-xs-6 thumb'>\
										<div style='border=0px' class='thumbnail' data-id='"+value.id+"' data-map='"+value.iframe_url+"' data-name='"+value.name+"' 												data-description='"+value.description+"' href='#'> \
											<img class='img-responsive' width='350' src="+value.image_url+" alt=''>\
											<div class='VoteBar' >\
												<img  class=' hand' style='vertical-align:middle float: left;' src='/static/img/lapka.png'>\
												<span id='"+value.id+"'class='vote'>"+value.vote_count+"</span>\
											</div>\
										</div>\
									</div>";
								$('.row').append(square);	
							});	
							modalInfoAbout();	
							voteListener();	
};
function modalInfoAbout(){
	 $(".img-responsive").click(function(){
        $("#modalInfo").modal();
        $(".modal-title-Info").html($(this).parent().data('name'));
        $(".modal-text").html($(this).parent().data('description'));
		var mapSrc=$(this).parent().data('map');
		$('#map').attr("src",mapSrc );
    });
};
    
function voteListener(){
	$(".VoteBar").click(function(){
				var idImg=$(this).parent().data('id');
        $("#modalConfirm").modal();
		var confirmButtons=" <button type='button' class='btn btn-secondary' data-dismiss='modal'>Nie</button>\
        <button type='button' id='voteForConfirm' class='btn btn-primary'>Tak</button>"
		$('.modal-footer').html(confirmButtons);
		$("#voteForConfirm").click(function(){
				sendVote(idImg);
				
				
		});
		
    });
    };

function sendVote(id){
	  $.ajax({
            type:"POST",
            url:"/api/connections/"+id+"/vote/", 
                success:function(data) {				
                			$('.modal-footer').html('');
							$('.modal-title').html('Dziękujemy za zagłosowanie');
							addVoteToHand(id);
                },	
				error:function( xhr,textStatus,err) {
					if (xhr.status==409)
						{
							$('.modal-title').html('Niestety nie możesz już głosować na tą trasę');	
							$('.modal-footer').html('');
						}
								
        }
});
};						
					     
function addVoteToHand(id){
	var numberOfVote= $('#'+id);
  							var num = parseInt(numberOfVote.text());
  							numberOfVote.text(num+1);
};


