import * as THREE from "three";
import gsap from "gsap";
import { vertexShader, fragmentShader } from "./shader.js";

class Blob {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.shapeGroup = new THREE.Group();
    this.mesh = new THREE.Object3D();
    this.mat = new THREE.ShaderMaterial({
      // side:THREE.DoubleSide,
      uniforms: {
        time: {
          type: "f",
          value: 0.1,
        },
        pointscale: {
          type: "f",
          value: 1.0,
        },
        decay: {
          type: "f",
          value: 1.2,
        },
        size: {
          type: "f",
          value: 0.45,
        },
        displace: {
          type: "f",
          value: 1.0,
        },
        complex: {
          type: "f",
          value: 0.1,
        },
        waves: {
          type: "f",
          value: 0,
        },
        eqcolor: {
          type: "f",
          value: 4.0,
        },
        rcolor: {
          type: "f",
          value: 1,
        },
        gcolor: {
          type: "f",
          value: 0.9,
        },
        bcolor: {
          type: "f",
          value: 0.7,
        },
        fragment: {
          type: "i",
          value: true,
        },
        redhell: {
          type: "i",
          value: true,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: false,
    });

    var shapeGeo = new THREE.IcosahedronBufferGeometry(1.3, 24);
    // shapeGeo = new THREE.PlaneBufferGeometry(20, 20, 30, 30);

    this.shape = new THREE.Mesh(shapeGeo, this.mat);

    this.shapeGroup.add(this.shape);

    this.sceneManager.scene.add(this.shapeGroup);

    this.options = {
      perlin: {
        speed: 0.2,
        size: 0.45,
        perlins: 1.0,
        decay: 1.2,
        displace: 1.0,
        complex: 0.1,
        waves: 0,
        eqcolor: 4.0,
        rcolor: 1,
        gcolor: 0.9,
        bcolor: 0.7,
        redhell: true,
        wireframe: false,
        fragment: true,
        points: false,
      },
      scaleUp: () => {
        gsap.to(this.options.perlin, {
          size: 1,
          ease: "back.out(1.1)",
          duration: 1,
        });
        gsap.to(this.options.perlin, {
          waves: 20,
          decay: "-=0.01",
          duration: 1,
        });
      },
    };
  }

  onLoad() {
    gsap.to(this.options.perlin, {
      waves: "1",
      complex: "1",
      ease: "ease.out",
      duration: 1.5,
      overwrite: "auto",
    });
  }

  onDoubleClick() {
    var tl = new gsap.timeline({});
    tl.to(this.options.perlin, {
      waves: "4",
      complex: "2",
      wireframe: true,
      ease: "ease.in",
      duration: 0.25,
      overwrite: "auto",
      onComplete: () => {
        this.options.perlin.wireframe = false;
      },
    }).to(this.options.perlin, {
      waves: "1",
      complex: "1",
      ease: "elastic.out(1, 1)",
      duration: 0.5,
      overwrite: "auto",
    });
  }

  initGUI() {}

  start() {
    if (this.sceneManager.isDebugEnabled) {
      this.initGUI();
    }
    var tl = new gsap.timeline({});
  }

  update(elapsedTime) {
    // console.log(
    //   this.sceneManager.canvas.width,
    //   this.sceneManager.canvas.height
    // );
    if (this.sceneManager.canvas.width < this.sceneManager.canvas.height) {
      this.shapeGroup.position.set(0, 0, 0);
    } else {
      this.shapeGroup.position.set(3, 0, 0);
    }

    this.mat.uniforms["time"].value = this.options.perlin.speed * elapsedTime;
    this.mat.uniforms["complex"].value = this.options.perlin.complex;
    this.mat.uniforms["waves"].value = this.options.perlin.waves;
    this.mat.wireframe = this.options.perlin.wireframe;
  }
}

export default Blob;
