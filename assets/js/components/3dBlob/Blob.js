import * as THREE from "three";
import gsap from "gsap";
import { vertexShader, fragmentShader } from "./shader.js";

class Blob {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.shapeGroup = new THREE.Group();
    this.shapeGroup.position.set(3, 0, 0);
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
          value: 0.2,
        },
        decay: {
          type: "f",
          value: 1.3,
        },
        size: {
          type: "f",
          value: 1,
        },
        displace: {
          type: "f",
          value: 0.1,
        },
        complex: {
          type: "f",
          value: 0.1,
        },
        waves: {
          type: "f",
          value: 20,
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
    var pointsGeo = new THREE.IcosahedronBufferGeometry(1.6, 2);

    this.shape = new THREE.Mesh(shapeGeo, this.mat);
    this.point = new THREE.Points(pointsGeo, this.mat);

    this.shapeGroup.add(this.point);
    this.shapeGroup.add(this.shape);

    this.sceneManager.scene.add(this.shapeGroup);

    this.options = {
      perlin: {
        speed: 0.2,
        size: 0.45,
        perlins: 1.0,
        decay: 1.2,
        displace: 1.0,
        complex: 0.5,
        waves: 1.0,
        eqcolor: 4.0,
        rcolor: 1,
        gcolor: 0.9,
        bcolor: 0.7,
        redhell: true,
        wireframe: false,
        // eqcolor: 0,
        // rcolor: 0,
        // gcolor: 0,
        // bcolor: 0,
        // redhell: false,
        // wireframe: true,
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
      scaleDown: () => {
        gsap.to(this.options.perlin, 2, {
          size: 30,
          ease: "elastic.out(1, 1)",
          waves: 0,
          duration: 1,
        });
      },
      stressUp: () => {
        gsap.to(this.options.perlin, {
          waves: "4",
          eqcolor: "7",
        });
      },
      stressDown: () => {
        gsap.to(this.options.perlin, {
          waves: "0.8",
          eqcolor: "4",
        });
      },
    };
  }

  onDoubleClick() {
    var tl = new gsap.timeline({});
    tl.to(this.options.perlin, {
      waves: "6",
      complex: "3",
      ease: "ease.in",
      duration: 0.25,
      overwrite: "auto",
    }).to(this.options.perlin, {
      waves: "1",
      complex: "1",
      ease: "elastic.out(1, 1)",
      duration: 0.5,
      overwrite: "auto",
    });
  }

  initGUI() {
    let blobGUI = this.sceneManager.gui.addFolder("Blob");
    blobGUI
      .add(this.options.perlin, "speed", 0.1, 1.0)
      .name("Shape Speed")
      .listen();
    blobGUI
      .add(this.options.perlin, "size", 0.0, 3.0)
      .name("Shape Size")
      .listen();
    blobGUI
      .add(this.options.perlin, "decay", 0.0, 1.0)
      .name("Shape Decay")
      .listen();
    blobGUI
      .add(this.options.perlin, "waves", 0.0, 20.0)
      .name("Shape Waves")
      .listen();
    blobGUI
      .add(this.options.perlin, "complex", 0.1, 1.0)
      .name("Shape Complex")
      .listen();
    blobGUI
      .add(this.options.perlin, "displace", 0.1, 2.5)
      .name("Shape Displacement")
      .listen();
    blobGUI
      .add(this.options.perlin, "wireframe", true, false)
      .name("Shape Wireframe")
      .listen();

    blobGUI.add(this.options.perlin, "eqcolor", 0.0, 30.0).name("Hue").listen();
    blobGUI.add(this.options.perlin, "rcolor", 0.0, 2.5).name("R").listen();
    blobGUI.add(this.options.perlin, "gcolor", 0.0, 2.5).name("G").listen();
    blobGUI.add(this.options.perlin, "bcolor", 0.0, 2.5).name("B").listen();
    blobGUI.add(this.options.perlin, "redhell", true).name("Electroflow");

    blobGUI.add(this.options, "scaleUp").name("Scale Up");
    blobGUI.add(this.options, "scaleDown").name("Scale Down");
    blobGUI.add(this.options, "stressUp").name("stress Up");
    blobGUI.add(this.options, "stressDown").name("stress Down");
    // blobGUI.open();
  }

  start() {
    if (this.sceneManager.isDebugEnabled) {
      this.initGUI();
    }
    var tl = new gsap.timeline({});
    // this.shapeGroup.scale.set(new THREE.Vector3(0,0,0));
    //     this.shapeGroup.position.x = 0;
    //     this.shapeGroup.position.y = -100;
    //     this.shapeGroup.position.z = 0;

    //     // .set(new THREE.Vector3(190,100,0));

    //     tl
    //         .to( this.shapeGroup.position, {
    //         x: 0,
    //       y: 0,
    //       z: 0,
    //         ease: 'Power2.easeInOut',
    //       duration: 3
    //       }, "+=1")
    //       .to( this.shapeGroup.scale, {
    //       x: 1,
    //       y: 1,
    //       z: 1,
    //       duration: 3
    //     });
  }

  update(elapsedTime) {
    // this.shapeGroup.rotation.x += 0.01;
    // this.shapeGroup.rotation.y += 0.01;

    this.mat.uniforms["time"].value = this.options.perlin.speed * elapsedTime;

    this.mat.uniforms["pointscale"].value = this.options.perlin.perlins;
    this.mat.uniforms["decay"].value = this.options.perlin.decay;
    this.mat.uniforms["size"].value = this.options.perlin.size;
    this.mat.uniforms["displace"].value = this.options.perlin.displace;
    this.mat.uniforms["complex"].value = this.options.perlin.complex;
    this.mat.uniforms["waves"].value = this.options.perlin.waves;
    this.mat.uniforms["fragment"].value = this.options.perlin.fragment;
    this.mat.wireframe = this.options.perlin.wireframe;

    this.mat.uniforms["redhell"].value = this.options.perlin.redhell;
    this.mat.uniforms["eqcolor"].value = this.options.perlin.eqcolor;
    this.mat.uniforms["rcolor"].value = this.options.perlin.rcolor;
    this.mat.uniforms["gcolor"].value = this.options.perlin.gcolor;
    this.mat.uniforms["bcolor"].value = this.options.perlin.bcolor;
  }
}

export default Blob;
