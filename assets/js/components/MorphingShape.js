class MorphingShape {
    constructor(element, shapes) {
      this.shapes = shapes;
  
      this.element = element;
      this.delay = 15000;
      this.duration = 500;
      this.animationTickDelay = this.delay / 60;
      this.timeBeforeNextMorph = this.animationTickDelay;
      this.isMorphing = false;
      this.lastRandomIntFromInterval = 0;
      this.morph(this.randomIntFromInterval(0, this.shapes.length - 1), 0);
  
      var that = this;
  
      that.render();
      $(element).on("click", function () {
        if (that.isMorphing == false) {
          that.timeBeforeNextMorph = 0;
        } 
      });
    }
  
    randomIntFromInterval(min, max) {
      var random;

      var i = 0;

      console.log(min, max);
      console.log(this.shapes.length);
  
      if (this.shapes.length > 1) {
        do {
          random = Math.floor(Math.random() * (max - min)) + min;
          console.log(random);
          i++;
        } while (random === this.lastRandomIntFromInterval && i < 10);
        this.lastRandomIntFromInterval = random;
        return random;
      }
      return 0;
    }
   
    morph(shapeIndex, duration) {
      var chosenShape = this.shapes[shapeIndex];
      // $(this.element)
      //   .children(".rectangle")
      //   .attr("fill", "url(#" + this.randomIntFromInterval(1, 3) + ")");
      anime({
        targets: $(this.element).children(".rectangle")[0],
        d: [{ value: chosenShape.d }],
        duration: duration,
        easing: "cubicBezier(.5, .05, .1, .3)"
      });
    }
  
    render() {
      if (this.isMorphing == false && this.timeBeforeNextMorph < 0) {
        this.isMorphing = true;
        this.morph(
          this.randomIntFromInterval(0, this.shapes.length - 1),
          this.duration
        );
        window.setTimeout(() => {
          this.isMorphing = false;
          this.timeBeforeNextMorph = this.animationTickDelay;
        }, this.duration);
      }
      this.timeBeforeNextMorph -= 1;
      requestAnimationFrame(this.render.bind(this));
    }
  }  