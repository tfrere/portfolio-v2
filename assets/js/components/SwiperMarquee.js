import gsap from "gsap";
import $ from "jquery";
import Swiper from "swiper/swiper-bundle";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class SwiperMarquee {
  constructor(el, options = {}) {
    this.el = $(el).find(".swiper").get();
    this.carousel = $(el).find(".swiper").get();
    this.loop =
      $(el).data("swiper-marquee-loop") != undefined
        ? $(el).data("swiper-marquee-loop")
        : true;

    // console.log($(el).data("swiper-marquee-loop"));

    this.from =
      $(el).data("swiper-marquee-from") != undefined
        ? $(el).data("swiper-marquee-from")
        : 0;
    this.to =
      $(el).data("swiper-marquee-to") != undefined
        ? $(el).data("swiper-marquee-to")
        : 300;
    // console.log(this.el, this.from, this.to);
    this.init();
  }

  init() {
    this.slider = new Swiper(this.carousel, {
      slidesPerView: "auto",
      loop: this.loop,
      // loopedSlides: 15,
      // loopPreventsSlide: false,
      centeredSlides: true,
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: true,
        momentumBounce: false,
        momentumBounceRatio: 0.3,
        momentumRatio: 0.3,
        momentumVelocityRatio: 0.5,
      },
      spaceBetween: 24,
      touchStartPreventDefault: false,
    });

    window.isSlideClickable = true;

    // Scroll triggered movement
    this.tl = new gsap.timeline();

    this.tl.set(this.el, { willChange: "transform" });

    this.tl.fromTo(
      this.el,
      {
        x: this.from,
      },
      {
        x: this.to,
        ease: "none",
      },
      0
    );

    this.tl.set(this.el, { willChange: "auto" });

    ScrollTrigger.create({
      trigger: this.el,
      animation: this.tl,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      refreshPriority: -14,
    });
  }
}

$(document).ready(function () {
  $("[data-swiper-marquee]").each(function () {
    new SwiperMarquee(this);
  });
});
