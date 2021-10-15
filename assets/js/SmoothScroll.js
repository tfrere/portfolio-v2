// import ASScroll from "@ashthornton/asscroll";

// const asscroll = new ASScroll({
//   containerElement: "[data-scroll-container]",
//   customScrollbar: false,

//   disableNativeScrollbar: false,
// });

// window.addEventListener("load", () => {
//   asscroll.enable();
// });

import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

$(function () {
  document.locomotiveScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: false,
    initPosition: { x: 0, y: 0 },
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  document.locomotiveScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? document.locomotiveScroll.scrollTo(value, 0, 0)
        : document.locomotiveScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      console.log(1);
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("[data-scroll-container]").style.transform
      ? "transform"
      : "fixed",
  });

  window.ScrollTrigger = ScrollTrigger;
});

// import "intersection-observer"; // if you want support IE11
// import gsap from "gsap";

// import JellyEffect from "./components/JellyScroll";
// import SmoothScrollbar from "smooth-scrollbar";
// import SoftScrollPlugin from "./lib/SmoothScrollbar";
// import Particles from "./components/Particles";
// import ASScroll from "@ashthornton/asscroll";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // Soft edges plugin for SmoothScroll
// SmoothScrollbar.use(SoftScrollPlugin);
// // Init smooth scrollbar
// const view = document.getElementById("scroll-container");
// const scrollbar = SmoothScrollbar.init(view, {
//   renderByPixels: false,
//   damping: 0.075,
// });
// // Init Jelly and provide smooth scrollbar offset

// const isTouch = "ontouchstart" in document.documentElement;

// https://github.com/ashthornton/asscroll
// const asscroll = new ASScroll({
//   disableRaf: true,
// });

// window.addEventListener("load", () => {
//   asscroll.enable();
// });

// gsap.ticker.add(asscroll.update);

// ScrollTrigger.defaults({
//   scroller: asscroll.containerElement,
// });

// ScrollTrigger.scrollerProxy(asscroll.containerElement, {
//   scrollTop(value) {
//     return arguments.length
//       ? (asscroll.currentPos = value)
//       : asscroll.currentPos;
//   },
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   },
// });

// asscroll.on("update", ScrollTrigger.update);
// ScrollTrigger.addEventListener("refresh", asscroll.resize);

// const jelly = new JellyEffect({
//   intensity: 0.15,
//   speed: 0.6,
//   min: -3,
//   max: 3,
//   scrollPos: () => {
//     console.log(asscroll.currentPos);

//     return asscroll.currentPos;
//   },
// });

// // Optional demo: pause when scroll via scrollbar track
// scrollbar.track.yAxis.element.addEventListener("mousedown", () => {
//   jelly.pause(true);
// });

// document.documentElement.addEventListener(
//   "mouseup",
//   () => {
//     jelly.pause(false);
//   },
//   true
// );
