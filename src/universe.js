import * as THREE from "three";
const OrbitControls = require("three-orbitcontrols");
import Starfield from "./backdrop";
import Star from "./star";

import { star00000 } from "../data/star_00000";
import { star00500 } from "../data/star_00500";
import { star01000 } from "../data/star_01000";
import { star01500 } from "../data/star_01500";
import { star02000 } from "../data/star_02000";
import { star02500 } from "../data/star_02500";
import { star03000 } from "../data/star_03000";
import { star03500 } from "../data/star_03500";
import { star04000 } from "../data/star_04000";
import { star04354 } from "../data/star_04354";


class Universe {
  constructor() {
    // initialize scene
    this.init();

    // Create everything to be rendered
    this.backdrop = new Starfield();

    this.backdrop.addToScene(this.scene);

    new Star(this.scene, star00000);

    this.eventListeners();
    this.modal();

    this.starFiles = [
      star00000, 
      star00500, 
      star01000, 
      star01500, 
      star02000, 
      star02500, 
      star03000, 
      star03500, 
      star04354
    ];

    this.starSliderVals = [
      0,
      500,
      1000,
      1500,
      2000,
      2500,
      3000,
      3500,
      4000,
      4400,
    ];

    this.timelapseIndex = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      // creates a loop that will cause renderer to draw scene everytime it's refreshed (standard ~60fps)

      // this.mesh.rotation.y += 0.02;
      // this.camera.position.z += 0.02;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  modal() {
    var modal = document.getElementById("myModal");

    var btn = document.getElementById("about-btn");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
      modal.style.display = "block";
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  eventListeners() {
    this.slider = document.getElementById("slider-range");
    this.slider.addEventListener("input", this.sliderChange.bind(this));

    this.resetBtn = document.getElementById("reset-btn");
    this.resetBtn.addEventListener("click", this.reset.bind(this));

    const playBtn = document.getElementById("play-click");
    playBtn.addEventListener("click", this.timelapse.bind(this));
  }

  timelapse() {
    const pauseBtn = document.getElementById("pause-btn");
    pauseBtn.classList.add("pause-btn-display");
    pauseBtn.classList.remove("pause-btn-hide");

    document.getElementById("play-click").classList.add("play-btn-hide");

    pauseBtn.addEventListener("click", () => {
      document.getElementById("play-click").classList.remove("play-btn-hide");
      pauseBtn.classList.add("pause-btn-hide");
      pauseBtn.classList.remove("pause-btn-display");
      
      // Stop the interval
      clearInterval(this.timelapseInterval);
    });

    this.timelapseInterval = setInterval(() => {
      // console.log("ok", this.timelapseIndex);
      // console.log("my current star value is", this.starSliderVals[this.timelapseIndex]);

      let value = this.starSliderVals[this.timelapseIndex];

      this.timelapseIndex = (this.timelapseIndex + 1) % this.starSliderVals.length;
      $("#slider-range").val(value);
      this.renderStar(`${value}`);
            // event listeners don't work on programmatic slider changes
            // this.sliderChange.bind(this)();
            // this.slider.addEventListener("change", this.sliderChange.bind(this));
            // $("#slider-range").change(this.sliderChange.bind(this));
      }, 500);
          this.resetBtn.addEventListener("click", this.timelapseIndex = 0);

  }

  reset() {
    // this.init();
    this.scene.remove(this.scene.children.pop());
    new Star(this.scene, star00000);
    $("#slider-range").val(0);
  }

  starReset() {
    this.scene.remove(this.scene.children.pop());
  }



  sliderChange(event) {
    // console.log("sliderChange method called");
    // console.log(this.scene.children);;

    let sliderValue = event.currentTarget.value;
    // console.log(sliderValue);

    this.renderStar(sliderValue);
  }

  renderStar(sliderValue) {
    // console.log("renderStar method called");
    // console.log(sliderValue)
    if (sliderValue === "0") {
      this.starReset();
      new Star(this.scene, star00000);
    } else if (sliderValue === "500") {
      this.starReset();
      new Star(this.scene, star00500);
    } else if (sliderValue === "1000") {
      this.starReset();
      new Star(this.scene, star01000);
    } else if (sliderValue === "1500") {
      this.starReset();
      new Star(this.scene, star01500);
    } else if (sliderValue === "2000") {
      this.starReset();
      new Star(this.scene, star02000);
    } else if (sliderValue === "2500") {
      this.starReset();
      new Star(this.scene, star02500);
    } else if (sliderValue === "3000") {
      this.starReset();
      new Star(this.scene, star03000);
    } else if (sliderValue === "3500") {
      this.starReset();
      new Star(this.scene, star03500);
    } else if (sliderValue === "4000") {
      this.starReset();
      new Star(this.scene, star04000);
    } else if (sliderValue === "4400") {
      this.starReset();
      new Star(this.scene, star04354);
    }
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.GridHelper(16, 16));
    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 0;
    this.camera.position.y = 3;
    this.camera.position.z = 14;
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

    // const light = new THREE.AmbientLight(0x404040, 100);
    const light = new THREE.PointLight(0xffffff, 100, 0);
    light.position.set(10, 10, 10);
    this.scene.add(light);
  }

  
}

export default Universe;
