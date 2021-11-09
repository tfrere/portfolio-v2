import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollParallax {
  constructor(el, options = {}) {
    this.el = el;

    gsap.fromTo(
      el,
      {
        x: "-10vw",
        opacity: 0,
      },
      {
        x: "0vw",
        opacity: 1,
        start: "0% 50%",
        scrollTrigger: {
          trigger: el.parentElement,
          scrub: true,
        },
        ease: "none",
      }
    );
  }
}

const elements = document.querySelectorAll("[data-scroll-prices]");
elements.forEach((el) => {
  new ScrollParallax(el);
});
