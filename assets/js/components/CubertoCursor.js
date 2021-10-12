import $ from "jquery";
import gsap from "gsap";

// Helpers
function getScale(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 800, 0.15);
}

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

/**
 * debounce function
 * use inDebounce to maintain internal reference of timeout to clear
 */
const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

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
    this.hasToScale = false;
    this.el = $('<div class="cb-cursor"></div>');
    this.text = $('<div class="cb-cursor-text"></div>');

    this.pos = { x: 0, y: 0 };
    this.oldPos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    // this.hasUpdateVelStarted = false;

    this.init();
  }

  init() {
    this.el.append(this.text);
    this.body.append(this.el);
    this.bind();
    // this.move(-window.innerWidth, -window.innerHeight, 0);
    this.frameLoop();
  }

  bind() {
    const self = this;
    let showDebounce = debounce(
      this.mouseMove({ clientX: 0, clientY: 0 }),
      100
    );

    this.body
      .on("mouseleave", () => {
        self.hide();
      })
      .on("mouseenter", () => {
        self.show();
      })
      .on("mousemove", (e) => {
        showDebounce = debounce(this.mouseMove(e), 20);
      })
      // .on("mousemove", (e) => {
      //   let showDebounce = debounce(this.mouseMove(e), 100);
      //   // self.mouseMove(e);
      // })
      .on("mousedown", () => {
        self.setState("-active");
      })
      .on("mouseup", () => {
        self.removeState("-active");
      })
      .on("mouseenter", "a,input,textarea,button, .swiper", () => {
        self.hasToScale = true;
        self.setState("-pointer");
      })
      .on("mouseleave", "a,input,textarea,button, .swiper", () => {
        self.hasToScale = false;
        self.removeState("-pointer");
      })
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

  // showDebounce = debounce(this.showBlob(true), this.state.debounceRate)
  mouseMove(e) {
    // console.log("mousemove");
    this.pos = {
      x: this.stick
        ? this.stick.x - (this.stick.x - e.clientX) * 0.15
        : e.clientX,
      y: this.stick
        ? this.stick.y - (this.stick.y - e.clientY) * 0.15
        : e.clientY,
    };
    window.cursorPos = this.pos;
    this.update();
  }

  frameLoop() {
    this.vel.x = this.oldPos.x - this.pos.x;
    this.vel.y = this.oldPos.y - this.pos.y;

    // console.log(this.pos);
    // console.log(this.vel);

    const rotation = getAngle(this.vel.x, this.vel.y);
    // const scale = getScale(this.vel.x, this.vel.y);
    const scaleX = Math.min(this.vel.y / 30, 0.15);
    const scaleY = Math.min(this.vel.x / 30, 0.15);

    this.move(this.pos.x, this.pos.y, scaleX, scaleY, 1, rotation);

    requestAnimationFrame(this.frameLoop.bind(this));
  }

  move(x, y, scaleX, scaleY, duration, rotation) {
    let scale = {
      x: 1,
      y: 1,
    };

    if (this.hasToScale) {
      scale = {
        x: 1 + scaleX,
        y: 1 + scaleY,
      };
    }

    gsap.to(this.el, {
      x: x,
      y: y,
      force3D: true,
      overwrite: true,
      ease: this.options.ease,
      // rotation: rotation / 10,
      scaleX: scale.x,
      scaleY: scale.y,
      // duration: this.visible ? this.options.speed : 0,
      duration: this.visible ? duration || this.options.speed : 0,
    });
    this.oldPos = { x: x, y: y };
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
    // this.move(this.stick.x, this.stick.y, 5);
  }

  removeStick() {
    this.stick = false;
  }

  update() {
    // this.move();
    this.show();
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

// // Save pos and velocity
// const pos = { x: 0, y: 0 };
// const vel = { x: 0, y: 0 };
// let loopStarted = false;
// let size = 1;

// // Register handler on whole block
// el.addEventListener("mousemove", (e) => {
//   // Get cursor position relative to box with text
//   const rect = container.getBoundingClientRect();
//   const y = e.clientY - rect.top;
//   const x = e.clientX - rect.left;

//   // Animate object and calc velocity for every tick
//   gsap.to(pos, {
//     x: x,
//     y: y,
//     overwrite: true,
//     ease: "expo.out",
//     duration: 0.55,
//     onUpdate: () => {
//       vel.x = x - pos.x;
//       vel.y = y - pos.y;
//     },
//   });

//   // Start loop
//   if (!loopStarted) {
//     loop();
//     loopStarted = true;
//   }
// });

// el.addEventListener("mousedown", (e) => {
//   console.log(1);
//   size = 2;
// });
// el.addEventListener("mouseup", (e) => {
//   console.log(2);
//   size = 1;
// });

// // Start render loop
// const loop = () => {
//   // Calculate angle and scale based on velocity
//   const rotation = getAngle(vel.x, vel.y);
//   const scale = getScale(vel.x, vel.y);

//   // Set transform data to shape
//   gsap.set(shape, {
//     x: pos.x,
//     y: pos.y,
//     rotation: rotation,
//     scaleX: 1 + scale,
//     scaleY: 1 - scale,
//   });

//   requestAnimationFrame(loop.bind(this));
// };

// Init cursor

// const TAIL_LENGTH = 10;

// const cursor = document.getElementById("cursor");

// let mouseX = 0;
// let mouseY = 0;
// let cursorScale = 0;
// let targetCursorScale = 0;

// let cursorCircles;
// let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

// function onMouseMove(event) {
//   targetCursorScale = 1;
//   // console.log("moving");
//   mouseX = event.clientX;
//   mouseY = event.clientY;

//   if ($("a:hover").length != 0) {
//     targetCursorScale = 1.3;
//     $("a:hover");
//   }
// }

// function onMouseLeave(event) {
//   // console.log("leave");
//   targetCursorScale = 0;
// }

// function onMouseEnter(event) {
//   // console.log("enter");
//   targetCursorScale = 1;
// }

// function onClick(event) {}

// function onMouseDown() {
//   targetCursorScale = 0.8;
// }

// function onMouseUp() {
//   targetCursorScale = 1;
// }

// function initCursor() {
//   for (let i = 0; i < TAIL_LENGTH; i++) {
//     let div = document.createElement("div");
//     div.classList.add("cursor-circle");
//     cursor.append(div);
//   }
//   cursorCircles = Array.from(document.querySelectorAll(".cursor-circle"));
// }

// function updateCursorScale() {
//   if (targetCursorScale > cursorScale) {
//     cursorScale += 0.1;
//   }
//   if (targetCursorScale < cursorScale) {
//     cursorScale -= 0.1;
//   }
// }

// function updateCursor() {
//   cursorHistory.shift();
//   cursorHistory.push({ x: mouseX, y: mouseY });

//   for (let i = 0; i < TAIL_LENGTH; i++) {
//     let current = cursorHistory[i];
//     let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];

//     let xDiff = next.x - current.x;
//     let yDiff = next.y - current.y;

//     current.x += xDiff * 0.65;
//     current.y += yDiff * 0.65;
//     cursorCircles[i].style.transform = `translate(${current.x}px, ${
//       current.y
//     }px) scale(${(i / TAIL_LENGTH) * cursorScale})`; // * holdFactor
//   }
//   updateCursorScale();
//   requestAnimationFrame(updateCursor);
// }

// document.addEventListener("mousemove", onMouseMove, false);
// document.addEventListener("mousedown", onMouseDown, false);
// document.addEventListener("mouseup", onMouseUp, false);
// document.addEventListener("mouseleave", onMouseLeave, false);
// document.addEventListener("mouseenter", onMouseEnter, false);

// initCursor();
// updateCursor();
