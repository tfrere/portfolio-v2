import anime from "animejs";
import $ from "jquery";

$(function () {
  var tap =
    "ontouchstart" in window || navigator.msMaxTouchPoints
      ? "touchstart"
      : "mousedown";

  var fireworks = (function () {
    var canvas = document.getElementById("color-splat");
    canvas.style.display = "none";
    var ctx = canvas.getContext("2d");
    var splatEvent = new Event("colorSplat");
    var numberOfParticules = 10;
    var distance = 80;
    var x = 0;
    var y = 0;
    var color = getComputedStyle(canvas).getPropertyValue("--text-color");
    var animations = [];
    let mousedown = undefined;

    var setCanvasSize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    var updateCoords = function (e) {
      x = e.clientX || e.touches[0].clientX;
      y = e.clientY || e.touches[0].clientY;
    };

    var createParticule = function (x, y) {
      var p = {};
      p.x = x;
      p.y = y;
      p.color = color;
      p.radius = anime.random(2, 10);
      p.draw = function () {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = p.color;
        ctx.fill();
      };
      return p;
    };

    var createParticles = function (x, y) {
      var particules = [];
      for (var i = 0; i < numberOfParticules; i++) {
        var p = createParticule(x, y);
        particules.push(p);
      }
      return particules;
    };

    var removeAnimation = function (animation) {
      var index = animations.indexOf(animation);
      if (animations.length == 1) {
        canvas.style.display = "none";
      }
      if (index > -1) animations.splice(index, 1);
    };

    var animateParticules = function (x, y, isOriented) {
      setCanvasSize();
      var particules = createParticles(x, y);

      var particulesAnimation = anime({
        targets: particules,
        x: function (p) {
          return (
            p.x +
            (isOriented
              ? anime.random(0, distance)
              : anime.random(-distance, distance))
          );
        },
        y: function (p) {
          return (
            p.y +
            (isOriented
              ? anime.random(-distance, 0)
              : anime.random(-distance, distance))
          );
        },
        radius: 0,
        duration: function () {
          return anime.random(1200, 1800);
        },
        easing: "easeOutExpo",
        complete: removeAnimation,
      });

      animations.push(particulesAnimation);
    };

    var mainLoop = anime({
      duration: Infinity,
      update: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animations.forEach(function (anim) {
          anim.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        });
      },
    });

    $("html").on("click", (e) => {
      var elapsed = Date.now() - mousedown;
      mousedown = undefined;
      color = getComputedStyle(canvas).getPropertyValue("--text-color");
      // if (elapsed >= 300) {
      const isALink =
        e.target.tagName.length == 1 && e.target.tagName.includes("A");
      const isEmail =
        e.target.classList && e.target.classList[0].includes("email");
      const isNav = e.target.classList && e.target.classList[0].includes("nav");
      const isExpertise =
        e.target.classList && e.target.classList[0].includes("expertise__item");

      if (!isALink && !isEmail && !isNav && !isExpertise) {
        window.dispatchEvent(splatEvent);
        canvas.style.display = "block";
        updateCoords(e);
        animateParticules(x, y);
      }
      // }
    });

    // window.addEventListener(
    //   "endOfPageReached",
    //   (e) => {
    //     canvas.style.display = "block";
    //     color = getComputedStyle(canvas).getPropertyValue("--yellow");
    //     updateCoords({
    //       clientX: 15,
    //       clientY: canvas.height - 15,
    //     });
    //     animateParticules(x, y, true);
    //   },
    //   false
    // );

    window.addEventListener("resize", setCanvasSize, false);
    window.addEventListener(
      "mousedown",
      function () {
        mousedown = Date.now();
      },
      false
    );

    return {
      boom: animateParticules,
    };
  })();
});
