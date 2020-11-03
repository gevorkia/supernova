import * as THREE from "three";
import Starfield from "./starfield";

class Universe {
    constructor(starfield = new Starfield()){
        this.starfield = starfield;  
        let scene = new THREE.Scene();

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
        // const raycaster = new THREE.Raycaster();
        // const mouse = new THREE.Vector2();

        let geometry = new THREE.SphereGeometry(0.5, 10, 10);
        let material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
        let mesh = new THREE.Mesh(geometry, material);

        // mesh.position.x = -2;
        // mesh.position.set(2, 2, -2) // (x, y, z)
        // mesh.rotation.set(45, 0, 0) // static rotation
        // mesh.scale.set(1, 2, 1)
        scene.add(mesh);

        // let meshX = -10;
        // for (let i = 0; i < 15; i++) {
        //   let mesh = new THREE.Mesh(geometry, material);
        //   mesh.position.x += (Math.random() - 0.5) * 10;
        //   mesh.position.y += (Math.random() - 0.5) * 10;
        //   mesh.position.z += (Math.random() - 0.5) * 10;
        //   scene.add(mesh);
        //   meshX += 1;
        // }

        const light = new THREE.PointLight(0xffffff, 1, 500);
        light.position.set(10, 0, 25);
        scene.add(light);

        function animate() {
          requestAnimationFrame(animate);
          // creates a loop that will cause renderer to draw scene everytime it's refreshed (standard ~60fps)

          // mesh.rotation.y += 0.02;
          renderer.render(scene, camera);
        }

        // function onMouseMove(e) {
        //   e.preventDefault();

        //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //   raycaster.setFromCamera(mouse, camera);

        //   const intersects = raycaster.intersectObjects(scene.children, true);
        //   for (let i = 0; i < intersects.length; i++) {
        //     intersects[i].object.material.color.set(0xff0000);
        //   }
        //   mesh.position.x += 0.01;
        // }

        animate();

        // window.addEventListener("mousemove", onMouseMove);
    }

}

export default Universe;