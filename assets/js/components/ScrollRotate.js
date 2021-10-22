import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollRotate {
  constructor(el, options = {}) {
    this.el = el;

    gsap.fromTo(
      el,
      {
        rotate: "-45deg",
      },
      {
        rotate: "45deg",
        scrollTrigger: {
          trigger: el.parentElement,
          scrub: 0.5,
        },
        ease: "none",
      }
    );
  }
}

const elements = document.querySelectorAll("[data-scroll-rotate]");
elements.forEach((el) => {
  new ScrollRotate(el);
});
