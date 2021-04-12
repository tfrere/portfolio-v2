(function () {


  var lazyLoadInstance = new LazyLoad({
    // Your custom settings go here
  });
  
  lazyLoadInstance.update();
  

  var canColorBeUpdated = true;
  $(".nav li, .nav h1, .nav-link").on("mouseenter", function (e) {
    if (!$(this).hasClass("active") && canColorBeUpdated) {
      $(".page, .landing").addClass("bg-" + $(this).attr("id") + "--important");
    }
  });
  $(".nav li, .nav h1, .nav-link").on("mouseleave", function (e) {
    if (!$(this).hasClass("active") && canColorBeUpdated) {
      $(".page, .landing").removeClass(
        "bg-" + $(this).attr("id") + "--important"
      );
    }
  });

  $(".page, .landing").addClass("page--dom-loaded");
 
  $(".nav-link").on("click", function (e) {
    var that = this;
    canColorBeUpdated = false;
    e.preventDefault();
    $(".page, .landing").removeClass("page--dom-loaded");
    setTimeout(function () {
      window.location.href = $(that).attr("href");
    }, 500);
  });



  var convertRange = function (value, r1, r2, rounded = true) {
        value = ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
        if (rounded) {
            return Math.round(value);
        } else {
            return Math.round(value * 10) / 10;
        }
    };

    // var computeBackgroundParallax = function() {
        
    //     const contentOffset = -($(window).scrollTop() / 6).toFixed(0);
    //     $(".page__background").css({
    //     "transform": "translate3d(0," + contentOffset + "px, 0)"
    //     });

    //     // const contentOffset = -($(window).scrollTop() / 6).toFixed(0);
    //     // $(".page__background").css({
    //     // "transform": "translate3d(0," + contentOffset + "px, 0)"
    //     // });

    // }

    // $(window).on("scroll", function(){
    //     computeBackgroundParallax();
    // });

    // computeBackgroundParallax();

})();
