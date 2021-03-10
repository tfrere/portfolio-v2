(function () {
  $(".nav li, .nav h1, .nav-link").on("mouseenter", function (e) {
    console.log(2);
    if (!$(this).hasClass("active")) {
      $(".page, .landing").addClass("bg-" + $(this).attr("id") + "--important");
    }
  });
  $(".nav li, .nav h1, .nav-link").on("mouseleave", function (e) {
    if (!$(this).hasClass("active")) {
      $(".page, .landing").removeClass(
        "bg-" + $(this).attr("id") + "--important"
      );
    }
  });

  var color = "rgb(50,50,50)";
  var margin = 50;
  var numPoints = 32;

  canvas = document.getElementById("canvas");

  var blobInstance = new Blob(canvas, color, numPoints, margin);

  blobInstance.render();
  //   blobInstance.turbulence();

  var timeline = anime.timeline({
    loop: false,
    duration: 400,
  });

  anime.set(".word__content, .word__content--first", {
    translateY: "+=150px",
  });

  anime.set(".wanna-see-my-work__content", {
    translateY: "+=150px",
  });

  anime.set(".nav", {
    translateY: "-=150px",
  });

  var animation = timeline
    .add({
      targets: ".word__content--first",
      translateY: "-=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(100),
    })
    .add({
      targets: ".word__content--first",
      delay: 300,
    })
    .add({
      targets: ".word__content",
      translateY: "-=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(100),
    })
    .add({
      targets: ".wanna-see-my-work__content",
      translateY: "-=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(100),
    })
    .add({
      targets: ".nav",
      translateY: "+=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(100),
    });

  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    animation.reverse();
    animation.play();
    var that = this;
    setTimeout(function () {
      window.location.href = $(that).attr("href");
    }, 1500);
  });

  //   document.querySelector(".restart-demo").onclick = animation.restart;
})();
