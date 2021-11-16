import $ from "jquery";
import gsap from "gsap";
import Masonry from "masonry-layout";
import "fluidbox";

$(function () {
  const tl = gsap.timeline({ paused: true });
  const titleElem = document.querySelector(".landing__content__title");
  const blobElem = document.getElementById("blob");
  const preloaderElem = document.querySelector(".preloader");
  const preloaderContentElem = document.querySelector(".preloader__content");

  gsap.set(titleElem, { opacity: 0, yPercent: 60, skewY: -10, duration: 0 });
  gsap.set(preloaderElem, { opacity: 1, duration: 0 });
  gsap.set(blobElem, { opacity: 0, duration: 0, yPercent: 10 });
  gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });

  var msnry = new Masonry(".projects__grid", {
    itemSelector: ".projects__grid__item",
    columnWidth: ".projects__grid__column",
    percentPosition: true,
  });

  $("a.img-fluidbox").fluidbox();
  $(window).on("scroll", function () {
    $("a.img-fluidbox").trigger("close.fluidbox");
  });

  // <!-- data-masonry='{ "itemSelector": ".projects__grid__item", "percentPosition": "true", "columnWidth": ".projects__grid__column" }' -->

  tl.to(preloaderContentElem, {
    opacity: 0,
    skewY: -10,
    y: -20,
    duration: 1,
    ease: "expo.in",
  })
    .to(preloaderElem, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        $(preloaderElem).hide();
      },
    })
    .to(
      titleElem,
      {
        opacity: 1,
        yPercent: 0,
        skewY: 0,
        duration: 1.5,
        ease: "expo.out",
        onComplete: () => {
          // $(waveElem).hide();
        },
      },
      "-=0.25"
    )
    .to(
      blobElem,
      {
        opacity: 1,
        duration: 0.75,
        yPercent: 0,
        ease: "expo.out",
        onStart: () => {
          window.sceneManager.onLoad();
        },
      },
      "-=0.750"
    );

  tl.play();
});
