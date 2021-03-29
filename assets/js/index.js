(function () {


  let shapes = [
    {
      points:
        "0.496109976 7.0996935 235.565804 1.4104571 208 111 15.1317792 103.951343"
    },
    {
      points:
        "38.8418198 -1.65865987 228.100294 11.0035193 197.324804 116.715815 3.12811183 118.154472"
    },
    {
      points:
        "-0.390576618 13.1342473 198.600622 1.24477432 196.559847 102.237595 8.01584392 98.9193749"
    }
  ];

  var delay = 5000;
  var duration = 1500;

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  window.setInterval(function () {
    window.setTimeout(function () {
      $(".rectangle").each(function(){
        anime({
          targets: this,
          points: [
            { value: shapes[randomIntFromInterval(0, shapes.length - 1)].points }
          ],
          duration: duration
        });
      });
    }, Math.random() * 500);
  }, delay);


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
