import $ from "jquery";
import gsap from "gsap";

$(function () {
  const tl = gsap.timeline({ paused: true });
  const titleElem = document.querySelector(".landing__content__title");
  const preloaderElem = document.querySelector(".preloader");
  const preloaderContentElem = document.querySelector(".preloader__content");

  gsap.set(titleElem, { opacity: 0, yPercent: 60, skewY: -10, duration: 0 });
  gsap.set(preloaderElem, { opacity: 1, duration: 0 });
  gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });

  tl.to(
    preloaderContentElem,
    {
      opacity: 0,
      skewY: -10,
      y: -20,
      duration: 1,
      ease: "expo.in",
    },
    "+=0.5"
  )
    .to(preloaderElem, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        $(preloaderElem).hide();
      },
    })
    .add(function () {
      // waveInstance.move();
    }, "-=0.6")
    .to(titleElem, {
      opacity: 1,
      yPercent: 0,
      skewY: 0,
      duration: 1.5,
      ease: "expo.out",
      onComplete: () => {
        // $(waveElem).hide();
      },
    });

  tl.play();
});
