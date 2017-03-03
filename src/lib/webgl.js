/*
global c, W, H
*/

function gl_createContext(canvas) {
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl;
}

function gl_createFloatBuffer(gl, data) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
}

function gl_createIndexBuffer(gl, data) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    return buffer;
}

function gl_createFrameBufferObject (gl, width, height) {
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    var color = gl_createTextureObject(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width || W, height || H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color, 0);
    return [fb, color];
}

function gl_createTextureObject (gl) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
}

function gl_createTextureObjectFromImage(gl, image, nearest) {
    var texture = gl.createTexture();
    gl_setTexture(gl, texture, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}

function gl_setTexture (gl, t, value) {
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
}

function gl_createShaderObject(gl, shaderType, source) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(shader);
    }
    return shader;
}

function gl_createProgramObject(gl, vs, fs) {
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(program);
    }
    return program;
}

function gl_createShaderProgram (gl, vert, frag) {
    var type = gl.VERTEX_SHADER, src = vert;
    var vertex = gl_createShaderObject(gl, type, vert);
    
    type = gl.FRAGMENT_SHADER;
    var fragment = gl_createShaderObject(gl, type, frag);
    
    var program = gl_createProgramObject(gl, vertex, fragment);
    
    gl.useProgram(program);
    var p = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
    return [program];
}

function gl_setFrameBuffer(gl, fbo, shader, tex) {
    gl_bindFBO(gl, fbo);
    gl_bindShader(gl, shader);
    gl.uniform1i(gl_uniformLocation(gl, shader, "t"), gl_bindTexture(gl, tex, 0));
    Array.prototype.slice.call(arguments, 3).forEach(function(a) {
        gl.uniform1f(gl_uniformLocation(gl, shader, a[0]), a[1]);
    });
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function gl_uniformLocation(gl, shader, name) {
    return shader[name] || (shader[name] = gl.getUniformLocation(shader[0], name));
}

function gl_bindFBO(gl, fbo) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo[0]);
}

function gl_bindShader (gl, shader) {
    gl.useProgram(shader[0]);
}

function gl_bindTexture (gl, t, unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  return unit;
}

function getFBOTexture (fbo) {
  return fbo[1];
}

function gl_setModelView(gl, program, pos, rot, axis) {
    var mvMatrix = createIdentityMat4();
    translateMat4(mvMatrix, pos);
    rotateMat4(mvMatrix, rot, axis);

    gl.uniformMatrix4fv(
        gl.getUniformLocation(program, "uModelView"),
        false,
        mvMatrix
    );
    return mvMatrix;
}

function gl_setNormalMatrix(gl, program, mv) {
    var normalMatrix = toMat3(mv);
    gl.uniformMatrix3fv(
        gl.getUniformLocation(program, "uNormalMatrix"),
        false,
        normalMatrix
    );
    return normalMatrix;
}

function gl_setProjection(gl, pgm, fov, aspect, near, far) {
    var projMatrix = createPerspectiveMat4(fov, aspect, near, far);
    gl.uniformMatrix4fv(
        gl.getUniformLocation(pgm, "uProjection"),
        false,
        projMatrix
    );
    return projMatrix;
}