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
  if($(body).hasClass("template-newsitem_view")) {
    // Fancy first letter in news item view
    $("#content #parent-fieldname-text p").first().addClass("fancy-first-letter");
  }

  // #92274 FAQ section behavior. Markup structure:
  // div.eni-faq-wrapper
  //   div.eni-faq-item
  //     div.eni-faq-question
  //       a
  //     div.eni-faq-answer
  //       p etc
  var faq_behavior = (function eni_faq_sections() {
    console.log("START faq_behavior");
    // View mode
    $("div.eni-faq-answer").hide();
    $("div.eni-faq-question a").on("click", function(evt) {
      evt.preventDefault();
      $(this).parent().parent().find(".eni-faq-answer").toggle();
    });

    // Add edit button
    console.log("ADD edit btn");
    var $edit_btn = $('<input type="button" value="Edit" name="faq-edit" />');
    $edit_btn.insertAfter($(".eni-faq-wrapper"));

    function faq_item(question_text, answer_html) {
      // Return a faq item as used in edit mode
      var result = "";
      $textarea_question = '<textarea class="question" rows="5">' + question_text + '</textarea>'
      $textarea_answer = '<textarea class="answer" rows="5">' + answer_html + '</textarea>'
      result += "<div class='eni-faq-item'>"
      result += "<h3>FAQ question:</h3>";
      result += $textarea_question;
      result += "<h3>FAQ answer:</h3>";
      result += $textarea_answer;
      result += "<button class='eni-faq-delete-question'>Delete</button>"
      result += "<button class='eni-faq-add-question'>Add</button>"
      result += "</div>";
      return result;
    }

    function html_view_to_edit($faq_items) {
      console.log("view -> edit");
      // Prepare edit mode for existing questions.
      // Return the html used in edit dialog.
      var result = "";
      $faq_items.each(function() {
        $question = $(this).find(".eni-faq-question");
        $answer = $(this).find(".eni-faq-answer");
        result += faq_item($question.text(), $answer.html());
      });
      result += "<button id='faq-save'>Save</button>";
      return result;
    }

    function html_edit_to_view($edit_dialog) {
      // Prepare the html for view mode based on updated items.
      // Return the html as used in a faq section.
      console.log("edit -> view");
      var result = "";
      $edit_dialog.find(".eni-faq-item").each(function() {
        $question = $(this).find("textarea.question");
        $answer = $(this).find("textarea.answer");
        result += "<div class='eni-faq-item'>";
        result += "<div class='eni-faq-question'><a href='#'>" + $question.val() + "</a></div>";
        result += "<div class='eni-faq-answer'>" + $answer.val() + "</div>";
        result += "</div>";
      });
      return result;
    }

    $edit_btn.on("click", function() {
      // Edit mode
      $edit_btn.remove();
      console.log("START edit mode");
      $faq_wrapper = $(".eni-faq-wrapper");
      $faq_items = $faq_wrapper.find(".eni-faq-item");
      var $edit_dialog = $(document.createElement('div'));
      $edit_dialog.html(html_view_to_edit($faq_items));
      $edit_dialog.dialog();

      $(document.body).on('click', 'button.eni-faq-delete-question', function(evt) {
        var result = confirm("Delete item: Are you sure?");
        if (result) {
          $(this).parent().remove();
        }
      });

      $(document.body).on('click', 'button.eni-faq-add-question', function(evt) {
        $(this).parent().after(faq_item("", "<p></p>"));
      });

      $("#faq-save").on("click", function(evt) {
        console.log("SAVE!");
        // Save
        evt.preventDefault();
        new_html = html_edit_to_view($edit_dialog);
        $faq_wrapper.html(new_html);

        // Clear
        $edit_dialog.dialog("close");
        $edit_dialog.dialog('destroy').remove();
        $(document.body).off('click');

        // Reinit
        console.log("REINIT");
        eni_faq_sections();
      });

    });
  }());

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
  }

  if($(body).hasClass("template-communication_and_visibility")) {
    // Communication and visibility:
    // Solution to have container-fluid instead of container, bg color gray
    $(".site-container").after("<div class='container-fluid moved-events'><div class='container'></div></div>");
    $(".section-frontpage-events").appendTo('.container-fluid.moved-events .container');
    $(".container-fluid.moved-events").after("<div class='site-container moved-sections'><div class='row no-portlets'></div></div>");
    $(".jquery-move-me").appendTo('.site-container.moved-sections .row');
  }

  if($(body).hasClass("template-areas-of-work_data")) {
    // Areas of work / Data:
    // Solution to have container-fluid instead of container, bg color gray
    $(".site-container").after("<div class='container-fluid moved-aow-slider'><div class='container'></div></div>");
    $(".data-section-aow-slider.jquery-move-me").appendTo('.container-fluid.moved-aow-slider .container');
    $(".container-fluid.moved-aow-slider").after("<div class='container moved-sections'></div>");
    $(".row.no-portlets.jquery-move-me").appendTo('.container.moved-sections');
  }

  if($(body).hasClass("template-indicators_and_assessments")) {
    // Areas of work / Indicators and Assessments:
    // Solution to have container-fluid instead of container, bg green/gray
    $(".site-container").after("<div class='container-fluid moved-video-section'><div class='container'></div></div>");
    $(".video-section.jquery-move-me").appendTo('.container-fluid.moved-video-section .container');
    $(".container-fluid.moved-video-section").after("<div class='container moved-text-section'></div>");
    $(".text-section.jquery-move-me").appendTo('.container.moved-text-section');
  }

  if($(body).hasClass("template-country_view_east")) {
    // Country view East / Country news:
    // Solution to have container-fluid instead of container, bg gray
    $(".site-container").after("<div class='container-fluid moved-country-news-section'><div class='container'></div></div>");
    $(".country-news-row.jquery-move-me").appendTo('.container-fluid.moved-country-news-section .container');
  }

  $(".documentFirstHeading").each(
    function() {
      if($(this).text().length == 0) {
        $(this).hide();
      }
    }
  );
});
