precision mediump float;

uniform sampler2D t;

varying float frame;        
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vOrgNormal;

void main(void) {        
    float xx = max(pow(cos(vPosition.x + vPosition.z), 2.) + pow(sin(vPosition.y * frame), 2.), 1.0);
    
    float theta = acos(vOrgNormal.y);
    float phi = atan(vOrgNormal.z, vOrgNormal.x);
    vec2 uv = vec2(-phi / 2.0, theta) / 3.14159;
    vec4 texColor = texture2D(t, uv);
    
    vec3 c = texColor.rgb;
    vec2 off = 0.0001 * vec2(
        cos(47.0 * uv.y),
        sin(67.0 * uv.x)
    );
    vec4 c4 = vec4(c, texture2D(t, uv + off * cos(frame)).a / abs(vPosition.z));
    gl_FragColor = vec4(c * (0.82 - 0.1 * c.r * c.g) + c, texture2D(t, uv + off * cos(frame)).a / abs(vPosition.z));
}