import $ from "jquery";

// function waitForWebfonts(fonts, callback) {
//   var loadedFonts = 0;
//   for (var i = 0, l = fonts.length; i < l; ++i) {
//     (function (font) {
//       var node = document.createElement("span");
//       // Characters that vary significantly among different fonts
//       node.innerHTML = "giItT1WQy@!-/#";
//       // Visible - so we can measure it - but not on the screen
//       node.style.position = "absolute";
//       node.style.left = "-10000px";
//       node.style.top = "-10000px";
//       // Large font size makes even subtle changes obvious
//       node.style.fontSize = "300px";
//       // Reset any font properties
//       node.style.fontFamily = "sans-serif";
//       node.style.fontVariant = "normal";
//       node.style.fontStyle = "normal";
//       node.style.fontWeight = "normal";
//       node.style.letterSpacing = "0";
//       document.body.appendChild(node);

//       // Remember width with no applied web font
//       var width = node.offsetWidth;

//       node.style.fontFamily = font + ", sans-serif";

//       var interval;
//       function checkFont() {
//         // Compare current width with original width
//         if (node && node.offsetWidth != width) {
//           ++loadedFonts;
//           node.parentNode.removeChild(node);
//           node = null;
//         }

//         // If all fonts have been loaded
//         if (loadedFonts >= fonts.length) {
//           if (interval) {
//             clearInterval(interval);
//           }
//           if (loadedFonts == fonts.length) {
//             callback();
//             return true;
//           }
//         }
//       }

//       if (!checkFont()) {
//         interval = setInterval(checkFont, 50);
//       }
//     })(fonts[i]);
//   }
// }

class CanvasMarquee {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.options = Object.assign({}, this.getDefaultOptions, options);
    this.ratio = window.devicePixelRatio || 1;
    this.initialOffset = -(this.canvas.clientWidth * this.ratio);
    this.hasToRender = false;
    console.log(this.options);

    this.textHeight = this.measureFontHeight().height;
    this.resize();

    this.animId;
    this.init();

    this.observe();

    window.addEventListener("resize", this.resize.bind(this));
  }

  get getDefaultOptions() {
    return {
      text: "Ok, this is the default text",
      speed: 1,
      color: "#CC0000",
      font: "5rem Arial",
      padding: 0,
    };
  }

  observe() {
    var observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("enter");
        this.hasToRender = false;
      } else {
        console.log("out");
        this.hasToRender = true;
      }
    });

    observer.observe(this.canvas);
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth * this.ratio;

    this.textHeight = this.measureFontHeight().height + 30;
    const lineh = this.measureFontHeight().firstPixel;
    // console.log("textHeight", this.textHeight);
    // console.log("lineheight", lineh);
    const h = this.textHeight + lineh * 2;
    this.canvas.height = h * this.ratio;
    // console.log(this.ratio, this.canvas.height, h);
    // const h = (this.canvas.height = this.textHeight);

    this.canvas.style.width = `${this.canvas.clientWidth}px`;
    this.canvas.style.height = `${h}px`;

    this.context.scale(this.ratio, this.ratio);
  }

  init() {
    this.context.font = this.options.font;
    this.textWidth =
      this.context.measureText(this.options.text).width + this.options.padding;
    this.duplicator = Math.ceil(this.canvas.width / this.textWidth) + 1;

    this.x = [];

    for (let i = 0; i < this.duplicator; i += 1) {
      const pos =
        this.initialOffset +
        i * this.textWidth +
        this.options.padding * (i + 1) +
        this.canvas.width;
      this.x.push(pos);
    }
  }

  animate() {
    this.animId = requestAnimationFrame(() => {
      this.animate();
    });

    this.x.forEach((el, i) => {
      if (this.textWidth + this.x[i] < 0) {
        this.x[i] =
          this.textWidth * (this.duplicator - 1) +
          this.options.padding * (this.duplicator + 1);
      } else {
        this.x[i] -= this.options.speed;
      }
    });

    this.drawText();
  }

  setFont() {
    this.context.font = this.options.font;
    this.context.fillStyle = getComputedStyle(this.canvas).getPropertyValue(
      "--subtle-gray-color"
    );
    this.context.strokeStyle = getComputedStyle(this.canvas).getPropertyValue(
      "--subtle-gray-color"
    );
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
  }

  drawText() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.setFont();

    for (let i = 0; i < this.duplicator; i += 1) {
      if (this.options.hasToBeStroke) {
        this.context.strokeText(this.options.text, this.x[i], 5);
      } else {
        this.context.fillText(this.options.text, this.x[i], 5);
      }
    }
  }

  measureFontHeight() {
    this.setFont();
    this.context.fillText(this.options.text, 0, 0);
    const data = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ).data;

    let firstY = -1;
    let lastY = -1;

    // loop through each row
    for (let y = 0; y < this.canvas.height; y++) {
      // loop through each column
      for (let x = 0; x < this.canvas.width; x++) {
        const alpha = data[(this.canvas.width * y + x) * 4 + 3];

        if (alpha > 0) {
          firstY = y;
          break;
        }
      }

      if (firstY >= 0) break;
    }

    // loop through each row, this time beginning from the last row
    for (var y = this.canvas.height; y > 0; y--) {
      // loop through each column
      for (let x = 0; x < this.canvas.width; x++) {
        const alpha = data[(this.canvas.width * y + x) * 4 + 3];

        if (alpha > 0) {
          lastY = y;
          // exit the loop
          break;
        }
      }

      if (lastY >= 0) break;
    }

    return {
      height: lastY - firstY,
      firstPixel: firstY,
      lastPixel: lastY,
    };
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

$(() => {
  //   waitForWebfonts(["Oswald"], () => {
  const $canvas = document.querySelectorAll("[data-canvas-marquee]");

  $canvas.forEach((el, i) => {
    const text =
      $(el).data("canvas-marquee-text") ||
      "CAREFULY CRAFTING THINGS SINCE 2008 · ";

    const speed = $(el).data("canvas-marquee-speed") || 2;
    const hasToBeStroke =
      $(el).data("canvas-marquee-stroke") == "true" ? true : false;

    const height = $(el).data("canvas-marquee-height") || "200px";

    const canvasMarquee = new CanvasMarquee(el, {
      text: text,
      speed: speed,
      textColor: "#f5f5f5",
      height: height,
      hasToBeStroke: hasToBeStroke,
      font: "900 " + height + " Poppins",
      padding: 0,
    });

    canvasMarquee.animate();
  });
  //   });
});
