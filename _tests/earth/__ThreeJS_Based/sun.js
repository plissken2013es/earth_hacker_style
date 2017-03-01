var Sun = function() {
	Sim.Object.call(this);
}
Sun.prototype = new Sim.Object();
Sun.prototype.init = function() {
    // Create a point light to show off the earth - set the light out back and to left a bit
	var light = new THREE.PointLight(0xffffff, 2, 100);
	light.position.set(-10, 0, 20);
    
    this.setObject3D(light);    
}
Sun.prototype.update = function() {
    // "E pour se move"
    this.object3D.position.z -= Sun.TRANSLATION_Z;
};
Sun.TRANSLATION_Z = 0.05;