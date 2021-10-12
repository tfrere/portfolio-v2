import $ from "jquery";
import gsap, { Linear } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Marquee {
  constructor(el, options = {}) {
    this.el = $(el);
    this.carousel = $(el).find("data-carousel");
    this.speed = $(el).data("marquee-start") || 0;
    this.offset = $(el).data("marquee-end") || 300;
    this.hasToRender = true;
    this.tween = null;
    this.currentPosition = 0;
    // this.bind();
    this.observe();
    this.render();
  }

  render() {
    const tl = new gsap.timeline();
    let elem = this.el.find("[data-marquee-container]");

    tl.set(elem, { willChange: "transform" });

    tl.fromTo(
      elem,
      {
        x: this.speed,
      },
      {
        x: this.offset,
        ease: "none",
      },
      0
    );

    tl.set(elem, { willChange: "auto" });

    ScrollTrigger.create({
      trigger: this.el,
      animation: tl,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      refreshPriority: -14,
    });
  }

  bind() {
    let that = this;
    let parts = this.el.find("[data-marquee-part]").get();
    let container = this.el.find("[data-marquee-container]").get();
    gsap.set(parts, {
      willChange: "transform",
    });

    gsap.set(container, { xPercent: -50 });

    // this.tl = new gsap.timeline({ repeat: -1 });

    this.tween = gsap
      .to(parts, {
        xPercent: -100,
        repeat: -1,
        duration: 30,
        ease: "linear",
      })
      .totalProgress(0.5);
  }

  observe() {
    var observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.hasToRender = true;
        console.log("marquee has to render");
        if (this.tween) this.tween.play();
      } else {
        this.hasToRender = false;
        console.log("marquee has to stop");
        if (this.tween) this.tween.pause();
      }
    });

    observer.observe(this.el[0]);
  }
}

(function () {
  $("[data-marquee]").each(function () {
    new Marquee(this);
  });
})();

{
  /* <div data-marquee  data-marquee-start="0" data-marquee-end="-300" class="marquee" >
  <div data-marquee-container  class="marquee__content entity">
    <div data-marquee-item class="marquee__content__part shape shape--one"></div>
  </div>
</div>  */
}
