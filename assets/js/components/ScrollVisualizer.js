import gsap from "gsap";
import $ from "jquery";

export default class ScrollVisualizer {
  constructor(el) {
    this.el = $(el);
    this.bar = $(el).find("[data-scroll-visualizer-scrollbar]");
    this.resizeHandler();
    this.event = new Event("endOfPageReached");

    $(document).on("scroll", this.scrollHandler.bind(this));
    $(document).on("resize", this.resizeHandler.bind(this));
  }

  resizeHandler(e) {
    this.pageSize = Math.round($("body").height());
    this.screenSize = $(window).height();
    this.totalSize = this.pageSize - this.screenSize;
  }

  scrollHandler(e) {
    this.bar.css(
      "height",
      ($(document).scrollTop() / this.totalSize) * 100 + "%"
    );
    if ($(document).scrollTop() == this.totalSize) {
      window.dispatchEvent(this.event);
    }
  }
}

window.addEventListener("load", () => {
  const elements = document.querySelectorAll("[data-scroll-visualizer]");
  elements.forEach((el) => {
    new ScrollVisualizer(el);
  });
});
