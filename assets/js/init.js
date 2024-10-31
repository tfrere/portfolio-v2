import $ from "jquery";
import gsap from "gsap";
import Masonry from "masonry-layout";

$(function () {
  const mobileBreakpoint = 640;
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const tl = gsap.timeline({ paused: true });
  const appElem = document.getElementById("app");
  const titleElem = document.querySelector(".landing__container");
  const blobElem = document.getElementById("blob");
  const preloaderElem = document.querySelector(".preloader");
  const preloaderContentElem = document.querySelector(".preloader__content");
  const descriptionFirstBlockElem = document.querySelector(
    ".description--first-block"
  );

  $(appElem).addClass("app--is-loaded");

  window.onbeforeunload = function () {
    $(appElem).removeClass("app--is-loaded");
    window.scrollTo(0, 0);
  };

  var msnry = new Masonry(".projects__grid", {
    itemSelector: ".projects__grid__item",
    columnWidth: ".projects__grid__column",
    percentPosition: true,
  });

  var preloaderPercentageCount = { val: 0 };

  if (window.innerWidth > mobileBreakpoint) {
    // DESKTOP CASE
    gsap.set(titleElem, { opacity: 0, yPercent: 60, skewY: -10, duration: 0 });
    gsap.set(preloaderElem, { opacity: 1, duration: 0 });
    gsap.set(blobElem, { opacity: 0, duration: 0, yPercent: 5 });
    gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });
    gsap.set(descriptionFirstBlockElem, { opacity: 0, y: -10, skewY: 0 });

    tl.to(preloaderPercentageCount, {
      val: 100,
      roundProps: "val",
      onUpdate: function () {
        preloaderContentElem.innerHTML = preloaderPercentageCount.val;
        if (preloaderPercentageCount.val === 100) {
          $(preloaderContentElem).addClass("preloader__content--active");
        }
      },
      duration: 2.5,
      ease: "ease.out",
    })
      .to(preloaderContentElem, {
        opacity: 0,
        skewY: -10,
        y: -20,
        duration: 1,
        ease: "expo.in",
      })
      .to(
        preloaderElem,
        {
          opacity: 0,
          duration: 0.5,
          onStart: (e) => {
            $(window).scrollTop(0);
          },
          onComplete: () => {
            $(preloaderElem).hide();
          },
        },
        "-=0.25"
      )
      .to(
        blobElem,
        {
          opacity: isDarkTheme ? 0.9 : 1,
          duration: 0.75,
          yPercent: 0,
          // duration: 1,
          ease: "expo.inOut",
          onStart: () => {
            window.sceneManager.onLoad();
          },
        },
        "-=0.550"
      )
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
        descriptionFirstBlockElem,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.5,
          ease: "expo.out",
          onComplete: () => {},
        },
        "-=0.25"
      );
  } else {
    // MOBILE CASE
    gsap.set(titleElem, { opacity: 0, yPercent: 20, skewY: 0, duration: 0 });
    gsap.set(preloaderElem, { opacity: 1, duration: 0 });
    gsap.set(blobElem, { opacity: 0, duration: 0, yPercent: 10 });
    gsap.set(preloaderContentElem, { opacity: 1, y: 0, skewY: 0 });

    tl.to(preloaderPercentageCount, {
      val: 100,
      roundProps: "val",
      onUpdate: function () {
        preloaderContentElem.innerHTML = preloaderPercentageCount.val;
        if (preloaderPercentageCount.val === 100) {
          $(preloaderContentElem).addClass("preloader__content--active");
        }
      },
      duration: 3,
      ease: "ease.out",
    })
      .to(preloaderContentElem, {
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
          opacity: isDarkTheme ? 0.9 : 1,
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
});
