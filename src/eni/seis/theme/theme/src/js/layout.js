$(document).ready(function(){

	  if ( $('table').hasClass('listing') ) {
            $('table').removeClass('listing').addClass('table table-responsive table-hover');
        }


$('#portal-globalnav > li > a').addClass('no-events');

$('.navbar-body').append( "<button class='btn btn-default navbar-close' type='button'>X</button>" );

$('.navbar-close').click(function(){
	$('.navbar-body').removeClass('open');
})

$('#portal-globalnav > li > a').on('touchstart',function(e){
	console.log(e.target);

$('#portal-globalnav > li > a').not($(this)).addClass('no-events');
});


$('#portal-globalnav > li > a').on('touchstart', function(e){
			if ($(this).hasClass('no-events')) {
			  e.preventDefault();
			  $(this).removeClass('no-events');
			  $(this).parent().parent().find('.submenu').animate({height:"hide"});
			  $(this).parent().find('.submenu').first().animate({height:"toggle"});
			}
});
})