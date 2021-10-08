import $ from "jquery";
import gsap from "gsap";
import anime from "animejs";
import { tns } from "./node_modules/tiny-slider/src/tiny-slider";

$(document).ready(function () {
  var slider = tns({
    container: ".slider",
    items: 3,
    slideBy: "page",
    loop: true,
    autoplay: false,
    mouseDrag: true,
    // center: false,
    swipeAngle: false,
    speed: 400,
    gutter: 24,
    edgePadding: 192 + 48,
    nav: false,
    controls: false,
    responsive: {
      640: {
        items: 2,
      },

      768: {
        items: 3,
      },
    },
  });

  window.isSlideClickable = true;

  slider.events.on("touchMove", () => {
    console.log("touchMove");
    window.isSlideClickable = false;
  });
  slider.events.on("dragMove", () => {
    console.log("dragMove");
    window.isSlideClickable = false;
  });
  slider.events.on("transitionEnd", () => {
    console.log("transitionEnd");
    window.isSlideClickable = true;
  });

  $(".slide__content").on("click", (e) => {
    console.log("window.isSlideClickable", window.isSlideClickable);
    if (!window.isSlideClickable) e.preventDefault();
  });
});

import "./components/CubertoCursor";
import "./components/Cursor";

import Wave from "./components/Wave";
import "./components/FpsCounter";
import Magnetic from "./components/Magnetic";
import "./components/Ticker";
import "./components/ThreeDimensionalHover";
import "./components/Marquee";
import "./components/Apparition";
import "./components/ScrollAnim";

import "./components/Blob";
import "./components/Boids";
import "./components/Particles";
import "./components/ColorSplat";
import "./components/MovinLines";

import "./components/MaskHoverTextEffect";

// import "./initializers/updateProfession";
import "./initializers/initializeColcade";
import "./initializers/initializeFluidbox";

(function () {
  let clickToCopyTimeout = null;
  $("[data-click-to-copy]").on("click", (e) => {
    let elem = $(e.currentTarget);
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("write@tfrere.fr").then(
      function () {
        elem.find(".click-to-copy__info-message").addClass("show");
        elem.find(".click-to-copy__email").removeClass("show");
        clearTimeout(clickToCopyTimeout);
        clickToCopyTimeout = window.setTimeout(() => {
          elem.find(".click-to-copy__info-message").removeClass("show");
          elem.find(".click-to-copy__email").addClass("show");
        }, 1000);
      },
      function () {
        window.location.href = "mailto:write@tfrere.fr";
      }
    );
  });
})();

$(document).ready(function () {
  $(window).scrollTop(0);
  // $(document).scrollTop(0);
});

(function () {
  const tl = gsap.timeline({ paused: true });
  const titleElem = document.querySelector(".landing__title");
  const textElem = document.querySelector(".landing__text");
  const preloaderElem = document.querySelector("#preloader");

  gsap.set(titleElem, { opacity: 1, yPercent: 60, skewY: 5, duration: 0 });
  gsap.set(textElem, { opacity: 0, yPercent: 60, duration: 0 });
  gsap.set(preloaderElem, { opacity: 1 });

  var waveCanvas = document.getElementById("wave-transition");
  if (waveCanvas) {
    var waveInstance = new Wave(waveCanvas, "black", "vertical");
    waveInstance.render();
  }

  $("[data-nav-link]").on("click", (e) => {
    let that = this;
    let elem = $(e.currentTarget);
    // console.log(elem);
    e.preventDefault();
    e.stopPropagation();
    waveInstance.move();
    setTimeout(function () {
      window.location.href = elem.attr("href");
    }, 500);
  });

  // var swiper = new Swiper(".mySwiper", {
  //   slidesPerView: 3,
  //   spaceBetween: 30,
  //   freeMode: true,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

  // const ST = ScrollTrigger.create({
  //   trigger: "body",
  //   start: 0,
  //   end: "bottom bottom",

  //   animation: () => {
  //     console.log(1);
  //   }, // can be left out
  //   pin: ".content", // can be left out
  //   scrub: true, // can be left out
  // });

  // Header
  tl.to(
    preloaderElem,
    {
      opacity: 0,
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
    );

  tl.play();
})();
