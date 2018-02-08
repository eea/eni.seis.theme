$(document).ready(function() {

  function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

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
  var table = document.querySelectorAll('table');
  var site_container = document.querySelector('.site-container');
  var page_body = document.getElementById('site-body');

  // Get IE or Edge browser version
  var version = detectIE();

  if (version === false) {

  } else if (version >= 12) {
    console.log('>=12');
  } else {
    // site_container.style.display = "block"; [TODO] Need it?
  }

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
      if (body.classList.contains('template-homepage')) {
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

  //remove aside if it has no children
  var page_aside = document.querySelector('aside.page-aside');

  if (page_aside) {
    if (page_aside.children.length == 0) {
      page_aside.parentNode.removeChild(page_aside);
    }
  }

  $("#left").click(function(){
    $(".event-menu").animate({scrollLeft: "-="+100});
  });
  $("#right").click(function(){
    $(".event-menu").animate({scrollLeft: "+="+100});
  });


  //jquery
  $("ul#portal-globalnav li#portaltab-communication").on("click", function(evt) {
    if(evt.target.text.indexOf("Communication") >= 0) {
      evt.preventDefault();  // Unclickable Communication option in main menu
    }
  });

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
    Array.prototype.forEach.call(table, function(el, i) {
      if (el.classList.contains('listing')) {
        el.classList.add('table', 'table-responsive', 'table-hover');
        el.classList.remove('listing');
      }
    });
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

  if($(body).hasClass("template-country_view")) {
    $("#plone-document-byline").prependTo(".country-left-column");
    $("h1.documentFirstHeading").prependTo(".country-left-column");
    $("img.flag").prependTo("h1.documentFirstHeading");
  }

  $(".documentFirstHeading").each(
    function() {
      if($(this).text().length == 0) {
        $(this).hide();
      }
    }
  );
});
