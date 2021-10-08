import anime from "animejs";
import $ from "jquery";

$(function () {
  var tap =
    "ontouchstart" in window || navigator.msMaxTouchPoints
      ? "touchstart"
      : "mousedown";

  var fireworks = (function () {
    var canvas = document.getElementById("color-splat");
    var ctx = canvas.getContext("2d");
    var numberOfParticules = 10;
    var distance = 80;
    var x = 0;
    var y = 0;
    var color = "#fff";
    var animations = [];

    var setCanvasSize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    var updateCoords = function (e) {
      x = e.clientX || e.touches[0].clientX;
      y = e.clientY || e.touches[0].clientY;
    };

    var createCircle = function (x, y) {
      var p = {};
      p.x = x;
      p.y = y;
      p.color = color;
      p.radius = 0;
      p.alpha = 0.6;
      p.lineWidth = 6;
      p.draw = function () {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = p.lineWidth;
        ctx.strokeStyle = p.color;
        ctx.stroke();
        ctx.globalAlpha = 0.6;
      };
      return p;
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
      if (index > -1) animations.splice(index, 1);
    };

    var animateParticules = function (x, y) {
      setCanvasSize();
      var particules = createParticles(x, y);
      var circle = createCircle(x, y);
      var particulesAnimation = anime({
        targets: particules,
        x: function (p) {
          return p.x + anime.random(-distance, distance);
        },
        y: function (p) {
          return p.y + anime.random(-distance, distance);
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
      console.log(e.target);
      // e.preventDefault();
      // e.stopPropagation();
      if (window.isSlideClickable) {
        updateCoords(e);
        animateParticules(x, y);
      }
    });

    //     window.setInterval(()=>{
    //       updateCoords({clientX: 500, clientY: 500});
    //       animateParticules(x, y);

    //     }, 1000);

    // document.addEventListener(
    //   tap,
    //   function (e) {
    //     updateCoords(e);
    //     animateParticules(x, y);
    //   },
    //   false
    // );

    window.addEventListener("resize", setCanvasSize, false);

    return {
      boom: animateParticules,
    };
  })();
});
