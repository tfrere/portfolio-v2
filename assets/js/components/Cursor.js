import $ from "jquery";
import gsap from "gsap";

export default class Cursor {
  constructor(options) {
    this.options = $.extend(
      true,
      {
        container: "body",
        speed: 0.65,
        ease: "expo.out",
        visibleTimeout: 300,
      },
      options
    );
    this.body = $(this.options.container);
    this.el = $('<div class="cursor"></div>');
    this.text = $('<div class="cursor-text"></div>');
    this.init();
  }

  init() {
    this.el.append(this.text);
    this.body.append(this.el);
    this.bind();
    this.move(-window.innerWidth, -window.innerHeight, 0);
  }

  bind() {
    const self = this;

    this.body
      .on("mouseleave", () => {
        self.hide();
      })
      .on("mouseenter", () => {
        self.show();
      })
      .on("mousemove", (e) => {
        this.pos = {
          x: this.stick
            ? this.stick.x - (this.stick.x - e.clientX) * 0.15
            : e.clientX,
          y: this.stick
            ? this.stick.y - (this.stick.y - e.clientY) * 0.15
            : e.clientY,
        };
        this.update();
      })
      .on("mousedown", () => {
        self.setState("-active");
      })
      .on("mouseup", () => {
        self.removeState("-active");
      })
      // .on("mouseenter", "a,input,textarea,button", () => {
      //   self.setState("-pointer");
      // })
      // .on("mouseleave", "a,input,textarea,button", () => {
      //   self.removeState("-pointer");
      // })
      .on("mouseenter", "iframe", () => {
        self.hide();
      })
      .on("mouseleave", "iframe", () => {
        self.show();
      })
      .on("mouseenter", "[data-cursor]", function () {
        self.setState(this.dataset.cursor);
      })
      .on("mouseleave", "[data-cursor]", function () {
        self.removeState(this.dataset.cursor);
      })
      .on("mouseenter", "[data-cursor-text]", function () {
        self.setText(this.dataset.cursorText);
      })
      .on("mouseleave", "[data-cursor-text]", function () {
        self.removeText();
      })
      .on("mouseenter", "[data-cursor-stick]", function () {
        self.setStick(this.dataset.cursorStick);
      })
      .on("mouseleave", "[data-cursor-stick]", function () {
        self.removeStick();
      });
  }

  setState(state) {
    this.el.addClass(state);
  }

  removeState(state) {
    this.el.removeClass(state);
  }

  toggleState(state) {
    this.el.toggleClass(state);
  }

  setText(text) {
    this.text.html(text);
    this.el.addClass("-text");
  }

  removeText() {
    this.el.removeClass("-text");
  }

  setStick(el) {
    const target = $(el);
    const bound = target.get(0).getBoundingClientRect();
    this.stick = {
      y: bound.top + target.height() / 2,
      x: bound.left + target.width() / 2,
    };
    this.move(this.stick.x, this.stick.y, 5);
  }

  removeStick() {
    this.stick = false;
  }

  update() {
    this.move();
    this.show();
  }

  move(x, y, duration) {
    gsap.to(this.el, {
      x: x || this.pos.x,
      y: y || this.pos.y,
      force3D: true,
      overwrite: true,
      ease: this.options.ease,
      duration: this.visible ? duration || this.options.speed : 0,
    });
  }

  show() {
    if (this.visible) return;
    clearInterval(this.visibleInt);
    this.el.addClass("-visible");
    this.visibleInt = setTimeout(() => (this.visible = true));
  }

  hide() {
    clearInterval(this.visibleInt);
    this.el.removeClass("-visible");
    this.visibleInt = setTimeout(
      () => (this.visible = false),
      this.options.visibleTimeout
    );
  }
}

(function () {
  const cursor = new Cursor();
})();

// const getScale = (diffX, diffY) => {
//   const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
//   return Math.min(distance / 800, 0.15);
// };

// const getAngle = (diffX, diffY) => {
//   return (Math.atan2(diffY, diffX) * 180) / Math.PI;
// };

// const debounce = (func, delay) => {
//   let inDebounce;
//   return function () {
//     const context = this;
//     const args = arguments;
//     clearTimeout(inDebounce);
//     inDebounce = setTimeout(() => func.apply(context, args), delay);
//   };
// };

// export default class Cursor {
//   constructor(options) {
//     this.options = $.extend(
//       true,
//       {
//         container: "body",
//         speed: 0.65,
//         ease: "expo.out",
//         visibleTimeout: 300,
//       },
//       options
//     );
//     this.body = $(this.options.container);
//     this.hasToScale = true;
//     this.el = $('<div class="cursor"></div>');
//     this.text = $('<div class="cursor-text"></div>');

//     this.pos = { x: 0, y: 0 };
//     this.oldPos = { x: 0, y: 0 };

//     this.init();
//   }

//   init() {
//     this.el.append(this.text);
//     this.body.append(this.el);
//     this.bind();
//     this.frameLoop();
//   }

//   bind() {
//     const self = this;
//     let showDebounce = debounce(
//       this.mouseMove({ clientX: 0, clientY: 0 }),
//       100
//     );

