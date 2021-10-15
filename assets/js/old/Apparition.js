import $ from "jquery";
import anime from "animejs";

export default class Apparition {
  constructor(el, options = {}) {
    this.el = $(el);

    this.observe();
  }

  activate() {
    const elem = this.el.find(".word__content--animate").get();
    anime.timeline().add({
      targets: elem,
      translateY: "0px",
      easing: "easeOutQuart",
      delay: anime.stagger(50),
      duration: 400,
    });
  }

  observe() {
    var observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("data-scroll-call activating");
        this.activate();
      }
    });

    observer.observe(this.el[0]);
  }
}

(function () {
  $("[data-scroll-call]").each(function () {
    new Apparition(this);
  });
})();
