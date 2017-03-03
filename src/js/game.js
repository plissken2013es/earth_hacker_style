// Constants
var ctx = c.getContext("2d"),
    gl = gl_createContext(g),
    raf = requestAnimationFrame,
    GAME_MARGIN = 50,
    W = c.width - 2 * GAME_MARGIN,
    H = c.height - 2 * GAME_MARGIN,
    DEBUG = false,
    borderLength = 2*(W+H+2*GAME_MARGIN);
    
g.width = c.width - 100; 
g.height = c.height;

ctx.globalAlpha = 0.5;
ctx.font = "normal 12px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.fillStyle = "#F0F";
ctx.strokeStyle = "#FFF";

function drawBg () {
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "#000";
  ctx.drawImage(s, 0, 0, c.width, c.height);
}

function render (_t) {
    drawBg();
    
    drawPostProcessing();
}

var textureGame, barrelShader, barrelFbo, laserShader, laserFbo, linesShader, linesFbo, 
  colorShader, colorFbo, frame = 1;

function setupWebGL() {
    if (!gl) {
        console.error("no webGL for you!");
        return;
    }
    
    // WebGL setup
    gl.viewport(0, -15, c.width/1.2, c.height/1.2);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    var buffer = gl_createFloatBuffer(gl, [
      -1.0, -1.0,
      1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
      1.0, -1.0,
      1.0,  1.0
    ]);

    barrelShader = gl_createShaderProgram(gl, STATIC_VERT, BARREL_FRAG);
    barrelFbo = gl_createFrameBufferObject(gl);
    
    linesShader = gl_createShaderProgram(gl, STATIC_VERT, CRTLINES_FRAG);
    linesFbo = gl_createFrameBufferObject(gl);
    
    laserShader = gl_createShaderProgram(gl, STATIC_VERT, LASER_FRAG);
    laserFbo = gl_createFrameBufferObject(gl);
    
    colorShader = gl_createShaderProgram(gl, STATIC_VERT, COLOR_FRAG);
    colorFbo = gl_createFrameBufferObject(gl);
    gl.uniform2f(gl_uniformLocation(gl, colorShader, "dim"), c.width, c.height);

    textureGame = gl_createTextureObject(gl);
    
    raf(render);
}

function drawPostProcessing () {
    gl_setTexture(gl, textureGame, c);

    // Laser
    gl_setFrameBuffer(gl, laserFbo, laserShader, textureGame);
    // Color
    gl_setFrameBuffer(gl, colorFbo, colorShader, getFBOTexture(laserFbo), ["frame", frame]);
    // Barrel
    gl_setFrameBuffer(gl, barrelFbo, barrelShader, getFBOTexture(colorFbo));
    // CRT lines
    gl_setFrameBuffer(gl, linesFbo, linesShader, getFBOTexture(barrelFbo), ["frame", frame]);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    frame++;
}

setupWebGL();
