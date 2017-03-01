var canvas = document.getElementById("screenGL"),
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
        vbo : createFloatBuffer(gl, vertices),
        ibo : createIndexBuffer(gl, indices),
        num : indices.length
    }
}

function setupShaders() {
    var vs_source = document.getElementById("shader-vs").textContent,
        fs_source = document.getElementById("shader-fs").textContent;
    
    var vshader = createShaderObject(gl, gl.VERTEX_SHADER, vs_source),
        fshader = createShaderObject(gl, gl.FRAGMENT_SHADER, fs_source);
    
    return createProgramObject(gl, vshader, fshader);
}

function tick() {
    var rotation = Date.now() / 1000,
        axis = [0, 1, 0.5],
        position = [0, 0, -5];

    setModelView(gl, program, position, rotation, axis);

    draw();
    requestAnimationFrame(tick);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(0, 0, 0, 1);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vbo);
    gl.vertexAttribPointer(aVertex, 3, gl.FLOAT, false, 0, 0);

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
    gl.enableVertexAttribArray(aVertex);

    setProjection(gl, program, 45, canvas.width / canvas.height, 0.1, 100);
    
    tick();
}

init();