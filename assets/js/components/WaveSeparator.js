import $ from "jquery";

const rand = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const ease = function (t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
};

class WaveSeparator {
  constructor(canvas, color, orientation, numPoints) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.hasToRender = true;
    this.observer = null;
    this.debug = false;
    this.options = {
      count: numPoints,
      color: color,
      orientation: orientation,
      range: {
        x: 20,
        y: 30,
      },
      duration: {
        min: 20,
        max: 50,
      },
      level: 0.5,
      curved: true,
    };
    this.points = [];
    this.observe();
    this.resize();
    this.initPoints();

    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("pointermove", this.mouseMove.bind(this));
  }

  initPoints() {
    this.points = [];
    var i = this.options.count + 2;
    var spacing =
      (this.canvas.width + this.options.range.x * 2) / (this.options.count - 1);
    while (i--) {
      this.points.push(
        new Point(
          this.ctx,
          {
            x: spacing * (i - 1) - this.options.range.x,
            y: this.canvas.height - this.canvas.height * this.options.level,
          },
          this.options
        )
      );
    }
  }

  resize(e) {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.initPoints();
  }

  mouseMove(e) {
    let pos = this.center;

    var rect = this.canvas.getBoundingClientRect();

    let clientX = e.clientX - rect.left;
    let clientY = e.clientY - rect.top;

    let diff = { x: clientX - pos.x, y: clientY - pos.y };

    let dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
    let angle = null;

    this.mousePos = window.cursorPos;
    // this.mousePos = { x: pos.x - clientX, y: pos.y - clientY };

    if (dist < this.radius && this.hover === false) {
      let vector = { x: clientX - pos.x, y: clientY - pos.y };
      angle = Math.atan2(vector.y, vector.x);
      this.hover = true;
    } else if (dist > this.radius && this.hover === true) {
      let vector = { x: clientX - pos.x, y: clientY - pos.y };
      angle = Math.atan2(vector.y, vector.x);
      this.hover = false;
    }

    if (typeof angle == "number") {
      let nearestPoint = null;
      let distanceFromPoint = 100;

      this.points.forEach((point) => {
        if (Math.abs(angle - point.azimuth) < distanceFromPoint) {
          // console.log(point.azimuth, angle, distanceFromPoint);
          nearestPoint = point;
          distanceFromPoint = Math.abs(angle - point.azimuth);
        }
      });

      if (nearestPoint) {
        let strength = {
          x: this.oldMousePoint.x - clientX,
          y: this.oldMousePoint.y - clientY,
        };
        strength =
          Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10;
        if (strength > 100) strength = 100;
        nearestPoint.acceleration = (strength / 100) * (this.hover ? -1 : 1);
      }
    }

    this.oldMousePoint = { x: clientX, y: clientY };
    this.mousePosition = { x: this.oldMousePoint.x, y: this.oldMousePoint.y };
  }

  observe() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.debug) console.log("wave has to rendere");
        this.hasToRender = true;
      } else {
        if (this.debug) console.log("wave has to stop");
        this.hasToRender = false;
      }
    });

    this.observer.observe(this.canvas);
  }

  drawShape() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    for (var i = 0; i < this.points.length - 1; i++) {
      var c = (this.points[i].x + this.points[i + 1].x) / 2;
      var d = (this.points[i].y + this.points[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
    }
    this.ctx.lineTo(
      -this.options.range.x,
      this.options.orientation == "up" ? 0 : this.canvas.height
    );
    this.ctx.lineTo(
      this.canvas.width + this.options.range.x,
      this.options.orientation == "up" ? 0 : this.canvas.height
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.options.color;
    this.ctx.fill();
  }

  updatePoints() {
    this.points.map((point) => {
      point.update();
      if (this.debug) point.render();
    });
  }

  render() {
    if (this.hasToRender) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.updatePoints();
      this.drawShape();
    }
    requestAnimationFrame(this.render.bind(this));
  }
}

var Point = function (ctx, config, options) {
  this.anchorX = config.x;
  this.anchorY = config.y;
  this.x = config.x;
  this.y = config.y;
  this.options = options;
  this.ctx = ctx;
  this.setTarget();
};

Point.prototype.setTarget = function () {
  this.initialX = this.x;
  this.initialY = this.y;
  this.targetX =
    this.anchorX + rand(0, this.options.range.x * 2) - this.options.range.x;
  this.targetY =
    this.anchorY + rand(0, this.options.range.y * 2) - this.options.range.y;
  this.tick = 0;
  this.duration = rand(this.options.duration.min, this.options.duration.max);
};

Point.prototype.update = function () {
  var dx = this.targetX - this.x;
  var dy = this.targetY - this.y;
  var dist = Math.sqrt(dx * dx + dy * dy);

  if (Math.abs(dist) <= 0) {
    this.setTarget();
  } else {
    var t = this.tick;
    var b = this.initialY;
    var c = this.targetY - this.initialY;
    var d = this.duration;
    this.y = ease(t, b, c, d);

    b = this.initialX;
    c = this.targetX - this.initialX;
    d = this.duration;
    this.x = ease(t, b, c, d);

    this.tick++;
  }
};

Point.prototype.render = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
  this.ctx.fillStyle = "red";
  this.ctx.fill();
};

$(function () {
  // TO FIX : canvas size is not computed before initialisation
  // need to remove timeout
  window.setTimeout(() => {
    $("[data-wave-separator]").each(function () {
      var canvas = $(this)[0];
      var numPoints = $(this).data("wave-separator-points") || 12;
      var color = $(this).data("wave-separator-color") || "white";
      var orientation = $(this).data("wave-separator-orientation") || "up";
      var waveSeparatorInstance = new WaveSeparator(
        canvas,
        color,
        orientation,
        numPoints
      );
      waveSeparatorInstance.render();
      // window.addEventListener("click", () => {
      //     waveSeparatorInstance.instantPertubation();
      // });
    });
  }, 100);
});
