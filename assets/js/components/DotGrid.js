// (function () {
//   // Variables
//   const width = 500;
//   const height = 500;
//   count = 19;
//   const rowsize = 25;
//   dotsize = 6;
//   dotmin = 1;
//   dotsizebase = 6;

//   // Calc
//   var canvas = document.getElementById("dots-grid");
//   console.log(canvas);
//   var ctx = canvas.getContext("2d");
//   ctx.canvas.width = width;
//   ctx.canvas.height = height;
//   mouseOver(canvas, ctx, false);
//   canvas.addEventListener("mousemove", function () {
//     mouseOver(canvas, ctx, true);
//   });
//   canvas.addEventListener("mouseleave", function () {
//     mouseOver(canvas, ctx, false);
//   });

//   function mouseOver(canvas, ctx, cursor) {
//     if (cursor) {
//       PosX = getPositionX(event);
//       PosY = getPositionY(event);
//     } else {
//       PosX = -100;
//       PosY = -100;
//     }

//     LocX = canvas.getBoundingClientRect().left;
//     LocY = canvas.getBoundingClientRect().top;

//     GlobalX = PosX - LocX;
//     GlobalY = PosY - LocY;

//     var ctx = canvas.getContext("2d");
//     ctx.canvas.width = width;
//     ctx.canvas.height = height;

//     // The counter is used to calculate the color (fake random) if u want to have multiple canvas grids with a different color order just increase or decrease the value
//     $counter = 5.56;
//     for ($ix = 4; $ix <= count - 3; $ix++) {
//       for ($iy = 4; $iy <= count - 3; $iy++) {
//         ctx.beginPath();
//         $scaler = Math.hypot(GlobalX / rowsize - $ix, GlobalY / rowsize - $iy);
//         dotsize = dotsizebase - $scaler * 1.05;
//         if (dotsize < dotmin) {
//           dotsize = dotmin;
//         }
//         ctx.arc(rowsize * $ix, rowsize * $iy, dotsize, 0, 2 * Math.PI);
//         $counter = $counter * 1.18;
//         ctx.strokeStyle = "#000";
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       }
//     }
//   }

//   //
//   function getPositionX(event) {
//     CursorX = event.clientX;
//     return CursorX;
//   }

//   function getPositionY(event) {
//     CursorY = event.clientY;
//     return CursorY;
//   }
// })();
