import * as THREE from "three";
import gsap from "gsap";
import Blob from "./Blob.js";

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
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
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

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("click", this.onClick.bind(this), false);
    window.addEventListener("dblclick", this.onDoubleClick.bind(this), false);
    window.addEventListener(
      "deviceorientation",
      this.onDeviceOrientationChange.bind(this),
      false
    );
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  observe() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.hasToRender = false;
      } else {
        this.hasToRender = true;
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
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    for (let i = 0; i < this.sceneComponents.length; i++)
      if (this.sceneComponents[i].onWindowResize)
        this.sceneComponents[i].onWindowResize();
  }

  onDeviceOrientationChange(event) {
    this.realMousePosition.x = event.beta; // In degree in the range [-180,180)
    this.realMousePosition.y = event.gamma; // In degree in the range [-90,90)
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

const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

sceneManager.init();
