import * as THREE from "three";
import { SphereBufferGeometry } from "three";


class Sphere {
  constructor(scene) {
    this.scene = scene,
    
    this.createSphere();
  }

  createSphere() {
    let geometry = new SphereBufferGeometry(1.5, 10, 10);
    let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    this.scene.add(mesh)
  }

  // animate() {
  // requestAnimationFrame(animate);

  // mesh.rotation.x += 0.02;
  // mesh.rotation.y += 0.02;

  // renderer.render(scene, camera);
}

export default Sphere;

// init();
// animate();


//   geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  // renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);



// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   1,
//   10000
// );
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
// var material = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: true });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// camera.position.z = 1000;
// function render() {
//   requestAnimationFrame(render);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// render();
