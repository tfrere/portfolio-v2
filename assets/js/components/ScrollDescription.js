import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollDescription {
  constructor(elem, options = {}) {
    this.elem = $(elem);
    this.circleElem = $(elem).find("[data-scroll-description-circle]");
    this.itemsElems = $(elem).find("[data-scroll-description-item]");

    this.currentPosition = 0;
    this.observe();
  }

  circleMove(target) {
    let tl = new gsap.timeline({});
    let offset = $(target).hasClass("description__item--title") ? 30 : 0;
    tl.to(this.circleElem, {
      scaleX: 0.7,
      xPercent: -10,
      ease: "circ.in",
      duration: 0.2,
      overwrite: "auto",
    })
      .to(this.circleElem, {
        scaleX: 1,
        ease: "circ.out",
        duration: 0.2,
        overwrite: "auto",
      })
      .to(
        this.circleElem,
        {
          y: this.currentPosition + offset,
          duration: 1,
          xPercent: 0,
          ease: "elastic.out(1, 1)",
          force3D: true,
          overwrite: "auto",
        },
        0
      );
  }

  circleIn() {
    let tl = new gsap.timeline({});
    tl.to(this.circleElem, {
      xPercent: 0,
      scaleY: 1,
      // scale: 1,
      ease: "elastic.out(1, 0.6)",
      ease: "circ.in",
      duration: 0.2,
      overwrite: "auto",
    });
  }

  circleOut() {
    let tl = new gsap.timeline({});
    tl.to(this.circleElem, {
      xPercent: -750,
      scaleY: 1,
      ease: "elastic.out(1, 0.6)",
      ease: "circ.out",
      duration: 0.2,
      overwrite: "auto",
    });
  }

  observe() {
    let self = this;
    var callback = function (mutationsList) {
      for (var mutation of mutationsList) {
        if (mutation.type == "attributes") {
          if ($(mutation.target).hasClass("description__item--active")) {
            self.currentPosition = mutation.target.offsetTop;
            self.circleMove(mutation.target);
            // console.log("one active render");
          }
          if (self.itemsElems.hasClass("description__item--active")) {
            self.circleIn();
          } else {
            self.circleOut();
          }
        }
      }
    };
    var observer = new MutationObserver(callback);
    this.itemsElems.toArray().forEach((elem) => {
      observer.observe(elem, { attributes: true });
    });
  }
}

$(() => {
  const elements = document.querySelectorAll("[data-scroll-description]");
  elements.forEach((el) => {
    let scrollDescription = new ScrollDescription(el);
    scrollDescription.circleOut();
  });
});
