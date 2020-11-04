import * as THREE from "three";
import Starfield from "./starfield";

class Universe {
  constructor() {
    this.init();

    // this.createScene();

    // Create everything to be rendered
    new Starfield(this.scene);

    

    const animate = () => {
      requestAnimationFrame(animate);
      // creates a loop that will cause renderer to draw scene everytime it's refreshed (standard ~60fps)

      // mesh.rotation.y += 0.02;
      this.camera.position.z += 0.02;
      this.renderer.render(this.scene, this.camera);
    }

    animate();
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  createScene() {
    let geometry = new THREE.SphereGeometry(0.5, 10, 10);
    let material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = -2;
    mesh.position.set(2, 2, -2); // (x, y, z)
    mesh.rotation.set(45, 0, 0); // static rotation
    mesh.scale.set(1, 2, 1);
    this.scene.add(mesh);

    let meshX = -10;
    for (let i = 0; i < 15; i++) {
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.x += (Math.random() - 0.5) * 10;
      mesh.position.y += (Math.random() - 0.5) * 10;
      mesh.position.z += (Math.random() - 0.5) * 10;
      this.scene.add(mesh);
      meshX += 1;
    }

    const light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set(10, 0, 25);
    this.scene.add(light);
  }
}

export default Universe;
