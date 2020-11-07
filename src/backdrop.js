import * as THREE from "three";


class Starfield {
    constructor() {
        this.geometry = new THREE.Geometry();
        
        // populate geometry with vertices
        this.populateUniverse();
    
        // turn geometry into cloud 
        this.createUniverseCloud();
    }

    populateUniverse() {
        for (let i = 0; i < 10000; i++) {

            // Vector3 => x,y,z axis w no scaling, default: 0
            // Vector3((x: Float), (y: Float), (z: Float));
            let vertices = new THREE.Vector3();

            vertices.x = Math.random() * 1000 - 500;
            vertices.y = Math.random() * 1000 - 500;
            vertices.z = Math.random() * 1000 - 500;

            // creating that geometry
            this.geometry.vertices.push(vertices);
        }
    }

    createUniverseCloud() {
        let texture = THREE.ImageUtils.loadTexture("images/starfield.png");
        
        // point cloud material best option
        let material = new THREE.PointsMaterial({
          size: 1,
          map: texture,
        //   tranparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
        });

        this.particles = new THREE.Points(this.geometry, material);
        // particles.position.set(1,1,1)
        // this.scene.add(particles);
    }

    addToScene(scene) {
        scene.add(this.particles);
    }
}

export default Starfield;