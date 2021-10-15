// import $ from "jquery";

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
