import * as THREE from "three";
import { SphereBufferGeometry } from "three";
import { star04354 } from "../data/star_04354";

class Star {
  constructor(scene) {
    this.scene = scene, 
    
    this.createStar(star04354);
    // this.createSphere();
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
  //   if (starOne[i].x > maxT) {
  //     maxX = starOne[i];
  //   }
  // }

  // console.log(maxX)

  // console.log(maxT) //
  // console.log(maxEntropy)

  // console.log(starOne[0].x) => 6.726234436035156
  // {x: 6.726234436035156, y: 8.939200401306152, T: 39.05860900878906, entropy: 2.533569812774658}

  createStar(timepoint) {

    for (let i = 0; i < timepoint.length; i += 1) {

      let tempColors = [];

      let geometry = new SphereBufferGeometry(0.01, 10, 10);
      let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      let sphere = new THREE.Mesh(geometry, material);
      let sphereSym = new THREE.Mesh(geometry, material);

      let scaledX = timepoint[i].x / 10000;
      let scaledY = timepoint[i].y / 10000;
      
      sphere.position.set(scaledX, scaledY, 0);
      sphereSym.position.set( -(scaledX), scaledY, 0);

      this.scene.add(sphere);
      this.scene.add(sphereSym);
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

export default Star;



