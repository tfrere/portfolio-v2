import $ from "jquery";
import gsap from "gsap";
import Masonry from "masonry-layout";
// const hyphenopoly = require("hyphenopoly");
// import "hyphenopoly";

$(function () {
  const tl = gsap.timeline({ paused: true });
  const titleElem = document.querySelector(".landing__container");
  const blobElem = document.getElementById("blob");
  const preloaderElem = document.querySelector(".preloader");
  const preloaderContentElem = document.querySelector(".preloader__content");

  // gsap.set(titleElem, { opacity: 0, yPercent: 60, skewY: -10, duration: 0 });
  // gsap.set(preloaderElem, { opacity: 1, duration: 0 });
  // gsap.set(blobElem, { opacity: 0, duration: 0, yPercent: 10 });
  // gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });

  var msnry = new Masonry(".projects__grid", {
    itemSelector: ".projects__grid__item",
    columnWidth: ".projects__grid__column",
    percentPosition: true,
  });

  if (window.innerWidth > 500) {
    gsap.set(titleElem, { opacity: 0, yPercent: 60, skewY: -10, duration: 0 });
    gsap.set(preloaderElem, { opacity: 1, duration: 0 });
    gsap.set(blobElem, { opacity: 0, duration: 0, yPercent: 10 });
    gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });

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
        onStart: (e) => {
          $(window).scrollTop(0);
        },
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
          onComplete: () => {},
        },
        "-=0.25"
      )
      .to(
        blobElem,
        {
          opacity: 1,
          duration: 0.75,
          yPercent: 0,
          ease: "linear",
          onStart: () => {
            window.sceneManager.onLoad();
          },
        },
        "-=0.750"
      );
  } else {
    gsap.set(titleElem, { opacity: 0, yPercent: 20, skewY: 0, duration: 0 });
    gsap.set(preloaderElem, { opacity: 1, duration: 0 });
    gsap.set(blobElem, { opacity: 0, duration: 0, yPercent: 10 });
    gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });

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
        onStart: (e) => {
          $(window).scrollTop(0);
        },
        onComplete: () => {
          $(preloaderElem).hide();
        },
      })
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
        "-=0.250"
      )
      .to(
        titleElem,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.5,
          ease: "expo.out",
          onComplete: () => {},
        },
        "-=0.25"
      );
  }

  tl.play();

  // const hyphenator = hyphenopoly.config({
  //   require: ["de", "en-us"],
  //   hyphen: "•",
  //   exceptions: {
  //     "en-us": "en-han-ces",
  //   },
  // });

  // async function hyphenate_en(text) {
  //   const hyphenateText = await hyphenator.get("en-us");
  //   console.log(hyphenateText(text));
  // }

  // hyphenate_en("hyphenation enhances justification.");
});
