
let EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t*t,
  // decelerating to zero velocity
  easeOutQuad: t => t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
  // decelerating to zero velocity 
  easeOutCubic: t => (--t)*t*t+1,
  // acceleration until halfway, then deceleration 
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity 
  easeInQuart: t => t*t*t*t,
  // decelerating to zero velocity 
  easeOutQuart: t => 1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: t => t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration 
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t,
  easeInElastic: t=> t === 0 ? 0: t === 1? 1: -((Math.pow(2, 10 * t - 10))) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3),
  easeOutElastic: t=> t === 0 ? 0: t === 1? 1: Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
  easeOutBack:t => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
}

// const w = 1000;
// const h = 1000;

// const data = Uint32Array.from( {length: w*h }, () => Math.random() > 0.5 ? 0xFF000000 : 0 );
// const img = new ImageData( new Uint8ClampedArray( data.buffer ), w, h );


class Blob {
  constructor(canvas, color, numPoints, margin) {
    this.canvas = canvas;
    this.oldMousePoint = { x: 0, y: 0};
    this.hover = true;
    this.margin = margin;
    this.color = color;
    this.size = 1;
    this.sizeTime = 1;
    this.numPoints = numPoints;
    this.isTurbulenceActive = false;
    this.turbulenceInterval = null;
    this.points = [];
    this.resize();
    this.createTexture();
    
    for(let i = 0; i < this.numPoints; i++) {
      let point = new Point(this.divisional * ( i ), this);
      this.points.push(point);
    }
    
    window.addEventListener('resize', this.resize.bind(this));
    this.canvas.addEventListener('pointermove', this.mouseMove.bind(this));
  }
  
  resize(e) {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.createTexture();
  }
  
  createTexture() {
    const data = Uint32Array.from( {length: this.canvas.width*this.canvas.height }, () => Math.random() > 0.3 ? 0xFF000000 : 0);
    this.img = new ImageData( new Uint8ClampedArray( data.buffer ), this.canvas.width, this.canvas.height );
  }
  
  mouseMove(e) {
    let pos = this.center;
    
    let clientX = e.clientX - this.canvas.offsetLeft;
    let clientY = e.clientY - this.canvas.offsetTop;
    
    let diff = { x: clientX - pos.x, y: clientY - pos.y };
    
    let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
    let angle = null;
    
    this.mousePos = { x: pos.x - clientX, y: pos.y - clientY };
    
    if(dist < this.radius && this.hover === false) {
      let vector = { x: clientX - pos.x, y: clientY - pos.y };
      angle = Math.atan2(vector.y, vector.x);
      this.hover = true;
    } else if(dist > this.radius && this.hover === true){ 
      let vector = { x: clientX - pos.x, y: clientY - pos.y };
      angle = Math.atan2(vector.y, vector.x);
      this.hover = false;
    }
    
    if(typeof angle == 'number') {
      
      let nearestPoint = null;
      let distanceFromPoint = 100;
      
      this.points.forEach((point)=> {
        if(Math.abs(angle - point.azimuth) < distanceFromPoint) {
          // console.log(point.azimuth, angle, distanceFromPoint);
          nearestPoint = point;
          distanceFromPoint = Math.abs(angle - point.azimuth);
        }
        
      });
      
      if(nearestPoint) {
        let strength = { x: this.oldMousePoint.x - clientX, y: this.oldMousePoint.y - clientY };
        strength = Math.sqrt((strength.x * strength.x) + (strength.y * strength.y)) * 10;
        if(strength > 100) strength = 100;
        nearestPoint.acceleration = strength / 100 * (this.hover ? -1 : 1);
      }
    }
    
    this.oldMousePoint.x = clientX; 
    this.oldMousePoint.y = clientY; 
    this.mousePosition = {x:this.oldMousePoint.x, y:this.oldMousePoint.y} ;
  }
  
