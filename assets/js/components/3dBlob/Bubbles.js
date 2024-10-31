import * as THREE from "three";
import gsap from "gsap";

class Bubbles {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;

    this.numberOfBubbles = 50;

    this.shapeGroup = new THREE.Group();
    this.shapeGroup.position.set(0, 0, 0);

    const geometry = new THREE.SphereGeometry(3, 6, 6);
    const material = new THREE.MeshLambertMaterial({
      wireframe: false,
      color: 0xffffffff,
    });

    this.bubbles = [];

    for (let i = 0; i < this.numberOfBubbles; i++) {
      let object = new THREE.Mesh(geometry, material);
      object.speed = gsap.utils.random(5, 40);
      object.size = gsap.utils.random(0.2, 1.5);
      object.scale.set(object.size, object.size, object.size);
      const v = this.setRandomPointInSphere(0, 600);
      object.position.set(v.x, v.y, v.z);
      this.bubbles.push(object);
      this.shapeGroup.add(object);
    }

    sceneManager.scene.add(this.shapeGroup);
  }

  setRandomPointInSpace(size) {
    var v = new THREE.Vector3(
      size * Math.random() - size / 2,
      size * Math.random() - size / 2,
      size * Math.random() - size / 2
    );
    return v;
  }

  setRandomPointInSphere(innerRadius, outerRadius) {
    var v = new THREE.Vector3(
      THREE.Math.randFloatSpread(outerRadius * 2),
      THREE.Math.randFloatSpread(outerRadius * 2),
      THREE.Math.randFloatSpread(outerRadius * 2)
    );
    const length = v.length();
    if (length > outerRadius || length < innerRadius) {
      return this.setRandomPointInSphere(innerRadius, outerRadius);
    }
    return v;
  }

  isPointInSphere(v, outerRadius) {
    const length = v.length();
    if (length > outerRadius) return false;
    else return true;
  }

  initGUI() {
    let gui = this.sceneManager.gui.addFolder("Bubbles");
    // blobGUI.add(this.options, 'maskSpeedOffset', 0.015, 1.0).name('Mask speed-offset').listen();
    gui.open();
  }

  start() {
    if (this.sceneManager.isDebugEnabled) {
      this.initGUI();
    }
    var tl = new gsap.timeline({});
    console.log(this.bubbles[0].position);
  }

  update(elapsedTime) {
    this.bubbles.map((bubble) => {
      bubble.position.y += 0.1 * bubble.speed;
      if (!this.isPointInSphere(bubble.position, 600)) {
        const v = this.setRandomPointInSphere(0, 600);
        bubble.position.set(v.x, v.y, v.z);
      }
    });
  }
}

export default Bubbles;
