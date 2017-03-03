var glE = null, geometry = null, program = null, aVertex = null;

function setupGeometry() {  
    var ico = new Sphere();

    return {
        vbo : gl_createFloatBuffer(glE, ico.v),
        nbo : gl_createFloatBuffer(glE, ico.n),
        ibo : gl_createIndexBuffer(glE, ico.i),
        num : ico.i.length
    }
}

function setupShaders() {
    return gl_createProgramObject(glE,
            gl_createShaderObject(glE, glE.VERTEX_SHADER, EARTH_VERT),
            gl_createShaderObject(glE, glE.FRAGMENT_SHADER, EARTH_FRAG));
}

function setupTexture() {
    var t = document.getElementById("t"); // to-do remove this
    
    var c = w.getContext("2d");
    c.strokeStyle="#59F";
    for (var q of world) {
        c.beginPath();
        var x = q.x - 26;
        var y = q.y - 110;
        c.moveTo(x, y);
        for (var i of q.path) {
            var z=i.charCodeAt()-6;
            c.lineTo(x+=(~~(z/11)-5),y+=(z%11-5));c.stroke()
        }
    }
    var d = t.getContext("2d");
    //d.strokeStyle="#9FC";
    d.strokeStyle="rgba(153,255,204,.5)";
    var numLines = 24;
    for (k=numLines; k--;) {
        d.beginPath();
        var l = t.width/numLines*k;
        d.moveTo(l, 0);
        d.lineTo(l, w.height);
        d.stroke();
    }
    numLines = 12;
    for (k=numLines; k--;) {
        d.beginPath();
        l = t.height/numLines*k;
        d.moveTo(0, l);
        d.lineTo(t.width, l);
        d.stroke();
    }
    d.drawImage(w, 0, 0, 324, 256, 0, 0, 256, 256);
    
    var texture = gl_createTextureObjectFromImage(glE, t);
    glE.uniform1i(
        glE.getUniformLocation(program, "uTexture"), 
        "uTexture", 0
    );
    glE.activeTexture(glE.TEXTURE0);
    glE.bindTexture(glE.TEXTURE_2D, texture);
}

function tick() {
    var rotation = Date.now() / 2000,
        axis = [0, 1, 0.15],
        position = [0, 0, -2];
    
    var mv = gl_setModelView(glE, program, position, rotation, axis);
    gl_setNormalMatrix(glE, program, mv);

    if (geometry) draw();
    requestAnimationFrame(tick);
}

function draw() {
    glE.clear(glE.COLOR_BUFFER_BIT | glE.DEPTH_BUFFER_BIT);
    glE.clearColor(0, 0, 0, 1);
    glE.viewport(0, 0, s.width, s.height);
    
    glE.uniform1f(
        glE.getUniformLocation(program, "uTime"),
        Date.now()
    );

    glE.bindBuffer(glE.ARRAY_BUFFER, geometry.vbo);
    glE.vertexAttribPointer(aVertex, 3, glE.FLOAT, false, 0, 0);

    glE.bindBuffer(glE.ARRAY_BUFFER, geometry.nbo);
    glE.vertexAttribPointer(aNormal, 3, glE.FLOAT, false, 0, 0);

    glE.bindBuffer(glE.ELEMENT_ARRAY_BUFFER, geometry.ibo);
    glE.drawElements(glE.TRIANGLES, geometry.num, glE.UNSIGNED_SHORT, 0);
}

function init() {
    glE = gl_createContext(s);
    glE.blendFunc(glE.SRC_ALPHA, glE.ONE);
    glE.enable(glE.BLEND);
    glE.disable(glE.DEPTH_TEST);

    geometry = setupGeometry();
    program = setupShaders();

    glE.useProgram(program);

    aVertex = glE.getAttribLocation(program, "aVertex");
    aNormal = glE.getAttribLocation(program, "aNormal");
    glE.enableVertexAttribArray(aVertex);
    glE.enableVertexAttribArray(aNormal);
    
    setupTexture();

    gl_setProjection(glE, program, 120, s.width / s.height, 0.1, 100);
    
    tick();
}

init();