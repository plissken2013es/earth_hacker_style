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
    c = a.getContext("2d");
    c.strokeStyle="#59F";
    for (q of world) {
        c.beginPath();
        x = q.x - 26;
        y = q.y - 110;
        c.moveTo(x, y);
        for (i of q.path) {
            z=i.charCodeAt()-6,c.lineTo(x+=(~~(z/11)-5),y+=(z%11-5));c.stroke()
        }
    }
    d = b.getContext("2d");
    d.strokeStyle="#9FC";
    var numLines = 24;
    for (k=numLines; k--;) {
        d.beginPath();
        var l = b.width/numLines*k;
        d.moveTo(l, 0);
        d.lineTo(l, a.height);
        d.stroke();
    }
    numLines = 12;
    for (k=numLines; k--;) {
        d.beginPath();
        l = b.height/numLines*k;
        d.moveTo(0, l);
        d.lineTo(b.width, l);
        d.stroke();
    }
    d.drawImage(a, 0, 0, 324, 256, 0, 0, 256, 256);
    
    //var texture = createTextureObject(gl, a, 1, 1, 15, 15, 200, 200);
    var texture = createTextureObject(gl, b);
    gl.uniform1i(
        gl.getUniformLocation(program, "uTexture"), 
        "uTexture", 0
    );
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
}

function tick() {
    var rotation = Date.now() / 2000,
        axis = [0, 1, 0.15],
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
    
    gl.uniform1f(
        gl.getUniformLocation(program, "uTime"),
        Date.now()
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vbo);
    gl.vertexAttribPointer(aVertex, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.nbo);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.ibo);
    gl.drawElements(gl.TRIANGLES, geometry.num, gl.UNSIGNED_SHORT, 0);
}

function init() {
    gl = createContext(canvas);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

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
        0.25
    );
    gl.uniform1f(
        gl.getUniformLocation(program, "uShininess"),
        2.0
    );
    gl.uniform3f(
        gl.getUniformLocation(program, "uLightPosition"),
        0, 0, 0
        //15, 15, 6
    );
    
    tick();
}

init();