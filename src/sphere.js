import * as THREE from "three";
import { SphereBufferGeometry } from "three";

let camera, scene, renderer;
let geometry, material, mesh;

// init();
// animate();

export function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

//   geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

    const radius = 0.25;
    const widthSegments = 16;
    const heightSegments = 16;

    geometry = new SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
    );

  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

export function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}

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
