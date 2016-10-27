$(document).ready(function() {

    if ($('table').hasClass('listing')) {
        $('table').removeClass('listing').addClass('table table-responsive table-hover');
    }


    (function($) {
        $.fn.moveTo = function(selector) {
            return this.each(function() {
                var cl = $(this).clone();
                $(cl).prependTo(selector);
                $(this).remove();
            });
        };
    })(jQuery);

    $body_container = $('.page-body .page-container');
    $('.documentFirstHeading').moveTo($body_container);
    $('.above-content').moveTo($body_container);


    $('#portal-globalnav > li > a').addClass('no-events');

    $('.navbar-body').append("<button class='btn btn-default navbar-close' type='button'>X</button>");

    $('#navbar-toggle').click(function() {
        $('body').addClass('no-ovf');
    });


    $('.navbar-close').click(function() {
        $('#navbar').removeClass('open');
        $('body').removeClass('no-ovf');
    });

    $('#portal-globalnav > li > a').on('touchstart', function(e) {
        $('#portal-globalnav > li > a').not($(this)).addClass('no-events');
    });


    $('#portal-globalnav > li > a').on('touchstart', function(e) {
        if ($(this).hasClass('no-events')) {
            e.preventDefault();
            $(this).removeClass('no-events');
            $(this).parent().parent().find('.submenu').animate({ height: "hide" });
            $(this).parent().find('.submenu').first().animate({ height: "toggle" });
        }
    });


if (window.matchMedia("(max-width: 960px)").matches) {
    var navbar = document.querySelector('body');

    var hammertime = new Hammer(navbar);
    hammertime.on('swiperight', function() {
        console.log('right');
        $('#navbar').addClass('open');
        $('body').addClass('no-ovf');
    });

    hammertime.on('swipeleft', function() {
        console.log('left');
        $('#navbar').removeClass('open');
        $('body').removeClass('no-ovf');
    });
}

});
