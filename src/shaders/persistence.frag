precision highp float;

varying vec2 uv;
uniform sampler2D tex;
uniform sampler2D r;

void main() {
  vec3 b = texture2D(r, uv).rgb;
  gl_FragColor = vec4(
    b * (0.35 - 0.3 * b.r * b.r) +
    texture2D(tex, uv).rgb,
    0.15);
}
