var canvas = document.getElementById("screenGL"),
    gl = null, geometry = null, program = null, aVertex = null;

function setupGeometry() {  
    var ico = new Sphere();

    return {
        vbo : createFloatBuffer(gl, ico.v),
        nbo : createFloatBuffer(gl, ico.n),
        ibo : createIndexBuffer(gl, ico.i),
        num : ico.i.length
    }
}

function setupShaders() {
    var vs_source = document.getElementById("shader-vs").textContent,
        fs_source = document.getElementById("shader-fs").textContent;
    
    var vshader = createShaderObject(gl, gl.VERTEX_SHADER, vs_source),
        fshader = createShaderObject(gl, gl.FRAGMENT_SHADER, fs_source);
    
    return createProgramObject(gl, vshader, fshader);
}

function setupTexture() {
    var image = new Image();
    image.addEventListener("load", function() {
        var texture = createTextureObject(gl, image);
        gl.uniform1i(
            gl.getUniformLocation(program, "uTexture"), 
            "uTexture", 0
        );
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    }, false);
    image.src = "../_images/earthmap.jpg";
}

function tick() {
    var rotation = Date.now() / 2000,
        axis = [0, 1, 0.5],
        position = [0, 0, -2];
    
    var mv = setModelView(gl, program, position, rotation, axis);
    setNormalMatrix(gl, program, mv);

    if (geometry) draw();
    requestAnimationFrame(tick);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(0, 0, 0, 1);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vbo);
    gl.vertexAttribPointer(aVertex, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.nbo);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.ibo);
    gl.drawElements(gl.TRIANGLES, geometry.num, gl.UNSIGNED_SHORT, 0);
}

function init() {
    gl = createContext(canvas);
    gl.enable(gl.DEPTH_TEST);

    geometry = setupGeometry();
    program = setupShaders();

    gl.useProgram(program);

    aVertex = gl.getAttribLocation(program, "aVertex");
    aNormal = gl.getAttribLocation(program, "aNormal");
    gl.enableVertexAttribArray(aVertex);
    gl.enableVertexAttribArray(aNormal);
    
    setupTexture();

    setProjection(gl, program, 120, canvas.width / canvas.height, 0.1, 100);
    
    gl.uniform1f(
        gl.getUniformLocation(program, "uAmbient"),
        0.15
    );
    gl.uniform1f(
        gl.getUniformLocation(program, "uShininess"),
        2.0
    );
    gl.uniform3f(
        gl.getUniformLocation(program, "uLightPosition"),
        15, 15, -6
    );
    
    tick();
}

init();