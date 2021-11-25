import gsap from "gsap";
import $ from "jquery";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class FixedNav {
  constructor(el, options = {}) {
    this.el = el;
    this.items = $(el).find("[data-nav-item]");
    this.hideItems = $(el).find("[data-nav-hide]");
    this.targets = this.items.map((i, elem) => {
      return { name: $(elem).find("a").attr("href").slice(1), elem: $(elem) };
    });
    this.selfObserve();
    this.itemObserve();
    this.hideObserve();
  }

  selfObserve() {
    var observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          $(entries[0].target).find(".fixed-nav").addClass("fixed-nav--active");
        } else {
          $(entries[0].target)
            .find(".fixed-nav")
            .removeClass("fixed-nav--active");
        }
      },
      {
        rootMargin: `-20% 0px -80% 0px`,
      }
    );

    observer.observe(this.el);
  }

  itemObserve() {
    this.targets.map((i, target) => {
      var observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // $(".fixed-nav__item").removeClass("fixed-nav__item--active");
            target.elem.addClass("fixed-nav__item--active");
          } else {
            target.elem.removeClass("fixed-nav__item--active");
          }
        },
        {
          rootMargin: `-40% 0px -40% 0px`,
        }
      );

      observer.observe(document.getElementById(target.name));
    });
  }

  hideObserve() {
    this.hideItems.map((i, item) => {
      var observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            $(".fixed-nav").addClass("fixed-nav--hide");
          } else {
            $(".fixed-nav").removeClass("fixed-nav--hide");
          }
        },
        {
          rootMargin: `-30% 0px -30% 0px`,
        }
      );

      observer.observe(item);
    });
  }
}

window.addEventListener("load", () => {
  const elements = document.querySelectorAll("[data-nav]");
  elements.forEach((el) => {
    new FixedNav(el);
  });
});
