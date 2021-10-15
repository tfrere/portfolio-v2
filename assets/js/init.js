import $ from "jquery";
import gsap from "gsap";
import Wave from "./components/Wave";

$(function () {
  const tl = gsap.timeline({ paused: true });
  const titleElem = document.querySelector(".landing__title");
  const textElem = document.querySelector(".landing__text");
  const blobElem = document.querySelector(".blob");
  const preloaderElem = document.getElementById("preloader");

  gsap.set(titleElem, { opacity: 1, yPercent: 60, skewY: -10, duration: 0 });
  gsap.set(textElem, { opacity: 0, yPercent: 60, duration: 0 });
  gsap.set(blobElem, { opacity: 0, yPercent: 20, duration: 0 });
  gsap.set(preloaderElem, { opacity: 1 });

  var waveElem = document.getElementById("wave-transition");
  if (waveElem) {
    var waveInstance = new Wave(waveElem, "black", "vertical");
    waveInstance.render();
  }

  tl.to(
    preloaderElem,
    {
      opacity: 0,
      onComplete: () => {
        $(preloaderElem).hide();
      },
    },
    1
  )
    .add(function () {
      waveInstance.move();
    }, 0.9)
    .to(
      titleElem,
      {
        opacity: 1,
        yPercent: 0,
        skewY: 0,
        duration: 2,
        ease: "expo.out",
        onComplete: () => {
          $(waveElem).hide();
        },
      },
      1.2
    )
    .to(
      textElem,
      {
        opacity: 1,
        yPercent: 0,
        duration: 2,
        ease: "expo.out",
      },
      1.7
    )
    .to(
      blobElem,
      {
        opacity: 1,
        yPercent: 0,
        duration: 2,
        ease: "expo.out",
      },
      1.4
    );

  tl.play();
});
