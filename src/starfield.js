import * as THREE from "three";


class Starfield {
    constructor(scene) {
        this.scene = scene;

        this.geometry = new THREE.Geometry();
        
        // populate geometry with vertices
        this.populateUniverse();
    
        // turn geometry into cloud 
        this.createUniverseCloud();
    }

    populateUniverse() {
        for (let i = 0; i < 10000; i++) {

            // Vector3 => x,y,z axis w no scaling
            let vertices = new THREE.Vector3();

            vertices.x = Math.random() * 1000 - 500;
            vertices.y = Math.random() * 1000 - 500;
            vertices.z = Math.random() * 1000 - 500;

            // creating that geometry
            this.geometry.vertices.push(vertices);
        }
    }

    createUniverseCloud() {
        let texture = THREE.ImageUtils.loadTexture("../images/starfield.png");
        
        // point cloud material best option
        let material = new THREE.PointCloudMaterial({
            size: 5, 
            map: texture, 
            tranparent : true, 
            opacity: 1, 
            // blending: "AdditiveBlending"
        })

        let particles = new THREE.PointCloud(this.geometry, material);
        this.scene.add(particles);
    }

    // function updateSize() {
    //     let sizeTracker = 1;
    //     let direction = 1;
    //     // update pointcloud animation
    //     sizeTracker += direction; 
    //     direction += (((sizeTracker % 100) == 0) ? -1 : 1 );
    //     material.size = sizeTracker/100
    // }
    
    // refRate(){
    //     //animation speed function
    //     let frameRate = 15;
    //     let currTime, delta;
    //     let oldTime = Date.now();
    //     let interval = 1000/frameRate;

    //     currTime = Date.now();
    //     delta = curTime - oldTime;

    //     if (delta > interval) {
    //         oldTime = currTime - (delta % interval);
    //         updateSize();
    //     }
    // }

    // render() {
    //     refRate();
    // }
}

export default Starfield;