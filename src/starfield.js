import * as THREE from "three";


class Starfield {
    constructor() {
        // this.emptyUniverse = emptyUniverse;

        let renderer = new THREE.WebGLRenderer({antialias: true});
        let scene = new THREE.Scene
        let geometry = new THREE.Geometry();

        // populate geometry with vertices
        populateUniverse(geometry)
    
        // turn geometry into cloud 
        createUniverseCloud(geometry, scene)
    

    function populateUniverse(geometry) {
        for (let i = 0; i < 10000; i++) {

            // Vector3 => x,y,z axis w no scaling
            let vertices = new THREE.Vector3();

            vertices.x = Math.random() * 1000 - 500;
            vertices.y = Math.random() * 1000 - 500;
            vertices.z = Math.random() * 1000 - 500;

            // creating that geometry
            geometry.vertices.push(vertices);
        }
    }

    function createUniverseCloud(geometry, scene) {
        let texture = THREE.ImageUtils.loadTexture("../images/pearl-clipart.jpg");
        
        // point cloud material best option
        let material = new THREE.PointCloudMaterial({
            size: 5, 
            map: texture, 
            tranparent : true, 
            opacity: 1, 
            blending: "AdditiveBlending"
        })

        let particles = new THREE.PointCloud( geometry, material)
        scene.add(particles)
    }

    function updateSize() {
        let sizeTracker = 1;
        let direction = 1;
        // update pointcloud animation
        sizeTracker += direction; 
        direction += (((sizeTracker % 100) == 0) ? -1 : 1 );
        material.size = sizeTracker/100
    }
    
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

    function init() {
      let camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      let renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#e5e5e5");
      renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.domElement);

      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });

      function animate() {
        requestAnimationFrame(animate);
        // render();
        // stats.update();
        renderer.render(scene, camera);
      }
      init();
      animate();
    }
    }
}

export default Starfield;