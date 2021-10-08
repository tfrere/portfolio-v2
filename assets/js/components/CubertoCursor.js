/*!
 * Cuberto Cursor
 *
 * @version 1.5.0
 * @author Cuberto (cuberto.com)
 * @licence Copyright (c) 2020, Cuberto. All rights reserved.
 */

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
    this.el = $('<div class="cb-cursor"></div>');
    this.text = $('<div class="cb-cursor-text"></div>');
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
