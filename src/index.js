import * as THREE from "three";
// import Starfield from "./starfield";
import Universe from "./universe";
// import { init, animate } from "./sphere";


// export let scene = new THREE.Scene();
// export let camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// export let renderer = new THREE.WebGLRenderer();

// camera.position.z = 5;

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
// scene.add(new Universe())

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root')
    // const starfield = new StarField(emptyUniverse);
    const universe = new Universe(); 
    // root.appendChild()

//    let cube = new Cube(root)
//    window.cube = cube;
    // const mydiv = document.createElement('div');

    // console.log('asdasda');
    // console.log(root);
    // root.appendChild(starfield);
    root.appendChild(universe);

    

    // init();
    // animate();
})