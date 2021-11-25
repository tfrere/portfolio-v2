import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class SentenceFocus {
  constructor(el, options = {}) {
    this.el = el;
    this.sentences = $(el).find("[data-scroll-description-item]");
    this.rootMargins = [];
    this.sentences.map((i, elem) => {
      let elemData = $(elem).data("scroll-offset") + "";
      console.log(elemData);

      if (elemData.includes(",")) {
        let offset = elemData.split(", ");
        console.log(offset);
        this.rootMargins.push(`-${offset[0]} 0px -${offset[1]} 0px`);
      } else {
        this.rootMargins.push(`0px 0px 0px 0px`);
      }
    });
    console.log(this.rootMargins);
    this.observe();
  }

  observe() {
    this.sentences.map((i, elem) => {
      var observer = new IntersectionObserver(
        (entries) => {
          console.log(entries);
          if (entries[0].isIntersecting) {
            $(entries[0].target).addClass("description__list__item--active");
          } else {
            $(entries[0].target).removeClass("description__list__item--active");
          }
        },
        {
          rootMargin: this.rootMargins[i],
        }
      );

      observer.observe(elem);
    });
  }
}

window.addEventListener("load", () => {
  const elements = document.querySelectorAll("[data-scroll-description]");
  elements.forEach((el) => {
    new SentenceFocus(el);
  });
});
