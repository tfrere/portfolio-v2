import * as THREE from "three";
import gsap from "gsap";
import Blob from "./Blob.js";

let convertRange = (value, r1, r2) => {
  value = ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
  return (value * 1000) / 1000;
};

class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.options = {
      backgroundColor: "#fff",
      hasFog: false,
      fogColor: "#0000ff",
      fogNear: 0,
      fogFar: 20,
    };

    this.hasToRender = true;

    this.clock = new THREE.Clock();
    this.clock.start();

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(this.options.backgroundColor);
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.camera = new THREE.PerspectiveCamera(
      35,
      this.canvas.clientWidth / this.canvas.clientHeight,
      1,
      2500
    );
    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    //     this.composer = new EffectComposer(this.renderer);
    //     this.composer.addPass(new RenderPass(this.scene, this.camera));
    //     this.composer.addPass(new EffectPass(this.camera, new GlitchEffect()));

    this.mousePosition = new THREE.Vector2();
    this.realMousePosition = new THREE.Vector2();

    this.sceneComponents = [
      new Blob(this),
      // new Phyllotaxis(this),
      // new Stars(this),
      // new BlobAlt(this),
      // new RealisticBall(this),
      // new SeaOfLines(this),
      // new LinesExperiments(this),
      // new Fishs(this),
      // new Bubbles(this),
    ];

    this.onWindowResize();

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("click", this.onClick.bind(this), false);
    window.addEventListener("dblclick", this.onDoubleClick.bind(this), false);
    window.addEventListener(
      "deviceorientation",
      this.onDeviceOrientationChange.bind(this),
      false
    );
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.observe();
  }

  observe() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.hasToRender = true;
      } else {
        this.hasToRender = false;
      }
    });

    this.observer.observe(this.canvas);
  }

  init() {
    for (let i = 0; i < this.sceneComponents.length; i++)
      this.sceneComponents[i].start();
    this.update();
  }

  updateControls() {
    // console.log(this.realMousePosition);
    gsap.to(this.mousePosition, {
      x: this.realMousePosition.x,
      y: this.realMousePosition.y,
      duration: 1,
    });
    this.camera.position.set(
      this.mousePosition.x * 10,
      this.mousePosition.y * 10,
      20
    );
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  onWindowResize() {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    for (let i = 0; i < this.sceneComponents.length; i++)
      if (this.sceneComponents[i].onWindowResize)
        this.sceneComponents[i].onWindowResize();
  }

  onDeviceOrientationChange(event) {
    this.realMousePosition.y = convertRange(event.beta, [-180, 180], [-4, 4]);
    this.realMousePosition.x = convertRange(event.gamma, [-90, 90], [-4, 4]);
  }

  onLoad(event) {
    for (let i = 0; i < this.sceneComponents.length; i++)
      if (this.sceneComponents[i].onLoad) this.sceneComponents[i].onLoad();
  }

  onClick(event) {
    for (let i = 0; i < this.sceneComponents.length; i++)
      if (this.sceneComponents[i].onClick) this.sceneComponents[i].onClick();
  }

  onDoubleClick(event) {
    for (let i = 0; i < this.sceneComponents.length; i++)
      if (this.sceneComponents[i].onDoubleClick)
        this.sceneComponents[i].onDoubleClick();
  }

  onMouseMove(event) {
    this.realMousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.realMousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    for (let i = 0; i < this.sceneComponents.length; i++)
      if (this.sceneComponents[i].onMouseMove)
        this.sceneComponents[i].onMouseMove();
  }

  render() {
    this.updateControls();

    const elapsedTime = this.clock.getElapsedTime();

    for (let i = 0; i < this.sceneComponents.length; i++)
      this.sceneComponents[i].update(elapsedTime);

    // this.composer.render(this.clock.getDelta());
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    window.requestAnimationFrame(this.update.bind(this));
    if (this.hasToRender) {
      this.render();
    }
  }
}

export default SceneManager;

const canvas = document.getElementById("blob");
window.sceneManager = new SceneManager(canvas);

window.sceneManager.init();
