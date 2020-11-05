import * as THREE from "three";
const OrbitControls = require("three-orbitcontrols");
import Starfield from "./starfield";
import Sphere from "./sphere";

class Universe {
  constructor() {
    this.init();

    // this.createScene();

    // Create everything to be rendered
    new Starfield(this.scene);
    new Sphere(this.scene);
   

    const animate = () => {
      requestAnimationFrame(animate);
      // creates a loop that will cause renderer to draw scene everytime it's refreshed (standard ~60fps)

      // this.mesh.rotation.y += 0.02;
      // this.camera.position.z += 0.02;
  
      
      this.renderer.render(this.scene, this.camera);
      // const controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
      // controls.update();
    }

    animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.GridHelper(100, 100));

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 7;
    this.camera.position.y = 10;
    this.camera.position.z = 2;
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });

    const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0; 
    controls.update();
  }

  createScene() {
    let geometry = new THREE.SphereGeometry(0.5, 10, 10);
    let material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.x = -2;
    this.mesh.position.set(2, 2, -2); // (x, y, z)
    this.mesh.rotation.set(45, 0, 0); // static rotation
    this.mesh.scale.set(1, 2, 1);
    this.scene.add(this.mesh);

    let meshX = -10;
    for (let i = 0; i < 15; i++) {
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.x += (Math.random() - 0.5) * 10;
      this.mesh.position.y += (Math.random() - 0.5) * 10;
      this.mesh.position.z += (Math.random() - 0.5) * 10;
      this.scene.add(this.mesh);
      meshX += 1;
    }

    const light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set(10, 0, 25);
    this.scene.add(light);
  }
}

export default Universe;
