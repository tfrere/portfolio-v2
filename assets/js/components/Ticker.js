import $ from "jquery";

document.querySelectorAll(".js-ticker").forEach((ticker) => {
  var speed = 50;

  $(".js-ticker li").wrapAll('<span class="ticker-items">');

  var tickerWidth = $("ul").width();
  tickerItemsWidth = $(".ticker-items").eq(0).width();

  var spanWidth = $(".js-ticker span").width();

  $(".js-ticker span").eq(0).clone().appendTo(".js-ticker");
  $(".js-ticker span").eq(0).clone().appendTo(".js-ticker");
  $(".js-ticker span").wrapAll('<span class="ticker-wrapper">');

  var tickerWraper = ".ticker-wrapper";
  var transformX;
  var progressX;
  gsap.set(".ticker-wrapper", { x: -tickerItemsWidth });
  var wrapWidth = tickerItemsWidth * 3;

  var initDuration = tickerWidth / speed;
  var loopDuration = spanWidth / speed;
  var tl = gsap.timeline({ repeat: -1 });

  tl.to(tickerWraper, 0, {
    x: -tickerItemsWidth,
    ease: "none",
  });
  tl.to(tickerWraper, loopDuration, {
    x: -tickerItemsWidth * 2,
    ease: "none",
    onUpdate: function () {
      // console.log('onUpdate= ', tl.progress());
    },
  });

  var draggable = new Draggable(tickerWraper, {
    type: "x",
    trigger: ".js-ticker",
    throwProps: true,
    onPressInit: function () {
      tl.pause();
    },
    onDrag: function () {
      transformX = (this.x + tickerItemsWidth) % tickerItemsWidth;
      progressX = -transformX / tickerItemsWidth;
      if (progressX < 0 || progressX === 1) {
        progressX = 1 + (progressX % 1);
      } else {
        progressX = 0 + (progressX % 1);
      }
      tl.progress(progressX);
    },
    onThrowUpdate: function () {
      transformX = (this.x + tickerItemsWidth) % tickerItemsWidth;
      progressX = -transformX / tickerItemsWidth;
      if (progressX < 0 || progressX === 1) {
        progressX = 1 + (progressX % 1);
      } else {
        progressX = 0 + (progressX % 1);
      }

      tl.progress(progressX);
    },
    onThrowComplete: function () {
      tl.play();
      gsap.fromTo(tl, 1, { timeScale: 0 }, { timeScale: 2, ease: "none" });
    },
  });
});
