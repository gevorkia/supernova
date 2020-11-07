import * as THREE from "three";
import { star00000 } from "../data/star_00000";
import { star01000 } from "../data/star_01000";
import { star02000 } from "../data/star_02000";
import { star03000 } from "../data/star_03000";
import { star04354 } from "../data/star_04354";

class Star {
  constructor(scene, timepoint) {
    this.scene = scene
    this.timepoint = timepoint
    this.createStar(timepoint, 0xfffa00);
      // each ms represented by a different color
      // this.createStar(star00000, 0x0200ff); //blue
      // this.createStar(star01000, 0x17ff00); // green
      // this.createStar(star02000, 0xfffa00); // yellow
      // this.createStar(star03000, 0xff8200); // orange
      // this.createStar(star04354, 0xff0000); // red

      // this.createStar(star04354);

      // const slider = document.getElementById("timelapse-slider");
      // // slider.addEventListener("input", this.sliderChange.bind(this));
      // slider.addEventListener("input", this.sliderChange.bind(this));
    }
    
    // sliderChange() {
    //   console.log(event);
      
    //   while (this.scene.children.length > 0) {
    //     this.scene.remove(this.scene.children[0]);
    //   }
        
    //     let sliderValue = event.currentTarget.value;
    //     let starFiles = [star00000, star01000, star02000, star03000, star04354];
    //     // let starColors = 
    //     console.log(sliderValue);

    //   // let obj = {starFile:  `star0${event.currentTarget.value}000`};
    //   // // obj[`star0${event.currentTarget.value}000`]
    //   // console.log(typeof obj.starFile)
    //   // console.log(obj.starFile)

    //   this.createStar(starFiles[sliderValue], 0xff0000);
    //   // this.createStar(star04354, 0xff0000);
      
    // }
  
  createStar(timepoint, hex) {
    // debugger
    let starParticles = new THREE.Geometry();



    for (let i = 0; i < timepoint.length; i += 2) {
      // for (let i = 0; i < 100; i += 1) {
      let vertices = new THREE.Vector3();
      vertices.x = timepoint[i].x / 10000;
      vertices.y = timepoint[i].y / 10000;
      vertices.z = 0;
      // let tempColor = this.generateHeatMap(timepoint, timepoint[i].entropy);
      starParticles.vertices.push(vertices);
    }
    for (let i = 0; i < timepoint.length; i += 2) {
      // for (let i = 0; i < 100; i += 1) {
      let vertices = new THREE.Vector3();
      vertices.x = -timepoint[i].x / 10000;
      vertices.y = timepoint[i].y / 10000;
      vertices.z = 0;

      starParticles.vertices.push(vertices);
    }
    let texture = THREE.ImageUtils.loadTexture("images/starfield.png");

    let material = new THREE.PointsMaterial({
      size: 0.1,
      color: hex,
      map: texture,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    });

    let points = new THREE.Points(starParticles, material);
    // particles.position.set(1,1,1)
    this.scene.add(points);
  }

  generateHeatMap(timepoint, value) {
    // debugger

    let starVals = [];

    timepoint.forEach((obj) => {
      if (value === "timepoint[i].T") {
        starVals.push(obj.T);
      } else {
        starVals.push(obj.entropy);
      }
    });
    // let sortedStarVals = starVals.sort()
    let sortedStarVals = starVals.sort((a, b) => a - b);
    let maxStarVal = sortedStarVals[sortedStarVals.length - 1];

    // prefix 0x used to indicate the number is being written in hex
    let blue = 0x0200ff;
    let green = 0x17ff00;
    let yellow = 0xfffa00;
    let orange = 0xff8200;
    let red = 0xff0000;
    // return green;

    // color intervals
    let blueMax = maxStarVal * 0.2;
    let greenMax = maxStarVal * 0.4;
    let yellowMax = maxStarVal * 0.6;
    let orangeMax = maxStarVal * 0.8;
    let redMax = maxStarVal;

    if (value >= 0 && value <= blueMax) {
      return blue;
    } else if (value > blueMax && value <= greenMax) {
      return green;
    } else if (value > greenMax && value <= yellowMax) {
      return yellow;
    } else if (value > yellowMax && value <= orangeMax) {
      return orange;
    } else if (value > orangeMax && value <= redMax) {
      return red;
    }

    // let r, g, b = 0;
    //   if (percent < 50) {
    //     r = 255;
    //     g = Math.round(5.1 * percent);
    //   } else {
    //     g = 255;
    //     r = Math.round(510 - (5.1 * percent));
    //   }
    //   let h = (r * 0x10000) + (g * 0x100) + (b * 0x1);
    //   return "0x" +("000000" + h.toString(16)).slice(-6);
  }

  // createSphereStar(timepoint, hex) {
  //   // debugger
  //   for (let i = 0; i < timepoint.length; i += 1) {
  //     // for (let i = 0; i < 100; i += 1) {
  //     let geometry = new SphereBufferGeometry(0.01, 10, 10);
  //     // let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  //     let material = new THREE.MeshBasicMaterial({ color: hex });
  //     // let tempColor = this.generateHeatMap(timepoint, timepoint[i].entropy);
  //     // console.log(tempColor);
  //     // let material = new THREE.MeshBasicMaterial({ color: tempColor });

  //     let sphere = new THREE.Mesh(geometry, material);
  //     let sphereSym = new THREE.Mesh(geometry, material);

  //     let scaledX = timepoint[i].x / 10000;
  //     let scaledY = timepoint[i].y / 10000;

  //     sphere.position.set(scaledX, scaledY, 0);
  //     sphereSym.position.set(-scaledX, scaledY, 0);

  //     this.scene.add(sphere);
  //     this.scene.add(sphereSym);
  //   }
  // }
}

export default Star;




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


  // let maxT = 0;
  // let maxEntropy = 0;

  // starOne.forEach(obj => {
  //   if (obj.T > maxT) {
  //     maxT = obj.T;
  //   }
  //   if (obj.entropy > maxEntropy) {
  //     maxEntropy = obj.entropy;
  //   }

  // })

  // let maxX = 0
  // for (let i=0; i < 100; i++) {
  //   if (star04354[i].x > maxT) {
  //     maxX = star04354[i];
  //   }
  // }

  // console.log(maxX)

  // console.log(maxT) //
  // console.log(maxEntropy)

  // console.log(star04354[0].x) => 6.726234436035156
  // {x: 6.726234436035156, y: 8.939200401306152, T: 39.05860900878906, entropy: 2.533569812774658}
