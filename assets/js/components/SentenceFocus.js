import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class SentenceFocus {
  constructor(el, options = {}) {
    this.el = el;
    this.sentences = $(el).find("[data-sentence-focus-item]");
    this.rootMargins = [];
    this.sentences.map((i, elem) => {
      let elemData = $(elem).data("sentence-focus-offset");
      // console.log(elemData);

      // if (elemData.contains(",")) {
      //   let offset = elemData.split(", ");
      //   console.log(offset);
      //   this.rootMargins.push(`${offset[0]} 0px ${offset[1]} 0px`);
      // } else {
      //   this.rootMargins.push(`0px 0px 0px 0px`);
      // }
      this.rootMargins.push(`0px 0px 0px 0px`);
    });
    console.log(this.rootMargins);
    this.observe();
  }

  observe() {
    this.sentences.map((i, elem) => {
      // console.log(this.rootMargins[i]);
      var observer = new IntersectionObserver(
        (entries) => {
          // $(this.sentences).removeClass("description__item--active");
          if (entries[0].isIntersecting) {
            $(entries[0].target).addClass("description__item--active");
          } else {
            $(entries[0].target).removeClass("description__item--active");
          }
        },
        {
          rootMargin: this.rootMargins[i],
          // threshold: [...Array(100).keys()].map((x) => x / 100),
        }
      );

      observer.observe(elem);
    });
  }
}

window.addEventListener("load", () => {
  const elements = document.querySelectorAll("[data-sentence-focus]");
  elements.forEach((el) => {
    new SentenceFocus(el);
  });
});

// <!-- <p class="entity sentence-focus" data-sentence-focus>
// <span class="sentence-focus__item" data-sentence-focus-item data-sentence-focus-offset="50%, 49.9%">I lead front-end development for companies and organizations.</span>
// <span class="sentence-focus__item" data-sentence-focus-item data-sentence-focus-offset="50%, 49.9%">Building resilient UI foundations for their online experience.</span>
// <span class="sentence-focus__item" data-sentence-focus-item data-sentence-focus-offset="50%, 20%">I’ve worked on projects of different scales from small micro-sites to larger Web applications.</span>
// </p> -->
