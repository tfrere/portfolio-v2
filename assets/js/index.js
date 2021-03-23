(function () {
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

  $(".page").addClass("page--dom-loaded");

  $(".nav-link").on("click", function (e) {
    var that = this;
    canColorBeUpdated = false;
    e.preventDefault();
    $(".page").removeClass("page--dom-loaded");
    setTimeout(function () {
      window.location.href = $(that).attr("href");
    }, 500);
  });

  const force = 5;

  $(".three-dimensional-hover").mousemove(function (e) {
    const height = $(this).width();
    const width = $(this).height();
    var xVal = e.pageX - $(this).offset().left;
    var yVal = e.pageY - $(this).offset().top;
    const yRotation = force * ((xVal - width / 2) / width);
    const xRotation = -force * ((yVal - height / 2) / height);
    const string =
      "perspective(500px) scale(1.03) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";
    $(this).css("transform", string);
  });

  $(".three-dimensional-hover").on("mouseout", function () {
    $(this).css(
      "transform",
      "perspective(500px) scale(1) rotateX(0) rotateY(0)"
    );
  });
})();
