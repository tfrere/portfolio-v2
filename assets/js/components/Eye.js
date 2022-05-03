import gsap from "gsap";
import $ from "jquery";

export default class Eye {
  constructor(el) {
    this.el = $(el);
    this.triggers = $("[data-eye-trigger]");
    this.el.find("#eye").hide();
    this.el.find("#arrow").show();
    this.triggers
      .on("mouseenter", this.showEye.bind(this))
      .on("mouseleave", this.hideEye.bind(this));
  }

  showEye(e) {
    if (window.innerWidth > 768) {
      this.el.find("#eye").show();
      this.el.find("#arrow").hide();
    }
  }

  hideEye(e) {
    if (window.innerWidth > 768) {
      this.el.find("#eye").hide();
      this.el.find("#arrow").show();
    }
  }
}

window.addEventListener("load", () => {
  const elements = document.querySelectorAll("[data-eye]");
  elements.forEach((el) => {
    new Eye(el);
  });
});
