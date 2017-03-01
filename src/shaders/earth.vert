attribute vec3 aVertex;
attribute vec3 aNormal;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat3 uNormalMatrix;
uniform float uTime;

varying float frame;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vOrgNormal;

void main(void) {
    frame = uTime;
    vPosition = uModelView * vec4(aVertex, 1.0);
    vOrgNormal = aNormal;
    vNormal = uNormalMatrix * aNormal;
    
    gl_Position = uProjection * vPosition;
}