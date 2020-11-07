import * as THREE from "three";
const OrbitControls = require("three-orbitcontrols");
import Starfield from "./backdrop";
import Star from "./star";

import { star00000 } from "../data/star_00000";
import { star01000 } from "../data/star_01000";
import { star02000 } from "../data/star_02000";
import { star03000 } from "../data/star_03000";
import { star04354 } from "../data/star_04354";

class Universe {
  constructor() {
    this.init();

    // this.createScene();

    // Create everything to be rendered
    this.backdrop = new Starfield();

    this.backdrop.addToScene(this.scene);

    new Star(this.scene, star00000);

    const slider = document.getElementById("timelapse-slider");
    // // slider.addEventListener("input", this.sliderChange.bind(this));
    slider.addEventListener("input", this.sliderChange.bind(this));

    const animate = () => {
      requestAnimationFrame(animate);
      // creates a loop that will cause renderer to draw scene everytime it's refreshed (standard ~60fps)

      // this.mesh.rotation.y += 0.02;
      // this.camera.position.z += 0.02;

      this.renderer.render(this.scene, this.camera);
      // const controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
      // controls.update();
    };

    animate();
  }

  sliderChange() {
    // console.log(event);

    console.log(this.scene.children);;
    // while (this.scene.children.length > 1) {
    //   this.scene.remove(this.scene.children[0]);
    // }

    // this.scene.children.forEach((child, i) => {
      // this.scene.glremove(this.scene.children[0]);
    // })

      let sliderValue = event.currentTarget.value;
      let starFiles = [star00000, star01000, star02000, star03000, star04354];
      // let starColors =
      // console.log(sliderValue);

    // let obj = {starFile:  `star0${event.currentTarget.value}000`};
    // // obj[`star0${event.currentTarget.value}000`]
    // console.log(typeof obj.starFile)
    // console.log(obj.starFile)
    // new Starfield(this.scene);

    // this.backdrop.addToScene(this.scene);

    new Star(this.scene, starFiles[sliderValue]);
    // this.scene.add(new THREE.GridHelper(20, 20));
    // this.createStar(starFiles[sliderValue], 0xff0000);
    // this.createStar(star04354, 0xff0000);

  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.GridHelper(20, 20));
    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 1;
    this.camera.position.y = 3;
    this.camera.position.z = 20;
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    // this.renderer.setClearColor("#FFFFFF");
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });

    const controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.update();
  }

  // createScene() {
  //   let geometry = new THREE.SphereGeometry(0.6, 10, 10);
  //   let material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
  //   this.mesh = new THREE.Mesh(geometry, material);

  //   this.mesh.position.x = -2;
  //   this.mesh.position.set(2, 2, -2); // (x, y, z)
  //   this.mesh.rotation.set(45, 0, 0); // static rotation
  //   this.mesh.scale.set(1, 2, 1);
  //   this.scene.add(this.mesh);

  //   let meshX = -10;
  //   for (let i = 0; i < 15; i++) {
  //     this.mesh = new THREE.Mesh(geometry, material);
  //     this.mesh.position.x += (Math.random() - 0.5) * 10;
  //     this.mesh.position.y += (Math.random() - 0.5) * 10;
  //     this.mesh.position.z += (Math.random() - 0.5) * 10;
  //     this.scene.add(this.mesh);
  //     meshX += 1;
  //   }

  //   const light = new THREE.AmbientLight(0x404040, 100);
  //   // const light = new THREE.PointLight(0xffffff, 1, 500);
  //   // light.position.set(10, 0, 25);
  //   this.scene.add(light);
  // }
}

export default Universe;
