# Supernova: Simulation of 21 M☉ Star Using Physical Principality

Supernova is a timelapse simulation of a core-collapse supernovae using star data from astrophysicist David Vartanyan. Each rendering is a millisecond snapshot containing 25,000 datapoints. The simulation presented lasts 4,354 ms or ~4.4 seconds, culminating in an explosion that can outshine entire galaxies and radiate more energy than our sun will in its entire lifetime.

The sheer volume of data (total ~ 100 million POJOs and 12 GBs) including browser and Three.js rendering speed created limitations. Space and time complexity were optimized to incorporate more data while keeping user experience in mind. 

## Technology

* JavaScript
* Three.js
* HTML & CSS
* Python (for HDF5 file to JSON conversion)

## Features:

## Future Features:

* Dynamic temperature and entropy rendering via heatmap.
* 3D modeling (z-axis) of current 2D star planes. Timepoints may be scaled down to account for increase in data.
* Timepoint scale for slider.