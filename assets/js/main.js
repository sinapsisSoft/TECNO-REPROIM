/**
* Template Name: Flexor - v2.1.1
* Template URL: https://bootstrapmade.com/flexor-free-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
var validateCaptcha = false;
var captcha = null;

//Function captcha Google
var onloadCallback = function () {
  captcha = grecaptcha.render('html_element_captcha', {
    'sitekey': '6LfEXLAZAAAAAD6LFAIJuw4kIlYawGeJKM5nLh07',
    'callback': function (response) {
      //$('#btn_submit').removeAttr('disabled');
      validateCaptcha = true;
    },
    'theme': 'white'
  });
};

!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;
        var scrolled = 0;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()

          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });
  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // services carousel (uses the Owl Carousel library)
  $(".services-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 2
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
      $(".category").click(function(e){
        e.preventDefault();
        var filter = $(this).attr("data-filter");
        $(".box-img").attr("hidden",false);
        if(filter == "todos"){
          $(".box-img").show(500);
        }
        else {
          $(".box-img").not("."+filter).hide(500);
          $(".box-img").filter("."+filter).show(500);          
        }
      });
      $("#gallery ul li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
      });
    });
  });

  // Initi AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  aos_init();

})(jQuery);

//Validate information
function sendData(idform, type) {
  if (validatorForm(idform)) {
    if (type == 1) { //Formulario contáctenos
       if (validateCaptcha) {
        let objForm = document.getElementById(idform);
        let ArrayData = "";
        for (let i = 0; i < objForm.length; i++) {
          if (objForm[i].type == "text" || objForm[i].type == "email" || objForm[i].type == "number" || objForm[i].type == "select-one") {
            ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
          }
          else if (objForm[i].id == "message") {
            ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
          }
        }
        ArrayData = ArrayData.substr(0, ArrayData.length - 1); 
        sendMail(ArrayData, idform, 1);
       }
      else {
        toastr.warning("Comprueba que no eres un robot", "Verifica el captcha", {
          "closeButton": true,
          "progressBar": true,
          "showDuration": "1000",
          "hideDuration": "1000",
          "timeOut": "5000",
        });
      }
    }
  }
}

function sendMail(json, idForm, type) {  
  try {
    dataSetMail = "";
    var xhttp = new XMLHttpRequest();
    if (type == 1) {
      dataSetMail = '{"POST":"SEND_MAIL",' + json + '}';
    }
    xhttp.open("POST", "php/mail/notification.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(xhttp.responseText);
        if (xhttp.responseText != 0) {
          if (type == 1) {
            toastr.success("Pronto nos comunicaremos contigo", "Gracias por escribirnos", {
              "closeButton": true,
              "progressBar": true,
              "showDuration": "1000",
              "hideDuration": "1000",
              "timeOut": "5000",
            });
          }
          cleanForm(idForm, type);
          $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        } else {
          toastr.error("Hubo un error, por favor intenta nuevamente", "Error al enviar la solicitud", {
            "closeButton": true,
            "progressBar": true,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
          });
        }
      }
    };
    xhttp.send(dataSetMail);
  } catch (error) {
    console.error(error);
    toastr.error("Se presentó un error, intenta nuevamente", "Error en el registro", {
      "closeButton": true,
      "progressBar": true,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
    });
  }
}

//Validate form
function validatorForm(idForm) {
  let objForm = document.getElementById(idForm);

  ///For input ///
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].required == true) {
      if (objForm[i].type == "email") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "password") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "text") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "number") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }

    }
  }
  return true;
}

function cleanForm(idForm, type) {
  objForm = document.getElementById(idForm);
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].type == 'checkbox') {
      objForm[i].checked = false;
    }
    else {
      objForm[i].value = "";
    }
  }
  if (type == 1) {
    grecaptcha.reset();
  }
}