import $ from "jquery";
import gsap from "gsap";
import Wave from "./components/Wave";
import Particles from "./components/Particles";

$(function () {
  const tl = gsap.timeline({ paused: true });
  const titleElem = document.querySelector(".landing__content__title");
  const textElem = document.querySelector(".landing__content__text");
  const blobElem = document.querySelector(".blob");
  const preloaderElem = document.querySelector(".preloader");
  const preloaderContentElem = document.querySelector(".preloader__content");
  const particlesElem = document.querySelector(".particles");
  const particles = new Particles({
    container: particlesElem,
    itemsSelector: ".particles-item",
  });

  gsap.set(titleElem, { opacity: 0, yPercent: 60, skewY: -10, duration: 0 });
  gsap.set(particles.getTimeline(), { timeScale: 1, duration: 0 });
  gsap.set(textElem, { opacity: 0, duration: 0 });
  gsap.set(preloaderElem, { opacity: 1, duration: 0 });
  // gsap.set(preloaderContentElem, { opacity: 0, y: 20, skewY: -10 });

  var waveElem = document.getElementById("wave-transition");
  if (waveElem) {
    var waveInstance = new Wave(waveElem, "black", "vertical");
    waveInstance.render();
  }

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
      waveInstance.move();
    }, "-=0.6")
    .to(titleElem, {
      opacity: 1,
      yPercent: 0,
      skewY: 0,
      duration: 1.5,
      ease: "expo.out",
      onComplete: () => {
        $(waveElem).hide();
      },
    })
    .fromTo(
      particles.getTimeline(),
      {
        timeScale: 12,
      },
      {
        timeScale: 0.5,
        duration: 1.5,
      },
      "-=2"
    )
    .to(
      textElem,
      {
        opacity: 1,
        duration: 0.5,
        ease: "ease.in",
      },
      "-=0.5"
    );

  tl.play();
});
