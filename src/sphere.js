import * as THREE from "three";
import { SphereBufferGeometry } from "three";
import {starOne} from "../data/star_1ms";

class Sphere {
  constructor(scene) {
    this.scene = scene,
    
    this.createSphere();
  }

  // createSphere() {
  //   console.log(starOne[0]);
  //   let geometry = new SphereBufferGeometry(1.5, 10, 10);
  //   let material = new THREE.MeshNormalMaterial();
  //   let sphere = new THREE.Mesh(geometry, material);
  //   let sphere2 = new THREE.Mesh(geometry, material);
  //   sphere.position.set(1, 0, 0);
  //   sphere2.position.set(-1, 0, 0);
  //   // sphere.position.setX(2)
  //   this.scene.add(sphere);
  //   this.scene.add(sphere2);
  // }

  createSphere() {
    console.log((starOne.length-1))
    // console.log(starOne[0].x) => 6.726234436035156
    // {x: 6.726234436035156, y: 8.939200401306152, T: 39.05860900878906, entropy: 2.533569812774658}
    
    for (let i = 0; i < 24967; i++) {
      let geometry = new SphereBufferGeometry(0.5, 10, 10);
      let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      let sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(starOne[i].x, starOne[i].y, 0);
      let sphereLeft = sphere.position.set(-starOne[i].x, starOne[i].y, 0);
      this.scene.add(sphere);
      this.scene.add(sphereLeft);
    }

    // let sphere2 = new THREE.Mesh(geometry, material);
    // sphere2.position.set(-1, 0, 0);
    // sphere.position.setX(2)
    // this.scene.add(sphere);
    // this.scene.add(sphere2);
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
