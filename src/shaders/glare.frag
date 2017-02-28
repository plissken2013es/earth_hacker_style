precision highp float;

varying vec2 uv;
uniform sampler2D tex;

void main() {
  gl_FragColor = vec4(step(0.55, texture2D(tex, uv).r));
}
