


$(document).ready(function() {

    var navbar_body = document.querySelector('.navbar-body');
    var body = document.querySelector('body');
    var homepage_admin = document.querySelector('.template-homepage .admin');
    var header = document.querySelector('header');
    var documentFirstHeading = document.querySelector('.documentFirstHeading');
    var main = document.querySelector('.page-main');
    var main_other = document.querySelector('#viewlet-above-content-title');
    var above_content = document.querySelector('.above-content');
    var mobile_menu_item = document.querySelector('#portal-globalnav > li > a');
    var navbar = document.querySelector('#navbar');
    var navbar_toggle = document.querySelector('#navbar-toggle');
    var table = document.querySelector('table');

    function loadData1(callback) {
        navbar_body.innerHTML += "<button class='btn btn-default navbar-close' type='button'>X</button>";
        if (callback && typeof callback == "function") {
            callback();
        }
    }

    loadData1(function() {
        function loadData(callback) {
            if (body.classList.contains('template-homepage')) { 
                $('body')
                    .css('display', 'block')
                    .velocity({
                        translateZ: "0",
                        opacity: [0, 'easeIn']
                    }, 0);
            }

            if (callback && typeof callback == "function") {
                callback();
            }
        }
        loadData(function() {
          if (body.classList.contains('template-homepage')){
                $('body').velocity('reverse', 600);
          }
        });
    })





    navbar_toggle.addEventListener('click', function() {
        body.classList.add('no-ovf');
        navbar.classList.add('open');
    })


    document.addEventListener('click', function(event) {
        if (event.target == document.querySelector('.navbar-close')) {
            callback();
        }
    });

    function callback() {
        body.classList.remove('no-ovf');
        navbar.classList.remove('open');
    }


  

    //jquery 
    if (window.matchMedia("(max-width: 960px)").matches) {
        $('#portal-globalnav > li > a').addClass('no-events');
        $('#portal-globalnav > li').on('touchstart', function(e) {
            $('#portal-globalnav > li ').not($(this)).children().addClass('no-events');
        });
    }
    var $activeMenuItem;

    $('.no-events').parent().on('touchstart', function(e) {
        if ($(this).children().hasClass('no-events')) {
            console.log('lol');
            e.preventDefault();
            $(this).children().removeClass('no-events');
            if ($activeMenuItem)
                $activeMenuItem.animate({ height: "hide" });
            $activeMenuItem = $(this).find('.submenu');
            $activeMenuItem.animate({ height: "toggle" });
        }
    });
    //jquery-end

    if (table) {
        if (table.classList.contains('listing')) {
            table.classList.add('table', 'table-responsive', 'table-hover');
            table.classList.remove('listing');
        }
    }


    if (window.matchMedia("(max-width: 960px)").matches) {
        var navbar = document.querySelector('body');

        var hammertime = new Hammer(navbar);
        hammertime.on('swiperight', function() {
            body.classList.add('no-ovf');
            navbar.classList.add('open');
        });

        hammertime.on('swipeleft', function() {
            body.classList.remove('no-ovf');
            navbar.classList.remove('open');
        });
    }

});
