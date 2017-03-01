var canvas = document.getElementById("screenGL"),
    jwgl = jewel.webgl,
    gl = null, geometry = null, program = null, aVertex = null;

function setupGeometry() {    
    jwgl.loadModel(gl, "../_models/sphere.dae", function(geom) {
        geometry = geom;
        console.log(geom);
        setTimeout(continueInit, 500);
    });
}

function setupShaders() {
    var vs_source = document.getElementById("shader-vs").textContent,
        fs_source = document.getElementById("shader-fs").textContent;
    
    var vshader = jwgl.createShaderObject(gl, gl.VERTEX_SHADER, vs_source),
        fshader = jwgl.createShaderObject(gl, gl.FRAGMENT_SHADER, fs_source);
    
    return jwgl.createProgramObject(gl, vshader, fshader);
}

function rgb(a) {
    return a / 255;
}

function tick() {
    var rotation = Date.now() / 1000,
        axis = [0, 1, 0.5],
        position = [0, 0, -5];

    jwgl.setModelView(gl, program, position, rotation, axis);

    draw();
    requestAnimationFrame(tick);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(rgb(26), rgb(26), rgb(26), 1);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vbo);
    gl.vertexAttribPointer(aVertex, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.ibo);
    gl.drawElements(gl.TRIANGLES, geometry.num, gl.UNSIGNED_SHORT, 0);
}

function init() {
    gl = jwgl.createContext(canvas);
    gl.enable(gl.DEPTH_TEST);

    program = setupShaders();
    geometry = setupGeometry();
}

function continueInit() {
    gl.useProgram(program);

    aVertex = gl.getAttribLocation(program, "aVertex");
    gl.enableVertexAttribArray(aVertex);

    jwgl.setProjection(gl, program, 60, canvas.width / canvas.height, 0.15, 100);
    
    tick();
}

init();