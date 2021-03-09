(function () {
  var color = "grey";
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
      delay: anime.stagger(60),
    })
    .add({
      targets: ".word__content--first",
      delay: 300,
    })
    .add({
      targets: ".word__content",
      translateY: "-=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(60),
    })
    .add({
      targets: ".wanna-see-my-work__content",
      translateY: "-=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(60),
    })
    .add({
      targets: ".nav",
      translateY: "+=150px",
      easing: "easeInOutQuad",
      delay: anime.stagger(60),
    });

  document.querySelector(".restart-demo").onclick = animation.restart;
})();
