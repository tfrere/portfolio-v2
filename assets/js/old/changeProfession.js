import gsap from "gsap";

function findPos(obj) {
  var curleft = (curtop = 0);
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while ((obj = obj.offsetParent));
  return [curleft, curtop];
}

export default class ScrollText {
  constructor(el, options = {}) {
    this.el = el;
    this.scrollOffset = 0;
    this.elOffset = findPos(this.el)[1];

    this.texts = el.getAttribute("data-change-text-values").split(", ");
    this.offsetPart = 1 / (this.texts.length - 1);

    this.observerOptions = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0,
    };
    this.observe();
  }

  progressTween() {
    const newScrollOffset = window.scrollY + window.innerHeight;
    if (this.scrollOffset == newScrollOffset) return;
    this.scrollOffset = newScrollOffset;

    // Get element's position relative to bottom of viewport.
    const elPosition = this.scrollOffset - this.el.getBoundingClientRect().top;
    // Set desired duration.
    const durationDistance = window.innerHeight + this.elOffset;
    // Calculate tween progresss.
    const currentProgress = elPosition / durationDistance;

    console.log(Math.round(currentProgress * this.texts.length));
    var newIndex = Math.round(currentProgress * this.texts.length);

    this.el.innerHTML = this.texts[newIndex];

    // if (pos > offsets[0] && pos < offsets[1]) {
    //   $("#profession").text("designer");
    // }
    // if (pos > offsets[1] - 1 && pos < offsets[2]) {
    //   $("#profession").text("developer");
    // }
    // if (pos > offsets[2] + 1) {
    //   $("#profession").text("artist");
    // }
  }

  observe() {
    let ticker = this.progressTween.bind(this);
    var observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        gsap.ticker.add(ticker);
      } else {
        gsap.ticker.remove(ticker);
      }
    }, this.observerOptions);
    observer.observe(this.el);
  }
}

const observerElements = document.querySelectorAll("[data-change-text]");
observerElements.forEach((el) => {
  new ScrollText(el);
});

// import $ from "jquery";

// let pos = 0;
// let offsets = [0, 250, 450];

// function updateProfession() {
//   pos = window.scrollY;
//   if (pos > offsets[0] && pos < offsets[1]) {
//     $("#profession").text("designer");
//   }
//   if (pos > offsets[1] - 1 && pos < offsets[2]) {
//     $("#profession").text("developer");
//   }
//   if (pos > offsets[2] + 1) {
//     $("#profession").text("artist");
//   }
//   requestAnimationFrame(updateProfession);
// }

// $(window).on("scroll", () => {
//   pos = window.scrollY;
//   if (pos > offsets[0] && pos < offsets[1]) {
//     $("#profession").text("designer");
//   }
//   if (pos > offsets[1] - 1 && pos < offsets[2]) {
//     $("#profession").text("developer");
//   }
//   if (pos > offsets[2] + 1) {
//     $("#profession").text("artist");
//   }
// });

// updateProfession();
// if (document.getElementById("scroll-container")) {
// }
