var EarthApp = function() {
    Sim.App.call(this);
};
EarthApp.prototype = new Sim.App();

EarthApp.prototype.init = function(param) {
    // call super init code to set up scene, renderer & default camera
    Sim.App.prototype.init.call(this, param);
    
    var earth = new Earth();
    earth.init();
    this.addObject(earth);
    
    // Let there be light!
    var sun = new Sun();
    sun.init();
    this.addObject(sun);
};

// custom Earth class
var Earth = function() {
    Sim.Object.call(this);
};
Earth.prototype = new Sim.Object();
Earth.prototype.init = function() {
    //var earthmap = "../_images/earth_surface_2048.jpg";
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    //var earthmap = "../_images/earth_surface_128.png";
    //var geometry = new THREE.SphereGeometry(.08, 32, 32);
    //var texture = THREE.ImageUtils.loadTexture(earthmap); // deprecated
    var tex = new THREE.Texture(a);
    tex.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({map: tex});
    //material.side = THREE.DoubleSide;
    //material.transparent = true;
    //material.opacity = 0.75;
    var mesh = new THREE.Mesh(geometry, material);
    
    mesh.rotation.z = Earth.TILT;
    
    this.setObject3D(mesh);
};
Earth.prototype.update = function() {
    // "I feel the Earth move..." - ¿Carole King?
    this.object3D.rotation.y += Earth.ROTATION_Y;
};
Earth.ROTATION_Y = 0.01;
Earth.TILT = 0.1; //0.41;