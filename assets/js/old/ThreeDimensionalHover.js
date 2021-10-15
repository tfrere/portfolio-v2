import $ from "jquery";
import gsap from "gsap";

export default class ThreeDimensionalHover {
  constructor(el, options = {}) {
    this.el = $(el);
    gsap.set(this.el[0], { perspective: 500 });

    this.containerEl = $($(el).data("3d-hover-area"));
    // console.log($(el).data("3d-hover-area"));
    this.hasToRender = true;

    this.bind();
    this.observe();
  }

  bind() {
    let that = this;
    this.containerEl.on("mousemove", function (e) {
      const force = 5;
      const height = $(this).width();
      const width = $(this).height();
      var xVal = e.pageX - $(this).offset().left;
      var yVal = e.pageY - $(this).offset().top;
      const yRotation = force * ((xVal - width / 2) / width);
      const xRotation = -force * ((yVal - height / 2) / height);
      // console.log(width, height, xVal, yVal, yRotation, xRotation);
      const string =
        "perspective(500px) rotateX(" +
        xRotation +
        "deg) rotateY(" +
        yRotation +
        "deg)";
      // console.log(string);
      that.el.css("transform", string);

      //   gsap.to(that.el[0], {
      //     rotationY: yRotation * 5,
      //     rotationX: xRotation * 5,
      //     force3D: true,
      //     overwrite: true,
      //     duration: 0.2,
      //   });
    });
  }

  observe() {
    var observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("3dhover has to render");
        this.hasToRender = true;
      } else {
        console.log("3dhover has to stop");
        this.hasToRender = false;
      }
    });

    observer.observe(this.el[0]);
  }
}

(function () {
  $("[data-3d-hover]").each(function () {
    new ThreeDimensionalHover(this);
  });
})();
