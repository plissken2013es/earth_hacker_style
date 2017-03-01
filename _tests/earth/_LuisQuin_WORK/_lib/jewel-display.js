var jewel = jewel || {};

jewel.webgl = (function() {
    var animations = [],
        previousTick,
        firstRun = true,
        jewels, cursor,
        paused;
    
    var program,
        geometry,
        aVertex, aNormal,
        uScale, uColor;
    
    function initialize(callback) {
        paused = false;
        
        if (firstRun) {
            setup();
            firstRun = false;
        }
        jewels = [];
        requestAnimationFrame(tick);
        callback();
    }
    
    function addAnimation(runTime, fncs) {
        var anim = {
            runTime : runTime,
            startTime : Date.now(),
            pos : 0,
            fncs : fncs
        };
        animations.push(anim);
    }
    
    function createJewel(x, y, type) {
        var jewel = {
            x : x,
            y : y,
            type : type,
            rnd : Math.random() * 2 - 1,
            scale : 1
        };
        jewels.push(jewel);
        
        return jewel;
    }
    
    function getJewel(x, y) {
        return jewels.filter(function(j) {
            return j.x == x && j.y == y;
        })[0];
    }
    
    function renderAnimations(time, lastTime) {
        var anims = animations.slice(0), // copy list
            n = anims.length,
            animTime,
            anim,
            i;

        // call before() function
        for (i=0;i<n;i++) {
            anim = anims[i];
            if (anim.fncs.before) {
                anim.fncs.before(anim.pos);
            }
            anim.lastPos = anim.pos;
            animTime = (lastTime - anim.startTime);
            anim.pos = animTime / anim.runTime;
            anim.pos = Math.max(0, Math.min(1, anim.pos));
        }

        animations = []; // reset animation list

        for (i=0;i<n;i++) {
            anim = anims[i];
            anim.fncs.render(anim.pos, anim.pos - anim.lastPos);
            if (anim.pos == 1) {
                if (anim.fncs.done) {
                    anim.fncs.done();
                }
            } else {
                animations.push(anim);
            }
        }
    }
    
    function tick() {}
    function setup() {
        var $ = jewel.dom.$,
        boardElement = $("#game-screen .game-board")[0];
        cols = jewel.settings.cols;
        rows = jewel.settings.rows;
        canvas = document.createElement("canvas");
        gl = jewel.webgl.createContext(canvas);
        jewel.dom.addClass(canvas, "board");
        boardElement.appendChild(canvas);
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        setupGL();
    }
    
    function setupGL() {
        var webgl = jewel.webgl;
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        program = setupShaders();
        setupTexture();
        gl.useProgram(program);
        aVertex = gl.getAttribLocation(program, "aVertex");
        aNormal = gl.getAttribLocation(program, "aNormal");
        uScale = gl.getUniformLocation(program, "uScale");
        uColor = gl.getUniformLocation(program, "uColor");
        gl.enableVertexAttribArray(aVertex);
        gl.enableVertexAttribArray(aNormal);
        gl.uniform1f(
            gl.getUniformLocation(program, "uAmbient"),
            0.12
        );
        gl.uniform3f(
            gl.getUniformLocation(program, "uLightPosition"),
            20, 15, -10
        );
        webgl.loadModel(gl, "models/jewel.dae", function(geom) {
            geometry = geom;
        });
        webgl.setProjection(
            gl, program, 60, cols/rows, 0.1, 100
        );
    }
    function setupTexture() {}
    function setupShaders() {}

    
    function setCursor() {
        cursor = null;
        if (arguments.length > 0) {
            cursor = {
                x : x,
                y : y,
                selected : selected
            };
        }
    }
    function levelUp() {}
    function gameOver() {}
    function redraw() {
        var x, y,
        jewel, type;
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                type = newJewels[x][y];
                jewel = getJewel(x, y);
                if (jewel) {
                    jewel.type = type;
                } else {
                    createJewel(x, y, type);
                }
            }
        }
        callback();
    }
    function moveJewels() {}
    function removeJewels() {}
    
    return {
        initialize:         initialize,
        addAnimation:       addAnimation,
        renderAnimations:   renderAnimations,
        redraw:             redraw,
        setCursor:          setCursor,
        moveJewels:         moveJewels,
        refill:             redraw,
        levelUp:            levelUp,
        gameOver:           gameOver
    };
})();