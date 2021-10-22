import $ from "jquery";

class Boids {
  constructor(canvas, color, speed, size, number_of_boids) {
    this.canvasElem = canvas;
    this.canvas = canvas;
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.boids = [];
    this.hasToRender = true;
    this.number_of_boids = number_of_boids;
    this.distance_for_cohesion = 60;
    this.distance_between_boids = 20;

    this.resize();

    this.initRandom();
    // this.initCircle();
    this.observe();

    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("pointermove", this.mouseMove.bind(this));
  }

  initRandom() {
    for (let i = 0; i < this.number_of_boids; i++) {
      this.boids.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        v: {
          x: this.randomVelocity(),
          y: this.randomVelocity(),
        },
        c: this.color,
      });
    }
  }

  initCircle() {
    for (let i = 0; i < this.number_of_boids; i++) {
      let angle = (i * 200 * Math.PI) / this.number_of_boids;
      this.boids.push({
        x: Math.sin(angle) + this.canvas.width / 2,
        y: Math.sin(angle) + this.canvas.height / 2,
        v: {
          x: this.randomVelocity(),
          y: this.randomVelocity(),
        },
        c: this.color,
      });
    }
  }

  initPhyllotaxis() {
    for (let i = 0; i < this.number_of_boids; i++) {
      var θ = Math.PI * i * (Math.sqrt(5) - 1);
      var r = (Math.sqrt(i) * 2) / Math.sqrt(this.number_of_boids);

      this.boids.push({
        x: this.canvas.width / 2 + r * Math.cos(θ),
        y: this.canvas.height / 2 - r * Math.sin(θ),
        v: {
          x: this.radialVelocity(),
          y: this.radialVelocity(),
        },
        c: this.color,
      });
      if (i > 4) {
        console.log(this.boids[i], this.canvas.width);
      }
    }
  }

  randomVelocity() {
    return Math.random() * 2 - 1;
  }

  radialVelocity(p) {
    return Math.sin(2 * Math.PI * p);
  }

  resize(e) {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  mouseMove(e) {
    let pos = this.center;
    let clientX = e.clientX - this.canvas.offsetLeft;
    let clientY = e.clientY - this.canvas.offsetTop;
    this.mousePosition = { x: clientX, y: clientY };
  }

  draw() {
    for (let i = 0; i < this.boids.length; i++) {
      //Draw boid
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.boids[i].c;

      this.ctx.lineWidth = this.size;

      this.ctx.moveTo(this.boids[i].x, this.boids[i].y);
      this.boids[i].x += this.boids[i].v.x * this.speed;
      this.boids[i].y += this.boids[i].v.y * this.speed;
      this.applyForces(i);
      this.ctx.lineTo(this.boids[i].x, this.boids[i].y);
      this.ctx.stroke();
      this.ctx.fill();

      this.checkWallCollisions(i);
    }
  }

  observe() {
    var observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("boids has to render");
        this.hasToRender = true;
      } else {
        console.log("boids has to stop");
        this.hasToRender = false;
      }
    });

    observer.observe(this.canvasElem);
  }

  render() {
    if (this.hasToRender) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // debug mouse position
      // ctx.fillStyle = "white";
      // console.log(this.mousePosition);
      // ctx.fillRect(this.mousePosition.x, this.mousePosition.y, 10, 10);

      this.draw();
    }

    requestAnimationFrame(this.render.bind(this));
    // setInterval(this.render.bind(this), 40);
  }

  calculateDistance(v1, v2) {
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt(x * x + y * y);
  }

  checkWallCollisions(index) {
    if (this.boids[index].x > this.canvas.width) {
      this.boids[index].x = 0;
    } else if (this.boids[index].x < 0) {
      this.boids[index].x = this.canvas.width;
    }

    if (this.boids[index].y > this.canvas.height) {
      this.boids[index].y = 0;
    } else if (this.boids[index].y < 0) {
      this.boids[index].y = this.canvas.height;
    }
  }

  addForce(index, force) {
    this.boids[index].v.x += force.x;
    this.boids[index].v.y += force.y;

    let magnitude = this.calculateDistance(
      {
        x: 0,
        y: 0,
      },
      {
        x: this.boids[index].v.x,
        y: this.boids[index].v.y,
      }
    );

    this.boids[index].v.x = this.boids[index].v.x / magnitude;
    this.boids[index].v.y = this.boids[index].v.y / magnitude;
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

  //This should be in multiple functions, but this will
  //save tons of looping - Gross!
  applyForces(index) {
    let percievedCenter = {
      x: 0,
      y: 0,
    };
    let flockCenter = {
      x: 0,
      y: 0,
    };
    let percievedVelocity = {
      x: 0,
      y: 0,
    };
    let count = 0;
    for (let i = 0; i < this.boids.length; i++) {
      if (i != index) {
        //Allignment
        let dist = this.calculateDistance(this.boids[index], this.boids[i]);

        if (dist > 0 && dist < this.distance_for_cohesion) {
          count++;

          //Alignment
          percievedCenter.x += this.boids[i].x;
          percievedCenter.y += this.boids[i].y;

          //Cohesion
          percievedVelocity.x += this.boids[i].v.x;
          percievedVelocity.y += this.boids[i].v.y;

          //Seperation
          if (
            this.calculateDistance(this.boids[i], this.boids[index]) <
            this.distance_between_boids
          ) {
            flockCenter.x -= this.boids[i].x - this.boids[index].x;
            flockCenter.y -= this.boids[i].y - this.boids[index].y;
          }
        }
      }
    }
    if (count > 0) {
      percievedCenter.x = percievedCenter.x / count;
      percievedCenter.y = percievedCenter.y / count;

      percievedCenter.x = (percievedCenter.x - this.boids[index].x) / 400;
      percievedCenter.y = (percievedCenter.y - this.boids[index].y) / 400;

      percievedVelocity.x = percievedVelocity.x / count;
      percievedVelocity.y = percievedVelocity.y / count;

      flockCenter.x /= count;
      flockCenter.y /= count;
    }

    this.addForce(index, percievedCenter);

    this.addForce(index, percievedVelocity);

    this.addForce(index, flockCenter);
  }

  get canvas() {
    return this._canvas;
  }

  set position(value) {
    if (typeof value == "object" && value.x && value.y) {
      this._position = value;
    }
  }

  get position() {
    return this._position || { x: 0.5, y: 0.5 };
  }

  set mousePosition(value) {
    if (typeof value == "object" && value.x && value.y) {
      this._mousePosition = value;
    }
  }

  get mousePosition() {
    return this._mousePosition || { x: 0, y: 0 };
  }

  get center() {
    return {
      x: this.canvas.width * this.position.x,
      y: this.canvas.height * this.position.y,
    };
  }

  get offset() {
    return { x: this.canvas.offsetWidth, y: this.canvas.offsetHeight };
  }

  set running(value) {
    this._running = value === true;
  }
  get running() {
    return this.running !== false;
  }
}

$(function () {
  // TO FIX : canvas size is not computed before initialisation
  // need to remove timeout
  window.setTimeout(() => {
    $("[data-boids]").each(function () {
      let canvas = $(this)[0];
      let size = $(this).data("boids-size") || 2;
      let speed = $(this).data("boids-speed") || 2;
      let number_of_boids = $(this).data("boids-number") || 300;
      let color = $(this).data("boids-color") || "rgba(0,0,0,0.2)";
      let instance = new Boids(canvas, color, speed, size, number_of_boids);
      instance.render();
    });
  }, 100);
});
