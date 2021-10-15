var randomIntFromInterval = function (range) {
  return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
};

var convertRange = function (value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
};

export default class Wave {
  constructor(canvas, color, direction) {
    this.canvas = canvas;
    this.acceleration = function (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    this.path = [];
    this.isMoving = false;
    this.hasToMoveForward = true;
    this.hasToRender = true;
    this.direction = direction;
    this.amount = 12;
    this.offset = -40;

    this.speedRange = [10, 300];
    this.step = 0;
    this.currentTime = 0;
    this.timeInterval = 20;
    this.totalTime = 1000;
    this.color = color;
    this.timeUnit = this.totalTime / this.timeInterval;

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  createHorizontalPath() {
    this.path = [];
    for (var i = 0; i <= this.amount; i++) {
      var point = { x: 0, y: 0, fixed: false };

      if (i == 0) {
        point.x = 0;
        point.y = 0;
        point.fixed = true;
      } else if (i == 1) {
        point.x = this.offset;
        point.y = 0;
        point.border = true;
      } else if (i == this.amount) {
        point.x = 0;
        point.y = this.canvas.height;
        point.fixed = true;
      } else if (i == this.amount - 1) {
        point.x = this.offset;
        point.y = this.canvas.height;
        point.border = true;
      } else {
        point.x = this.offset;
        point.y = (this.canvas.height / (this.amount - 2)) * (i - 1);
      }
      this.path.push(point);
    }
  }

  createVerticalPath() {
    this.path = [];
    for (var i = 0; i <= this.amount; i++) {
      var point = { x: 0, y: 0, fixed: false };

      if (i == 0) {
        point.x = 0;
        point.y = 0;
        point.fixed = true;
      } else if (i == 1) {
        point.x = this.offset;
        point.y = 0;
        point.border = true;
      } else if (i == this.amount) {
        point.x = this.canvas.width;
        point.y = 0;
        point.fixed = true;
      } else if (i == this.amount - 1) {
        point.x = this.canvas.width;
        point.y = this.offset;
        point.border = true;
      } else {
        point.x = (this.canvas.width / (this.amount - 2)) * (i - 1);
        point.y = this.offset;
      }
      this.path.push(point);
    }
  }

  observe() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("wave has  to stop");
        this.hasToRender = false;
      } else {
        console.log("wave has  to render");
        this.start();
        this.hasToRender = true;
      }
    });

    this.observer.observe(this.canvasElem);
  }

  setPointsSpeed() {
    this.path.map((point) => {
      if (!point.fixed) {
        point.speed = randomIntFromInterval(this.speedRange);
      }
    });
  }

  move() {
    if (!this.isMoving) {
      this.isMoving = true;

      const total =
        this.direction == "horizontal" ? this.canvas.height : this.canvas.width;
      this.step = total / this.timeUnit;
      this.setPointsSpeed();

      var interval = setInterval(() => {
        this.currentTime += this.timeInterval;
        this.path.map((point) => {
          if (!point.fixed) {
            let newRange = [0, 1];
            if (this.hasToMoveForward) newRange = [1, 0];
            var range = convertRange(
              this.currentTime,
              [0, this.totalTime],
              newRange
            );
            var acceleration = this.acceleration(range);
            var trueSpeed =
              total * acceleration + point.speed * acceleration * 5;
            if (this.direction == "horizontal") point.x = trueSpeed;
            else point.y = trueSpeed;
          }
        });
      }, this.timeInterval);

      window.setTimeout(() => {
        clearInterval(interval);
        this.isMoving = false;
        this.currentTime = 0;
        this.hasToMoveForward = !this.hasToMoveForward;

        this.hasToRender = false;
        // if(!this.hasToMoveForward)
        //   this.move();
      }, this.totalTime);
    }
  }

  resize(e) {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.direction == "horizontal"
      ? this.createHorizontalPath()
      : this.createVerticalPath();
  }

  drawPath() {
    let ctx = this.ctx;
    let points = this.numPoints;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    this.path.map((point, i) => {
      // ctx.fillRect(point.x, point.y, 5, 5);

      if (point.fixed || point.border) {
        ctx.lineTo(point.x, point.y);
      } else {
        var xc = (point.x + this.path[i + 1].x) / 2;
        var yc = (point.y + this.path[i + 1].y) / 2;
        ctx.quadraticCurveTo(point.x, point.y, xc, yc);
      }
    });
    // ctx.stroke();
    var newColor = this.color;
    if (this.color == "background") {
      newColor = chroma($(".page").css("background-color"));
    }
    ctx.fillStyle = newColor;
    ctx.fill();
  }

  updateSize() {}

  render() {
    if (this.hasToRender) {
      let ctx = this.ctx;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawPath();
    }

    requestAnimationFrame(this.render.bind(this));
  }

  set canvas(value) {
    if (
      value instanceof HTMLElement &&
      value.tagName.toLowerCase() === "canvas"
    ) {
      this._canvas = value;
      this.ctx = this._canvas.getContext("2d");
    }
  }
  get canvas() {
    return this._canvas;
  }

  set running(value) {
    this._running = value === true;
  }

  get running() {
    return this.running !== false;
  }
}
