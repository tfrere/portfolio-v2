import gsap from "gsap";
import $ from "jquery";

export default class Eye {
  constructor(el) {
    this.el = $(el);
    this.triggers = $("[data-eye-trigger]");
    this.hideEye();
    this.triggers
      .on("mouseenter", this.showEye.bind(this))
      .on("mouseleave", this.hideEye.bind(this));
  }

  showEye(e) {
    this.el.find("#eye").show();
    this.el.find("#arrow").hide();
  }

  hideEye(e) {
    this.el.find("#eye").hide();
    this.el.find("#arrow").show();
  }
}

window.addEventListener("load", () => {
  const elements = document.querySelectorAll("[data-eye]");
  elements.forEach((el) => {
    new Eye(el);
  });
});
