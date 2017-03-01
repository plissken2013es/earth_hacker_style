var canvas = document.getElementById("screenGL"),
    jwgl = jewel.webgl,
    gl = null, geometry = null, program = null, aVertex = null;

function setupGeometry() {    
    var vertices = [
        -1,  1,  1,
         1,  1,  1,
         1, -1,  1,
        -1, -1,  1,

        -1,  1, -1,
         1,  1, -1,
         1, -1, -1,
        -1, -1, -1,

         1,  1,  1,
         1,  1, -1,
         1, -1, -1,
         1, -1,  1,

        -1,  1,  1,
        -1,  1, -1,
         1,  1, -1,
         1,  1,  1,

         1, -1,  1,
         1, -1, -1,
        -1, -1, -1,
        -1, -1,  1,

        -1, -1,  1,
        -1, -1, -1,
        -1,  1, -1,
        -1,  1,  1
    ];
			
    var indices = [
         1,  0,  3,
         1,  3,  2,

         4,  5,  7,
         5,  6,  7,

         9,  8, 11,
         9, 11, 10,

        13, 12, 15,
        13, 15, 14,

        17, 16, 19,
        17, 19, 18,

        21, 20, 23,
        21, 23, 22
    ];

    return {
        vbo : jwgl.createFloatBuffer(gl, vertices),
        ibo : jwgl.createIndexBuffer(gl, indices),
        num : indices.length
    }
    
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

    geometry = setupGeometry();
    program = setupShaders();

    gl.useProgram(program);


    aVertex = gl.getAttribLocation(program, "aVertex");
    gl.enableVertexAttribArray(aVertex);

    jwgl.setProjection(gl, program, 45, canvas.width / canvas.height, 0.1, 100);
    
    tick();
}

init();