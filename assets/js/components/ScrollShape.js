import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollParallax {
  constructor(el, options = {}) {
    this.el = el;
    this.isReverse = $(el).data("scroll-shape-reverse") || false;

    gsap.fromTo(
      el,
      {
        rotate: this.isReverse ? "-5deg" : "-5deg",
      },
      {
        rotate: this.isReverse ? "0deg" : "0deg",
        scrollTrigger: {
          trigger: el.parentElement,
          scrub: 0.6,
        },
        ease: "none",
      }
    );
  }
}

const elements = document.querySelectorAll("[data-scroll-shape]");
elements.forEach((el) => {
  new ScrollParallax(el);
});
