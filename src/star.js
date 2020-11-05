import * as THREE from "three";
import { SphereBufferGeometry } from "three";
import { star00000 } from "../data/star_00000";
import { star01000 } from "../data/star_00000";
import { star02000 } from "../data/star_00000";
import { star03000 } from "../data/star_00000";
import { star04354 } from "../data/star_04354";

class Star {
  constructor(scene) {
    this.scene = scene, 
    
    // this.createStar(star00000);
    // this.createStar(star01000);
    // this.createStar(star02000);
    // this.createStar(star03000);
    this.createStar(star04354);
    // this.createSphere();
  }

  generateTempColor(timepoint, temperature) {
    // debugger
    let starTemps = []
    
    timepoint.forEach((obj) => {
      starTemps.push(obj.T);
    });
    // let sortedStarTemps = starTemps.sort()
    let sortedStarTemps = starTemps.sort((a, b) => a - b);
    let maxStarTemp = sortedStarTemps[sortedStarTemps.length - 1];
    let percent = (temperature / maxStarTemp) * 100;

    // prefix 0x used to indicate the number is being written in hex
    let blue = 0x0200ff;
    let green = 0x17ff00;
    let yellow = 0xfffa00;
    let orange = 0xff8200;
    let red = 0xff0000;
    // return green;

    // color intervals
    let blueMax = maxStarTemp * 0.2;  
    let greenMax = maxStarTemp * 0.4;
    let yellowMax = maxStarTemp * 0.6;
    let orangeMax = maxStarTemp * 0.8;
    let redMax = maxStarTemp;

    debugger
    // console.log(blueMax)
    // console.log(greenMax)
    // console.log(yellowMax)
    // console.log(orangeMax)
    // console.log(redMax)
    


    // if (percent >= 0 && percent <= (maxStarTemp/5)) {
    //   return blue;
    // } else if (percent > 16 && percent <= 32) {

    // }

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

  createStar(timepoint) {
    // debugger
    // for (let i = 0; i < timepoint.length; i += 1) {
    for (let i = 0; i < 1; i += 1) {
      let geometry = new SphereBufferGeometry(0.01, 10, 10);
      // let material = new THREE.MeshBasicMaterial({ color: 0x17ff00 });
      let tempColor = this.generateTempColor(timepoint, timepoint[i].T);
      // console.log(tempColor);
      let material = new THREE.MeshBasicMaterial({ color: tempColor });

      let sphere = new THREE.Mesh(geometry, material);
      let sphereSym = new THREE.Mesh(geometry, material);

      let scaledX = timepoint[i].x / 10000;
      let scaledY = timepoint[i].y / 10000;

      sphere.position.set(scaledX, scaledY, 0);
      sphereSym.position.set(-scaledX, scaledY, 0);

      this.scene.add(sphere);
      this.scene.add(sphereSym);
    }

    // let sphere2 = new THREE.Mesh(geometry, material);
    // sphere2.position.set(-1, 0, 0);
    // sphere.position.setX(2)
    // this.scene.add(sphere);
    // this.scene.add(sphere2);
  };

  // animate() {
  // requestAnimationFrame(animate);

  // mesh.rotation.x += 0.02;
  // mesh.rotation.y += 0.02;

  // renderer.render(scene, camera);
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
