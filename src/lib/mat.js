// http://learningwebgl.com/blog/?p=1253
function Sphere () {
    var vertices = [];
    var textures = [];
    var normals = [];
    var indices = [];

    var latitudeBands = 30;
    var longitudeBands = 30;
    var radius = 1.0;

    for (var latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; ++ longNumber) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - longNumber / longitudeBands;
            var v = 1 - latNumber / latitudeBands;

            normals.push(x, y, z);
            textures.push(u, v);
            vertices.push(radius * x, radius * y, radius * z);
        }
    }

    for (latNumber = 0; latNumber < latitudeBands; ++latNumber) {
        for (longNumber = 0; longNumber < longitudeBands; ++ longNumber) {
            var first = latNumber * (longitudeBands + 1) + longNumber;
            var second = first + longitudeBands + 1;
            indices.push(second, first, first + 1, second + 1, second, first + 1);
        }
    }

    return {
        v: vertices,
        t: textures,
        n: normals,
        i: indices,
    };
};

function toMat3(M) {
    return [
        M[0], M[1], M[2],
        M[4], M[5], M[6],
        M[8], M[9], M[10]
    ];
}

function translateMat4(M, V) {
    var x = V[0], y = V[1], z = V[2];
    M[12] = M[0] * x + M[4] * y + M[8] * z + M[12];
    M[13] = M[1] * x + M[5] * y + M[9] * z + M[13];
    M[14] = M[2] * x + M[6] * y + M[10] * z + M[14];
    M[15] = M[3] * x + M[7] * y + M[11] * z + M[15];
}

function rotateMat4(M, A, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
    axisLength = Math.sqrt(x*x + y*y + z*z),
    sA = Math.sin(A),
    cA = Math.cos(A),
    t = 1 - cA;

    // normalize axis to unit vector
    x /= axisLength;
    y /= axisLength;
    z /= axisLength;

    // copy values
    var M00 = M[0], M01 = M[1], M02 = M[2], M03 = M[3],
    M10 = M[4], M11 = M[5], M12 = M[6], M13 = M[7],
    M20 = M[8], M21 = M[9], M22 = M[10], M23 = M[11];

    // rotation matrix
    var R00 = x*x*t+cA, R01 = y*x*t+z*sA, R02 = z*x*t-y*sA,
    R10 = x*y*t-z*sA, R11 = y*y*t+cA, R12 = z*y*t+x*sA,
    R20 = x*z*t+y*sA, R21 = y*z*t-x*sA, R22 = z*z*t+cA;

    // multiply matrices
    M[0] = M00 * R00 + M10 * R01 + M20 * R02;
    M[1] = M01 * R00 + M11 * R01 + M21 * R02;
    M[2] = M02 * R00 + M12 * R01 + M22 * R02;
    M[3] = M03 * R00 + M13 * R01 + M23 * R02;
    M[4] = M00 * R10 + M10 * R11 + M20 * R12;
    M[5] = M01 * R10 + M11 * R11 + M21 * R12;
    M[6] = M02 * R10 + M12 * R11 + M22 * R12;
    M[7] = M03 * R10 + M13 * R11 + M23 * R12;
    M[8] = M00 * R20 + M10 * R21 + M20 * R22;
    M[9] = M01 * R20 + M11 * R21 + M21 * R22;
    M[10] = M02 * R20 + M12 * R21 + M22 * R22;
    M[11] = M03 * R20 + M13 * R21 + M23 * R22;
}

function createIdentityMat4() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1   
    ];
}

function createPerspectiveMat4(fov, aspect, near, far) {
    var f = 1.0 / Math.tan(fov * Math.PI / 360),
        nf = 1 / (near - far);

    return [
        f/aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far+near)*nf, -1,
        0, 0, (2*far*near)*nf, 0
    ];
}