//     this.body
//       .on("mouseleave", () => {
//         self.hide();
//       })
//       .on("mouseenter", () => {
//         self.show();
//       })
//       .on("mousemove", (e) => {
//         showDebounce = debounce(this.mouseMove(e), 20);
//       })
//       .on("mousedown", () => {
//         self.setState("-active");
//       })
//       .on("mouseup", () => {
//         self.removeState("-active");
//       })
//       .on("mouseenter", "a,input,textarea,button, .swiper", () => {
//         self.hasToScale = true;
//         self.setState("-pointer");
//       })
//       .on("mouseleave", "a,input,textarea,button, .swiper", () => {
//         // self.hasToScale = false;
//         self.removeState("-pointer");
//       })
//       .on("mouseenter", "iframe", () => {
//         self.hide();
//       })
//       .on("mouseleave", "iframe", () => {
//         self.show();
//       })
//       .on("mouseenter", "[data-cursor]", function () {
//         self.setState(this.dataset.cursor);
//       })
//       .on("mouseleave", "[data-cursor]", function () {
//         self.removeState(this.dataset.cursor);
//       })
//       .on("mouseenter", "[data-cursor-text]", function () {
//         self.setText(this.dataset.cursorText);
//       })
//       .on("mouseleave", "[data-cursor-text]", function () {
//         self.removeText();
//       })
//       .on("mouseenter", "[data-cursor-stick]", function () {
//         self.setStick(this.dataset.cursorStick);
//       })
//       .on("mouseleave", "[data-cursor-stick]", function () {
//         self.removeStick();
//       });
//   }

//   // showDebounce = debounce(this.showBlob(true), this.state.debounceRate)
//   mouseMove(e) {
//     // console.log("mousemove");
//     this.pos = {
//       x: this.stick
//         ? this.stick.x - (this.stick.x - e.clientX) * 0.15
//         : e.clientX,
//       y: this.stick
//         ? this.stick.y - (this.stick.y - e.clientY) * 0.15
//         : e.clientY,
//     };
//     window.cursorPos = this.pos;
//     this.update();
//   }

//   frameLoop() {
//     // this.vel.x =
//     //   this.pos.x - this.oldPos.x > 0
//     //     ? this.pos.x - this.oldPos.x
//     //     : this.oldPos.x - this.pos.x;
//     // let vel = {
//     //   x:this.oldPos.x - this.pos.x,
//     //   y:this.oldPos.y - this.pos.y,
//     // }

//     // if (vel.x) {
//     //   console.log("vel in loop", vel);
//     // }
//     // const rotation = getAngle(vel.x, vel.y);
//     // const scale = getScale(vel.x, vel.y) * 10;
//     // console.log(rotation, scale);
//     // const scaleX = Math.abs(this.vel.x) / 30;
//     // const scaleY = Math.abs(this.vel.y) / 30;

//     // this.move(this.pos.x, this.pos.y, scale, scale, 1, rotation);
//     this.move(this.pos.x, this.pos.y, 1, 1, 1, 1);

//     requestAnimationFrame(this.frameLoop.bind(this));
//   }

//   move(x, y, scaleX, scaleY, duration, rotation) {
//     let scale = {
//       x: 1,
//       y: 1,
//     };

//     if (this.hasToScale) {
//       scale = {
//         x: 1 + scaleX,
//         y: 1 - scaleY,
//       };
//     }

//     gsap.to(this.el, {
//       x: x,
//       y: y,
//       force3D: true,
//       overwrite: true,
//       ease: this.options.ease,
//       // rotation: rotation,
//       // scaleX: scale.x,
//       // scaleY: scale.y,
//       duration: this.visible ? duration || this.options.speed : 0,
//     });
//     this.oldPos = { x: x, y: y };
//   }

//   setState(state) {
//     this.el.addClass(state);
//   }

//   removeState(state) {
//     this.el.removeClass(state);
//   }

//   toggleState(state) {
//     this.el.toggleClass(state);
//   }

//   setText(text) {
//     this.text.html(text);
//     this.el.addClass("-text");
//   }

//   removeText() {
//     this.el.removeClass("-text");
//   }

//   setStick(el) {
//     const target = $(el);
//     const bound = target.get(0).getBoundingClientRect();
//     this.stick = {
//       y: bound.top + target.height() / 2,
//       x: bound.left + target.width() / 2,
//     };
//     // this.move(this.stick.x, this.stick.y, 5);
//   }

//   removeStick() {
//     this.stick = false;
//   }

//   update() {
//     // this.move();
//     this.show();
//   }

//   show() {
//     if (this.visible) return;
//     clearInterval(this.visibleInt);
//     this.el.addClass("-visible");
//     this.visibleInt = setTimeout(() => (this.visible = true));
//   }

//   hide() {
//     clearInterval(this.visibleInt);
//     this.el.removeClass("-visible");
//     this.visibleInt = setTimeout(
//       () => (this.visible = false),
//       this.options.visibleTimeout
//     );
//   }
// }

// (function () {
//   const cursor = new Cursor();
// })();
