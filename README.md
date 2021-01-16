# Supernova: Simulation of 21 M☉ Star Using Physical Principality

Supernova is a timelapse simulation of a core-collapse supernova using star data from astrophysicist David Vartanyan. Each rendering is a millisecond snapshot containing 25,000 datapoints. The simulation presented lasts 4,354 ms or ~4.4 seconds, culminating in an explosion that can outshine entire galaxies and radiate more energy than our sun will in its entire lifetime.

The sheer volume of data (total ~ 100 million POJOs and 12 GBs) including browser and Three.js rendering speed created limitations. Space and time complexity were optimized to incorporate more data while keeping user experience in mind. 

### Live: [Supernova](https://gevorkia.github.io/supernova/)

![Alt Text](images/supernova.gif)

## Technology

* JavaScript
* Three.js
* HTML & CSS
* Python (for HDF5 file to JSON conversion)

## Features:

### Timelapse & Event Listeners

The universe was created by setting up a starfield backdrop generated using random vertices and adding "children" to the scene. Star renderings at different timepoints were used to illustrate the timelapse which was achieved by using event listeners and a set interval. 

When a user clicks play, an event listener allows for the pause button to be rendered in place while a set interval renders the supernova dependent on the value present on the slider as the slider moves through the entire range of time. The user can pause the timelapse and reset to the beginning. Dynamic rendering of the supernova is also possible based on manual slider manipulation by the user.

Event Listeners

```js
  eventListeners() {
    this.slider = document.getElementById("slider-range");
    this.slider.addEventListener("input", this.sliderChange.bind(this));

    this.resetBtn = document.getElementById("reset-btn");
    this.resetBtn.addEventListener("click", this.reset.bind(this));

    const playBtn = document.getElementById("play-click");
    playBtn.addEventListener("click", this.timelapse.bind(this));
  }
```

Timelapse

```js
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
        let value = this.starSliderVals[this.timelapseIndex];

        this.timelapseIndex = (this.timelapseIndex + 1) % this.starSliderVals.length;
        $("#slider-range").val(value);
        this.renderStar(`${value}`);

      }, 500);
          this.resetBtn.addEventListener("click", this.timelapseIndex = 0);

  }

  reset() {
    // to remove previous rendering and start scene from beginning 
    this.scene.remove(this.scene.children.pop());
    new Star(this.scene, star00000);
    $("#slider-range").val(0);
  }

   sliderChange(event) {
    // update rendered timepoint to value selected by user's manipulation of slider
    let sliderValue = event.currentTarget.value;
    this.renderStar(sliderValue);
  }

```

### Star Rendering

Each star file per millisecond timepoint contains 25,000 POJOs. Once plotted, one half of the star is rendered on the x, y axis. The other half is simulated by mirroring the same points on the negative x-axis, based on an appropriate assumption. A loop with a step of 2 is used for both sides of the star to maintain data accuracy while reducing sample volume to allow for fast timelapse rendering. In addition, particles are used instead of sphere geometry - the latter would only render one time point before crashing the browser upon timelapse simulation. 

```js
createStar(timepoint, hex) {

    let starParticles = new THREE.Geometry();

    // particles instead of sphere geo for greater data volume and fast timelapse rendering
    // loop with step of 2 to maintain accurate data while reducing sample volume
    for (let i = 0; i < timepoint.length; i += 2) {
      let vertices = new THREE.Vector3();
      // scaled down breadth of cartesian units to fit within scene 
      vertices.x = timepoint[i].x / 10000;
      vertices.y = timepoint[i].y / 10000;
      vertices.z = 0;

      starParticles.vertices.push(vertices);
    }

    // repeat loop on negative x-axis as star data is mirrored for simulation purposes
    for (let i = 0; i < timepoint.length; i += 2) {
      let vertices = new THREE.Vector3();
      vertices.x = -timepoint[i].x / 10000;
      vertices.y = timepoint[i].y / 10000;
      vertices.z = 0;

      starParticles.vertices.push(vertices);
    }

    let texture = THREE.ImageUtils.loadTexture("images/starfield.png");

    let material = new THREE.PointsMaterial({
      size: 0.05,
      color: hex,
      map: texture,
      opacity: 10,
      blending: THREE.AdditiveBlending,
    });

    // render points at the very end once particles have been added to geometry
    let points = new THREE.Points(starParticles, material);
    this.scene.add(points);
  }
```

## Future Features:

* Dynamic temperature and entropy rendering via heatmap.
* 3D modeling (z-axis) of current 2D star planes. Timepoints may be scaled down to account for increase in data.
* Timepoint scale for slider.