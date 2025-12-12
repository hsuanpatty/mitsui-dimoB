$(document).ready(function () {

  /*-------------------------
   Banner
  --------------------------*/
  $(".banner-img").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1200,
    fade: true,
    cssEase: "ease-in-out",
    adaptiveHeight: true,
    pauseOnHover: true,
    pauseOnFocus: true
  });


  /*-------------------------
   Slider group function
  --------------------------*/
  $(document).ready(function() {

  function initMainSlider() {
    const windowW = $(window).width();

    // destroy old slider if exists
    if ($(".main-slider").hasClass('slick-initialized')) {
      $(".main-slider").slick('unslick');
    }

    $(".main-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: windowW <= 1499.98 ? true : false,
      autoplay: false,
      adaptiveHeight: true
    });
  }

  // initialize
  initMainSlider();

  // init first thumb active
  $(".thumb-slider div").first().addClass("active-thumb");

  // click thumb to go main slider
  $(".thumb-slider div").on("click", function() {
    const index = $(this).data("index");
    $(".main-slider").slick("slickGoTo", index);

    $(".thumb-slider div").removeClass("active-thumb");
    $(this).addClass("active-thumb");
  });

  // sync thumb on main slider change
  $(".main-slider").on("beforeChange", function(e, slick, cur, next) {
    $(".thumb-slider div").removeClass("active-thumb");
    $(".thumb-slider div[data-index='" + next + "']").addClass("active-thumb");
  });

  // on window resize, re-init slider
  $(window).on('resize', function() {
    initMainSlider();
  });

});
    });


    