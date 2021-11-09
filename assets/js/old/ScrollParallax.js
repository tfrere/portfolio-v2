import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollParallax {
  constructor(el, options = {}) {
    this.el = el;
    this.hasToScrub = $(el).data("scroll-parallax-has-to-scrub") || false;
    console.log(this.hasToScrub);

    gsap.fromTo(
      el,
      {
        y: "-10vh",
      },
      {
        y: "10vh",
        scrollTrigger: {
          trigger: el.parentElement,
          scrub: this.hasToScrub ? 0.25 : true,
          //   start: "-20% 120%", // position of trigger meets the scroller position
          //   snap: {
          //     snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
          //     duration: 1,
          //     ease: "power4.inOut",
          //   },
        },
        ease: "none",
      }
    );
  }
}

const elements = document.querySelectorAll("[data-scroll-parallax]");
elements.forEach((el) => {
  new ScrollParallax(el);
});
