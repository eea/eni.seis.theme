function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}


$(document).ready(function() {


    (function($) {
        $.fn.moveTo = function(selector) {
            return this.each(function() {
                var cl = $(this).clone();
                $(cl).prependTo(selector);
                $(this).remove();
            });
        };
    })(jQuery);

    function loadData1(callback) {
        $('.navbar-body').append("<button class='btn btn-default navbar-close' type='button'>X</button>");
        if ($('body').hasClass('template-homepage')) {
            $('.template-homepage .admin').moveTo($('body'));
        } else {
            $body_container = $('.page-body .page-container');
            $('.documentFirstHeading').moveTo($body_container);
            $('.above-content').moveTo($body_container);
        }

        if (callback && typeof callback == "function") {
            callback();
        }
    }

    loadData1(function() {
        function loadData(callback) {
            $('body')
                .css('display', 'block')
                .velocity({
                    translateZ: "0",
                    opacity: [0, 'easeIn']
                }, 0);


            if (callback && typeof callback == "function") {
                callback();
            }
        }
        loadData(function() {
            $('body').velocity('reverse', 600);
        });
    });


    $('#portal-globalnav > li > a').addClass('no-events');


    $('#navbar-toggle').click(function() {
        $('body').addClass('no-ovf');
        $('#navbar').addClass('open');
    });


    $('.navbar-close').click(function() {
        $('#navbar').removeClass('open');
        $('body').removeClass('no-ovf');
    });

    $('#portal-globalnav > li > a').on('touchstart', function(e) {
        $('#portal-globalnav > li > a').not($(this)).addClass('no-events');
    });

    var map_overlay = document.querySelector('.map-overlay');
    map_overlay.addEventListener('click', function(){
          this.classList.add('hidden');
    });

    function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible == false) {
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

var handler = onVisibilityChange(map_overlay, function() {
              map_overlay.classList.remove('hidden');
});
 

if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false); 
    addEventListener('load', handler, false); 
    addEventListener('scroll', handler, false); 
    addEventListener('resize', handler, false); 
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // IE9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
}


    var $activeMenuItem;

    $('#portal-globalnav > li > a').on('touchstart', function(e) {
        if ($(this).hasClass('no-events')) {
            e.preventDefault();
            $(this).removeClass('no-events');
            if ($activeMenuItem)
                $activeMenuItem.animate({ height: "hide" });
            $activeMenuItem = $(this).parent().find('.submenu');
            $activeMenuItem.animate({ height: "toggle" });
        }
    });
    if ($('table').hasClass('listing')) {
        $('table').removeClass('listing').addClass('table table-responsive table-hover');
    }


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
