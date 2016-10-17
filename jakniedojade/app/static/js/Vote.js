$(document).one("ajaxStop", function() {
	voteListener();	
});
  
function voteListener()
{
	$(".hand").on('click', function() 
	{
		var idTrack=$(this).parent().parent().data('id');
       	createModalForAcceptVote(idTrack);

    });
  };


function createModalForAcceptVote(idTrack)
{
	 	$("#modalConfirm").modal();
		var confirmButtons = "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Nie</button>\
							  <button type='button' id='ConfirmButtom' class='btn btn-warning'>Tak</button>"

		$('.modal-title').html("Czy na pewno chcesz zagłosować na tę trasę?");
		$('.modal-footer').html(confirmButtons);

		$("#ConfirmButtom").on('click', function()
		{
				sendVote(idTrack);	
		});

};

function sendVote(id){
	  $.ajax({
            	type:"POST",
            	url:"/api/connections/"+id+"/vote/", 

				load: function()
					{
						$('.loader').show();
					},
                success:function(data) 
					{			
						$('.loader').hide();	
                		modalThanksForVote()
						addVoteToTrack(id);
                	},	
				error:function( xhr,textStatus,err) 
					{	
						$('.loader').hide();

						if (xhr.status==409)
						{
							$('.modal-title').html('Niestety nie możesz już głosować na tą trasę');	
							$('.modal-footer').html('');
						}
						else
						{
						alert('Niestety z powodu błędu nie możesz zagłosować');
						}
								
					}
});
};

function modalThanksForVote()
{
	$('.modal-footer').html('');
	$('.modal-title').html('Dziękujemy za zagłosowanie');
};


					     
function addVoteToTrack(id)
{
	var numberOfVote= $('#'+id);
  	var num = parseInt(numberOfVote.text());
  	numberOfVote.text(num+1);
};
