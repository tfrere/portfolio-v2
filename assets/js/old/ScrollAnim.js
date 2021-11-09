import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollAnim {
  constructor(el, options = {}) {
    this.el = el;

    // this.scrollOffset = $(el).data("scroll-offset");

    // if (elData.contains(",")) {
    //   let offset = $(el).data("sentence-focus-offset").split(", ");
    //   this.rootMargins.push(`${offset[0]} 0px ${offset[1]} 0px`);
    // } else {
    //   this.rootMargins.push(`0px 0px 0px 0px`);
    // }

    this.options = (el.dataset.options && JSON.parse(el.dataset.options)) || {
      // start: "top bottom",
      start: "40% 50%",
      end: "50% 40%",
      scrub: 0,
      refreshPriority: -14,
    };

    // start: "top top", // when the top of the trigger hits the top of the viewport
    // end: "+=500", // end after scrolling 500px beyond the start
    // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    this.from = (el.dataset.from && JSON.parse(el.dataset.from)) || {
      opacity: 0,
    };
    this.to = (el.dataset.to && JSON.parse(el.dataset.to)) || { opacity: 1 };
    this.render();
  }

  render() {
    const tl = new gsap.timeline();

    tl.set(this.el, { willChange: "transform, opacity" });
    tl.fromTo(this.el, this.from, this.to, 0);
    tl.set(this.el, { willChange: "auto" });

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
