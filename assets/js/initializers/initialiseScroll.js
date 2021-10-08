// import "intersection-observer"; // if you want support IE11
// import gsap from "gsap";

// import JellyEffect from "./components/JellyScroll";
// import SmoothScrollbar from "smooth-scrollbar";
// import SoftScrollPlugin from "./lib/SmoothScrollbar";
// import Particles from "./components/Particles";
// import ASScroll from "@ashthornton/asscroll";
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