  drawCircle(hasToBeStroke) {
    let ctx = this.ctx;
    let position = this.position;
    let pointsArray = this.points;
    let radius = this.radius;
    let points = this.numPoints;
    let divisional = this.divisional;
    let center = this.center;
    
    ctx.beginPath();
    
    
    let lastPoint = pointsArray[points-2];
    // ctx.moveTo(lastPoint.position.x, lastPoint.position.y);
    
    let actualPoint;
    let nextPoint;
    var xc;
    var yc;

    actualPoint = pointsArray[points - 2];
    nextPoint = pointsArray[points - 1];
    
    ctx.moveTo(center.x, center.y);
    // ctx.moveTo(actualPoint.position.x, actualPoint.position.y);
    this.drawSegment(ctx,points, pointsArray, actualPoint, nextPoint, lastPoint, "green", 15);
    
    actualPoint = pointsArray[points - 1];
    nextPoint = pointsArray[0];
    this.drawSegment(ctx,points, pointsArray, actualPoint, nextPoint, lastPoint, "green", 12);
    
    for(let i = 0; i < points; i++) {
      
      let actualPoint = pointsArray[i];
      let nextPoint = pointsArray[i+1] || pointsArray[0];
      this.drawSegment(ctx,points, pointsArray, actualPoint, nextPoint, lastPoint, "blue", 2);
      lastPoint = actualPoint;
    }
    
    actualPoint = pointsArray[points - 1];
    nextPoint = pointsArray[0];
    this.drawSegment(ctx,points, pointsArray, actualPoint, {position:{x:center.x,y:center.y}}, lastPoint, "red", 6);
    
    if(hasToBeStroke) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke(); 
    }
    else {
      
      // GRADIENT 
      // var newColor = chroma($(".page, .landing").css("background-color")).set('hsl.l', "-.2").set('hsl.s', "+.01");
      // var grd = ctx.createLinearGradient(0, 0, 700, 700);
      // grd.addColorStop(0, "rgba(0,0,0,0.1)");
      // grd.addColorStop(1, newColor);
      // ctx.fillStyle = grd;
      // ctx.fill();

      // COLOR 
      // ctx.fillStyle = newColor;
      // ctx.fill();
//       //       
      // TEXTURE 


        ctx.putImageData( this.img, 0, 0 );

        ctx.fillStyle = ctx.createLinearGradient( 0, 0, 0, this.canvas.height );
        ctx.fillStyle.addColorStop( 0.1, 'rgba(0,0,0,0.1)' );
        ctx.fillStyle.addColorStop( 1, 'black' );
        // apply transparency gradient on noise (dim top)
        ctx.globalCompositeOperation = "destination-in";
        ctx.fill();
        // apply black of the gradient on noise (darken bottom)
        ctx.globalCompositeOperation = "multiply";
        ctx.fill();

        // optionally change the color of the noise
        ctx.globalCompositeOperation = "source-atop";

        var newColor = chroma($(".page, .landing").css("background-color")).set('hsl.l', "-.3").set('hsl.s', "+.1");
        ctx.fillStyle = newColor;
        ctx.fill();

      
      // ? 
      // var texture = document.getElementById("texture");
      // var pFill = ctx.createPattern(noise, "repeat");
      // ctx.fillStyle = pFill;
      // ctx.fillStyle = pTextureFill;
      
      // 
      
      // ctx.fillStyle = 'rgba(0,0,0,0.1)';
      // ctx.fill();
    }
    ctx.closePath();
  } 
  
  updateSize() {
    let that = this;
    if(that.sizeTime == 0) {
      console.log("coucou");
      this.sizeInterval = setInterval(()=>{
        if(that.sizeTime < 1) {
          that.sizeTime += 0.01;
          that.size = EasingFunctions.easeOutBack(that.sizeTime);
        }
        else {
          this.sizeTime = 1;
          clearInterval(that.sizeInterval);
        }
      }, 10);
    }
    if(that.sizeTime == 1) {
      this.sizeInterval = setInterval(()=>{
        if(that.sizeTime > 0) {
          that.sizeTime -= 0.01;
          that.size = EasingFunctions.easeInCubic(that.sizeTime);
        }
        else {
          this.sizeTime = 0;
          clearInterval(that.sizeInterval);
        }
      }, 1000 / 60);
    }
  }
  
  turbulence() {
    if(!this.isTurbulenceActive) {
      this.isTurbulenceActive = true;
      this.turbulenceInterval = setInterval(()=>{
        this.points.map((point)=>{
          if(Math.random() > 0.5) {
          point.acceleration -= Math.random() * 0.1;
          } 
          else {
          point.acceleration += Math.random() * 0.1;
          }
        })
      }, 100);
    }
    else {
      this.isTurbulenceActive = false;
      clearInterval(this.turbulenceInterval);
    }
  }

  render() {
    let ctx = this.ctx;
    let pointsArray = this.points;
    let points = this.numPoints;
    
    for(let i = 0; i < points; i++) {
      pointsArray[i].solveWith(pointsArray[i-1] || pointsArray[points-1], pointsArray[i+1] || pointsArray[0]);
    }
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    // debug mouse position
    // ctx.fillStyle = color;
    // ctx.fillRect(this.mousePosition.x-4 / 2, this.mousePosition.y-4 / 2, 4, 4);

    this.drawCircle(false);
    // ctx.save();
    // ctx.globalCompositeOperation = 'destination-out';
    // this.drawCircle(false);
    // ctx.restore();
    
    this.points.map((point)=>{
      if(Math.random() > .990) {
        point.acceleration = -0.05 + Math.random() * 0.1;
      } 
    })

    requestAnimationFrame(this.render.bind(this));
  }
  
  drawSegment(ctx,points, pointsArray, actualPoint, nextPoint, lastPoint, color, size) {

      var xc = (actualPoint.position.x + nextPoint.position.x) / 2;
      var yc = (actualPoint.position.y + nextPoint.position.y) / 2;
      
      // for debugging
      // ctx.fillStyle = color;
      // ctx.fillRect(actualPoint.position.x-size / 2, actualPoint.position.y-size / 2, size, size);
      ctx.quadraticCurveTo(actualPoint.position.x, actualPoint.position.y, xc, yc);

      lastPoint = actualPoint;
  }
  
  push(item) {
    if(item instanceof Point) {
      this.points.push(item);
    }
  }
  
  set color(value) {
    this._color = value;
  }
  get color() {
    return this._color || '#F38949';
  }
  
  set canvas(value) {
    if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
      this._canvas = canvas;
      this.ctx = this._canvas.getContext('2d');
    }
  }
  get canvas() {
    return this._canvas;
  }
  
  set numPoints(value) {
    if(value > 2) {
      this._points = value;
    }
  }
  get numPoints() {
    return this._points || 36;
  }
  
  get radius() {
    if(this.canvas.clientWidth < this.canvas.clientHeight) {
      return (this.canvas.clientWidth / 2 - this.margin) * this.size;
    }
    else {
      return (this.canvas.clientHeight / 2 - this.margin) * this.size;
    }
  }
  
  set position(value) {
    if(typeof value == 'object' && value.x && value.y) {
      this._position = value;
    }
  }
  
  get position() {
    return this._position || { x: 0.5, y: 0.5 }; 
  }
  

  set mousePosition(value) {
    if(typeof value == 'object' && value.x && value.y) {
      this._mousePosition = value;
    }
  }
  
  get mousePosition() {
    return this._mousePosition || { x: 0, y: 0 }; 
  }

  
  get divisional() {
    return Math.PI * 2 / this.numPoints;
  }
  
  get center() {
    return { x: this.canvas.width * this.position.x, y: this.canvas.height * this.position.y };
  }
  
  get offset() {
      return {x:this.canvas.offsetWidth, y:this.canvas.offsetHeight };
  }
  
  set running(value) {
    this._running = value === true;
  }
  get running() {
    return this.running !== false;
  }
}

