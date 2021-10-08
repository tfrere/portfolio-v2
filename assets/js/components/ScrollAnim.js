import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollAnim {
  constructor(el, options = {}) {
    this.el = el;
    this.options = (el.dataset.options && JSON.parse(el.dataset.options)) || {
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      refreshPriority: -14,
    };
    this.from = JSON.parse(el.dataset.from) || { opacity: 0 };
    this.to = JSON.parse(el.dataset.to) || { opacity: 1 };

    this.render();
  }

  render() {
    const tl = new gsap.timeline();

    tl.set(this.el, { willChange: "transform" });
    tl.fromTo(this.el, this.from, this.to, 0);
    // tl.set(this.el, { willChange: "auto" });

    ScrollTrigger.create({
      ...this.options,
      trigger: this.el,
      animation: tl,
    });
  }
}

const elements = document.querySelectorAll("[data-scroll-anim]");
elements.forEach((el) => {
  new ScrollAnim(el);
});