class Point {
  constructor(azimuth, parent) {
    this.parent = parent;
    this.azimuth = Math.PI - azimuth;
    this._components = { 
      x: Math.cos(this.azimuth),
      y: Math.sin(this.azimuth)
    };
    this.acceleration = -0.3 + Math.random() * 0.6;
    window.addEventListener('resize', this.resize.bind(this));
  }
  
  resize(e) {
  }
  
  solveWith(leftPoint, rightPoint) {
    this.acceleration = (-0.3 * this.radialEffect + ( leftPoint.radialEffect - this.radialEffect ) + ( rightPoint.radialEffect - this.radialEffect )) * this.elasticity - this.speed * this.friction;
  }
  
  set acceleration(value) {
    if(typeof value == 'number') {
      this._acceleration = value;
      this.speed += this._acceleration * 2;
    }
  }
  get acceleration() {
    return this._acceleration || 0;
  }
  
  set speed(value) {
    if(typeof value == 'number') {
      this._speed = value;
      this.radialEffect += this._speed * 5;
    }
  }
  get speed() {
    return this._speed || 0;
  }
  
  set radialEffect(value) {
    if(typeof value == 'number') {
      this._radialEffect = value;
    }
  }
  get radialEffect() {
    return this._radialEffect || 0;
  }
  
  get position() {
    return { 
      x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect), 
      y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect) 
    }
  }
  
  get components() {
    return this._components;
  }

  set elasticity(value) {
    if(typeof value === 'number') {
      this._elasticity = value;
    }
  }
  get elasticity() {
    return this._elasticity || 0.001;
  }
  set friction(value) {
    if(typeof value === 'number') {
      this._friction = value;
    }
  }
  get friction() {
    return this._friction || 0.0085;
  }
}

      